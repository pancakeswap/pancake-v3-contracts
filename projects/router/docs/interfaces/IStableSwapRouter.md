# Solidity API

## IStableSwapRouter

Functions for swapping tokens via Pancake Stable Swap

### exactInputStableSwap

```solidity
function exactInputStableSwap(address[] path, uint256[] flag, uint256 amountIn, uint256 amountOutMin, address to) external payable returns (uint256 amountOut)
```

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| path | address[] |  |
| flag | uint256[] | token amount in a stable swap pool. 2 for 2pool, 3 for 3pool |
| amountIn | uint256 |  |
| amountOutMin | uint256 |  |
| to | address |  |

### exactOutputStableSwap

```solidity
function exactOutputStableSwap(address[] path, uint256[] flag, uint256 amountOut, uint256 amountInMax, address to) external payable returns (uint256 amountIn)
```

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| path | address[] |  |
| flag | uint256[] | token amount in a stable swap pool. 2 for 2pool, 3 for 3pool |
| amountOut | uint256 |  |
| amountInMax | uint256 |  |
| to | address |  |

