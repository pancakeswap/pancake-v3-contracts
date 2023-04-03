# Solidity API

## ILMPool

### updatePosition

```solidity
function updatePosition(int24 tickLower, int24 tickUpper, int128 liquidityDelta) external
```

### getRewardGrowthInside

```solidity
function getRewardGrowthInside(int24 tickLower, int24 tickUpper) external view returns (uint256 rewardGrowthInsideX128)
```

### accumulateReward

```solidity
function accumulateReward(uint32 currTimestamp) external
```

