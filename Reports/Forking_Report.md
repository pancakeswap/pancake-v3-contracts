# PancakeSwap Custom Forking Report: Deployment Summary and Address Mapping

This report provides a summary of the steps taken to fork PancakeSwap, the responses received during the process, and the addresses of the deployed contracts.

## Deployment Process Summary

The deployment process was carried out on the Hardhat network and involved the use of the **Yarn** package manager to install dependencies and the Hardhat tool to compile and deploy the contracts.

1. The process was initiated with the `yarn` command, which completed successfully despite several warnings about unmet peer dependencies.

### Warnings Received

Here are the errors categorized into different tables based on their types:

**Dependency Errors:**

| Package/File                       | Error                                                  |
|------------------------------------|--------------------------------------------------------|
| @typechain/hardhat@6.1.5           | Unmet peer dependency: @ethersproject/abi@^5.4.7       |
| @typechain/hardhat@6.1.5           | Unmet peer dependency: @ethersproject/providers@^5.4.7 |
| @typechain/hardhat@6.1.5           | Unmet peer dependency: @typechain/ethers-v5@^10.2.0    |
| @typechain/hardhat@6.1.5           | Unmet peer dependency: ethers@^5.4.7                   |
| @typechain/hardhat@6.1.5           | Unmet peer dependency: hardhat@^2.9.9                  |
| @typechain/hardhat@6.1.5           | Unmet peer dependency: typechain@^8.1.1                |
| solidity-docgen@0.6.0-beta.35      | Unmet peer dependency: hardhat@^2.8.0                  |
| hardhat-typechain@0.3.5            | Unmet peer dependency: ts-generator@^0.1.1             |
| hardhat-typechain@0.3.5            | Unmet peer dependency: typechain@^4.0.1                |
| hardhat-tracer@2.1.2               | Unmet peer dependency: chalk@4.x                       |
| @typechain/ethers-v5@10.2.0        | Unmet peer dependency: @ethersproject/abi@^5.0.0       |
| @typechain/ethers-v5@10.2.0        | Unmet peer dependency: @ethersproject/bytes@^5.0.0     |
| @typechain/ethers-v5@10.2.0        | Unmet peer dependency: @ethersproject/providers@^5.0.0  |
| @typechain/ethers-v5@10.2.0        | Incorrect peer dependency: typescript@>=4.3.0          |
| typechain@8.1.1                    | Incorrect peer dependency: typescript@>=4.3.0          |
| @nomiclabs/truffle-contract@4.5.10 | Unmet peer dependency: web3-core-helpers@^1.2.1        |
| @nomiclabs/truffle-contract@4.5.10 | Unmet peer dependency: web3-core-promievent@^1.2.1     |
| @nomiclabs/truffle-contract@4.5.10 | Unmet peer dependency: web3-eth-abi@^1.2.1             |
| @nomiclabs/truffle-contract@4.5.10 | Unmet peer dependency: web3-utils@^1.2.1                |
| chai-bn@0.2.2                      | Unmet peer dependency: bn.js@^4.11.0                   |
| @morgan-stanley/ts-mocking-bird@0.6.4 | Incorrect peer dependency: typescript@>=4.2          |

**Contract Errors:**

| Package/File                                  | Error                                                  |
|-----------------------------------------------|--------------------------------------------------------|
| **contracts/PancakeV3Pool.sol**                   | _Contract code size exceeds 24576 bytes_                |
| **contracts/test/MockTimePancakeV3Pool.sol**       | _Contract code size exceeds 24576 bytes_                |
| **contracts/test/MockTimePancakeV3PoolDeployer.sol** | _Contract code size exceeds 24576 bytes_                |
| **@uniswap/v2-core/contracts/interfaces/IUniswapV2Pair.sol** | _SPDX license identifier not provided in source file_ |
| **contracts/NonfungibleTokenPositionDescriptorOffChain.sol** | _Unused function parameter_            |
| **contracts/NonfungibleTokenPositionDescriptorOffChainV2.sol** | _Unused function parameter_          |
| **contracts/test/OracleTest.sol**                 | _Function state mutability can be restricted to pure_   |
| **contracts/keeper/MasterChefV3KeeperV1.sol**      | _Unnamed return variable can remain unassigned_         |
| **contracts/keeper/MasterChefV3KeeperV2.sol**      | _Unnamed return variable can remain unassigned_         |

Please note that some warnings/errors may fall under multiple categories, but this categorization provides a general overview of the different types of issues encountered.

1. The `NETWORK=hardhat yarn zx v3-deploy.mjs` command was then executed to deploy the contracts on the Hardhat network. This resulted in the successful compilation and deployment of several contracts, with warnings about contract code size exceeding 24576 bytes and missing SPDX license identifiers.

2. - Additional deployment commands were executed for specific workspaces, including `@pancakeswap/smart-router`, `@pancakeswap/masterchef-v3`, and `@pancakeswap/v3-lm-pool`. 

- All these commands resulted in the successful deployment of their respective contracts.

## Deployed Contracts and Their Addresses

The following table provides a summary of the contracts that were successfully deployed on the **Hardhat network** and their respective addresses:

| Contract Name | Address |
| --- | --- |
| **MasterChefV3** | 0x5FbDB2315678afecb367f032d93F642f64180aa3 |
| **SmartRouter** | 0xe84641064Fa0584B37Af5cD6B6a1B0AD52f794fd |
| **SmartRouterHelper** | 0xFd1c95886ed063689951dBbe90F4346011f2f9b3 |
| **MixedRouteQuoterV1** | 0x71294bc306a67708c86C7EBF821CC445310003df |
| **QuoterV2** | 0x2279B7A0a67DB372996a5FaB50D91eAA73d2eBe6 |
| **TokenValidator** | 0x696D74a9E18FB97b984F95626a5038d9157c1574 |
| **PancakeV3Factory** | 0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512 |
| **PancakeV3PoolDeployer** | 0x5FbDB2315678afecb367f032d93F642f64180aa3 |
| **SwapRouter** | 0x5FbDB2315678afecb367f032d93F642f64180aa3 |
| **V3Migrator** | 0x0165878A594ca255338adfa4d48449f69242Eb8F |
| **TickLens** | 0xa513E6E4b8f2a923D98304ec87F64353C4D5C853 |
| **NonfungibleTokenPositionDescriptor** | 0xCf7Ed3AccA5a467e9e704C703E8D87F634fB0Fc9 |
| **NonfungiblePositionManager** | 0xDc64a140Aa3E981100a9becA4E685f962f0cF6C9 |
| **PancakeInterfaceMulticall** | 0x5FC8d32690cc91D4c39d9d3abcBD16989F875707 |
| **PancakeV3LmPoolDeployer** | 0x5FbDB2315678afecb367f032d93F642f64180aa3 |

Please note that these addresses are specific to the **Hardhat network** and will be different on other **networks**.

## Contract Descriptions

The following table provides a brief description of each of the deployed contracts:

| Contract Name | Description |
| --- | --- |
| **MasterChefV3** | _Manages yield farming, allowing users to stake tokens in return for rewards._ |
| **SmartRouter** | _Routes trades to the best possible path, considering factors like liquidity and slippage._ |
| **SmartRouterHelper** | _Assists the SmartRouter by providing additional functionality or data._ |
| **MixedRouteQuoterV1** | _Quotes prices for trades that involve multiple routes._ |
| **QuoterV2** | _Provides prices for trades on the exchange._ |
| **TokenValidator** | _Validates tokens, checking if a token meets certain criteria before it can be used in the system._ |
| **PancakeV3Factory** | _Creates new PancakeSwap pairs._ |
| **PancakeV3PoolDeployer** | _Deploys new PancakeSwap pools._ |
| **SwapRouter** | _Executes trades on PancakeSwap._ |
| **V3Migrator** | Migrates liquidity from V2 to V3. |
| **TickLens** | _Provides a view function to return information about multiple ticks from a pool._ |
| **NonfungibleTokenPositionDescriptor** | _Generates a URI for a given token position._ |
| **NonfungiblePositionManager** | _Simplifies the complexity associated with managing positions in PancakeSwap V3._ |
| **PancakeInterfaceMulticall** | _Makes multiple calls to the PancakeSwap interface in a single transaction._ |
| **PancakeV3LmPoolDeployer** | _Deploys new liquidity mining pools for PancakeSwap V3._ |

- Please note that these descriptions are simplified and the actual functionality of the contracts can be more complex.  
- For a full understanding, it's recommended to read the contract code or the official documentation.
