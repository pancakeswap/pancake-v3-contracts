# Solidity API

## LiquidityManagement

Internal functions for safely managing liquidity in PancakeSwap V3

### MintCallbackData

```solidity
struct MintCallbackData {
  struct PoolAddress.PoolKey poolKey;
  address payer;
}
```

### pancakeV3MintCallback

```solidity
function pancakeV3MintCallback(uint256 amount0Owed, uint256 amount1Owed, bytes data) external
```

Called to `msg.sender` after minting liquidity to a position from IPancakeV3Pool#mint.

_In the implementation you must pay the pool tokens owed for the minted liquidity.
The caller of this method must be checked to be a PancakeV3Pool deployed by the canonical PancakeV3Factory._

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| amount0Owed | uint256 | The amount of token0 due to the pool for the minted liquidity |
| amount1Owed | uint256 | The amount of token1 due to the pool for the minted liquidity |
| data | bytes | Any data passed through by the caller via the IPancakeV3PoolActions#mint call |

### AddLiquidityParams

```solidity
struct AddLiquidityParams {
  address token0;
  address token1;
  uint24 fee;
  address recipient;
  int24 tickLower;
  int24 tickUpper;
  uint256 amount0Desired;
  uint256 amount1Desired;
  uint256 amount0Min;
  uint256 amount1Min;
}
```

### addLiquidity

```solidity
function addLiquidity(struct LiquidityManagement.AddLiquidityParams params) internal returns (uint128 liquidity, uint256 amount0, uint256 amount1, contract IPancakeV3Pool pool)
```

Add liquidity to an initialized pool

