# Solidity API

## IPeripheryPayments

Functions to ease deposits and withdrawals of ETH

### unwrapWETH9

```solidity
function unwrapWETH9(uint256 amountMinimum, address recipient) external payable
```

Unwraps the contract's WETH9 balance and sends it to recipient as ETH.

_The amountMinimum parameter prevents malicious contracts from stealing WETH9 from users._

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| amountMinimum | uint256 | The minimum amount of WETH9 to unwrap |
| recipient | address | The address receiving ETH |

### refundETH

```solidity
function refundETH() external payable
```

Refunds any ETH balance held by this contract to the `msg.sender`

_Useful for bundling with mint or increase liquidity that uses ether, or exact output swaps
that use ether for the input amount. And in PancakeSwap Router, this would be called 
at the very end of swap_

### sweepToken

```solidity
function sweepToken(address token, uint256 amountMinimum, address recipient) external payable
```

Transfers the full amount of a token held by this contract to recipient

_The amountMinimum parameter prevents malicious contracts from stealing the token from users_

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| token | address | The contract address of the token which will be transferred to `recipient` |
| amountMinimum | uint256 | The minimum amount of token required for a transfer |
| recipient | address | The destination address of the token |

