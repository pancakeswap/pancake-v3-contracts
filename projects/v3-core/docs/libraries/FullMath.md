# Solidity API

## FullMath

Facilitates multiplication and division that can have overflow of an intermediate value without any loss of precision

_Handles "phantom overflow" i.e., allows multiplication and division where an intermediate value overflows 256 bits_

### mulDiv

```solidity
function mulDiv(uint256 a, uint256 b, uint256 denominator) internal pure returns (uint256 result)
```

Calculates floor(a×b÷denominator) with full precision. Throws if result overflows a uint256 or denominator == 0

_Credit to Remco Bloemen under MIT license https://xn--2-umb.com/21/muldiv_

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| a | uint256 | The multiplicand |
| b | uint256 | The multiplier |
| denominator | uint256 | The divisor |

#### Return Values

| Name | Type | Description |
| ---- | ---- | ----------- |
| result | uint256 | The 256-bit result |

### mulDivRoundingUp

```solidity
function mulDivRoundingUp(uint256 a, uint256 b, uint256 denominator) internal pure returns (uint256 result)
```

Calculates ceil(a×b÷denominator) with full precision. Throws if result overflows a uint256 or denominator == 0

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| a | uint256 | The multiplicand |
| b | uint256 | The multiplier |
| denominator | uint256 | The divisor |

#### Return Values

| Name | Type | Description |
| ---- | ---- | ----------- |
| result | uint256 | The 256-bit result |

