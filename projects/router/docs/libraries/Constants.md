# Solidity API

## Constants

Constant state used by the swap router

### CONTRACT_BALANCE

```solidity
uint256 CONTRACT_BALANCE
```

_Used for identifying cases when this contract's balance of a token is to be used_

### MSG_SENDER

```solidity
address MSG_SENDER
```

_Used as a flag for identifying msg.sender, saves gas by sending more 0 bytes_

### ADDRESS_THIS

```solidity
address ADDRESS_THIS
```

_Used as a flag for identifying address(this), saves gas by sending more 0 bytes_

