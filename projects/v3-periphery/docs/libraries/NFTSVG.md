# Solidity API

## NFTSVG

Provides a function for generating an SVG associated with a PancakeSwap NFT

### curve1

```solidity
string curve1
```

### curve2

```solidity
string curve2
```

### curve3

```solidity
string curve3
```

### curve4

```solidity
string curve4
```

### curve5

```solidity
string curve5
```

### curve6

```solidity
string curve6
```

### curve7

```solidity
string curve7
```

### curve8

```solidity
string curve8
```

### SVGParams

```solidity
struct SVGParams {
  string quoteToken;
  string baseToken;
  address poolAddress;
  string quoteTokenSymbol;
  string baseTokenSymbol;
  string feeTier;
  int24 tickLower;
  int24 tickUpper;
  int24 tickSpacing;
  int8 overRange;
  uint256 tokenId;
  string color0;
  string color1;
  string color2;
  string color3;
  string x1;
  string y1;
  string x2;
  string y2;
  string x3;
  string y3;
}
```

### generateSVG

```solidity
function generateSVG(struct NFTSVG.SVGParams params) internal pure returns (string svg)
```

### getCurve

```solidity
function getCurve(int24 tickLower, int24 tickUpper, int24 tickSpacing) internal pure returns (string curve)
```

### generateSVGCurveCircle

```solidity
function generateSVGCurveCircle(int8 overRange) internal pure returns (string svg)
```

### rangeLocation

```solidity
function rangeLocation(int24 tickLower, int24 tickUpper) internal pure returns (string, string)
```

### isRare

```solidity
function isRare(uint256 tokenId, address poolAddress) internal pure returns (bool)
```

