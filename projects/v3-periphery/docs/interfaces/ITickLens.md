# Solidity API

## ITickLens

Provides functions for fetching chunks of tick data for a pool

_This avoids the waterfall of fetching the tick bitmap, parsing the bitmap to know which ticks to fetch, and
then sending additional multicalls to fetch the tick data_

### PopulatedTick

```solidity
struct PopulatedTick {
  int24 tick;
  int128 liquidityNet;
  uint128 liquidityGross;
}
```

### getPopulatedTicksInWord

```solidity
function getPopulatedTicksInWord(address pool, int16 tickBitmapIndex) external view returns (struct ITickLens.PopulatedTick[] populatedTicks)
```

Get all the tick data for the populated ticks from a word of the tick bitmap of a pool

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| pool | address | The address of the pool for which to fetch populated tick data |
| tickBitmapIndex | int16 | The index of the word in the tick bitmap for which to parse the bitmap and fetch all the populated ticks |

#### Return Values

| Name | Type | Description |
| ---- | ---- | ----------- |
| populatedTicks | struct ITickLens.PopulatedTick[] | An array of tick data for the given word in the tick bitmap |

