# Solidity API

## PoolAddressTest

### POOL_INIT_CODE_HASH

```solidity
function POOL_INIT_CODE_HASH() external pure returns (bytes32)
```

### computeAddress

```solidity
function computeAddress(address deployer, address token0, address token1, uint24 fee) external pure returns (address)
```

### getGasCostOfComputeAddress

```solidity
function getGasCostOfComputeAddress(address deployer, address token0, address token1, uint24 fee) external view returns (uint256)
```

