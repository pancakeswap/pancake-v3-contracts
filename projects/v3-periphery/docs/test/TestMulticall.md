# Solidity API

## TestMulticall

### functionThatRevertsWithError

```solidity
function functionThatRevertsWithError(string error) external pure
```

### Tuple

```solidity
struct Tuple {
  uint256 a;
  uint256 b;
}
```

### functionThatReturnsTuple

```solidity
function functionThatReturnsTuple(uint256 a, uint256 b) external pure returns (struct TestMulticall.Tuple tuple)
```

### paid

```solidity
uint256 paid
```

### pays

```solidity
function pays() external payable
```

### returnSender

```solidity
function returnSender() external view returns (address)
```

