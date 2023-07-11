# PancakeSwap V3 Contracts - Custom Fork

[![License](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)

## Description

This repository contains a custom fork of the **PancakeSwap V3 Contracts**, created and maintained by **VBS - Viken Blockchain Solutions AS**. The forked version includes tailored modifications and enhancements to cater to specific requirements and use cases.

**VBS - Viken Blockchain Solutions AS** is an innovative blockchain solutions company focused on developing decentralized applications and smart contract solutions. This modified **PancakeSwap V3 Contracts** repository serves as a foundation for our custom projects, allowing us to extend the functionality of the **PancakeSwap decentralized exchange** on multiple blockchains.

**Please note that this repository is a separate instance and is not affiliated with the official PancakeSwap project.**

## Key Features and Enhancements

- Describe the main modifications, enhancements, or new features you have implemented.

## Getting Started

To get started with this custom fork of **PancakeSwap V3 Contracts**, you can follow these steps:

1. Clone the repository to your local machine:
2. `git clone https://github.com/Viken-Blockchain-Solutions/pancake-v3-contracts-custom.git`

### Deployments

1. Add Key in `.env` file. It's a private key of the account that will deploy the contracts and should be gitignored.
2. bscTestnet `KEY_TESTNET` or bsc `KEY_MAINNET`
3. add `ETHERSCAN_API_KEY` in `.env` file. It's an API key for etherscan.
4. `yarn` in root directory
5. `NETWORK=$NETWORK yarn zx v3-deploy.mjs` where `$NETWORK` is either `eth`, `goerli`, `bscMainnet`, `bscTestnet` or `hardhat` (for local testing)
6. `NETWORK=$NETWORK yarn zx v3-verify.mjs` where `$NETWORK` is either `eth`, `goerli`, `bscMainnet`, `bscTestnet` or `hardhat` (for local testing)

## Usage and Examples

Provide examples or describe how users can utilize the customized features and functionality introduced in your forked repository.

## License

Licensed under the [MIT License](LICENSE). See [LICENSE](LICENSE) for more information.

## Acknowledgments

Acknowledgments
We would like to acknowledge the following libraries, resources, and contributors whose work has been utilized or referenced within this forked repository:

- **PancakeSwap:** The original PancakeSwap project that serves as the foundation for this forked repository. We appreciate their groundbreaking work in providing decentralized exchange functionality on the Binance Smart Chain.

- **Uniswap:** The Uniswap protocol, upon which PancakeSwap is based, has been a source of inspiration and innovation for decentralized exchange designs. We acknowledge the valuable concepts and ideas provided by the Uniswap team.

- **SushiSwap:** The SushiSwap project stands as a significant contributor to the decentralized exchange landscape, and we acknowledge their influence on the wider ecosystem. Their efforts in introducing innovative features and governance mechanisms have inspired this forked repository.

- **OpenZeppelin:** The OpenZeppelin library has been utilized as a trusted resource for secure and audited smart contract development. Their comprehensive documentation and reusable code components have played a crucial role in this project.

- **Binance Smart Chain:** The underlying blockchain network that powers PancakeSwap and this custom fork of the PancakeSwap V3 Contracts. We acknowledge the robust infrastructure and ecosystem provided by the Binance Smart Chain for decentralized applications and DeFi solutions.

We extend our gratitude to all the above contributors for their meaningful contributions to the blockchain community. Their work has significantly shaped the development and customization of this project.

## Contact

For any inquiries, questions, or collaboration opportunities, feel free to reach out to VBS - Viken Blockchain Solutions AS:

- Website: [https://www.vikenblockchain.com](https://www.vikenblockchain.com)
- Email: <contact@vikenblockchain.com>

