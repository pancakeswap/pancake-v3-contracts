# Solidity API

## NFTDescriptorEx

### sqrt10X128

```solidity
uint256 sqrt10X128
```

### ConstructTokenURIParams

```solidity
struct ConstructTokenURIParams {
  uint256 tokenId;
  address quoteTokenAddress;
  address baseTokenAddress;
  string quoteTokenSymbol;
  string baseTokenSymbol;
  uint8 quoteTokenDecimals;
  uint8 baseTokenDecimals;
  bool flipRatio;
  int24 tickLower;
  int24 tickUpper;
  int24 tickCurrent;
  int24 tickSpacing;
  uint24 fee;
  address poolAddress;
}
```

### owner

```solidity
address owner
```

### OwnerChanged

```solidity
event OwnerChanged(address oldOwner, address newOwner)
```

### ToggleSwitchAndUpdateNFTDomain

```solidity
event ToggleSwitchAndUpdateNFTDomain(address sender, bool switchToHttpLink, string NFTDomain)
```

### onlyOwner

```solidity
modifier onlyOwner()
```

### constructor

```solidity
constructor() public
```

### constructTokenURI

```solidity
function constructTokenURI(struct NFTDescriptorEx.ConstructTokenURIParams params) public view returns (string)
```

### escapeQuotes

```solidity
function escapeQuotes(string symbol) internal pure returns (string)
```

### DecimalStringParams

```solidity
struct DecimalStringParams {
  uint256 sigfigs;
  uint8 bufferLength;
  uint8 sigfigIndex;
  uint8 decimalIndex;
  uint8 zerosStartIndex;
  uint8 zerosEndIndex;
  bool isLessThanOne;
  bool isPercent;
}
```

### tickToDecimalString

```solidity
function tickToDecimalString(int24 tick, int24 tickSpacing, uint8 baseTokenDecimals, uint8 quoteTokenDecimals, bool flipRatio) internal pure returns (string)
```

### fixedPointToDecimalString

```solidity
function fixedPointToDecimalString(uint160 sqrtRatioX96, uint8 baseTokenDecimals, uint8 quoteTokenDecimals) internal pure returns (string)
```

### feeToPercentString

```solidity
function feeToPercentString(uint24 fee) internal pure returns (string)
```

### addressToString

```solidity
function addressToString(address addr) internal pure returns (string)
```

### generateSVGImage

```solidity
function generateSVGImage(struct NFTDescriptorEx.ConstructTokenURIParams params) internal pure returns (string svg)
```

### tokenToColorHex

```solidity
function tokenToColorHex(uint256 token, uint256 offset) internal pure returns (string str)
```

### getCircleCoord

```solidity
function getCircleCoord(uint256 tokenAddress, uint256 offset, uint256 tokenId) internal pure returns (uint256)
```

### sliceTokenHex

```solidity
function sliceTokenHex(uint256 token, uint256 offset) internal pure returns (uint256)
```

### setOwner

```solidity
function setOwner(address _owner) external
```

### toggleSwitchAndUpdateNFTDomain

```solidity
function toggleSwitchAndUpdateNFTDomain(bool _switchToHttpLink, string _NFTDomain) external
```

