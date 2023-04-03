# Solidity API

## IPancakeV3PoolWithLmPool

### setLmPool

```solidity
function setLmPool(contract IPancakeV3LmPool lmPool) external
```

## PancakeV3FactoryOwner

Manages ownership and control over factory and pools

### factory

```solidity
contract IPancakeV3Factory factory
```

### owner

```solidity
address owner
```

### lmPoolDeployer

```solidity
address lmPoolDeployer
```

### OwnerChanged

```solidity
event OwnerChanged(address oldOwner, address newOwner)
```

Emitted when the owner of the factory is changed

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| oldOwner | address | The owner before the owner was changed |
| newOwner | address | The owner after the owner was changed |

### SetLmPoolDeployer

```solidity
event SetLmPoolDeployer(address lmPoolDeployer)
```

Emitted when LM pool deployer is set

### onlyOwner

```solidity
modifier onlyOwner()
```

### onlyOwnerOrLmPoolDeployer

```solidity
modifier onlyOwnerOrLmPoolDeployer()
```

### constructor

```solidity
constructor(contract IPancakeV3Factory _factory) public
```

### setOwner

```solidity
function setOwner(address _owner) external
```

### setLmPoolDeployer

```solidity
function setLmPoolDeployer(address _lmPoolDeployer) external
```

### setFactoryOwner

```solidity
function setFactoryOwner(address _owner) external
```

### enableFeeAmount

```solidity
function enableFeeAmount(uint24 fee, int24 tickSpacing) external
```

### setFeeProtocol

```solidity
function setFeeProtocol(contract IPancakeV3Pool pool, uint8 feeProtocol0, uint8 feeProtocol1) external
```

### collectProtocol

```solidity
function collectProtocol(contract IPancakeV3Pool pool, address recipient, uint128 amount0Requested, uint128 amount1Requested) external returns (uint128 amount0, uint128 amount1)
```

### setLmPool

```solidity
function setLmPool(address pool, address lmPool) external
```

