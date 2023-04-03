import { ethers, upgrades } from 'hardhat'

import NftDescriptorOffchainArtifact from '../artifacts/contracts/NonfungibleTokenPositionDescriptorOffChain.sol/NonfungibleTokenPositionDescriptorOffChain.json'

async function main() {
  const [owner] = await ethers.getSigners()
  console.log('owner', owner.address)

  const NonfungibleTokenPositionDescriptor = await ethers.getContractFactoryFromArtifact(NftDescriptorOffchainArtifact)
  const baseTokenUri = 'https://nft.pancakeswap.com/v3/'
  const nonfungibleTokenPositionDescriptor = await upgrades.deployProxy(NonfungibleTokenPositionDescriptor, [
    baseTokenUri,
  ])
  await nonfungibleTokenPositionDescriptor.deployed()
  console.log('NonfungibleTokenPositionDescriptor deployed at', nonfungibleTokenPositionDescriptor.address)
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
