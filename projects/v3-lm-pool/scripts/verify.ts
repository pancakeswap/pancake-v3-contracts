import { verifyContract } from '@pancakeswap/common/verify'
import { sleep } from '@pancakeswap/common/sleep'
import { configs } from '@pancakeswap/common/config'

async function main() {
  const networkName = network.name
  const config = configs[networkName as keyof typeof configs]

  if (!config) {
    throw new Error(`No config found for network ${networkName}`)
  }
  const deployedContracts_masterchef_v3 = await import(`@pancakeswap/masterchef-v3/deployments/${networkName}.json`)
  const deployedContracts_v3_lm_pool = await import(`@pancakeswap/v3-lm-pool/deployments/${networkName}.json`)

  // Verify pancakeV3LmPoolDeployer
  console.log('Verify pancakeV3LmPoolDeployer')
  await verifyContract(deployedContracts_v3_lm_pool.PancakeV3LmPoolDeployer, [
    deployedContracts_masterchef_v3.MasterChefV3,
  ])
  await sleep(10000)
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
