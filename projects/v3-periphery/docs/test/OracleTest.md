# Solidity API

## OracleTest

### consult

```solidity
function consult(address pool, uint32 secondsAgo) public view returns (int24 arithmeticMeanTick, uint128 harmonicMeanLiquidity)
```

### getQuoteAtTick

```solidity
function getQuoteAtTick(int24 tick, uint128 baseAmount, address baseToken, address quoteToken) public pure returns (uint256 quoteAmount)
```

### getGasCostOfConsult

```solidity
function getGasCostOfConsult(address pool, uint32 period) public view returns (uint256)
```

### getGasCostOfGetQuoteAtTick

```solidity
function getGasCostOfGetQuoteAtTick(int24 tick, uint128 baseAmount, address baseToken, address quoteToken) public view returns (uint256)
```

### getOldestObservationSecondsAgo

```solidity
function getOldestObservationSecondsAgo(address pool) public view returns (uint32 secondsAgo, uint32 currentTimestamp)
```

### getBlockStartingTickAndLiquidity

```solidity
function getBlockStartingTickAndLiquidity(address pool) public view returns (int24, uint128)
```

### getWeightedArithmeticMeanTick

```solidity
function getWeightedArithmeticMeanTick(struct OracleLibrary.WeightedTickData[] observations) public pure returns (int24 arithmeticMeanWeightedTick)
```

### getChainedPrice

```solidity
function getChainedPrice(address[] tokens, int24[] ticks) public view returns (int256 syntheticTick)
```

