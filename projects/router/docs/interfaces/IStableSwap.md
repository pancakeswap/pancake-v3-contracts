# Solidity API

## IStableSwap

### get_dy

```solidity
function get_dy(uint256 i, uint256 j, uint256 dx) external view returns (uint256 dy)
```

### exchange

```solidity
function exchange(uint256 i, uint256 j, uint256 dx, uint256 minDy) external payable
```

### coins

```solidity
function coins(uint256 i) external view returns (address)
```

### balances

```solidity
function balances(uint256 i) external view returns (uint256)
```

### A

```solidity
function A() external view returns (uint256)
```

### fee

```solidity
function fee() external view returns (uint256)
```

