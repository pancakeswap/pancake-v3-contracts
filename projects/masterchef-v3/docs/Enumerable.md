# Solidity API

## Enumerable

This codes were copied from https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC721/extensions/ERC721Enumerable.sol, and did some changes.

_This implements an optional extension of defined in the EIP that adds
enumerability of all the token ids in the contract as well as all token ids owned by each
account._

### tokenOfOwnerByIndex

```solidity
function tokenOfOwnerByIndex(address owner, uint256 index) public view returns (uint256)
```

### balanceOf

```solidity
function balanceOf(address owner) public view returns (uint256)
```

### addToken

```solidity
function addToken(address from, uint256 tokenId) internal
```

### removeToken

```solidity
function removeToken(address from, uint256 tokenId) internal
```

