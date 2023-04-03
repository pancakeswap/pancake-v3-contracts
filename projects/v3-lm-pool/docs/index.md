# Solidity API

## IMasterChef

### getLatestPeriodInfo

```solidity
function getLatestPeriodInfo(address _v3Pool) external view returns (uint256 cakePerSecond, uint256 endTime)
```

## PancakeV3LmPool

### REWARD_PRECISION

```solidity
uint256 REWARD_PRECISION
```

### pool

```solidity
contract IPancakeV3Pool pool
```

### masterChef

```solidity
contract IMasterChef masterChef
```

### rewardGrowthGlobalX128

```solidity
uint256 rewardGrowthGlobalX128
```

### lmTicks

```solidity
mapping(int24 => struct LmTick.Info) lmTicks
```

### lmLiquidity

```solidity
uint128 lmLiquidity
```

### lastRewardTimestamp

```solidity
uint32 lastRewardTimestamp
```

### onlyPool

```solidity
modifier onlyPool()
```

### onlyMasterChef

```solidity
modifier onlyMasterChef()
```

### onlyPoolOrMasterChef

```solidity
modifier onlyPoolOrMasterChef()
```

### constructor

```solidity
constructor(address _pool, address _masterChef, uint32 rewardStartTimestamp) public
```

### accumulateReward

```solidity
function accumulateReward(uint32 currTimestamp) external
```

### crossLmTick

```solidity
function crossLmTick(int24 tick, bool zeroForOne) external
```

### updatePosition

```solidity
function updatePosition(int24 tickLower, int24 tickUpper, int128 liquidityDelta) external
```

### getRewardGrowthInside

```solidity
function getRewardGrowthInside(int24 tickLower, int24 tickUpper) external view returns (uint256 rewardGrowthInsideX128)
```

## IPancakeV3FactoryOwner

### setLmPool

```solidity
function setLmPool(address pool, address lmPool) external
```

## PancakeV3LmPoolDeployer

_This contract is for Master Chef to create a corresponding LmPool when
adding a new farming pool. As for why not just create LmPool inside the
Master Chef contract is merely due to the imcompatibility of the solidity
versions._

### masterChef

```solidity
address masterChef
```

### factoryOwner

```solidity
contract IPancakeV3FactoryOwner factoryOwner
```

### onlyMasterChef

```solidity
modifier onlyMasterChef()
```

### constructor

```solidity
constructor(address _masterChef, contract IPancakeV3FactoryOwner _factoryOwner) public
```

### deploy

```solidity
function deploy(contract IPancakeV3Pool pool) external returns (contract IPancakeV3LmPool lmPool)
```

_Deploys a LmPool_

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| pool | contract IPancakeV3Pool | The contract address of the PancakeSwap V3 pool |

## IPancakeV3LmPool

### accumulateReward

```solidity
function accumulateReward(uint32 currTimestamp) external
```

### crossLmTick

```solidity
function crossLmTick(int24 tick, bool zeroForOne) external
```

## LmTick

Contains functions for managing tick processes and relevant calculations

### Info

```solidity
struct Info {
  uint128 liquidityGross;
  int128 liquidityNet;
  uint256 rewardGrowthOutsideX128;
}
```

### getRewardGrowthInside

```solidity
function getRewardGrowthInside(mapping(int24 => struct LmTick.Info) self, int24 tickLower, int24 tickUpper, int24 tickCurrent, uint256 rewardGrowthGlobalX128) internal view returns (uint256 rewardGrowthInsideX128)
```

Retrieves reward growth data

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| self | mapping(int24 &#x3D;&gt; struct LmTick.Info) | The mapping containing all tick information for initialized ticks |
| tickLower | int24 | The lower tick boundary of the position |
| tickUpper | int24 | The upper tick boundary of the position |
| tickCurrent | int24 | The current tick |
| rewardGrowthGlobalX128 | uint256 | The all-time global reward growth, per unit of liquidity |

#### Return Values

| Name | Type | Description |
| ---- | ---- | ----------- |
| rewardGrowthInsideX128 | uint256 | The all-time reward growth, per unit of liquidity, inside the position's tick boundaries |

### update

```solidity
function update(mapping(int24 => struct LmTick.Info) self, int24 tick, int24 tickCurrent, int128 liquidityDelta, uint256 rewardGrowthGlobalX128, bool upper, uint128 maxLiquidity) internal returns (bool flipped)
```

Updates a tick and returns true if the tick was flipped from initialized to uninitialized, or vice versa

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| self | mapping(int24 &#x3D;&gt; struct LmTick.Info) | The mapping containing all tick information for initialized ticks |
| tick | int24 | The tick that will be updated |
| tickCurrent | int24 | The current tick |
| liquidityDelta | int128 | A new amount of liquidity to be added (subtracted) when tick is crossed from left to right (right to left) |
| rewardGrowthGlobalX128 | uint256 | The all-time global reward growth, per unit of liquidity |
| upper | bool | true for updating a position's upper tick, or false for updating a position's lower tick |
| maxLiquidity | uint128 | The maximum liquidity allocation for a single tick |

#### Return Values

| Name | Type | Description |
| ---- | ---- | ----------- |
| flipped | bool | Whether the tick was flipped from initialized to uninitialized, or vice versa |

### clear

```solidity
function clear(mapping(int24 => struct LmTick.Info) self, int24 tick) internal
```

Clears tick data

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| self | mapping(int24 &#x3D;&gt; struct LmTick.Info) | The mapping containing all initialized tick information for initialized ticks |
| tick | int24 | The tick that will be cleared |

### cross

```solidity
function cross(mapping(int24 => struct LmTick.Info) self, int24 tick, uint256 rewardGrowthGlobalX128) internal returns (int128 liquidityNet)
```

Transitions to next tick as needed by price movement

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| self | mapping(int24 &#x3D;&gt; struct LmTick.Info) | The mapping containing all tick information for initialized ticks |
| tick | int24 | The destination tick of the transition |
| rewardGrowthGlobalX128 | uint256 | The all-time global reward growth, per unit of liquidity, in token0 |

#### Return Values

| Name | Type | Description |
| ---- | ---- | ----------- |
| liquidityNet | int128 | The amount of liquidity added (subtracted) when tick is crossed from left to right (right to left) |

