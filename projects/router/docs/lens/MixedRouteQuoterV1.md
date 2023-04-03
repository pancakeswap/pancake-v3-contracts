# Solidity API

## MixedRouteQuoterV1

Allows getting the expected amount out for a given swap without executing the swap
Does not support exact output swaps since using the contract balance between exactOut swaps is not supported

_These functions are not gas efficient and should _not_ be called on chain. Instead, optimistically execute
the swap and check the amounts in the callback._

### factoryV2

```solidity
address factoryV2
```

### factoryStable

```solidity
address factoryStable
```

### constructor

```solidity
constructor(address _deployer, address _factory, address _factoryV2, address _factoryStable, address _WETH9) public
```

_Value to bit mask with path fee to determine if V2 or V3 route
    // max V3 fee:           000011110100001001000000 (24 bits)
    // mask:       1 << 23 = 100000000000000000000000 = decimal value 8388608
    uint24 private constant flagBitmask = 8388608;

Transient storage variable used to check a safety condition in exact output swaps.
    uint256 private amountOutCached;_

### pancakeV3SwapCallback

```solidity
function pancakeV3SwapCallback(int256 amount0Delta, int256 amount1Delta, bytes path) external view
```

Called to `msg.sender` after executing a swap via IPancakeV3Pool#swap.

_In the implementation you must pay the pool tokens owed for the swap.
The caller of this method must be checked to be a PancakeV3Pool deployed by the canonical PancakeV3Factory.
amount0Delta and amount1Delta can both be 0 if no tokens were swapped._

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| amount0Delta | int256 | The amount of token0 that was sent (negative) or must be received (positive) by the pool by the end of the swap. If positive, the callback must send that amount of token0 to the pool. |
| amount1Delta | int256 | The amount of token1 that was sent (negative) or must be received (positive) by the pool by the end of the swap. If positive, the callback must send that amount of token1 to the pool. |
| path | bytes |  |

### quoteExactInputSingleV3

```solidity
function quoteExactInputSingleV3(struct IMixedRouteQuoterV1.QuoteExactInputSingleV3Params params) public returns (uint256 amountOut, uint160 sqrtPriceX96After, uint32 initializedTicksCrossed, uint256 gasEstimate)
```

_Fetch an exactIn quote for a V3 Pool on chain_

### quoteExactInputSingleV2

```solidity
function quoteExactInputSingleV2(struct IMixedRouteQuoterV1.QuoteExactInputSingleV2Params params) public view returns (uint256 amountOut)
```

_Fetch an exactIn quote for a V2 pair on chain_

### quoteExactInputSingleStable

```solidity
function quoteExactInputSingleStable(struct IMixedRouteQuoterV1.QuoteExactInputSingleStableParams params) public view returns (uint256 amountOut)
```

_Fetch an exactIn quote for a Stable pair on chain_

### quoteExactInput

```solidity
function quoteExactInput(bytes path, uint256[] flag, uint256 amountIn) public returns (uint256 amountOut, uint160[] v3SqrtPriceX96AfterList, uint32[] v3InitializedTicksCrossedList, uint256 v3SwapGasEstimate)
```

_Get the quote for an exactIn swap between an array of Stable, V2 and/or V3 pools_

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| path | bytes |  |
| flag | uint256[] | 0 for V3, 1 for V2, 2 for 2pool, 3 for 3pool |
| amountIn | uint256 |  |

