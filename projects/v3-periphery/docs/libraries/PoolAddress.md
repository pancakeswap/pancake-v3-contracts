# Solidity API

## PoolAddress

### POOL_INIT_CODE_HASH

```solidity
bytes32 POOL_INIT_CODE_HASH
```

### PoolKey

```solidity
struct PoolKey {
  address token0;
  address token1;
  uint24 fee;
}
```

### getPoolKey

```solidity
function getPoolKey(address tokenA, address tokenB, uint24 fee) internal pure returns (struct PoolAddress.PoolKey)
```

Returns PoolKey: the ordered tokens with the matched fee levels

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| tokenA | address | The first token of a pool, unsorted |
| tokenB | address | The second token of a pool, unsorted |
| fee | uint24 | The fee level of the pool |

#### Return Values

| Name | Type | Description |
| ---- | ---- | ----------- |
| [0] | struct PoolAddress.PoolKey | Poolkey The pool details with ordered token0 and token1 assignments |

### computeAddress

```solidity
function computeAddress(address deployer, struct PoolAddress.PoolKey key) internal pure returns (address pool)
```

Deterministically computes the pool address given the factory and PoolKey

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| deployer | address | The PancakeSwap V3 deployer contract address |
| key | struct PoolAddress.PoolKey | The PoolKey |

#### Return Values

| Name | Type | Description |
| ---- | ---- | ----------- |
| pool | address | The contract address of the V3 pool |

