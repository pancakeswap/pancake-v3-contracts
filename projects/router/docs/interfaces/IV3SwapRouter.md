# Solidity API

## IV3SwapRouter

Functions for swapping tokens via PancakeSwap V3

### ExactInputSingleParams

```solidity
struct ExactInputSingleParams {
  address tokenIn;
  address tokenOut;
  uint24 fee;
  address recipient;
  uint256 amountIn;
  uint256 amountOutMinimum;
  uint160 sqrtPriceLimitX96;
}
```

### exactInputSingle

```solidity
function exactInputSingle(struct IV3SwapRouter.ExactInputSingleParams params) external payable returns (uint256 amountOut)
```

Swaps `amountIn` of one token for as much as possible of another token

_Setting `amountIn` to 0 will cause the contract to look up its own balance,
and swap the entire amount, enabling contracts to send tokens before calling this function._

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| params | struct IV3SwapRouter.ExactInputSingleParams | The parameters necessary for the swap, encoded as `ExactInputSingleParams` in calldata |

#### Return Values

| Name | Type | Description |
| ---- | ---- | ----------- |
| amountOut | uint256 | The amount of the received token |

### ExactInputParams

```solidity
struct ExactInputParams {
  bytes path;
  address recipient;
  uint256 amountIn;
  uint256 amountOutMinimum;
}
```

### exactInput

```solidity
function exactInput(struct IV3SwapRouter.ExactInputParams params) external payable returns (uint256 amountOut)
```

Swaps `amountIn` of one token for as much as possible of another along the specified path

_Setting `amountIn` to 0 will cause the contract to look up its own balance,
and swap the entire amount, enabling contracts to send tokens before calling this function._

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| params | struct IV3SwapRouter.ExactInputParams | The parameters necessary for the multi-hop swap, encoded as `ExactInputParams` in calldata |

#### Return Values

| Name | Type | Description |
| ---- | ---- | ----------- |
| amountOut | uint256 | The amount of the received token |

### ExactOutputSingleParams

```solidity
struct ExactOutputSingleParams {
  address tokenIn;
  address tokenOut;
  uint24 fee;
  address recipient;
  uint256 amountOut;
  uint256 amountInMaximum;
  uint160 sqrtPriceLimitX96;
}
```

### exactOutputSingle

```solidity
function exactOutputSingle(struct IV3SwapRouter.ExactOutputSingleParams params) external payable returns (uint256 amountIn)
```

Swaps as little as possible of one token for `amountOut` of another token
that may remain in the router after the swap.

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| params | struct IV3SwapRouter.ExactOutputSingleParams | The parameters necessary for the swap, encoded as `ExactOutputSingleParams` in calldata |

#### Return Values

| Name | Type | Description |
| ---- | ---- | ----------- |
| amountIn | uint256 | The amount of the input token |

### ExactOutputParams

```solidity
struct ExactOutputParams {
  bytes path;
  address recipient;
  uint256 amountOut;
  uint256 amountInMaximum;
}
```

### exactOutput

```solidity
function exactOutput(struct IV3SwapRouter.ExactOutputParams params) external payable returns (uint256 amountIn)
```

Swaps as little as possible of one token for `amountOut` of another along the specified path (reversed)
that may remain in the router after the swap.

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| params | struct IV3SwapRouter.ExactOutputParams | The parameters necessary for the multi-hop swap, encoded as `ExactOutputParams` in calldata |

#### Return Values

| Name | Type | Description |
| ---- | ---- | ----------- |
| amountIn | uint256 | The amount of the input token |

