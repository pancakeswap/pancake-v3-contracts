# Solidity API

## TickMath

Computes sqrt price for ticks of size 1.0001, i.e. sqrt(1.0001^tick) as fixed point Q64.96 numbers. Supports
prices between 2**-128 and 2**128

### MIN_TICK

```solidity
int24 MIN_TICK
```

_The minimum tick that may be passed to #getSqrtRatioAtTick computed from log base 1.0001 of 2**-128_

### MAX_TICK

```solidity
int24 MAX_TICK
```

_The maximum tick that may be passed to #getSqrtRatioAtTick computed from log base 1.0001 of 2**128_

### MIN_SQRT_RATIO

```solidity
uint160 MIN_SQRT_RATIO
```

_The minimum value that can be returned from #getSqrtRatioAtTick. Equivalent to getSqrtRatioAtTick(MIN_TICK)_

### MAX_SQRT_RATIO

```solidity
uint160 MAX_SQRT_RATIO
```

_The maximum value that can be returned from #getSqrtRatioAtTick. Equivalent to getSqrtRatioAtTick(MAX_TICK)_

### getSqrtRatioAtTick

```solidity
function getSqrtRatioAtTick(int24 tick) internal pure returns (uint160 sqrtPriceX96)
```

Calculates sqrt(1.0001^tick) * 2^96

_Throws if |tick| > max tick_

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| tick | int24 | The input tick for the above formula |

#### Return Values

| Name | Type | Description |
| ---- | ---- | ----------- |
| sqrtPriceX96 | uint160 | A Fixed point Q64.96 number representing the sqrt of the ratio of the two assets (token1/token0) at the given tick |

### getTickAtSqrtRatio

```solidity
function getTickAtSqrtRatio(uint160 sqrtPriceX96) internal pure returns (int24 tick)
```

Calculates the greatest tick value such that getRatioAtTick(tick) <= ratio

_Throws in case sqrtPriceX96 < MIN_SQRT_RATIO, as MIN_SQRT_RATIO is the lowest value getRatioAtTick may
ever return._

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| sqrtPriceX96 | uint160 | The sqrt ratio for which to compute the tick as a Q64.96 |

#### Return Values

| Name | Type | Description |
| ---- | ---- | ----------- |
| tick | int24 | The greatest tick for which the ratio is less than or equal to the input ratio |

