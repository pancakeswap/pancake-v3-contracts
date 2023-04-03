# Solidity API

## OracleTest

### observations

```solidity
struct Oracle.Observation[65535] observations
```

### time

```solidity
uint32 time
```

### tick

```solidity
int24 tick
```

### liquidity

```solidity
uint128 liquidity
```

### index

```solidity
uint16 index
```

### cardinality

```solidity
uint16 cardinality
```

### cardinalityNext

```solidity
uint16 cardinalityNext
```

### InitializeParams

```solidity
struct InitializeParams {
  uint32 time;
  int24 tick;
  uint128 liquidity;
}
```

### initialize

```solidity
function initialize(struct OracleTest.InitializeParams params) external
```

### advanceTime

```solidity
function advanceTime(uint32 by) public
```

### UpdateParams

```solidity
struct UpdateParams {
  uint32 advanceTimeBy;
  int24 tick;
  uint128 liquidity;
}
```

### update

```solidity
function update(struct OracleTest.UpdateParams params) external
```

### batchUpdate

```solidity
function batchUpdate(struct OracleTest.UpdateParams[] params) external
```

### grow

```solidity
function grow(uint16 _cardinalityNext) external
```

### observe

```solidity
function observe(uint32[] secondsAgos) external view returns (int56[] tickCumulatives, uint160[] secondsPerLiquidityCumulativeX128s)
```

### getGasCostOfObserve

```solidity
function getGasCostOfObserve(uint32[] secondsAgos) external view returns (uint256)
```

