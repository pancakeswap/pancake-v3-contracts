import { BigNumber } from 'ethers'
import { ethers } from 'hardhat'
import { MockTimePancakeV3Pool } from '../../typechain-types/contracts/test/MockTimePancakeV3Pool'
import { TestERC20 } from '../../typechain-types/contracts/test/TestERC20'
import { PancakeV3Factory } from '../../typechain-types/contracts/PancakeV3Factory'
import { PancakeV3PoolDeployer } from '../../typechain-types/contracts/PancakeV3PoolDeployer'
import { TestPancakeV3Callee } from '../../typechain-types/contracts/test/TestPancakeV3Callee'
import { TestPancakeV3Router } from '../../typechain-types/contracts/test/TestPancakeV3Router'
import { MockTimePancakeV3PoolDeployer } from '../../typechain-types/contracts/test/MockTimePancakeV3PoolDeployer'
import PancakeV3LmPoolArtifact from '@pancakeswap/v3-lm-pool/artifacts/contracts/PancakeV3LmPool.sol/PancakeV3LmPool.json'

import { Fixture } from 'ethereum-waffle'

interface FactoryFixture {
  factory: PancakeV3Factory
}

interface DeployerFixture {
  deployer: PancakeV3PoolDeployer
}

async function factoryFixture(): Promise<FactoryFixture> {
  const { deployer } = await deployerFixture()
  const factoryFactory = await ethers.getContractFactory('PancakeV3Factory')
  const factory = (await factoryFactory.deploy(deployer.address)) as PancakeV3Factory
  return { factory }
}
async function deployerFixture(): Promise<DeployerFixture> {
  const deployerFactory = await ethers.getContractFactory('PancakeV3PoolDeployer')
  const deployer = (await deployerFactory.deploy()) as PancakeV3PoolDeployer
  return { deployer }
}

interface TokensFixture {
  token0: TestERC20
  token1: TestERC20
  token2: TestERC20
}

async function tokensFixture(): Promise<TokensFixture> {
  const tokenFactory = await ethers.getContractFactory('TestERC20')
  const tokenA = (await tokenFactory.deploy(BigNumber.from(2).pow(255))) as TestERC20
  const tokenB = (await tokenFactory.deploy(BigNumber.from(2).pow(255))) as TestERC20
  const tokenC = (await tokenFactory.deploy(BigNumber.from(2).pow(255))) as TestERC20

  const [token0, token1, token2] = [tokenA, tokenB, tokenC].sort((tokenA, tokenB) =>
    tokenA.address.toLowerCase() < tokenB.address.toLowerCase() ? -1 : 1
  )

  return { token0, token1, token2 }
}

type TokensAndFactoryFixture = FactoryFixture & TokensFixture

interface PoolFixture extends TokensAndFactoryFixture {
  swapTargetCallee: TestPancakeV3Callee
  swapTargetRouter: TestPancakeV3Router
  createPool(
    fee: number,
    tickSpacing: number,
    firstToken?: TestERC20,
    secondToken?: TestERC20
  ): Promise<MockTimePancakeV3Pool>
}

// Monday, October 5, 2020 9:00:00 AM GMT-05:00
export const TEST_POOL_START_TIME = 1601906400

export const poolFixture: Fixture<PoolFixture> = async function (): Promise<PoolFixture> {
  const { factory } = await factoryFixture()
  const { token0, token1, token2 } = await tokensFixture()

  const MockTimePancakeV3PoolDeployerFactory = await ethers.getContractFactory('MockTimePancakeV3PoolDeployer')
  const MockTimePancakeV3PoolFactory = await ethers.getContractFactory('MockTimePancakeV3Pool')

  const calleeContractFactory = await ethers.getContractFactory('TestPancakeV3Callee')
  const routerContractFactory = await ethers.getContractFactory('TestPancakeV3Router')

  const swapTargetCallee = (await calleeContractFactory.deploy()) as TestPancakeV3Callee
  const swapTargetRouter = (await routerContractFactory.deploy()) as TestPancakeV3Router

  const PancakeV3LmPoolFactory = await ethers.getContractFactoryFromArtifact(PancakeV3LmPoolArtifact)

  return {
    token0,
    token1,
    token2,
    factory,
    swapTargetCallee,
    swapTargetRouter,
    createPool: async (fee, tickSpacing, firstToken = token0, secondToken = token1) => {
      const mockTimePoolDeployer =
        (await MockTimePancakeV3PoolDeployerFactory.deploy()) as MockTimePancakeV3PoolDeployer
      const tx = await mockTimePoolDeployer.deploy(
        factory.address,
        firstToken.address,
        secondToken.address,
        fee,
        tickSpacing
      )

      const receipt = await tx.wait()
      const poolAddress = receipt.events?.[0].args?.pool as string

      const mockTimePancakeV3Pool = MockTimePancakeV3PoolFactory.attach(poolAddress) as MockTimePancakeV3Pool

      await (
        await factory.setLmPool(
          poolAddress,
          (
            await PancakeV3LmPoolFactory.deploy(
              poolAddress,
              ethers.constants.AddressZero,
              Math.floor(Date.now() / 1000)
            )
          ).address
        )
      ).wait()

      return mockTimePancakeV3Pool
    },
  }
}
