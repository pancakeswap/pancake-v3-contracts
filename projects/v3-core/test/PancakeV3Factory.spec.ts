import { Wallet } from 'ethers'
import { ethers, waffle } from 'hardhat'
import { PancakeV3Factory } from '../typechain-types/contracts/PancakeV3Factory'
import { PancakeV3PoolDeployer } from '../typechain-types/contracts/PancakeV3PoolDeployer'
import { expect } from './shared/expect'
import snapshotGasCost from './shared/snapshotGasCost'

import { FeeAmount, getCreate2Address, TICK_SPACINGS } from './shared/utilities'

const { constants } = ethers

const TEST_ADDRESSES: [string, string] = [
  '0x1000000000000000000000000000000000000000',
  '0x2000000000000000000000000000000000000000',
]

const createFixtureLoader = waffle.createFixtureLoader

describe('PancakeV3Factory', () => {
  let wallet: Wallet, other: Wallet

  let deployer: PancakeV3PoolDeployer
  let factory: PancakeV3Factory
  let poolBytecode: string
  const fixture = async () => {
    const deployerFactory = await ethers.getContractFactory('PancakeV3PoolDeployer')
    const factoryFactory = await ethers.getContractFactory('PancakeV3Factory')
    const deployer_ = (await deployerFactory.deploy()) as PancakeV3PoolDeployer
    const factory_ = (await factoryFactory.deploy(deployer_.address)) as PancakeV3Factory

    await deployer_.setFactoryAddress(factory_.address)
    return [factory_, deployer_] as [PancakeV3Factory, PancakeV3PoolDeployer]
  }

  let loadFixture: ReturnType<typeof createFixtureLoader>
  before('create fixture loader', async () => {
    ;[wallet, other] = await (ethers as any).getSigners()

    loadFixture = createFixtureLoader([wallet, other])
  })

  before('load pool bytecode', async () => {
    poolBytecode = (await ethers.getContractFactory('PancakeV3Pool')).bytecode
  })

  beforeEach('deploy factory', async () => {
    ;[factory, deployer] = await loadFixture(fixture)
  })

  it('owner is deployer', async () => {
    expect(await factory.owner()).to.eq(wallet.address)
  })

  it('factory bytecode size', async () => {
    expect(((await waffle.provider.getCode(factory.address)).length - 2) / 2).to.matchSnapshot()
  })

  it('pool bytecode size', async () => {
    await factory.createPool(TEST_ADDRESSES[0], TEST_ADDRESSES[1], FeeAmount.MEDIUM)
    const poolAddress = getCreate2Address(deployer.address, TEST_ADDRESSES, FeeAmount.MEDIUM, poolBytecode)
    expect(((await waffle.provider.getCode(poolAddress)).length - 2) / 2).to.matchSnapshot()
  })

  it('initial enabled fee amounts', async () => {
    expect(await factory.feeAmountTickSpacing(FeeAmount.LOW)).to.eq(TICK_SPACINGS[FeeAmount.LOW])
    expect(await factory.feeAmountTickSpacing(FeeAmount.MEDIUM)).to.eq(TICK_SPACINGS[FeeAmount.MEDIUM])
    expect(await factory.feeAmountTickSpacing(FeeAmount.HIGH)).to.eq(TICK_SPACINGS[FeeAmount.HIGH])
  })

  async function createAndCheckPool(
    tokens: [string, string],
    feeAmount: FeeAmount,
    tickSpacing: number = TICK_SPACINGS[feeAmount]
  ) {
    const create2Address = getCreate2Address(deployer.address, tokens, feeAmount, poolBytecode)
    const create = factory.createPool(tokens[0], tokens[1], feeAmount)

    await expect(create)
      .to.emit(factory, 'PoolCreated')
      .withArgs(TEST_ADDRESSES[0], TEST_ADDRESSES[1], feeAmount, tickSpacing, create2Address)

    await expect(factory.createPool(tokens[0], tokens[1], feeAmount)).to.be.reverted
    await expect(factory.createPool(tokens[1], tokens[0], feeAmount)).to.be.reverted
    expect(await factory.getPool(tokens[0], tokens[1], feeAmount), 'getPool in order').to.eq(create2Address)
    expect(await factory.getPool(tokens[1], tokens[0], feeAmount), 'getPool in reverse').to.eq(create2Address)

    const poolContractFactory = await ethers.getContractFactory('PancakeV3Pool')
    const pool = poolContractFactory.attach(create2Address)
    expect(await pool.factory(), 'pool factory address').to.eq(factory.address)
    expect(await pool.token0(), 'pool token0').to.eq(TEST_ADDRESSES[0])
    expect(await pool.token1(), 'pool token1').to.eq(TEST_ADDRESSES[1])
    expect(await pool.fee(), 'pool fee').to.eq(feeAmount)
    expect(await pool.tickSpacing(), 'pool tick spacing').to.eq(tickSpacing)
  }

  describe('#createPool', () => {
    it('succeeds for low fee pool', async () => {
      await createAndCheckPool(TEST_ADDRESSES, FeeAmount.LOW)
    })

    it('succeeds for medium fee pool', async () => {
      await createAndCheckPool(TEST_ADDRESSES, FeeAmount.MEDIUM)
    })
    it('succeeds for high fee pool', async () => {
      await createAndCheckPool(TEST_ADDRESSES, FeeAmount.HIGH)
    })

    it('succeeds if tokens are passed in reverse', async () => {
      await createAndCheckPool([TEST_ADDRESSES[1], TEST_ADDRESSES[0]], FeeAmount.MEDIUM)
    })

    it('fails if token a == token b', async () => {
      await expect(factory.createPool(TEST_ADDRESSES[0], TEST_ADDRESSES[0], FeeAmount.LOW)).to.be.reverted
    })

    it('fails if token a is 0 or token b is 0', async () => {
      await expect(factory.createPool(TEST_ADDRESSES[0], constants.AddressZero, FeeAmount.LOW)).to.be.reverted
      await expect(factory.createPool(constants.AddressZero, TEST_ADDRESSES[0], FeeAmount.LOW)).to.be.reverted
      await expect(factory.createPool(constants.AddressZero, constants.AddressZero, FeeAmount.LOW)).to.be.revertedWith(
        ''
      )
    })

    it('fails if fee amount is not enabled', async () => {
      await expect(factory.createPool(TEST_ADDRESSES[0], TEST_ADDRESSES[1], 250)).to.be.reverted
    })

    it('gas', async () => {
      await snapshotGasCost(factory.createPool(TEST_ADDRESSES[0], TEST_ADDRESSES[1], FeeAmount.MEDIUM))
    })
  })

  describe('#setOwner', () => {
    it('fails if caller is not owner', async () => {
      await expect(factory.connect(other).setOwner(wallet.address)).to.be.reverted
    })

    it('updates owner', async () => {
      await factory.setOwner(other.address)
      expect(await factory.owner()).to.eq(other.address)
    })

    it('emits event', async () => {
      await expect(factory.setOwner(other.address))
        .to.emit(factory, 'OwnerChanged')
        .withArgs(wallet.address, other.address)
    })

    it('cannot be called by original owner', async () => {
      await factory.setOwner(other.address)
      await expect(factory.setOwner(wallet.address)).to.be.reverted
    })
  })

  describe('#enableFeeAmount', () => {
    it('fails if caller is not owner', async () => {
      await expect(factory.connect(other).enableFeeAmount(200, 2)).to.be.reverted
    })
    it('fails if fee is too great', async () => {
      await expect(factory.enableFeeAmount(1000000, 10)).to.be.reverted
    })
    it('fails if tick spacing is too small', async () => {
      await expect(factory.enableFeeAmount(500, 0)).to.be.reverted
    })
    it('fails if tick spacing is too large', async () => {
      await expect(factory.enableFeeAmount(500, 16834)).to.be.reverted
    })
    it('fails if already initialized', async () => {
      await expect(factory.enableFeeAmount(100, 10)).to.be.reverted
    })
    it('sets the fee amount in the mapping', async () => {
      await factory.enableFeeAmount(200, 5)
      expect(await factory.feeAmountTickSpacing(200)).to.eq(5)
    })
    it('emits an event', async () => {
      await expect(factory.enableFeeAmount(200, 5)).to.emit(factory, 'FeeAmountEnabled').withArgs(200, 5)
    })
    it('enables pool creation', async () => {
      await factory.enableFeeAmount(250, 15)
      await createAndCheckPool([TEST_ADDRESSES[0], TEST_ADDRESSES[1]], 250, 15)
    })

    it('fails if enables pool creation without whitelist', async () => {
      await factory.enableFeeAmount(350, 15)
      await factory.setFeeAmountExtraInfo(350, true, true)
      await expect(createAndCheckPool([TEST_ADDRESSES[0], TEST_ADDRESSES[1]], 350, 15)).to.be.reverted
    })

    it('fails if enables pool creation without enable', async () => {
      await factory.enableFeeAmount(450, 15)
      await factory.setFeeAmountExtraInfo(450, true, false)
      await factory.setWhiteListAddress(wallet.address, true)
      await expect(createAndCheckPool([TEST_ADDRESSES[0], TEST_ADDRESSES[1]], 450, 15)).to.be.reverted
    })

    it('enables pool creation with enable and whitelist', async () => {
      await factory.enableFeeAmount(550, 15)
      await factory.setFeeAmountExtraInfo(550, true, true)
      await factory.setWhiteListAddress(wallet.address, true)
      createAndCheckPool([TEST_ADDRESSES[0], TEST_ADDRESSES[1]], 550, 15)
    })
  })
})
