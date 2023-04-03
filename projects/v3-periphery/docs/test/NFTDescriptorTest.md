# Solidity API

## NFTDescriptorTest

### constructTokenURI

```solidity
function constructTokenURI(struct NFTDescriptor.ConstructTokenURIParams params) public pure returns (string)
```

### getGasCostOfConstructTokenURI

```solidity
function getGasCostOfConstructTokenURI(struct NFTDescriptor.ConstructTokenURIParams params) public view returns (uint256)
```

### tickToDecimalString

```solidity
function tickToDecimalString(int24 tick, int24 tickSpacing, uint8 token0Decimals, uint8 token1Decimals, bool flipRatio) public pure returns (string)
```

### fixedPointToDecimalString

```solidity
function fixedPointToDecimalString(uint160 sqrtRatioX96, uint8 token0Decimals, uint8 token1Decimals) public pure returns (string)
```

### feeToPercentString

```solidity
function feeToPercentString(uint24 fee) public pure returns (string)
```

### addressToString

```solidity
function addressToString(address _address) public pure returns (string)
```

### generateSVGImage

```solidity
function generateSVGImage(struct NFTDescriptor.ConstructTokenURIParams params) public pure returns (string)
```

### tokenToColorHex

```solidity
function tokenToColorHex(address token, uint256 offset) public pure returns (string)
```

### sliceTokenHex

```solidity
function sliceTokenHex(address token, uint256 offset) public pure returns (uint256)
```

### rangeLocation

```solidity
function rangeLocation(int24 tickLower, int24 tickUpper) public pure returns (string, string)
```

### isRare

```solidity
function isRare(uint256 tokenId, address poolAddress) public pure returns (bool)
```

