# Solidity API

## OracleSlippage

### getBlockStartingAndCurrentTick

```solidity
function getBlockStartingAndCurrentTick(contract IPancakeV3Pool pool) internal view returns (int24 blockStartingTick, int24 currentTick)
```

_Returns the tick as of the beginning of the current block, and as of right now, for the given pool._

### getPoolAddress

```solidity
function getPoolAddress(address tokenA, address tokenB, uint24 fee) internal view virtual returns (contract IPancakeV3Pool pool)
```

_Virtual function to get pool addresses that can be overridden in tests._

### getSyntheticTicks

```solidity
function getSyntheticTicks(bytes path, uint32 secondsAgo) internal view returns (int256 syntheticAverageTick, int256 syntheticCurrentTick)
```

_Returns the synthetic time-weighted average tick as of secondsAgo, as well as the current tick,
for the given path. Returned synthetic ticks always represent tokenOut/tokenIn prices,
meaning lower ticks are worse._

### getSyntheticTicks

```solidity
function getSyntheticTicks(bytes[] paths, uint128[] amounts, uint32 secondsAgo) internal view returns (int256 averageSyntheticAverageTick, int256 averageSyntheticCurrentTick)
```

_For each passed path, fetches the synthetic time-weighted average tick as of secondsAgo,
as well as the current tick. Then, synthetic ticks from all paths are subjected to a weighted
average, where the weights are the fraction of the total input amount allocated to each path.
Returned synthetic ticks always represent tokenOut/tokenIn prices, meaning lower ticks are worse.
Paths must all start and end in the same token._

### checkOracleSlippage

```solidity
function checkOracleSlippage(bytes path, uint24 maximumTickDivergence, uint32 secondsAgo) external view
```

Ensures that the current (synthetic) tick over the path is no worse than
`maximumTickDivergence` ticks away from the average as of `secondsAgo`

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| path | bytes | The path to fetch prices over |
| maximumTickDivergence | uint24 | The maximum number of ticks that the price can degrade by |
| secondsAgo | uint32 | The number of seconds ago to compute oracle prices against |

### checkOracleSlippage

```solidity
function checkOracleSlippage(bytes[] paths, uint128[] amounts, uint24 maximumTickDivergence, uint32 secondsAgo) external view
```

Ensures that the weighted average current (synthetic) tick over the path is no
worse than `maximumTickDivergence` ticks away from the average as of `secondsAgo`

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| paths | bytes[] | The paths to fetch prices over |
| amounts | uint128[] | The weights for each entry in `paths` |
| maximumTickDivergence | uint24 | The maximum number of ticks that the price can degrade by |
| secondsAgo | uint32 | The number of seconds ago to compute oracle prices against |

