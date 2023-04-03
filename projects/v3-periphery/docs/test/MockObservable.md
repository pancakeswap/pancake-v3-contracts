# Solidity API

## MockObservable

### Observation

```solidity
struct Observation {
  uint32 secondsAgo;
  int56 tickCumulatives;
  uint160 secondsPerLiquidityCumulativeX128s;
}
```

### constructor

```solidity
constructor(uint32[] secondsAgos, int56[] tickCumulatives, uint160[] secondsPerLiquidityCumulativeX128s) public
```

### observe

```solidity
function observe(uint32[] secondsAgos) external view returns (int56[] tickCumulatives, uint160[] secondsPerLiquidityCumulativeX128s)
```

