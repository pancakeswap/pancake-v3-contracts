// SPDX-License-Identifier: GPL-2.0-or-later
pragma solidity =0.7.6;
pragma abicoder v2;

import '@pancakeswap/v3-periphery/contracts/base/PeripheryImmutableState.sol';
import '@pancakeswap/v3-core/contracts/libraries/SafeCast.sol';
import '@pancakeswap/v3-core/contracts/libraries/TickMath.sol';
import '@pancakeswap/v3-core/contracts/libraries/TickBitmap.sol';
import '@pancakeswap/v3-core/contracts/interfaces/IPancakeV3Pool.sol';
import '@pancakeswap/v3-core/contracts/interfaces/callback/IPancakeV3SwapCallback.sol';
import '@pancakeswap/v3-periphery/contracts/libraries/Path.sol';
import '@uniswap/v2-core/contracts/interfaces/IUniswapV2Pair.sol';

import '../base/ImmutableState.sol';
import '../interfaces/IMixedRouteQuoterV1.sol';
import '../interfaces/IStableSwap.sol';
import '../libraries/PoolTicksCounter.sol';
import '../libraries/SmartRouterHelper.sol';

/// @title Provides on chain quotes for V3, V2, Stable and MixedRoute exact input swaps
/// @notice Allows getting the expected amount out for a given swap without executing the swap
/// @notice Does not support exact output swaps since using the contract balance between exactOut swaps is not supported
/// @dev These functions are not gas efficient and should _not_ be called on chain. Instead, optimistically execute
/// the swap and check the amounts in the callback.
contract MixedRouteQuoterV1 is IMixedRouteQuoterV1, IPancakeV3SwapCallback, PeripheryImmutableState {
    using Path for bytes;
    using SafeCast for uint256;
    using PoolTicksCounter for IPancakeV3Pool;

    address public immutable factoryV2;
    address public immutable factoryStable;

    /**
    /// @dev Value to bit mask with path fee to determine if V2 or V3 route
    // max V3 fee:           000011110100001001000000 (24 bits)
    // mask:       1 << 23 = 100000000000000000000000 = decimal value 8388608
    uint24 private constant flagBitmask = 8388608;

    /// @dev Transient storage variable used to check a safety condition in exact output swaps.
    uint256 private amountOutCached;
    */

    constructor(
        address _deployer,
        address _factory,
        address _factoryV2,
        address _factoryStable,
        address _WETH9
    ) PeripheryImmutableState(_deployer, _factory, _WETH9) {
        factoryV2 = _factoryV2;
        factoryStable = _factoryStable;
    }



    /************************************************** V3 **************************************************/

    /// @inheritdoc IPancakeV3SwapCallback
    function pancakeV3SwapCallback(
        int256 amount0Delta,
        int256 amount1Delta,
        bytes memory path
    ) external view override {
        require(amount0Delta > 0 || amount1Delta > 0); // swaps entirely within 0-liquidity regions are not supported
        (address tokenIn, address tokenOut, uint24 fee) = path.decodeFirstPool();
        SmartRouterHelper.verifyCallback(deployer, tokenIn, tokenOut, fee);

        (bool isExactInput, uint256 amountReceived) =
            amount0Delta > 0
                ? (tokenIn < tokenOut, uint256(-amount1Delta))
                : (tokenOut < tokenIn, uint256(-amount0Delta));

        IPancakeV3Pool pool = SmartRouterHelper.getPool(deployer, tokenIn, tokenOut, fee);
        (uint160 v3SqrtPriceX96After, int24 tickAfter, , , , , ) = pool.slot0();

        if (isExactInput) {
            assembly {
                let ptr := mload(0x40)
                mstore(ptr, amountReceived)
                mstore(add(ptr, 0x20), v3SqrtPriceX96After)
                mstore(add(ptr, 0x40), tickAfter)
                revert(ptr, 0x60)
            }
        } else {
            /// since we don't support exactOutput, revert here
            revert('Exact output quote not supported');
        }
    }

    /// @dev Parses a revert reason that should contain the numeric quote
    function parseRevertReason(bytes memory reason)
        private
        pure
        returns (
            uint256 amount,
            uint160 sqrtPriceX96After,
            int24 tickAfter
        )
    {
        if (reason.length != 0x60) {
            if (reason.length < 0x44) revert('Unexpected error');
            assembly {
                reason := add(reason, 0x04)
            }
            revert(abi.decode(reason, (string)));
        }
        return abi.decode(reason, (uint256, uint160, int24));
    }

    function handleV3Revert(
        bytes memory reason,
        IPancakeV3Pool pool,
        uint256 gasEstimate
    )
        private
        view
        returns (
            uint256 amount,
            uint160 sqrtPriceX96After,
            uint32 initializedTicksCrossed,
            uint256
        )
    {
        int24 tickBefore;
        int24 tickAfter;
        (, tickBefore, , , , , ) = pool.slot0();
        (amount, sqrtPriceX96After, tickAfter) = parseRevertReason(reason);

        initializedTicksCrossed = pool.countInitializedTicksCrossed(tickBefore, tickAfter);

        return (amount, sqrtPriceX96After, initializedTicksCrossed, gasEstimate);
    }

    /// @dev Fetch an exactIn quote for a V3 Pool on chain
    function quoteExactInputSingleV3(QuoteExactInputSingleV3Params memory params)
        public
        override
        returns (
            uint256 amountOut,
            uint160 sqrtPriceX96After,
            uint32 initializedTicksCrossed,
            uint256 gasEstimate
        )
    {
        bool zeroForOne = params.tokenIn < params.tokenOut;
        IPancakeV3Pool pool = SmartRouterHelper.getPool(deployer, params.tokenIn, params.tokenOut, params.fee);

        uint256 gasBefore = gasleft();
        try
            pool.swap(
                address(this), // address(0) might cause issues with some tokens
                zeroForOne,
                params.amountIn.toInt256(),
                params.sqrtPriceLimitX96 == 0
                    ? (zeroForOne ? TickMath.MIN_SQRT_RATIO + 1 : TickMath.MAX_SQRT_RATIO - 1)
                    : params.sqrtPriceLimitX96,
                abi.encodePacked(params.tokenIn, params.fee, params.tokenOut)
            )
        {} catch (bytes memory reason) {
            gasEstimate = gasBefore - gasleft();
            return handleV3Revert(reason, pool, gasEstimate);
        }
    }



    /************************************************** V2 **************************************************/

    /// @dev Fetch an exactIn quote for a V2 pair on chain
    function quoteExactInputSingleV2(QuoteExactInputSingleV2Params memory params)
        public
        view
        override
        returns (uint256 amountOut)
    {
        (uint256 reserveIn, uint256 reserveOut) = SmartRouterHelper.getReserves(factoryV2, params.tokenIn, params.tokenOut);
        amountOut = SmartRouterHelper.getAmountOut(params.amountIn, reserveIn, reserveOut);
    }



    /************************************************** Stable **************************************************/

    /// @dev Fetch an exactIn quote for a Stable pair on chain
    function quoteExactInputSingleStable(QuoteExactInputSingleStableParams memory params)
        public
        view
        override
        returns (uint256 amountOut)
    {
        (uint256 i, uint256 j, address swapContract) = SmartRouterHelper.getStableInfo(factoryStable, params.tokenIn, params.tokenOut, params.flag);
        amountOut = IStableSwap(swapContract).get_dy(i, j, params.amountIn);
    }



    /************************************************** Mixed **************************************************/

    /// @dev Get the quote for an exactIn swap between an array of Stable, V2 and/or V3 pools
    /// @param flag 0 for V3, 1 for V2, 2 for 2pool, 3 for 3pool
    function quoteExactInput(
        bytes memory path,
        uint256[] memory flag, 
        uint256 amountIn
    )
        public
        override
        returns (
            uint256 amountOut,
            uint160[] memory v3SqrtPriceX96AfterList,
            uint32[] memory v3InitializedTicksCrossedList,
            uint256 v3SwapGasEstimate
        )
    {
        v3SqrtPriceX96AfterList = new uint160[](path.numPools());
        v3InitializedTicksCrossedList = new uint32[](path.numPools());

        uint256 i = 0;
        while (true) {
            (address tokenIn, address tokenOut, uint24 fee) = path.decodeFirstPool();

            if (flag[i] == 1) {
                amountIn = quoteExactInputSingleV2(
                    QuoteExactInputSingleV2Params({
                        tokenIn: tokenIn, 
                        tokenOut: tokenOut, 
                        amountIn: amountIn
                    })
                );
            } else if (flag[i] == 0) {
                /// the outputs of prior swaps become the inputs to subsequent ones
                (
                    uint256 _amountOut,
                    uint160 _sqrtPriceX96After,
                    uint32 _initializedTicksCrossed,
                    uint256 _gasEstimate
                ) =
                    quoteExactInputSingleV3(
                        QuoteExactInputSingleV3Params({
                            tokenIn: tokenIn,
                            tokenOut: tokenOut,
                            fee: fee,
                            amountIn: amountIn,
                            sqrtPriceLimitX96: 0
                        })
                    );
                v3SqrtPriceX96AfterList[i] = _sqrtPriceX96After;
                v3InitializedTicksCrossedList[i] = _initializedTicksCrossed;
                v3SwapGasEstimate += _gasEstimate;
                amountIn = _amountOut;
            } else {
                amountIn = quoteExactInputSingleStable(
                    QuoteExactInputSingleStableParams({
                        tokenIn: tokenIn, 
                        tokenOut: tokenOut, 
                        amountIn: amountIn, 
                        flag: flag[i]
                    })
                );
            }

            i++;

            /// decide whether to continue or terminate
            if (path.hasMultiplePools()) {
                path = path.skipToken();
            } else {
                return (amountIn, v3SqrtPriceX96AfterList, v3InitializedTicksCrossedList, v3SwapGasEstimate);
            }
        }
    }
}
