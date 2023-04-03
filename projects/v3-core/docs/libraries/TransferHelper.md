# Solidity API

## TransferHelper

Contains helper methods for interacting with ERC20 tokens that do not consistently return true/false

### safeTransfer

```solidity
function safeTransfer(address token, address to, uint256 value) internal
```

Transfers tokens from msg.sender to a recipient

_Calls transfer on token contract, errors with TF if transfer fails_

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| token | address | The contract address of the token which will be transferred |
| to | address | The recipient of the transfer |
| value | uint256 | The value of the transfer |

