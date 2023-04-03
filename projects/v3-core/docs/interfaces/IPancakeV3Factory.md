# Solidity API

## IPancakeV3Factory

The PancakeSwap V3 Factory facilitates creation of PancakeSwap V3 pools and control over the protocol fees

### TickSpacingExtraInfo

```solidity
struct TickSpacingExtraInfo {
  bool whitelistRequested;
  bool enabled;
}
```

### OwnerChanged

```solidity
event OwnerChanged(address oldOwner, address newOwner)
```

Emitted when the owner of the factory is changed

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| oldOwner | address | The owner before the owner was changed |
| newOwner | address | The owner after the owner was changed |

### PoolCreated

```solidity
event PoolCreated(address token0, address token1, uint24 fee, int24 tickSpacing, address pool)
```

Emitted when a pool is created

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| token0 | address | The first token of the pool by address sort order |
| token1 | address | The second token of the pool by address sort order |
| fee | uint24 | The fee collected upon every swap in the pool, denominated in hundredths of a bip |
| tickSpacing | int24 | The minimum number of ticks between initialized ticks |
| pool | address | The address of the created pool |

### FeeAmountEnabled

```solidity
event FeeAmountEnabled(uint24 fee, int24 tickSpacing)
```

Emitted when a new fee amount is enabled for pool creation via the factory

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| fee | uint24 | The enabled fee, denominated in hundredths of a bip |
| tickSpacing | int24 | The minimum number of ticks between initialized ticks for pools created with the given fee |

### FeeAmountExtraInfoUpdated

```solidity
event FeeAmountExtraInfoUpdated(uint24 fee, bool whitelistRequested, bool enabled)
```

### WhiteListAdded

```solidity
event WhiteListAdded(address user, bool verified)
```

### owner

```solidity
function owner() external view returns (address)
```

Returns the current owner of the factory

_Can be changed by the current owner via setOwner_

#### Return Values

| Name | Type | Description |
| ---- | ---- | ----------- |
| [0] | address | The address of the factory owner |

### poolDeployer

```solidity
function poolDeployer() external view returns (address)
```

Returns the current pool deployer

### feeAmountTickSpacing

```solidity
function feeAmountTickSpacing(uint24 fee) external view returns (int24)
```

Returns the tick spacing for a given fee amount, if enabled, or 0 if not enabled

_A fee amount can never be removed, so this value should be hard coded or cached in the calling context_

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| fee | uint24 | The enabled fee, denominated in hundredths of a bip. Returns 0 in case of unenabled fee |

#### Return Values

| Name | Type | Description |
| ---- | ---- | ----------- |
| [0] | int24 | The tick spacing |

### feeAmountTickSpacingExtraInfo

```solidity
function feeAmountTickSpacingExtraInfo(uint24 fee) external view returns (bool whitelistRequested, bool enabled)
```

Returns the tick spacing extra info

_A fee amount can never be removed, so this value should be hard coded or cached in the calling context_

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| fee | uint24 | The enabled fee, denominated in hundredths of a bip. Returns 0 in case of unenabled fee |

#### Return Values

| Name | Type | Description |
| ---- | ---- | ----------- |
| whitelistRequested | bool | The flag whether should be created by white list users only |
| enabled | bool |  |

### getPool

```solidity
function getPool(address tokenA, address tokenB, uint24 fee) external view returns (address pool)
```

Returns the pool address for a given pair of tokens and a fee, or address 0 if it does not exist

_tokenA and tokenB may be passed in either token0/token1 or token1/token0 order_

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| tokenA | address | The contract address of either token0 or token1 |
| tokenB | address | The contract address of the other token |
| fee | uint24 | The fee collected upon every swap in the pool, denominated in hundredths of a bip |

#### Return Values

| Name | Type | Description |
| ---- | ---- | ----------- |
| pool | address | The pool address |

### createPool

```solidity
function createPool(address tokenA, address tokenB, uint24 fee) external returns (address pool)
```

Creates a pool for the given two tokens and fee

_tokenA and tokenB may be passed in either order: token0/token1 or token1/token0. tickSpacing is retrieved
from the fee. The call will revert if the pool already exists, the fee is invalid, or the token arguments
are invalid._

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| tokenA | address | One of the two tokens in the desired pool |
| tokenB | address | The other of the two tokens in the desired pool |
| fee | uint24 | The desired fee for the pool |

#### Return Values

| Name | Type | Description |
| ---- | ---- | ----------- |
| pool | address | The address of the newly created pool |

### setOwner

```solidity
function setOwner(address _owner) external
```

Updates the owner of the factory

_Must be called by the current owner_

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| _owner | address | The new owner of the factory |

### enableFeeAmount

```solidity
function enableFeeAmount(uint24 fee, int24 tickSpacing) external
```

Enables a fee amount with the given tickSpacing

_Fee amounts may never be removed once enabled_

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| fee | uint24 | The fee amount to enable, denominated in hundredths of a bip (i.e. 1e-6) |
| tickSpacing | int24 | The spacing between ticks to be enforced for all pools created with the given fee amount |

### setWhiteListAddress

```solidity
function setWhiteListAddress(address user, bool verified) external
```

Set an address into white list

_Address can be updated by owner with boolean value false_

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| user | address | The user address that add into white list |
| verified | bool |  |

### setFeeAmountExtraInfo

```solidity
function setFeeAmountExtraInfo(uint24 fee, bool whitelistRequested, bool enabled) external
```

Set a fee amount extra info

_Fee amounts can be updated by owner with extra info_

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| fee | uint24 |  |
| whitelistRequested | bool | The flag whether should be created by owner only |
| enabled | bool | The flag is the fee is enabled or not |

