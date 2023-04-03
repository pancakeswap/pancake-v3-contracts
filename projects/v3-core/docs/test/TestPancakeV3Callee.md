# Solidity API

## TestPancakeV3Callee

### swapExact0For1

```solidity
function swapExact0For1(address pool, uint256 amount0In, address recipient, uint160 sqrtPriceLimitX96) external
```

### swap0ForExact1

```solidity
function swap0ForExact1(address pool, uint256 amount1Out, address recipient, uint160 sqrtPriceLimitX96) external
```

### swapExact1For0

```solidity
function swapExact1For0(address pool, uint256 amount1In, address recipient, uint160 sqrtPriceLimitX96) external
```

### swap1ForExact0

```solidity
function swap1ForExact0(address pool, uint256 amount0Out, address recipient, uint160 sqrtPriceLimitX96) external
```

### swapToLowerSqrtPrice

```solidity
function swapToLowerSqrtPrice(address pool, uint160 sqrtPriceX96, address recipient) external
```

### swapToHigherSqrtPrice

```solidity
function swapToHigherSqrtPrice(address pool, uint160 sqrtPriceX96, address recipient) external
```

### SwapCallback

```solidity
event SwapCallback(int256 amount0Delta, int256 amount1Delta)
```

### pancakeV3SwapCallback

```solidity
function pancakeV3SwapCallback(int256 amount0Delta, int256 amount1Delta, bytes data) external
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
| data | bytes | Any data passed through by the caller via the IPancakeV3PoolActions#swap call |

### mint

```solidity
function mint(address pool, address recipient, int24 tickLower, int24 tickUpper, uint128 amount) external
```

### MintCallback

```solidity
event MintCallback(uint256 amount0Owed, uint256 amount1Owed)
```

### pancakeV3MintCallback

```solidity
function pancakeV3MintCallback(uint256 amount0Owed, uint256 amount1Owed, bytes data) external
```

Called to `msg.sender` after minting liquidity to a position from IPancakeV3Pool#mint.

_In the implementation you must pay the pool tokens owed for the minted liquidity.
The caller of this method must be checked to be a PancakeV3Pool deployed by the canonical PancakeV3Factory._

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| amount0Owed | uint256 | The amount of token0 due to the pool for the minted liquidity |
| amount1Owed | uint256 | The amount of token1 due to the pool for the minted liquidity |
| data | bytes | Any data passed through by the caller via the IPancakeV3PoolActions#mint call |

### FlashCallback

```solidity
event FlashCallback(uint256 fee0, uint256 fee1)
```

### flash

```solidity
function flash(address pool, address recipient, uint256 amount0, uint256 amount1, uint256 pay0, uint256 pay1) external
```

### pancakeV3FlashCallback

```solidity
function pancakeV3FlashCallback(uint256 fee0, uint256 fee1, bytes data) external
```

Called to `msg.sender` after transferring to the recipient from IPancakeV3Pool#flash.

_In the implementation you must repay the pool the tokens sent by flash plus the computed fee amounts.
The caller of this method must be checked to be a PancakeV3Pool deployed by the canonical PancakeV3Factory._

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| fee0 | uint256 | The fee amount in token0 due to the pool by the end of the flash |
| fee1 | uint256 | The fee amount in token1 due to the pool by the end of the flash |
| data | bytes | Any data passed through by the caller via the IPancakeV3PoolActions#flash call |

