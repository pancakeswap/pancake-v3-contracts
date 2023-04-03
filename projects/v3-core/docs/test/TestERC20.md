# Solidity API

## TestERC20

### balanceOf

```solidity
mapping(address => uint256) balanceOf
```

Returns the balance of a token

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |

#### Return Values

| Name | Type | Description |
| ---- | ---- | ----------- |

### allowance

```solidity
mapping(address => mapping(address => uint256)) allowance
```

Returns the current allowance given to a spender by an owner

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |

#### Return Values

| Name | Type | Description |
| ---- | ---- | ----------- |

### constructor

```solidity
constructor(uint256 amountToMint) public
```

### mint

```solidity
function mint(address to, uint256 amount) public
```

### transfer

```solidity
function transfer(address recipient, uint256 amount) external returns (bool)
```

Transfers the amount of token from the `msg.sender` to the recipient

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| recipient | address | The account that will receive the amount transferred |
| amount | uint256 | The number of tokens to send from the sender to the recipient |

#### Return Values

| Name | Type | Description |
| ---- | ---- | ----------- |
| [0] | bool | Returns true for a successful transfer, false for an unsuccessful transfer |

### approve

```solidity
function approve(address spender, uint256 amount) external returns (bool)
```

Sets the allowance of a spender from the `msg.sender` to the value `amount`

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| spender | address | The account which will be allowed to spend a given amount of the owners tokens |
| amount | uint256 | The amount of tokens allowed to be used by `spender` |

#### Return Values

| Name | Type | Description |
| ---- | ---- | ----------- |
| [0] | bool | Returns true for a successful approval, false for unsuccessful |

### transferFrom

```solidity
function transferFrom(address sender, address recipient, uint256 amount) external returns (bool)
```

Transfers `amount` tokens from `sender` to `recipient` up to the allowance given to the `msg.sender`

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| sender | address | The account from which the transfer will be initiated |
| recipient | address | The recipient of the transfer |
| amount | uint256 | The amount of the transfer |

#### Return Values

| Name | Type | Description |
| ---- | ---- | ----------- |
| [0] | bool | Returns true for a successful transfer, false for unsuccessful |

