# Solidity API

## TickBitmapTest

### bitmap

```solidity
mapping(int16 => uint256) bitmap
```

### flipTick

```solidity
function flipTick(int24 tick) external
```

### getGasCostOfFlipTick

```solidity
function getGasCostOfFlipTick(int24 tick) external returns (uint256)
```

### nextInitializedTickWithinOneWord

```solidity
function nextInitializedTickWithinOneWord(int24 tick, bool lte) external view returns (int24 next, bool initialized)
```

### getGasCostOfNextInitializedTickWithinOneWord

```solidity
function getGasCostOfNextInitializedTickWithinOneWord(int24 tick, bool lte) external view returns (uint256)
```

### isInitialized

```solidity
function isInitialized(int24 tick) external view returns (bool)
```

