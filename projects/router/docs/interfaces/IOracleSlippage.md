# Solidity API

## IOracleSlippage

Enables slippage checks against oracle prices

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

