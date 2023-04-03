# Solidity API

## INonfungibleTokenPositionDescriptor

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

