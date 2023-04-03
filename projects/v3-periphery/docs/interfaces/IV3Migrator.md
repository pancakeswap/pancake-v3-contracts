# Solidity API

## IV3Migrator

Enables migration of liqudity from PancakeSwap v2-compatible pairs into PancakeSwap v3 pools

### MigrateParams

```solidity
struct MigrateParams {
  address pair;
  uint256 liquidityToMigrate;
  uint8 percentageToMigrate;
  address token0;
  address token1;
  uint24 fee;
  int24 tickLower;
  int24 tickUpper;
  uint256 amount0Min;
  uint256 amount1Min;
  address recipient;
  uint256 deadline;
  bool refundAsETH;
}
```

### migrate

```solidity
function migrate(struct IV3Migrator.MigrateParams params) external
```

Migrates liquidity to v3 by burning v2 liquidity and minting a new position for v3

_Slippage protection is enforced via `amount{0,1}Min`, which should be a discount of the expected values of
the maximum amount of v3 liquidity that the v2 liquidity can get. For the special case of migrating to an
out-of-range position, `amount{0,1}Min` may be set to 0, enforcing that the position remains out of range_

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| params | struct IV3Migrator.MigrateParams | The params necessary to migrate v2 liquidity, encoded as `MigrateParams` in calldata |

