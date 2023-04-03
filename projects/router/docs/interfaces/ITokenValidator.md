# Solidity API

## ITokenValidator

Validates tokens by flash borrowing from the token/<base token> pool on V2.
Returns
    Status.FOT if we detected a fee is taken on transfer.
    Status.STF if transfer failed for the token.
    Status.UNKN if we did not detect any issues with the token.
A return value of Status.UNKN does not mean the token is definitely not a fee on transfer token
    or definitely has no problems with its transfer. It just means we cant say for sure that it has any
    issues.

_We can not guarantee the result of this lens is correct for a few reasons:
1/ Some tokens take fees or allow transfers under specific conditions, for example some have an allowlist
   of addresses that do/dont require fees. Therefore the result is not guaranteed to be correct
   in all circumstances.
2/ It is possible that the token does not have any pools on V2 therefore we are not able to perform
   a flashloan to test the token.
These functions are not marked view because they rely on calling non-view functions and reverting
to compute the result._

### Status

```solidity
enum Status {
  UNKN,
  FOT,
  STF
}
```

### validate

```solidity
function validate(address token, address[] baseTokens, uint256 amountToBorrow) external returns (enum ITokenValidator.Status)
```

Validates a token by detecting if its transferable or takes a fee on transfer

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| token | address | The address of the token to check for fee on transfer |
| baseTokens | address[] | The addresses of the tokens to try pairing with token when looking for a pool to flash loan from. |
| amountToBorrow | uint256 | The amount to try flash borrowing from the pools |

#### Return Values

| Name | Type | Description |
| ---- | ---- | ----------- |
| [0] | enum ITokenValidator.Status | The status of the token |

### batchValidate

```solidity
function batchValidate(address[] tokens, address[] baseTokens, uint256 amountToBorrow) external returns (enum ITokenValidator.Status[])
```

Validates each token by detecting if its transferable or takes a fee on transfer

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| tokens | address[] | The addresses of the tokens to check for fee on transfer |
| baseTokens | address[] | The addresses of the tokens to try pairing with token when looking for a pool to flash loan from. |
| amountToBorrow | uint256 | The amount to try flash borrowing from the pools |

#### Return Values

| Name | Type | Description |
| ---- | ---- | ----------- |
| [0] | enum ITokenValidator.Status[] | The status of the token |

