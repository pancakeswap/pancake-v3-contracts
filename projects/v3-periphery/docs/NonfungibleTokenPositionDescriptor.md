# Solidity API

## NonfungibleTokenPositionDescriptor

Produces a string containing the data URI for a JSON metadata string

### WETH9

```solidity
address WETH9
```

### nativeCurrencyLabelBytes

```solidity
bytes32 nativeCurrencyLabelBytes
```

_A null-terminated string_

### nftDescriptorEx

```solidity
address nftDescriptorEx
```

_A NFTDescriptorEx address_

### constructor

```solidity
constructor(address _WETH9, bytes32 _nativeCurrencyLabelBytes, address _nftDescriptorEx) public
```

### nativeCurrencyLabel

```solidity
function nativeCurrencyLabel() public view returns (string)
```

Returns the native currency label as a string

### tokenURI

```solidity
function tokenURI(contract INonfungiblePositionManager positionManager, uint256 tokenId) external view returns (string)
```

Produces the URI describing a particular token ID for a position manager

_Note this URI may be a data: URI with the JSON contents directly inlined_

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| positionManager | contract INonfungiblePositionManager | The position manager for which to describe the token |
| tokenId | uint256 | The ID of the token for which to produce a description, which may not be valid |

#### Return Values

| Name | Type | Description |
| ---- | ---- | ----------- |
| [0] | string | The URI of the ERC721-compliant metadata |

### flipRatio

```solidity
function flipRatio(address token0, address token1, uint256 chainId) public view returns (bool)
```

### tokenRatioPriority

```solidity
function tokenRatioPriority(address token, uint256 chainId) public view returns (int256)
```

