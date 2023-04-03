# Solidity API

## SmartRouterHelper

### getStableInfo

```solidity
function getStableInfo(address stableSwapFactory, address input, address output, uint256 flag) public view returns (uint256 i, uint256 j, address swapContract)
```

### getStableAmountsIn

```solidity
function getStableAmountsIn(address stableSwapFactory, address stableSwapInfo, address[] path, uint256[] flag, uint256 amountOut) public view returns (uint256[] amounts)
```

### V2_INIT_CODE_HASH

```solidity
bytes32 V2_INIT_CODE_HASH
```

### sortTokens

```solidity
function sortTokens(address tokenA, address tokenB) public pure returns (address token0, address token1)
```

### pairFor

```solidity
function pairFor(address factory, address tokenA, address tokenB) public pure returns (address pair)
```

### getReserves

```solidity
function getReserves(address factory, address tokenA, address tokenB) public view returns (uint256 reserveA, uint256 reserveB)
```

### getAmountOut

```solidity
function getAmountOut(uint256 amountIn, uint256 reserveIn, uint256 reserveOut) public pure returns (uint256 amountOut)
```

### getAmountIn

```solidity
function getAmountIn(uint256 amountOut, uint256 reserveIn, uint256 reserveOut) public pure returns (uint256 amountIn)
```

### getAmountsIn

```solidity
function getAmountsIn(address factory, uint256 amountOut, address[] path) public view returns (uint256[] amounts)
```

### V3_INIT_CODE_HASH

```solidity
bytes32 V3_INIT_CODE_HASH
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
function getPoolKey(address tokenA, address tokenB, uint24 fee) public pure returns (struct SmartRouterHelper.PoolKey)
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
| [0] | struct SmartRouterHelper.PoolKey | Poolkey The pool details with ordered token0 and token1 assignments |

### computeAddress

```solidity
function computeAddress(address deployer, struct SmartRouterHelper.PoolKey key) public pure returns (address pool)
```

Deterministically computes the pool address given the deployer and PoolKey

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| deployer | address | The PancakeSwap V3 deployer contract address |
| key | struct SmartRouterHelper.PoolKey | The PoolKey |

#### Return Values

| Name | Type | Description |
| ---- | ---- | ----------- |
| pool | address | The contract address of the V3 pool |

### getPool

```solidity
function getPool(address deployer, address tokenA, address tokenB, uint24 fee) public pure returns (contract IPancakeV3Pool)
```

_Returns the pool for the given token pair and fee. The pool contract may or may not exist._

### verifyCallback

```solidity
function verifyCallback(address deployer, address tokenA, address tokenB, uint24 fee) public view returns (contract IPancakeV3Pool pool)
```

Returns the address of a valid PancakeSwap V3 Pool

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| deployer | address | The contract address of the PancakeSwap V3 deployer |
| tokenA | address | The contract address of either token0 or token1 |
| tokenB | address | The contract address of the other token |
| fee | uint24 | The fee collected upon every swap in the pool, denominated in hundredths of a bip |

#### Return Values

| Name | Type | Description |
| ---- | ---- | ----------- |
| pool | contract IPancakeV3Pool | The V3 pool contract address |

### verifyCallback

```solidity
function verifyCallback(address deployer, struct SmartRouterHelper.PoolKey poolKey) public view returns (contract IPancakeV3Pool pool)
```

Returns the address of a valid PancakeSwap V3 Pool

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| deployer | address | The contract address of the PancakeSwap V3 deployer |
| poolKey | struct SmartRouterHelper.PoolKey | The identifying key of the V3 pool |

#### Return Values

| Name | Type | Description |
| ---- | ---- | ----------- |
| pool | contract IPancakeV3Pool | The V3 pool contract address |

