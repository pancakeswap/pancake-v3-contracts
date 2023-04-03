# Solidity API

## OracleEchidnaTest

### constructor

```solidity
constructor() public
```

### initialize

```solidity
function initialize(uint32 time, int24 tick, uint128 liquidity) external
```

### advanceTime

```solidity
function advanceTime(uint32 by) public
```

### update

```solidity
function update(uint32 advanceTimeBy, int24 tick, uint128 liquidity) external
```

### grow

```solidity
function grow(uint16 cardinality) external
```

### echidna_indexAlwaysLtCardinality

```solidity
function echidna_indexAlwaysLtCardinality() external view returns (bool)
```

### echidna_AlwaysInitialized

```solidity
function echidna_AlwaysInitialized() external view returns (bool)
```

### echidna_cardinalityAlwaysLteNext

```solidity
function echidna_cardinalityAlwaysLteNext() external view returns (bool)
```

### echidna_canAlwaysObserve0IfInitialized

```solidity
function echidna_canAlwaysObserve0IfInitialized() external view returns (bool)
```

### checkTwoAdjacentObservationsTickCumulativeModTimeElapsedAlways0

```solidity
function checkTwoAdjacentObservationsTickCumulativeModTimeElapsedAlways0(uint16 index) external view
```

### checkTimeWeightedAveragesAlwaysFitsType

```solidity
function checkTimeWeightedAveragesAlwaysFitsType(uint32 secondsAgo) external view
```

