# Solidity API

## TickTest

### ticks

```solidity
mapping(int24 => struct Tick.Info) ticks
```

### tickSpacingToMaxLiquidityPerTick

```solidity
function tickSpacingToMaxLiquidityPerTick(int24 tickSpacing) external pure returns (uint128)
```

### setTick

```solidity
function setTick(int24 tick, struct Tick.Info info) external
```

### getFeeGrowthInside

```solidity
function getFeeGrowthInside(int24 tickLower, int24 tickUpper, int24 tickCurrent, uint256 feeGrowthGlobal0X128, uint256 feeGrowthGlobal1X128) external view returns (uint256 feeGrowthInside0X128, uint256 feeGrowthInside1X128)
```

### update

```solidity
function update(int24 tick, int24 tickCurrent, int128 liquidityDelta, uint256 feeGrowthGlobal0X128, uint256 feeGrowthGlobal1X128, uint160 secondsPerLiquidityCumulativeX128, int56 tickCumulative, uint32 time, bool upper, uint128 maxLiquidity) external returns (bool flipped)
```

### clear

```solidity
function clear(int24 tick) external
```

### cross

```solidity
function cross(int24 tick, uint256 feeGrowthGlobal0X128, uint256 feeGrowthGlobal1X128, uint160 secondsPerLiquidityCumulativeX128, int56 tickCumulative, uint32 time) external returns (int128 liquidityNet)
```

