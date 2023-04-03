# Solidity API

## IPancakeV3PoolImmutables

These parameters are fixed for a pool forever, i.e., the methods will always return the same values

### factory

```solidity
function factory() external view returns (address)
```

The contract that deployed the pool, which must adhere to the IPancakeV3Factory interface

#### Return Values

| Name | Type | Description |
| ---- | ---- | ----------- |
| [0] | address | The contract address |

### token0

```solidity
function token0() external view returns (address)
```

The first of the two tokens of the pool, sorted by address

#### Return Values

| Name | Type | Description |
| ---- | ---- | ----------- |
| [0] | address | The token contract address |

### token1

```solidity
function token1() external view returns (address)
```

The second of the two tokens of the pool, sorted by address

#### Return Values

| Name | Type | Description |
| ---- | ---- | ----------- |
| [0] | address | The token contract address |

### fee

```solidity
function fee() external view returns (uint24)
```

The pool's fee in hundredths of a bip, i.e. 1e-6

#### Return Values

| Name | Type | Description |
| ---- | ---- | ----------- |
| [0] | uint24 | The fee |

### tickSpacing

```solidity
function tickSpacing() external view returns (int24)
```

The pool tick spacing

_Ticks can only be used at multiples of this value, minimum of 1 and always positive
e.g.: a tickSpacing of 3 means ticks can be initialized every 3rd tick, i.e., ..., -6, -3, 0, 3, 6, ...
This value is an int24 to avoid casting even though it is always positive._

#### Return Values

| Name | Type | Description |
| ---- | ---- | ----------- |
| [0] | int24 | The tick spacing |

### maxLiquidityPerTick

```solidity
function maxLiquidityPerTick() external view returns (uint128)
```

The maximum amount of position liquidity that can use any tick in the range

_This parameter is enforced per tick to prevent liquidity from overflowing a uint128 at any point, and
also prevents out-of-range liquidity from being used to prevent adding in-range liquidity to a pool_

#### Return Values

| Name | Type | Description |
| ---- | ---- | ----------- |
| [0] | uint128 | The max amount of liquidity per tick |

