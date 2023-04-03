# Solidity API

## PathTest

### hasMultiplePools

```solidity
function hasMultiplePools(bytes path) public pure returns (bool)
```

### decodeFirstPool

```solidity
function decodeFirstPool(bytes path) public pure returns (address tokenA, address tokenB, uint24 fee)
```

### getFirstPool

```solidity
function getFirstPool(bytes path) public pure returns (bytes)
```

### skipToken

```solidity
function skipToken(bytes path) public pure returns (bytes)
```

### getGasCostOfDecodeFirstPool

```solidity
function getGasCostOfDecodeFirstPool(bytes path) public view returns (uint256)
```

