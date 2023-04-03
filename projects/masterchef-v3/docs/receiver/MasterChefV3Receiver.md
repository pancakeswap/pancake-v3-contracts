# Solidity API

## MasterChefV3Receiver

### Cake

```solidity
contract IERC20 Cake
```

### MasterChefV2

```solidity
contract IMasterChefV2 MasterChefV2
```

### V2_Pid

```solidity
uint256 V2_Pid
```

### MasterChefV3

```solidity
contract IMasterChefV3 MasterChefV3
```

### operatorAddress

```solidity
address operatorAddress
```

### NotOwnerOrOperator

```solidity
error NotOwnerOrOperator()
```

### ZeroAddress

```solidity
error ZeroAddress()
```

### NoBalance

```solidity
error NoBalance()
```

### Deposit

```solidity
event Deposit(address from, address to, uint256 amount, uint256 pid)
```

### NewOperator

```solidity
event NewOperator(address operatorAddress)
```

### Upkeep

```solidity
event Upkeep(address to, uint256 amount)
```

### Withdraw

```solidity
event Withdraw(address token, address to, uint256 amount)
```

### onlyOwnerOrOperator

```solidity
modifier onlyOwnerOrOperator()
```

### constructor

```solidity
constructor(contract IMasterChefV2 _v2, contract IMasterChefV3 _v3, contract IERC20 _cake, uint256 _v2Pid) public
```

Constructor.

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| _v2 | contract IMasterChefV2 | MasterChef V2 address. |
| _v3 | contract IMasterChefV3 | MasterChef V3 address. |
| _cake | contract IERC20 | Cake token address. |
| _v2Pid | uint256 | The pool id of the dummy pool on the MCV2. |

### depositForMasterChefV2Pool

```solidity
function depositForMasterChefV2Pool(contract IERC20 _dummyToken) external
```

Deposits a dummy token to `MASTER_CHEF` MCV2. It will transfer all the `dummyToken` in the tx sender address.

_Callable by owner._

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| _dummyToken | contract IERC20 | The address of the token to be deposited into MCV2. |

### harvestFromV2

```solidity
function harvestFromV2() internal
```

Harvest pending CAKE tokens from MasterChef V2.

### upkeep

```solidity
function upkeep(uint256 _amount, uint256 _duration, bool _withUpdate) external
```

upkeep.

_Callable by owner or operator._

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| _amount | uint256 | Injection amount, the injection amount can be flexibly controlled. |
| _duration | uint256 | The period duration. |
| _withUpdate | bool | Whether call "massUpdatePools" operation. |

### setOperator

```solidity
function setOperator(address _operatorAddress) external
```

Set operator address.

_Callable by owner._

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| _operatorAddress | address | New operator address. |

### withdraw

```solidity
function withdraw(contract IERC20 _token) external
```

Withdraw unexpected tokens sent to the receiver, can also withdraw cake.

_Callable by owner._

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| _token | contract IERC20 | Token address. |

