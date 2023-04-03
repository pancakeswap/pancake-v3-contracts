# Solidity API

## IMasterChefV2

### deposit

```solidity
function deposit(uint256 _pid, uint256 _amount) external
```

### withdraw

```solidity
function withdraw(uint256 _pid, uint256 _amount) external
```

### pendingCake

```solidity
function pendingCake(uint256 _pid, address _user) external view returns (uint256)
```

### userInfo

```solidity
function userInfo(uint256 _pid, address _user) external view returns (uint256, uint256, uint256)
```

### emergencyWithdraw

```solidity
function emergencyWithdraw(uint256 _pid) external
```

### updateBoostMultiplier

```solidity
function updateBoostMultiplier(address _user, uint256 _pid, uint256 _newBoostMulti) external
```

