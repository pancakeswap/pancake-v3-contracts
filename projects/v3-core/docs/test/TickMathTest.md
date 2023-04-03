# Solidity API

## TickMathTest

### getSqrtRatioAtTick

```solidity
function getSqrtRatioAtTick(int24 tick) external pure returns (uint160)
```

### getGasCostOfGetSqrtRatioAtTick

```solidity
function getGasCostOfGetSqrtRatioAtTick(int24 tick) external view returns (uint256)
```

### getTickAtSqrtRatio

```solidity
function getTickAtSqrtRatio(uint160 sqrtPriceX96) external pure returns (int24)
```

### getGasCostOfGetTickAtSqrtRatio

```solidity
function getGasCostOfGetTickAtSqrtRatio(uint160 sqrtPriceX96) external view returns (uint256)
```

### MIN_SQRT_RATIO

```solidity
function MIN_SQRT_RATIO() external pure returns (uint160)
```

### MAX_SQRT_RATIO

```solidity
function MAX_SQRT_RATIO() external pure returns (uint160)
```

