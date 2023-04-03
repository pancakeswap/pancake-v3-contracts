# Solidity API

## MockTimePancakeV3Pool

### time

```solidity
uint256 time
```

### setFeeGrowthGlobal0X128

```solidity
function setFeeGrowthGlobal0X128(uint256 _feeGrowthGlobal0X128) external
```

### setFeeGrowthGlobal1X128

```solidity
function setFeeGrowthGlobal1X128(uint256 _feeGrowthGlobal1X128) external
```

### advanceTime

```solidity
function advanceTime(uint256 by) external
```

### _blockTimestamp

```solidity
function _blockTimestamp() internal view returns (uint32)
```

_Returns the block timestamp truncated to 32 bits, i.e. mod 2**32. This method is overridden in tests._

