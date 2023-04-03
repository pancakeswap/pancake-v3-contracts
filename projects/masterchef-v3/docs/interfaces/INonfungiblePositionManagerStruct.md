# Solidity API

## INonfungiblePositionManagerStruct

### IncreaseLiquidityParams

```solidity
struct IncreaseLiquidityParams {
  uint256 tokenId;
  uint256 amount0Desired;
  uint256 amount1Desired;
  uint256 amount0Min;
  uint256 amount1Min;
  uint256 deadline;
}
```

### DecreaseLiquidityParams

```solidity
struct DecreaseLiquidityParams {
  uint256 tokenId;
  uint128 liquidity;
  uint256 amount0Min;
  uint256 amount1Min;
  uint256 deadline;
}
```

### CollectParams

```solidity
struct CollectParams {
  uint256 tokenId;
  address recipient;
  uint128 amount0Max;
  uint128 amount1Max;
}
```

