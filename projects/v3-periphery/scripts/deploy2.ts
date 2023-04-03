import bn from 'bignumber.js'
import { Contract, ContractFactory, utils, BigNumber } from 'ethers'
import { ethers, upgrades, network } from 'hardhat'
import { linkLibraries } from '../util/linkLibraries'
import { tryVerify } from '@pancakeswap/common/verify'
import { configs } from '@pancakeswap/common/config'
import fs from 'fs'

type ContractJson = { abi: any; bytecode: string }
const artifacts: { [name: string]: ContractJson } = {
  QuoterV2: require('../artifacts/contracts/lens/QuoterV2.sol/QuoterV2.json'),
  TickLens: require('../artifacts/contracts/lens/TickLens.sol/TickLens.json'),
  V3Migrator: require('../artifacts/contracts/V3Migrator.sol/V3Migrator.json'),
  PancakeInterfaceMulticall: require('../artifacts/contracts/lens/PancakeInterfaceMulticall.sol/PancakeInterfaceMulticall.json'),
  // eslint-disable-next-line global-require
  SwapRouter: require('../artifacts/contracts/SwapRouter.sol/SwapRouter.json'),
  // eslint-disable-next-line global-require
  NFTDescriptor: require('../artifacts/contracts/libraries/NFTDescriptor.sol/NFTDescriptor.json'),
  // eslint-disable-next-line global-require
  NFTDescriptorEx: require('../artifacts/contracts/NFTDescriptorEx.sol/NFTDescriptorEx.json'),
  // eslint-disable-next-line global-require
  NonfungibleTokenPositionDescriptor: require('../artifacts/contracts/NonfungibleTokenPositionDescriptor.sol/NonfungibleTokenPositionDescriptor.json'),
  // eslint-disable-next-line global-require
  NonfungibleTokenPositionDescriptorOffChain: require('../artifacts/contracts/NonfungibleTokenPositionDescriptorOffChain.sol/NonfungibleTokenPositionDescriptorOffChain.json'),
  // eslint-disable-next-line global-require
  NonfungiblePositionManager: require('../artifacts/contracts/NonfungiblePositionManager.sol/NonfungiblePositionManager.json'),
}

bn.config({ EXPONENTIAL_AT: 999999, DECIMAL_PLACES: 40 })
function encodePriceSqrt(reserve1: any, reserve0: any) {
  return BigNumber.from(
    // eslint-disable-next-line new-cap
    new bn(reserve1.toString())
      .div(reserve0.toString())
      .sqrt()
      // eslint-disable-next-line new-cap
      .multipliedBy(new bn(2).pow(96))
      .integerValue(3)
      .toString()
  )
}

function isAscii(str: string): boolean {
  return /^[\x00-\x7F]*$/.test(str)
}
function asciiStringToBytes32(str: string): string {
  if (str.length > 32 || !isAscii(str)) {
    throw new Error('Invalid label, must be less than 32 characters')
  }

  return '0x' + Buffer.from(str, 'ascii').toString('hex').padEnd(64, '0')
}

async function main() {
  const [owner] = await ethers.getSigners()
  const networkName = network.name
  console.log('owner', owner.address)

  const config = configs[networkName as keyof typeof configs]

  if (!config) {
    throw new Error(`No config found for network ${networkName}`)
  }

  const deployedContracts = await import(`@pancakeswap/v3-core/deployments/${networkName}.json`)

  const pancakeV3PoolDeployer_address = deployedContracts.PancakeV3PoolDeployer
  const pancakeV3Factory_address = deployedContracts.PancakeV3Factory

  const SwapRouter = new ContractFactory(artifacts.SwapRouter.abi, artifacts.SwapRouter.bytecode, owner)
  const swapRouter = await SwapRouter.deploy(pancakeV3PoolDeployer_address, pancakeV3Factory_address, config.WNATIVE)

  // await tryVerify(swapRouter, [pancakeV3PoolDeployer_address, pancakeV3Factory_address, config.WNATIVE])
  console.log('swapRouter', swapRouter.address)

  // const NFTDescriptor = new ContractFactory(artifacts.NFTDescriptor.abi, artifacts.NFTDescriptor.bytecode, owner)
  // const nftDescriptor = await NFTDescriptor.deploy()
  // await tryVerify(nftDescriptor)
  // console.log('nftDescriptor', nftDescriptor.address)

  // const NFTDescriptorEx = new ContractFactory(artifacts.NFTDescriptorEx.abi, artifacts.NFTDescriptorEx.bytecode, owner)
  // const nftDescriptorEx = await NFTDescriptorEx.deploy()
  // await tryVerify(nftDescriptorEx)
  // console.log('nftDescriptorEx', nftDescriptorEx.address)

  // const linkedBytecode = linkLibraries(
  //   {
  //     bytecode: artifacts.NonfungibleTokenPositionDescriptor.bytecode,
  //     linkReferences: {
  //       'NFTDescriptor.sol': {
  //         NFTDescriptor: [
  //           {
  //             length: 20,
  //             start: 1261,
  //           },
  //         ],
  //       },
  //     },
  //   },
  //   {
  //     NFTDescriptor: nftDescriptor.address,
  //   }
  // )

  // const NonfungibleTokenPositionDescriptor = new ContractFactory(
  //   artifacts.NonfungibleTokenPositionDescriptor.abi,
  //   linkedBytecode,
  //   owner
  // )
  // const nonfungibleTokenPositionDescriptor = await NonfungibleTokenPositionDescriptor.deploy(
  //   config.WNATIVE,
  //   asciiStringToBytes32(config.nativeCurrencyLabel),
  //   nftDescriptorEx.address
  // )

  // await tryVerify(nonfungibleTokenPositionDescriptor, [
  //   config.WNATIVE,
  //   asciiStringToBytes32(config.nativeCurrencyLabel),
  //   nftDescriptorEx.address,
  // ])
  // console.log('nonfungibleTokenPositionDescriptor', nonfungibleTokenPositionDescriptor.address)

  // off chain version
  const NonfungibleTokenPositionDescriptor = new ContractFactory(
    artifacts.NonfungibleTokenPositionDescriptorOffChain.abi,
    artifacts.NonfungibleTokenPositionDescriptorOffChain.bytecode,
    owner
  )
  const baseTokenUri = 'https://nft.pancakeswap.com/v3/'
  const nonfungibleTokenPositionDescriptor = await upgrades.deployProxy(NonfungibleTokenPositionDescriptor, [
    baseTokenUri,
  ])
  await nonfungibleTokenPositionDescriptor.deployed()
  console.log('nonfungibleTokenPositionDescriptor', nonfungibleTokenPositionDescriptor.address)

  // await tryVerify(nonfungibleTokenPositionDescriptor)

  const NonfungiblePositionManager = new ContractFactory(
    artifacts.NonfungiblePositionManager.abi,
    artifacts.NonfungiblePositionManager.bytecode,
    owner
  )
  const nonfungiblePositionManager = await NonfungiblePositionManager.deploy(
    pancakeV3PoolDeployer_address,
    pancakeV3Factory_address,
    config.WNATIVE,
    nonfungibleTokenPositionDescriptor.address
  )

  // await tryVerify(nonfungiblePositionManager, [
  //   pancakeV3PoolDeployer_address,
  //   pancakeV3Factory_address,
  //   config.WNATIVE,
  //   nonfungibleTokenPositionDescriptor.address,
  // ])
  console.log('nonfungiblePositionManager', nonfungiblePositionManager.address)

  const PancakeInterfaceMulticall = new ContractFactory(
    artifacts.PancakeInterfaceMulticall.abi,
    artifacts.PancakeInterfaceMulticall.bytecode,
    owner
  )

  const pancakeInterfaceMulticall = await PancakeInterfaceMulticall.deploy()
  console.log('PancakeInterfaceMulticall', pancakeInterfaceMulticall.address)

  // await tryVerify(pancakeInterfaceMulticall)

  const V3Migrator = new ContractFactory(artifacts.V3Migrator.abi, artifacts.V3Migrator.bytecode, owner)
  const v3Migrator = await V3Migrator.deploy(
    pancakeV3PoolDeployer_address,
    pancakeV3Factory_address,
    config.WNATIVE,
    nonfungiblePositionManager.address
  )
  console.log('V3Migrator', v3Migrator.address)

  // await tryVerify(v3Migrator, [
  //   pancakeV3PoolDeployer_address,
  //   pancakeV3Factory_address,
  //   config.WNATIVE,
  //   nonfungiblePositionManager.address,
  // ])

  const TickLens = new ContractFactory(artifacts.TickLens.abi, artifacts.TickLens.bytecode, owner)
  const tickLens = await TickLens.deploy()
  console.log('TickLens', tickLens.address)

  // await tryVerify(tickLens)

  const QuoterV2 = new ContractFactory(artifacts.QuoterV2.abi, artifacts.QuoterV2.bytecode, owner)
  const quoterV2 = await QuoterV2.deploy(pancakeV3PoolDeployer_address, pancakeV3Factory_address, config.WNATIVE)
  console.log('QuoterV2', quoterV2.address)

  // await tryVerify(quoterV2, [pancakeV3PoolDeployer_address, pancakeV3Factory_address, config.WNATIVE])

  const contracts = {
    SwapRouter: swapRouter.address,
    V3Migrator: v3Migrator.address,
    QuoterV2: quoterV2.address,
    TickLens: tickLens.address,
    // NFTDescriptor: nftDescriptor.address,
    // NFTDescriptorEx: nftDescriptorEx.address,
    NonfungibleTokenPositionDescriptor: nonfungibleTokenPositionDescriptor.address,
    NonfungiblePositionManager: nonfungiblePositionManager.address,
    PancakeInterfaceMulticall: pancakeInterfaceMulticall.address,
  }

  fs.writeFileSync(`./deployments/${networkName}.json`, JSON.stringify(contracts, null, 2))
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
