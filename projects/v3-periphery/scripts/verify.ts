import { verifyContract } from '@pancakeswap/common/verify'
import { sleep } from '@pancakeswap/common/sleep'
import { configs } from '@pancakeswap/common/config'

async function main() {
  const networkName = network.name
  const config = configs[networkName as keyof typeof configs]

  if (!config) {
    throw new Error(`No config found for network ${networkName}`)
  }
  const deployedContracts_v3_core = await import(`@pancakeswap/v3-core/deployments/${networkName}.json`)
  const deployedContracts_v3_periphery = await import(`@pancakeswap/v3-periphery/deployments/${networkName}.json`)

  // Verify swapRouter
  console.log('Verify swapRouter')
  await verifyContract(deployedContracts_v3_periphery.SwapRouter, [
    deployedContracts_v3_core.PancakeV3PoolDeployer,
    deployedContracts_v3_core.PancakeV3Factory,
    config.WNATIVE,
  ])
  await sleep(10000)

  // Verify nonfungibleTokenPositionDescriptor
  console.log('Verify nonfungibleTokenPositionDescriptor')
  await verifyContract(deployedContracts_v3_periphery.NonfungibleTokenPositionDescriptor)
  await sleep(10000)

  // Verify NonfungiblePositionManager
  console.log('Verify NonfungiblePositionManager')
  await verifyContract(deployedContracts_v3_periphery.NonfungiblePositionManager, [
    deployedContracts_v3_core.PancakeV3PoolDeployer,
    deployedContracts_v3_core.PancakeV3Factory,
    config.WNATIVE,
    deployedContracts_v3_periphery.NonfungibleTokenPositionDescriptor,
  ])
  await sleep(10000)

  // Verify pancakeInterfaceMulticall
  console.log('Verify pancakeInterfaceMulticall')
  await verifyContract(deployedContracts_v3_periphery.PancakeInterfaceMulticall)
  await sleep(10000)

  // Verify v3Migrator
  console.log('Verify v3Migrator')
  await verifyContract(deployedContracts_v3_periphery.V3Migrator, [
    deployedContracts_v3_core.PancakeV3PoolDeployer,
    deployedContracts_v3_core.PancakeV3Factory,
    config.WNATIVE,
    deployedContracts_v3_periphery.NonfungiblePositionManager,
  ])
  await sleep(10000)

  // Verify tickLens
  console.log('Verify tickLens')
  await verifyContract(deployedContracts_v3_periphery.TickLens)
  await sleep(10000)

  // Verify QuoterV2
  console.log('Verify QuoterV2')
  await verifyContract(deployedContracts_v3_periphery.QuoterV2, [
    deployedContracts_v3_core.PancakeV3PoolDeployer,
    deployedContracts_v3_core.PancakeV3Factory,
    config.WNATIVE,
  ])
  await sleep(10000)
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
