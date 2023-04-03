# Solidity API

## IMixedRouteQuoterV1

Supports quoting the calculated amounts for exact input swaps. Is specialized for routes containing a mix of Stable, V2 and V3 liquidity.
For each pool also tells you the number of initialized ticks crossed and the sqrt price of the pool after the swap.

_These functions are not marked view because they rely on calling non-view functions and reverting
to compute the result. They are also not gas efficient and should not be called on-chain._

### quoteExactInput

```solidity
function quoteExactInput(bytes path, uint256[] flag, uint256 amountIn) external returns (uint256 amountOut, uint160[] v3SqrtPriceX96AfterList, uint32[] v3InitializedTicksCrossedList, uint256 v3SwapGasEstimate)
```

Returns the amount out received for a given exact input swap without executing the swap

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| path | bytes | The path of the swap, i.e. each token pair and the pool fee |
| flag | uint256[] | 0 for V3, 1 for V2, 2 for 2pool, 3 for 3pool |
| amountIn | uint256 | The amount of the first token to swap |

#### Return Values

| Name | Type | Description |
| ---- | ---- | ----------- |
| amountOut | uint256 | The amount of the last token that would be received |
| v3SqrtPriceX96AfterList | uint160[] | List of the sqrt price after the swap for each v3 pool in the path, 0 for v2 or stable pools |
| v3InitializedTicksCrossedList | uint32[] | List of the initialized ticks that the swap crossed for each v3 pool in the path, 0 for v2 or stable pools |
| v3SwapGasEstimate | uint256 | The estimate of the gas that the v3 swaps in the path consume |

### QuoteExactInputSingleV3Params

```solidity
struct QuoteExactInputSingleV3Params {
  address tokenIn;
  address tokenOut;
  uint256 amountIn;
  uint24 fee;
  uint160 sqrtPriceLimitX96;
}
```

### QuoteExactInputSingleV2Params

```solidity
struct QuoteExactInputSingleV2Params {
  address tokenIn;
  address tokenOut;
  uint256 amountIn;
}
```

### QuoteExactInputSingleStableParams

```solidity
struct QuoteExactInputSingleStableParams {
  address tokenIn;
  address tokenOut;
  uint256 amountIn;
  uint256 flag;
}
```

### quoteExactInputSingleV3

```solidity
function quoteExactInputSingleV3(struct IMixedRouteQuoterV1.QuoteExactInputSingleV3Params params) external returns (uint256 amountOut, uint160 sqrtPriceX96After, uint32 initializedTicksCrossed, uint256 gasEstimate)
```

Returns the amount out received for a given exact input but for a swap of a single pool

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| params | struct IMixedRouteQuoterV1.QuoteExactInputSingleV3Params | The params for the quote, encoded as `QuoteExactInputSingleParams` tokenIn The token being swapped in tokenOut The token being swapped out fee The fee of the token pool to consider for the pair amountIn The desired input amount sqrtPriceLimitX96 The price limit of the pool that cannot be exceeded by the swap |

#### Return Values

| Name | Type | Description |
| ---- | ---- | ----------- |
| amountOut | uint256 | The amount of `tokenOut` that would be received |
| sqrtPriceX96After | uint160 | The sqrt price of the pool after the swap |
| initializedTicksCrossed | uint32 | The number of initialized ticks that the swap crossed |
| gasEstimate | uint256 | The estimate of the gas that the swap consumes |

### quoteExactInputSingleV2

```solidity
function quoteExactInputSingleV2(struct IMixedRouteQuoterV1.QuoteExactInputSingleV2Params params) external returns (uint256 amountOut)
```

Returns the amount out received for a given exact input but for a swap of a single V2 pool

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| params | struct IMixedRouteQuoterV1.QuoteExactInputSingleV2Params | The params for the quote, encoded as `QuoteExactInputSingleV2Params` tokenIn The token being swapped in tokenOut The token being swapped out amountIn The desired input amount |

#### Return Values

| Name | Type | Description |
| ---- | ---- | ----------- |
| amountOut | uint256 | The amount of `tokenOut` that would be received |

### quoteExactInputSingleStable

```solidity
function quoteExactInputSingleStable(struct IMixedRouteQuoterV1.QuoteExactInputSingleStableParams params) external returns (uint256 amountOut)
```

Returns the amount out received for a given exact input but for a swap of a single Stable pool

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| params | struct IMixedRouteQuoterV1.QuoteExactInputSingleStableParams | The params for the quote, encoded as `QuoteExactInputSingleStableParams` tokenIn The token being swapped in tokenOut The token being swapped out amountIn The desired input amount flag The token amount in a single Stable pool. 2 for 2pool, 3 for 3pool |

#### Return Values

| Name | Type | Description |
| ---- | ---- | ----------- |
| amountOut | uint256 | The amount of `tokenOut` that would be received |

