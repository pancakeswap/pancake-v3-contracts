# Solidity API

## PancakeV3PoolDeployer

### Parameters

```solidity
struct Parameters {
  address factory;
  address token0;
  address token1;
  uint24 fee;
  int24 tickSpacing;
}
```

### parameters

```solidity
struct PancakeV3PoolDeployer.Parameters parameters
```

Get the parameters to be used in constructing the pool, set transiently during pool creation.

_Called by the pool constructor to fetch the parameters of the pool
Returns factory The factory address
Returns token0 The first token of the pool by address sort order
Returns token1 The second token of the pool by address sort order
Returns fee The fee collected upon every swap in the pool, denominated in hundredths of a bip
Returns tickSpacing The minimum number of ticks between initialized ticks_

### factoryAddress

```solidity
address factoryAddress
```

### SetFactoryAddress

```solidity
event SetFactoryAddress(address factory)
```

Emitted when factory address is set

### onlyFactory

```solidity
modifier onlyFactory()
```

### setFactoryAddress

```solidity
function setFactoryAddress(address _factoryAddress) external
```

### deploy

```solidity
function deploy(address factory, address token0, address token1, uint24 fee, int24 tickSpacing) external returns (address pool)
```

_Deploys a pool with the given parameters by transiently setting the parameters storage slot and then
clearing it after deploying the pool._

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| factory | address | The contract address of the PancakeSwap V3 factory |
| token0 | address | The first token of the pool by address sort order |
| token1 | address | The second token of the pool by address sort order |
| fee | uint24 | The fee collected upon every swap in the pool, denominated in hundredths of a bip |
| tickSpacing | int24 | The spacing between usable ticks |

