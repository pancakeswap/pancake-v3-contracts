# Solidity API

## QuoterV2

Allows getting the expected amount out or amount in for a given swap without executing the swap

_These functions are not gas efficient and should _not_ be called on chain. Instead, optimistically execute
the swap and check the amounts in the callback._

### constructor

```solidity
constructor(address _deployer, address _factory, address _WETH9) public
```

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

### quoteExactInputSingle

```solidity
function quoteExactInputSingle(struct IQuoterV2.QuoteExactInputSingleParams params) public returns (uint256 amountOut, uint160 sqrtPriceX96After, uint32 initializedTicksCrossed, uint256 gasEstimate)
```

Returns the amount out received for a given exact input but for a swap of a single pool

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| params | struct IQuoterV2.QuoteExactInputSingleParams | The params for the quote, encoded as `QuoteExactInputSingleParams` tokenIn The token being swapped in tokenOut The token being swapped out fee The fee of the token pool to consider for the pair amountIn The desired input amount sqrtPriceLimitX96 The price limit of the pool that cannot be exceeded by the swap |

#### Return Values

| Name | Type | Description |
| ---- | ---- | ----------- |
| amountOut | uint256 | The amount of `tokenOut` that would be received |
| sqrtPriceX96After | uint160 | The sqrt price of the pool after the swap |
| initializedTicksCrossed | uint32 | The number of initialized ticks that the swap crossed |
| gasEstimate | uint256 | The estimate of the gas that the swap consumes |

### quoteExactInput

```solidity
function quoteExactInput(bytes path, uint256 amountIn) public returns (uint256 amountOut, uint160[] sqrtPriceX96AfterList, uint32[] initializedTicksCrossedList, uint256 gasEstimate)
```

Returns the amount out received for a given exact input swap without executing the swap

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| path | bytes | The path of the swap, i.e. each token pair and the pool fee |
| amountIn | uint256 | The amount of the first token to swap |

#### Return Values

| Name | Type | Description |
| ---- | ---- | ----------- |
| amountOut | uint256 | The amount of the last token that would be received |
| sqrtPriceX96AfterList | uint160[] | List of the sqrt price after the swap for each pool in the path |
| initializedTicksCrossedList | uint32[] | List of the initialized ticks that the swap crossed for each pool in the path |
| gasEstimate | uint256 | The estimate of the gas that the swap consumes |

### quoteExactOutputSingle

```solidity
function quoteExactOutputSingle(struct IQuoterV2.QuoteExactOutputSingleParams params) public returns (uint256 amountIn, uint160 sqrtPriceX96After, uint32 initializedTicksCrossed, uint256 gasEstimate)
```

Returns the amount in required to receive the given exact output amount but for a swap of a single pool

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| params | struct IQuoterV2.QuoteExactOutputSingleParams | The params for the quote, encoded as `QuoteExactOutputSingleParams` tokenIn The token being swapped in tokenOut The token being swapped out fee The fee of the token pool to consider for the pair amountOut The desired output amount sqrtPriceLimitX96 The price limit of the pool that cannot be exceeded by the swap |

#### Return Values

| Name | Type | Description |
| ---- | ---- | ----------- |
| amountIn | uint256 | The amount required as the input for the swap in order to receive `amountOut` |
| sqrtPriceX96After | uint160 | The sqrt price of the pool after the swap |
| initializedTicksCrossed | uint32 | The number of initialized ticks that the swap crossed |
| gasEstimate | uint256 | The estimate of the gas that the swap consumes |

### quoteExactOutput

```solidity
function quoteExactOutput(bytes path, uint256 amountOut) public returns (uint256 amountIn, uint160[] sqrtPriceX96AfterList, uint32[] initializedTicksCrossedList, uint256 gasEstimate)
```

Returns the amount in required for a given exact output swap without executing the swap

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| path | bytes | The path of the swap, i.e. each token pair and the pool fee. Path must be provided in reverse order |
| amountOut | uint256 | The amount of the last token to receive |

#### Return Values

| Name | Type | Description |
| ---- | ---- | ----------- |
| amountIn | uint256 | The amount of first token required to be paid |
| sqrtPriceX96AfterList | uint160[] | List of the sqrt price after the swap for each pool in the path |
| initializedTicksCrossedList | uint32[] | List of the initialized ticks that the swap crossed for each pool in the path |
| gasEstimate | uint256 | The estimate of the gas that the swap consumes |

