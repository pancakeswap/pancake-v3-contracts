# Solidity API

## SqrtPriceMathPartial

Exposes two functions from @pancakeswap/v3-core SqrtPriceMath
that use square root of price as a Q64.96 and liquidity to compute deltas

### getAmount0Delta

```solidity
function getAmount0Delta(uint160 sqrtRatioAX96, uint160 sqrtRatioBX96, uint128 liquidity, bool roundUp) internal pure returns (uint256 amount0)
```

Gets the amount0 delta between two prices

_Calculates liquidity / sqrt(lower) - liquidity / sqrt(upper),
i.e. liquidity * (sqrt(upper) - sqrt(lower)) / (sqrt(upper) * sqrt(lower))_

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| sqrtRatioAX96 | uint160 | A sqrt price |
| sqrtRatioBX96 | uint160 | Another sqrt price |
| liquidity | uint128 | The amount of usable liquidity |
| roundUp | bool | Whether to round the amount up or down |

#### Return Values

| Name | Type | Description |
| ---- | ---- | ----------- |
| amount0 | uint256 | Amount of token0 required to cover a position of size liquidity between the two passed prices |

### getAmount1Delta

```solidity
function getAmount1Delta(uint160 sqrtRatioAX96, uint160 sqrtRatioBX96, uint128 liquidity, bool roundUp) internal pure returns (uint256 amount1)
```

Gets the amount1 delta between two prices

_Calculates liquidity * (sqrt(upper) - sqrt(lower))_

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| sqrtRatioAX96 | uint160 | A sqrt price |
| sqrtRatioBX96 | uint160 | Another sqrt price |
| liquidity | uint128 | The amount of usable liquidity |
| roundUp | bool | Whether to round the amount up, or down |

#### Return Values

| Name | Type | Description |
| ---- | ---- | ----------- |
| amount1 | uint256 | Amount of token1 required to cover a position of size liquidity between the two passed prices |

