# Solidity API

## MockObservations

### oracleObservations

```solidity
struct Oracle.Observation[4] oracleObservations
```

### slot0Tick

```solidity
int24 slot0Tick
```

### slot0ObservationCardinality

```solidity
uint16 slot0ObservationCardinality
```

### slot0ObservationIndex

```solidity
uint16 slot0ObservationIndex
```

### liquidity

```solidity
uint128 liquidity
```

### lastObservationCurrentTimestamp

```solidity
bool lastObservationCurrentTimestamp
```

### constructor

```solidity
constructor(uint32[4] _blockTimestamps, int56[4] _tickCumulatives, uint128[4] _secondsPerLiquidityCumulativeX128s, bool[4] _initializeds, int24 _tick, uint16 _observationCardinality, uint16 _observationIndex, bool _lastObservationCurrentTimestamp, uint128 _liquidity) public
```

### slot0

```solidity
function slot0() external view returns (uint160, int24, uint16, uint16, uint16, uint8, bool)
```

### observations

```solidity
function observations(uint256 index) external view returns (uint32, int56, uint160, bool)
```

