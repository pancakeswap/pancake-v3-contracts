# Solidity API

## ApproveAndCall

Allows callers to approve the PancakeSwap V3 position manager from this contract,
for any token, and then make calls into the position manager

### getApprovalType

```solidity
function getApprovalType(address token, uint256 amount) external returns (enum IApproveAndCall.ApprovalType)
```

_Lens to be called off-chain to determine which (if any) of the relevant approval functions should be called_

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| token | address | The token to approve |
| amount | uint256 | The amount to approve |

#### Return Values

| Name | Type | Description |
| ---- | ---- | ----------- |
| [0] | enum IApproveAndCall.ApprovalType | The required approval type |

### approveMax

```solidity
function approveMax(address token) external payable
```

Approves a token for the maximum possible amount

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| token | address | The token to approve |

### approveMaxMinusOne

```solidity
function approveMaxMinusOne(address token) external payable
```

Approves a token for the maximum possible amount minus one

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| token | address | The token to approve |

### approveZeroThenMax

```solidity
function approveZeroThenMax(address token) external payable
```

Approves a token for zero, then the maximum possible amount

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| token | address | The token to approve |

### approveZeroThenMaxMinusOne

```solidity
function approveZeroThenMaxMinusOne(address token) external payable
```

Approves a token for zero, then the maximum possible amount minus one

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| token | address | The token to approve |

### callPositionManager

```solidity
function callPositionManager(bytes data) public payable returns (bytes result)
```

Calls the position manager with arbitrary calldata

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| data | bytes | Calldata to pass along to the position manager |

#### Return Values

| Name | Type | Description |
| ---- | ---- | ----------- |
| result | bytes | The result from the call |

### mint

```solidity
function mint(struct IApproveAndCall.MintParams params) external payable returns (bytes result)
```

Calls the position manager's mint function

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| params | struct IApproveAndCall.MintParams | Calldata to pass along to the position manager |

#### Return Values

| Name | Type | Description |
| ---- | ---- | ----------- |
| result | bytes | The result from the call |

### increaseLiquidity

```solidity
function increaseLiquidity(struct IApproveAndCall.IncreaseLiquidityParams params) external payable returns (bytes result)
```

Calls the position manager's increaseLiquidity function

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| params | struct IApproveAndCall.IncreaseLiquidityParams | Calldata to pass along to the position manager |

#### Return Values

| Name | Type | Description |
| ---- | ---- | ----------- |
| result | bytes | The result from the call |

