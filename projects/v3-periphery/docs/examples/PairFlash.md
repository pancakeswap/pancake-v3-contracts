# Solidity API

## PairFlash

An example contract using the PancakeSwap V3 flash function

### swapRouter

```solidity
contract ISwapRouter swapRouter
```

### constructor

```solidity
constructor(contract ISwapRouter _swapRouter, address _deployer, address _factory, address _WETH9) public
```

### FlashCallbackData

```solidity
struct FlashCallbackData {
  uint256 amount0;
  uint256 amount1;
  address payer;
  struct PoolAddress.PoolKey poolKey;
  uint24 poolFee2;
  uint24 poolFee3;
}
```

### pancakeV3FlashCallback

```solidity
function pancakeV3FlashCallback(uint256 fee0, uint256 fee1, bytes data) external
```

implements the callback called from flash

_fails if the flash is not profitable, meaning the amountOut from the flash is less than the amount borrowed_

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| fee0 | uint256 | The fee from calling flash for token0 |
| fee1 | uint256 | The fee from calling flash for token1 |
| data | bytes | The data needed in the callback passed as FlashCallbackData from `initFlash` |

### FlashParams

```solidity
struct FlashParams {
  address token0;
  address token1;
  uint24 fee1;
  uint256 amount0;
  uint256 amount1;
  uint24 fee2;
  uint24 fee3;
}
```

### initFlash

```solidity
function initFlash(struct PairFlash.FlashParams params) external
```

Calls the pools flash function with data needed in `PancakeV3FlashCallback`

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| params | struct PairFlash.FlashParams | The parameters necessary for flash and the callback, passed in as FlashParams |

