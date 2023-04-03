# Solidity API

## HexStrings

### ALPHABET

```solidity
bytes16 ALPHABET
```

### toHexString

```solidity
function toHexString(uint256 value, uint256 length) internal pure returns (string)
```

Converts a `uint256` to its ASCII `string` hexadecimal representation with fixed length.

_Credit to Open Zeppelin under MIT license https://github.com/OpenZeppelin/openzeppelin-contracts/blob/243adff49ce1700e0ecb99fe522fb16cff1d1ddc/contracts/utils/Strings.sol#L55_

### toHexStringNoPrefix

```solidity
function toHexStringNoPrefix(uint256 value, uint256 length) internal pure returns (string)
```

