# Solidity API

## IStableSwapFactory

### StableSwapPairInfo

```solidity
struct StableSwapPairInfo {
  address swapContract;
  address token0;
  address token1;
  address LPContract;
}
```

### StableSwapThreePoolPairInfo

```solidity
struct StableSwapThreePoolPairInfo {
  address swapContract;
  address token0;
  address token1;
  address token2;
  address LPContract;
}
```

### pairLength

```solidity
function pairLength() external view returns (uint256)
```

### getPairInfo

```solidity
function getPairInfo(address _tokenA, address _tokenB) external view returns (struct IStableSwapFactory.StableSwapPairInfo info)
```

### getThreePoolPairInfo

```solidity
function getThreePoolPairInfo(address _tokenA, address _tokenB) external view returns (struct IStableSwapFactory.StableSwapThreePoolPairInfo info)
```

