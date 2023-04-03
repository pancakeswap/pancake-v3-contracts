# Solidity API

## TestPositionNFTOwner

### owner

```solidity
address owner
```

### setOwner

```solidity
function setOwner(address _owner) external
```

### isValidSignature

```solidity
function isValidSignature(bytes32 hash, bytes signature) external view returns (bytes4 magicValue)
```

Returns whether the provided signature is valid for the provided data

_MUST return the bytes4 magic value 0x1626ba7e when function passes.
MUST NOT modify state (using STATICCALL for solc < 0.5, view modifier for solc > 0.5).
MUST allow external calls._

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| hash | bytes32 | Hash of the data to be signed |
| signature | bytes | Signature byte array associated with _data |

#### Return Values

| Name | Type | Description |
| ---- | ---- | ----------- |
| magicValue | bytes4 | The bytes4 magic value 0x1626ba7e |

