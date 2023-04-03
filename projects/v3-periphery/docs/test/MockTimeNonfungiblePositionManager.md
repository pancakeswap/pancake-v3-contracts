# Solidity API

## MockTimeNonfungiblePositionManager

### time

```solidity
uint256 time
```

### constructor

```solidity
constructor(address _deployer, address _factory, address _WETH9, address _tokenDescriptor) public
```

### _blockTimestamp

```solidity
function _blockTimestamp() internal view returns (uint256)
```

_Method that exists purely to be overridden for tests_

#### Return Values

| Name | Type | Description |
| ---- | ---- | ----------- |
| [0] | uint256 | The current block timestamp |

### setTime

```solidity
function setTime(uint256 _time) external
```

