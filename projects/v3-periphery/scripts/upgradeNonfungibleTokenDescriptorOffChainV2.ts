import { ethers, upgrades } from 'hardhat'

import NftDescriptorOffchainV2Artifact from '../artifacts/contracts/NonfungibleTokenPositionDescriptorOffChainV2.sol/NonfungibleTokenPositionDescriptorOffChainV2.json'

async function main() {
  const [owner] = await ethers.getSigners()
  console.log('owner', owner.address)

  const network = await ethers.provider.getNetwork()

  const NonfungibleTokenPositionDescriptorV2 = await ethers.getContractFactoryFromArtifact(
    NftDescriptorOffchainV2Artifact
  )
  const baseTokenUri = `https://nft.pancakeswap.com/v3/${network.chainId}/`
  console.log(baseTokenUri)
  const nonfungibleTokenPositionDescriptor = await upgrades.upgradeProxy(
    process.env.NFT_DESC_OFFCHAIN_ADDRESS!,
    NonfungibleTokenPositionDescriptorV2,
    {
      call: {
        fn: 'initializeV2',
        args: [baseTokenUri],
      },
    }
  )
  console.log('NonfungibleTokenPositionDescriptor upgraded at', nonfungibleTokenPositionDescriptor.address)
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
