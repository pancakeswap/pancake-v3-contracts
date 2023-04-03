# Solidity API

## PositionValue

### total

```solidity
function total(contract INonfungiblePositionManager positionManager, uint256 tokenId, uint160 sqrtRatioX96) internal view returns (uint256 amount0, uint256 amount1)
```

Returns the total amounts of token0 and token1, i.e. the sum of fees and principal
that a given nonfungible position manager token is worth

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| positionManager | contract INonfungiblePositionManager | The Pancake V3 NonfungiblePositionManager |
| tokenId | uint256 | The tokenId of the token for which to get the total value |
| sqrtRatioX96 | uint160 | The square root price X96 for which to calculate the principal amounts |

#### Return Values

| Name | Type | Description |
| ---- | ---- | ----------- |
| amount0 | uint256 | The total amount of token0 including principal and fees |
| amount1 | uint256 | The total amount of token1 including principal and fees |

### principal

```solidity
function principal(contract INonfungiblePositionManager positionManager, uint256 tokenId, uint160 sqrtRatioX96) internal view returns (uint256 amount0, uint256 amount1)
```

Calculates the principal (currently acting as liquidity) owed to the token owner in the event
that the position is burned

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| positionManager | contract INonfungiblePositionManager | The Pancake V3 NonfungiblePositionManager |
| tokenId | uint256 | The tokenId of the token for which to get the total principal owed |
| sqrtRatioX96 | uint160 | The square root price X96 for which to calculate the principal amounts |

#### Return Values

| Name | Type | Description |
| ---- | ---- | ----------- |
| amount0 | uint256 | The principal amount of token0 |
| amount1 | uint256 | The principal amount of token1 |

### FeeParams

```solidity
struct FeeParams {
  address token0;
  address token1;
  uint24 fee;
  int24 tickLower;
  int24 tickUpper;
  uint128 liquidity;
  uint256 positionFeeGrowthInside0LastX128;
  uint256 positionFeeGrowthInside1LastX128;
  uint256 tokensOwed0;
  uint256 tokensOwed1;
}
```

### fees

```solidity
function fees(contract INonfungiblePositionManager positionManager, uint256 tokenId) internal view returns (uint256 amount0, uint256 amount1)
```

Calculates the total fees owed to the token owner

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| positionManager | contract INonfungiblePositionManager | The Pancake V3 NonfungiblePositionManager |
| tokenId | uint256 | The tokenId of the token for which to get the total fees owed |

#### Return Values

| Name | Type | Description |
| ---- | ---- | ----------- |
| amount0 | uint256 | The amount of fees owed in token0 |
| amount1 | uint256 | The amount of fees owed in token1 |

