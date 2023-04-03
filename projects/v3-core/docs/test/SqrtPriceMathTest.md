# Solidity API

## SqrtPriceMathTest

### getNextSqrtPriceFromInput

```solidity
function getNextSqrtPriceFromInput(uint160 sqrtP, uint128 liquidity, uint256 amountIn, bool zeroForOne) external pure returns (uint160 sqrtQ)
```

### getGasCostOfGetNextSqrtPriceFromInput

```solidity
function getGasCostOfGetNextSqrtPriceFromInput(uint160 sqrtP, uint128 liquidity, uint256 amountIn, bool zeroForOne) external view returns (uint256)
```

### getNextSqrtPriceFromOutput

```solidity
function getNextSqrtPriceFromOutput(uint160 sqrtP, uint128 liquidity, uint256 amountOut, bool zeroForOne) external pure returns (uint160 sqrtQ)
```

### getGasCostOfGetNextSqrtPriceFromOutput

```solidity
function getGasCostOfGetNextSqrtPriceFromOutput(uint160 sqrtP, uint128 liquidity, uint256 amountOut, bool zeroForOne) external view returns (uint256)
```

### getAmount0Delta

```solidity
function getAmount0Delta(uint160 sqrtLower, uint160 sqrtUpper, uint128 liquidity, bool roundUp) external pure returns (uint256 amount0)
```

### getAmount1Delta

```solidity
function getAmount1Delta(uint160 sqrtLower, uint160 sqrtUpper, uint128 liquidity, bool roundUp) external pure returns (uint256 amount1)
```

### getGasCostOfGetAmount0Delta

```solidity
function getGasCostOfGetAmount0Delta(uint160 sqrtLower, uint160 sqrtUpper, uint128 liquidity, bool roundUp) external view returns (uint256)
```

### getGasCostOfGetAmount1Delta

```solidity
function getGasCostOfGetAmount1Delta(uint160 sqrtLower, uint160 sqrtUpper, uint128 liquidity, bool roundUp) external view returns (uint256)
```

