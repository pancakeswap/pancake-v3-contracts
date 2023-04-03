# Solidity API

## ISwapRouter

Functions for swapping tokens via PancakeSwap V3

### ExactInputSingleParams

```solidity
struct ExactInputSingleParams {
  address tokenIn;
  address tokenOut;
  uint24 fee;
  address recipient;
  uint256 deadline;
  uint256 amountIn;
  uint256 amountOutMinimum;
  uint160 sqrtPriceLimitX96;
}
```

### exactInputSingle

```solidity
function exactInputSingle(struct ISwapRouter.ExactInputSingleParams params) external payable returns (uint256 amountOut)
```

Swaps `amountIn` of one token for as much as possible of another token

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| params | struct ISwapRouter.ExactInputSingleParams | The parameters necessary for the swap, encoded as `ExactInputSingleParams` in calldata |

#### Return Values

| Name | Type | Description |
| ---- | ---- | ----------- |
| amountOut | uint256 | The amount of the received token |

### ExactInputParams

```solidity
struct ExactInputParams {
  bytes path;
  address recipient;
  uint256 deadline;
  uint256 amountIn;
  uint256 amountOutMinimum;
}
```

### exactInput

```solidity
function exactInput(struct ISwapRouter.ExactInputParams params) external payable returns (uint256 amountOut)
```

Swaps `amountIn` of one token for as much as possible of another along the specified path

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| params | struct ISwapRouter.ExactInputParams | The parameters necessary for the multi-hop swap, encoded as `ExactInputParams` in calldata |

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
  uint256 deadline;
  uint256 amountOut;
  uint256 amountInMaximum;
  uint160 sqrtPriceLimitX96;
}
```

### exactOutputSingle

```solidity
function exactOutputSingle(struct ISwapRouter.ExactOutputSingleParams params) external payable returns (uint256 amountIn)
```

Swaps as little as possible of one token for `amountOut` of another token

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| params | struct ISwapRouter.ExactOutputSingleParams | The parameters necessary for the swap, encoded as `ExactOutputSingleParams` in calldata |

#### Return Values

| Name | Type | Description |
| ---- | ---- | ----------- |
| amountIn | uint256 | The amount of the input token |

### ExactOutputParams

```solidity
struct ExactOutputParams {
  bytes path;
  address recipient;
  uint256 deadline;
  uint256 amountOut;
  uint256 amountInMaximum;
}
```

### exactOutput

```solidity
function exactOutput(struct ISwapRouter.ExactOutputParams params) external payable returns (uint256 amountIn)
```

Swaps as little as possible of one token for `amountOut` of another along the specified path (reversed)

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| params | struct ISwapRouter.ExactOutputParams | The parameters necessary for the multi-hop swap, encoded as `ExactOutputParams` in calldata |

#### Return Values

| Name | Type | Description |
| ---- | ---- | ----------- |
| amountIn | uint256 | The amount of the input token |

