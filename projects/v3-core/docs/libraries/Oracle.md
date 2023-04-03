# Solidity API

## Oracle

Provides price and liquidity data useful for a wide variety of system designs

_Instances of stored oracle data, "observations", are collected in the oracle array
Every pool is initialized with an oracle array length of 1. Anyone can pay the SSTOREs to increase the
maximum length of the oracle array. New slots will be added when the array is fully populated.
Observations are overwritten when the full length of the oracle array is populated.
The most recent observation is available, independent of the length of the oracle array, by passing 0 to observe()_

### Observation

```solidity
struct Observation {
  uint32 blockTimestamp;
  int56 tickCumulative;
  uint160 secondsPerLiquidityCumulativeX128;
  bool initialized;
}
```

### initialize

```solidity
function initialize(struct Oracle.Observation[65535] self, uint32 time) internal returns (uint16 cardinality, uint16 cardinalityNext)
```

Initialize the oracle array by writing the first slot. Called once for the lifecycle of the observations array

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| self | struct Oracle.Observation[65535] | The stored oracle array |
| time | uint32 | The time of the oracle initialization, via block.timestamp truncated to uint32 |

#### Return Values

| Name | Type | Description |
| ---- | ---- | ----------- |
| cardinality | uint16 | The number of populated elements in the oracle array |
| cardinalityNext | uint16 | The new length of the oracle array, independent of population |

### write

```solidity
function write(struct Oracle.Observation[65535] self, uint16 index, uint32 blockTimestamp, int24 tick, uint128 liquidity, uint16 cardinality, uint16 cardinalityNext) internal returns (uint16 indexUpdated, uint16 cardinalityUpdated)
```

Writes an oracle observation to the array

_Writable at most once per block. Index represents the most recently written element. cardinality and index must be tracked externally.
If the index is at the end of the allowable array length (according to cardinality), and the next cardinality
is greater than the current one, cardinality may be increased. This restriction is created to preserve ordering._

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| self | struct Oracle.Observation[65535] | The stored oracle array |
| index | uint16 | The index of the observation that was most recently written to the observations array |
| blockTimestamp | uint32 | The timestamp of the new observation |
| tick | int24 | The active tick at the time of the new observation |
| liquidity | uint128 | The total in-range liquidity at the time of the new observation |
| cardinality | uint16 | The number of populated elements in the oracle array |
| cardinalityNext | uint16 | The new length of the oracle array, independent of population |

#### Return Values

| Name | Type | Description |
| ---- | ---- | ----------- |
| indexUpdated | uint16 | The new index of the most recently written element in the oracle array |
| cardinalityUpdated | uint16 | The new cardinality of the oracle array |

### grow

```solidity
function grow(struct Oracle.Observation[65535] self, uint16 current, uint16 next) internal returns (uint16)
```

Prepares the oracle array to store up to `next` observations

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| self | struct Oracle.Observation[65535] | The stored oracle array |
| current | uint16 | The current next cardinality of the oracle array |
| next | uint16 | The proposed next cardinality which will be populated in the oracle array |

#### Return Values

| Name | Type | Description |
| ---- | ---- | ----------- |
| [0] | uint16 | next The next cardinality which will be populated in the oracle array |

### observeSingle

```solidity
function observeSingle(struct Oracle.Observation[65535] self, uint32 time, uint32 secondsAgo, int24 tick, uint16 index, uint128 liquidity, uint16 cardinality) internal view returns (int56 tickCumulative, uint160 secondsPerLiquidityCumulativeX128)
```

_Reverts if an observation at or before the desired observation timestamp does not exist.
0 may be passed as `secondsAgo' to return the current cumulative values.
If called with a timestamp falling between two observations, returns the counterfactual accumulator values
at exactly the timestamp between the two observations._

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| self | struct Oracle.Observation[65535] | The stored oracle array |
| time | uint32 | The current block timestamp |
| secondsAgo | uint32 | The amount of time to look back, in seconds, at which point to return an observation |
| tick | int24 | The current tick |
| index | uint16 | The index of the observation that was most recently written to the observations array |
| liquidity | uint128 | The current in-range pool liquidity |
| cardinality | uint16 | The number of populated elements in the oracle array |

#### Return Values

| Name | Type | Description |
| ---- | ---- | ----------- |
| tickCumulative | int56 | The tick * time elapsed since the pool was first initialized, as of `secondsAgo` |
| secondsPerLiquidityCumulativeX128 | uint160 | The time elapsed / max(1, liquidity) since the pool was first initialized, as of `secondsAgo` |

### observe

```solidity
function observe(struct Oracle.Observation[65535] self, uint32 time, uint32[] secondsAgos, int24 tick, uint16 index, uint128 liquidity, uint16 cardinality) internal view returns (int56[] tickCumulatives, uint160[] secondsPerLiquidityCumulativeX128s)
```

Returns the accumulator values as of each time seconds ago from the given time in the array of `secondsAgos`

_Reverts if `secondsAgos` > oldest observation_

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| self | struct Oracle.Observation[65535] | The stored oracle array |
| time | uint32 | The current block.timestamp |
| secondsAgos | uint32[] | Each amount of time to look back, in seconds, at which point to return an observation |
| tick | int24 | The current tick |
| index | uint16 | The index of the observation that was most recently written to the observations array |
| liquidity | uint128 | The current in-range pool liquidity |
| cardinality | uint16 | The number of populated elements in the oracle array |

#### Return Values

| Name | Type | Description |
| ---- | ---- | ----------- |
| tickCumulatives | int56[] | The tick * time elapsed since the pool was first initialized, as of each `secondsAgo` |
| secondsPerLiquidityCumulativeX128s | uint160[] | The cumulative seconds / max(1, liquidity) since the pool was first initialized, as of each `secondsAgo` |

