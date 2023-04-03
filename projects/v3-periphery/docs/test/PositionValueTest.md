# Solidity API

## PositionValueTest

### total

```solidity
function total(contract INonfungiblePositionManager nft, uint256 tokenId, uint160 sqrtRatioX96) external view returns (uint256 amount0, uint256 amount1)
```

### principal

```solidity
function principal(contract INonfungiblePositionManager nft, uint256 tokenId, uint160 sqrtRatioX96) external view returns (uint256 amount0, uint256 amount1)
```

### fees

```solidity
function fees(contract INonfungiblePositionManager nft, uint256 tokenId) external view returns (uint256 amount0, uint256 amount1)
```

### totalGas

```solidity
function totalGas(contract INonfungiblePositionManager nft, uint256 tokenId, uint160 sqrtRatioX96) external view returns (uint256)
```

### principalGas

```solidity
function principalGas(contract INonfungiblePositionManager nft, uint256 tokenId, uint160 sqrtRatioX96) external view returns (uint256)
```

### feesGas

```solidity
function feesGas(contract INonfungiblePositionManager nft, uint256 tokenId) external view returns (uint256)
```

