# Solidity API

## Tick

Contains functions for managing tick processes and relevant calculations

### Info

```solidity
struct Info {
  uint128 liquidityGross;
  int128 liquidityNet;
  uint256 feeGrowthOutside0X128;
  uint256 feeGrowthOutside1X128;
  int56 tickCumulativeOutside;
  uint160 secondsPerLiquidityOutsideX128;
  uint32 secondsOutside;
  bool initialized;
}
```

### tickSpacingToMaxLiquidityPerTick

```solidity
function tickSpacingToMaxLiquidityPerTick(int24 tickSpacing) internal pure returns (uint128)
```

Derives max liquidity per tick from given tick spacing

_Executed within the pool constructor_

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| tickSpacing | int24 | The amount of required tick separation, realized in multiples of `tickSpacing`     e.g., a tickSpacing of 3 requires ticks to be initialized every 3rd tick i.e., ..., -6, -3, 0, 3, 6, ... |

#### Return Values

| Name | Type | Description |
| ---- | ---- | ----------- |
| [0] | uint128 | The max liquidity per tick |

### getFeeGrowthInside

```solidity
function getFeeGrowthInside(mapping(int24 => struct Tick.Info) self, int24 tickLower, int24 tickUpper, int24 tickCurrent, uint256 feeGrowthGlobal0X128, uint256 feeGrowthGlobal1X128) internal view returns (uint256 feeGrowthInside0X128, uint256 feeGrowthInside1X128)
```

Retrieves fee growth data

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| self | mapping(int24 &#x3D;&gt; struct Tick.Info) | The mapping containing all tick information for initialized ticks |
| tickLower | int24 | The lower tick boundary of the position |
| tickUpper | int24 | The upper tick boundary of the position |
| tickCurrent | int24 | The current tick |
| feeGrowthGlobal0X128 | uint256 | The all-time global fee growth, per unit of liquidity, in token0 |
| feeGrowthGlobal1X128 | uint256 | The all-time global fee growth, per unit of liquidity, in token1 |

#### Return Values

| Name | Type | Description |
| ---- | ---- | ----------- |
| feeGrowthInside0X128 | uint256 | The all-time fee growth in token0, per unit of liquidity, inside the position's tick boundaries |
| feeGrowthInside1X128 | uint256 | The all-time fee growth in token1, per unit of liquidity, inside the position's tick boundaries |

### update

```solidity
function update(mapping(int24 => struct Tick.Info) self, int24 tick, int24 tickCurrent, int128 liquidityDelta, uint256 feeGrowthGlobal0X128, uint256 feeGrowthGlobal1X128, uint160 secondsPerLiquidityCumulativeX128, int56 tickCumulative, uint32 time, bool upper, uint128 maxLiquidity) internal returns (bool flipped)
```

Updates a tick and returns true if the tick was flipped from initialized to uninitialized, or vice versa

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| self | mapping(int24 &#x3D;&gt; struct Tick.Info) | The mapping containing all tick information for initialized ticks |
| tick | int24 | The tick that will be updated |
| tickCurrent | int24 | The current tick |
| liquidityDelta | int128 | A new amount of liquidity to be added (subtracted) when tick is crossed from left to right (right to left) |
| feeGrowthGlobal0X128 | uint256 | The all-time global fee growth, per unit of liquidity, in token0 |
| feeGrowthGlobal1X128 | uint256 | The all-time global fee growth, per unit of liquidity, in token1 |
| secondsPerLiquidityCumulativeX128 | uint160 | The all-time seconds per max(1, liquidity) of the pool |
| tickCumulative | int56 | The tick * time elapsed since the pool was first initialized |
| time | uint32 | The current block timestamp cast to a uint32 |
| upper | bool | true for updating a position's upper tick, or false for updating a position's lower tick |
| maxLiquidity | uint128 | The maximum liquidity allocation for a single tick |

#### Return Values

| Name | Type | Description |
| ---- | ---- | ----------- |
| flipped | bool | Whether the tick was flipped from initialized to uninitialized, or vice versa |

### clear

```solidity
function clear(mapping(int24 => struct Tick.Info) self, int24 tick) internal
```

Clears tick data

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| self | mapping(int24 &#x3D;&gt; struct Tick.Info) | The mapping containing all initialized tick information for initialized ticks |
| tick | int24 | The tick that will be cleared |

### cross

```solidity
function cross(mapping(int24 => struct Tick.Info) self, int24 tick, uint256 feeGrowthGlobal0X128, uint256 feeGrowthGlobal1X128, uint160 secondsPerLiquidityCumulativeX128, int56 tickCumulative, uint32 time) internal returns (int128 liquidityNet)
```

Transitions to next tick as needed by price movement

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| self | mapping(int24 &#x3D;&gt; struct Tick.Info) | The mapping containing all tick information for initialized ticks |
| tick | int24 | The destination tick of the transition |
| feeGrowthGlobal0X128 | uint256 | The all-time global fee growth, per unit of liquidity, in token0 |
| feeGrowthGlobal1X128 | uint256 | The all-time global fee growth, per unit of liquidity, in token1 |
| secondsPerLiquidityCumulativeX128 | uint160 | The current seconds per liquidity |
| tickCumulative | int56 | The tick * time elapsed since the pool was first initialized |
| time | uint32 | The current block.timestamp |

#### Return Values

| Name | Type | Description |
| ---- | ---- | ----------- |
| liquidityNet | int128 | The amount of liquidity added (subtracted) when tick is crossed from left to right (right to left) |

