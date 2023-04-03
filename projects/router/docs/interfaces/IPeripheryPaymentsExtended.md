# Solidity API

## IPeripheryPaymentsExtended

Functions to ease deposits and withdrawals of ETH and tokens

### wrapETH

```solidity
function wrapETH(uint256 value) external payable
```

Wraps the contract's ETH balance into WETH9

_The resulting WETH9 is custodied by the router, thus will require further distribution_

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| value | uint256 | The amount of ETH to wrap |

### sweepToken

```solidity
function sweepToken(address token, uint256 amountMinimum) external payable
```

Transfers the full amount of a token held by this contract to msg.sender

_The amountMinimum parameter prevents malicious contracts from stealing the token from users_

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| token | address | The contract address of the token which will be transferred to msg.sender |
| amountMinimum | uint256 | The minimum amount of token required for a transfer |

### pull

```solidity
function pull(address token, uint256 value) external payable
```

Transfers the specified amount of a token from the msg.sender to address(this)

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| token | address | The token to pull |
| value | uint256 | The amount to pay |

