pragma solidity >=0.5.0;

import "@pancakeswap/v3-periphery/contracts/libraries/LiquidityAmounts.sol";

contract TestLiquidityAmounts {
  function getLiquidityForAmounts(
    uint160 sqrtRatioX96,
    uint160 sqrtRatioAX96,
    uint160 sqrtRatioBX96,
    uint256 amount0,
    uint256 amount1
  ) external pure returns (uint128 liquidity) {
    return LiquidityAmounts.getLiquidityForAmounts(
      sqrtRatioX96,
      sqrtRatioAX96,
      sqrtRatioBX96,
      amount0,
      amount1
    );
  }
}
