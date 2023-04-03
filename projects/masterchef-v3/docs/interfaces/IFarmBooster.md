# Solidity API

## IFarmBooster

### getUserMultiplier

```solidity
function getUserMultiplier(uint256 _tokenId) external view returns (uint256)
```

### whiteList

```solidity
function whiteList(uint256 _pid) external view returns (bool)
```

### updatePositionBoostMultiplier

```solidity
function updatePositionBoostMultiplier(uint256 _tokenId) external returns (uint256 _multiplier)
```

### removeBoostMultiplier

```solidity
function removeBoostMultiplier(address _user, uint256 _tokenId, uint256 _pid) external
```

