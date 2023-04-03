# Solidity API

## OracleLibrary

Provides functions to integrate with V3 pool oracle

### consult

```solidity
function consult(address pool, uint32 secondsAgo) internal view returns (int24 arithmeticMeanTick, uint128 harmonicMeanLiquidity)
```

Calculates time-weighted means of tick and liquidity for a given PancakeSwap V3 pool

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| pool | address | Address of the pool that we want to observe |
| secondsAgo | uint32 | Number of seconds in the past from which to calculate the time-weighted means |

#### Return Values

| Name | Type | Description |
| ---- | ---- | ----------- |
| arithmeticMeanTick | int24 | The arithmetic mean tick from (block.timestamp - secondsAgo) to block.timestamp |
| harmonicMeanLiquidity | uint128 | The harmonic mean liquidity from (block.timestamp - secondsAgo) to block.timestamp |

### getQuoteAtTick

```solidity
function getQuoteAtTick(int24 tick, uint128 baseAmount, address baseToken, address quoteToken) internal pure returns (uint256 quoteAmount)
```

Given a tick and a token amount, calculates the amount of token received in exchange

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| tick | int24 | Tick value used to calculate the quote |
| baseAmount | uint128 | Amount of token to be converted |
| baseToken | address | Address of an ERC20 token contract used as the baseAmount denomination |
| quoteToken | address | Address of an ERC20 token contract used as the quoteAmount denomination |

#### Return Values

| Name | Type | Description |
| ---- | ---- | ----------- |
| quoteAmount | uint256 | Amount of quoteToken received for baseAmount of baseToken |

### getOldestObservationSecondsAgo

```solidity
function getOldestObservationSecondsAgo(address pool) internal view returns (uint32 secondsAgo)
```

Given a pool, it returns the number of seconds ago of the oldest stored observation

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| pool | address | Address of PancakeSwap V3 pool that we want to observe |

#### Return Values

| Name | Type | Description |
| ---- | ---- | ----------- |
| secondsAgo | uint32 | The number of seconds ago of the oldest observation stored for the pool |

### getBlockStartingTickAndLiquidity

```solidity
function getBlockStartingTickAndLiquidity(address pool) internal view returns (int24, uint128)
```

Given a pool, it returns the tick value as of the start of the current block

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| pool | address | Address of PancakeSwap V3 pool |

#### Return Values

| Name | Type | Description |
| ---- | ---- | ----------- |
| [0] | int24 | The tick that the pool was in at the start of the current block |
| [1] | uint128 |  |

### WeightedTickData

```solidity
struct WeightedTickData {
  int24 tick;
  uint128 weight;
}
```

### getWeightedArithmeticMeanTick

```solidity
function getWeightedArithmeticMeanTick(struct OracleLibrary.WeightedTickData[] weightedTickData) internal pure returns (int24 weightedArithmeticMeanTick)
```

Given an array of ticks and weights, calculates the weighted arithmetic mean tick

_Each entry of `weightedTickData` should represents ticks from pools with the same underlying pool tokens. If they do not,
extreme care must be taken to ensure that ticks are comparable (including decimal differences).
Note that the weighted arithmetic mean tick corresponds to the weighted geometric mean price._

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| weightedTickData | struct OracleLibrary.WeightedTickData[] | An array of ticks and weights |

#### Return Values

| Name | Type | Description |
| ---- | ---- | ----------- |
| weightedArithmeticMeanTick | int24 | The weighted arithmetic mean tick |

### getChainedPrice

```solidity
function getChainedPrice(address[] tokens, int24[] ticks) internal pure returns (int256 syntheticTick)
```

Returns the "synthetic" tick which represents the price of the first entry in `tokens` in terms of the last

_Useful for calculating relative prices along routes.
There must be one tick for each pairwise set of tokens._

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| tokens | address[] | The token contract addresses |
| ticks | int24[] | The ticks, representing the price of each token pair in `tokens` |

#### Return Values

| Name | Type | Description |
| ---- | ---- | ----------- |
| syntheticTick | int256 | The synthetic tick, representing the relative price of the outermost tokens in `tokens` |

