# Solidity API

## SwapMathTest

### computeSwapStep

```solidity
function computeSwapStep(uint160 sqrtP, uint160 sqrtPTarget, uint128 liquidity, int256 amountRemaining, uint24 feePips) external pure returns (uint160 sqrtQ, uint256 amountIn, uint256 amountOut, uint256 feeAmount)
```

### getGasCostOfComputeSwapStep

```solidity
function getGasCostOfComputeSwapStep(uint160 sqrtP, uint160 sqrtPTarget, uint128 liquidity, int256 amountRemaining, uint24 feePips) external view returns (uint256)
```

