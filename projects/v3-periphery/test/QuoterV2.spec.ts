import { Fixture } from 'ethereum-waffle'
import { constants, Wallet } from 'ethers'
import { ethers, waffle } from 'hardhat'
import { MockTimeNonfungiblePositionManager, QuoterV2, TestERC20 } from '../typechain'
import completeFixture from './shared/completeFixture'
import { FeeAmount, MaxUint128 } from './shared/constants'
import { encodePriceSqrt } from './shared/encodePriceSqrt'
import { expandTo18Decimals } from './shared/expandTo18Decimals'
import { expect } from './shared/expect'
import { encodePath } from './shared/path'
import { createPool, createPoolWithMultiplePositions, createPoolWithZeroTickInitialized } from './shared/quoter'
import snapshotGasCost from './shared/snapshotGasCost'

describe('QuoterV2', function () {
  this.timeout(40000)
  let wallet: Wallet
  let trader: Wallet

  const swapRouterFixture: Fixture<{
    nft: MockTimeNonfungiblePositionManager
    tokens: [TestERC20, TestERC20, TestERC20]
    quoter: QuoterV2
  }> = async (wallets, provider) => {
    const { weth9, factory, router, tokens, nft, deployer } = await completeFixture(wallets, provider)

    // approve & fund wallets
    for (const token of tokens) {
      await token.approve(router.address, constants.MaxUint256)
      await token.approve(nft.address, constants.MaxUint256)
      await token.connect(trader).approve(router.address, constants.MaxUint256)
      await token.transfer(trader.address, expandTo18Decimals(1_000_000))
    }

    const quoterFactory = await ethers.getContractFactory('QuoterV2')
    quoter = (await quoterFactory.deploy(deployer.address, factory.address, weth9.address)) as QuoterV2

    return {
      tokens,
      nft,
      quoter,
    }
  }

  let nft: MockTimeNonfungiblePositionManager
  let tokens: [TestERC20, TestERC20, TestERC20]
  let quoter: QuoterV2

  let loadFixture: ReturnType<typeof waffle.createFixtureLoader>

  before('create fixture loader', async () => {
    const wallets = await (ethers as any).getSigners()
    ;[wallet, trader] = wallets
    loadFixture = waffle.createFixtureLoader(wallets)
  })

  // helper for getting weth and token balances
  beforeEach('load fixture', async () => {
    ;({ tokens, nft, quoter } = await loadFixture(swapRouterFixture))
  })

  describe('quotes', () => {
    beforeEach(async () => {
      await createPool(nft, wallet, tokens[0].address, tokens[1].address)
      await createPool(nft, wallet, tokens[1].address, tokens[2].address)
      await createPoolWithMultiplePositions(nft, wallet, tokens[0].address, tokens[2].address)
    })

    describe('#quoteExactInput', () => {
      it('0 -> 2 cross 2 tick', async () => {
        const {
          amountOut,
          sqrtPriceX96AfterList,
          initializedTicksCrossedList,
          gasEstimate,
        } = await quoter.callStatic.quoteExactInput(
          encodePath([tokens[0].address, tokens[2].address], [FeeAmount.MEDIUM]),
          10000
        )

        await snapshotGasCost(gasEstimate)
        expect(sqrtPriceX96AfterList.length).to.eq(1)
        expect(sqrtPriceX96AfterList[0]).to.eq('78461416398214494518137075974')
        expect(initializedTicksCrossedList[0]).to.eq(2)
        expect(amountOut).to.eq(9876)
      })

      it('0 -> 2 cross 2 tick where after is initialized', async () => {
        // The swap amount is set such that the active tick after the swap is -120.
        // -120 is an initialized tick for this pool. We check that we don't count it.
        const {
          amountOut,
          sqrtPriceX96AfterList,
          initializedTicksCrossedList,
          gasEstimate,
        } = await quoter.callStatic.quoteExactInput(
          encodePath([tokens[0].address, tokens[2].address], [FeeAmount.MEDIUM]),
          4000
        )

        await snapshotGasCost(gasEstimate)
        expect(sqrtPriceX96AfterList.length).to.eq(1)
        expect(sqrtPriceX96AfterList[0]).to.eq('78927310518123281494584640269')
        expect(initializedTicksCrossedList.length).to.eq(1)
        expect(initializedTicksCrossedList[0]).to.eq(1)
        expect(amountOut).to.eq(3972)
      })

      it('0 -> 2 cross 1 tick', async () => {
        const {
          amountOut,
          sqrtPriceX96AfterList,
          initializedTicksCrossedList,
          gasEstimate,
        } = await quoter.callStatic.quoteExactInput(
          encodePath([tokens[0].address, tokens[2].address], [FeeAmount.MEDIUM]),
          4000
        )

        await snapshotGasCost(gasEstimate)
        expect(initializedTicksCrossedList[0]).to.eq(1)
        expect(sqrtPriceX96AfterList.length).to.eq(1)
        expect(sqrtPriceX96AfterList[0]).to.eq('78927310518123281494584640269')
        expect(amountOut).to.eq(3972)
      })

      it('0 -> 2 cross 0 tick, starting tick not initialized', async () => {
        // Tick before 0, tick after -1.
        const {
          amountOut,
          sqrtPriceX96AfterList,
          initializedTicksCrossedList,
          gasEstimate,
        } = await quoter.callStatic.quoteExactInput(
          encodePath([tokens[0].address, tokens[2].address], [FeeAmount.MEDIUM]),
          10
        )

        await snapshotGasCost(gasEstimate)
        expect(initializedTicksCrossedList[0]).to.eq(0)
        expect(sqrtPriceX96AfterList.length).to.eq(1)
        expect(sqrtPriceX96AfterList[0]).to.eq('79227489893387837394472208959')
        expect(amountOut).to.eq(8)
      })

      it('0 -> 2 cross 0 tick, starting tick initialized', async () => {
        // Tick before 0, tick after -1. Tick 0 initialized.
        await createPoolWithZeroTickInitialized(nft, wallet, tokens[0].address, tokens[2].address)

        const {
          amountOut,
          sqrtPriceX96AfterList,
          initializedTicksCrossedList,
          gasEstimate,
        } = await quoter.callStatic.quoteExactInput(
          encodePath([tokens[0].address, tokens[2].address], [FeeAmount.MEDIUM]),
          10
        )

        await snapshotGasCost(gasEstimate)
        expect(initializedTicksCrossedList[0]).to.eq(1)
        expect(sqrtPriceX96AfterList.length).to.eq(1)
        expect(sqrtPriceX96AfterList[0]).to.eq('79227819726962271179018578096')
        expect(amountOut).to.eq(8)
      })

      it('2 -> 0 cross 2', async () => {
        const {
          amountOut,
          sqrtPriceX96AfterList,
          initializedTicksCrossedList,
          gasEstimate,
        } = await quoter.callStatic.quoteExactInput(
          encodePath([tokens[2].address, tokens[0].address], [FeeAmount.MEDIUM]),
          10000
        )

        await snapshotGasCost(gasEstimate)
        expect(initializedTicksCrossedList[0]).to.eq(2)
        expect(sqrtPriceX96AfterList.length).to.eq(1)
        expect(sqrtPriceX96AfterList[0]).to.eq('80002401480092647043275825331')
        expect(initializedTicksCrossedList.length).to.eq(1)
        expect(amountOut).to.eq(9876)
      })

      it('2 -> 0 cross 2 where tick after is initialized', async () => {
        // The swap amount is set such that the active tick after the swap is 120.
        // 120 is an initialized tick for this pool. We check we don't count it.
        const {
          amountOut,
          sqrtPriceX96AfterList,
          initializedTicksCrossedList,
          gasEstimate,
        } = await quoter.callStatic.quoteExactInput(
          encodePath([tokens[2].address, tokens[0].address], [FeeAmount.MEDIUM]),
          6250
        )

        await snapshotGasCost(gasEstimate)
        expect(initializedTicksCrossedList[0]).to.eq(2)
        expect(sqrtPriceX96AfterList.length).to.eq(1)
        expect(sqrtPriceX96AfterList[0]).to.eq('79706008924126784156338377413')
        expect(initializedTicksCrossedList.length).to.eq(1)
        expect(amountOut).to.eq(6193)
      })

      it('2 -> 0 cross 0 tick, starting tick initialized', async () => {
        // Tick 0 initialized. Tick after = 1
        await createPoolWithZeroTickInitialized(nft, wallet, tokens[0].address, tokens[2].address)

        const {
          amountOut,
          sqrtPriceX96AfterList,
          initializedTicksCrossedList,
          gasEstimate,
        } = await quoter.callStatic.quoteExactInput(
          encodePath([tokens[2].address, tokens[0].address], [FeeAmount.MEDIUM]),
          200
        )

        await snapshotGasCost(gasEstimate)
        expect(initializedTicksCrossedList[0]).to.eq(0)
        expect(sqrtPriceX96AfterList.length).to.eq(1)
        expect(sqrtPriceX96AfterList[0]).to.eq('79235669771747875048246634302')
        expect(initializedTicksCrossedList.length).to.eq(1)
        expect(amountOut).to.eq(198)
      })

      it('2 -> 0 cross 0 tick, starting tick not initialized', async () => {
        // Tick 0 initialized. Tick after = 1
        const {
          amountOut,
          sqrtPriceX96AfterList,
          initializedTicksCrossedList,
          gasEstimate,
        } = await quoter.callStatic.quoteExactInput(
          encodePath([tokens[2].address, tokens[0].address], [FeeAmount.MEDIUM]),
          103
        )

        await snapshotGasCost(gasEstimate)
        expect(initializedTicksCrossedList[0]).to.eq(0)
        expect(sqrtPriceX96AfterList.length).to.eq(1)
        expect(sqrtPriceX96AfterList[0]).to.eq('79235785615582280248582697969')
        expect(initializedTicksCrossedList.length).to.eq(1)
        expect(amountOut).to.eq(101)
      })

      it('2 -> 1', async () => {
        const {
          amountOut,
          sqrtPriceX96AfterList,
          initializedTicksCrossedList,
          gasEstimate,
        } = await quoter.callStatic.quoteExactInput(
          encodePath([tokens[2].address, tokens[1].address], [FeeAmount.MEDIUM]),
          10000
        )

        await snapshotGasCost(gasEstimate)
        expect(sqrtPriceX96AfterList.length).to.eq(1)
        expect(sqrtPriceX96AfterList[0]).to.eq('80018463435344124361039551240')
        expect(initializedTicksCrossedList[0]).to.eq(0)
        expect(amountOut).to.eq(9876)
      })

      it('0 -> 2 -> 1', async () => {
        const {
          amountOut,
          sqrtPriceX96AfterList,
          initializedTicksCrossedList,
          gasEstimate,
        } = await quoter.callStatic.quoteExactInput(
          encodePath([tokens[0].address, tokens[2].address, tokens[1].address], [FeeAmount.MEDIUM, FeeAmount.MEDIUM]),
          10000
        )

        await snapshotGasCost(gasEstimate)
        expect(sqrtPriceX96AfterList.length).to.eq(2)
        expect(sqrtPriceX96AfterList[0]).to.eq('78461416398214494518137075974')
        expect(sqrtPriceX96AfterList[1]).to.eq('80008639143192355583177951790')
        expect(initializedTicksCrossedList[0]).to.eq(2)
        expect(initializedTicksCrossedList[1]).to.eq(0)
        expect(amountOut).to.eq(9754)
      })
    })

    describe('#quoteExactInputSingle', () => {
      it('0 -> 2', async () => {
        const {
          amountOut: quote,
          sqrtPriceX96After,
          initializedTicksCrossed,
          gasEstimate,
        } = await quoter.callStatic.quoteExactInputSingle({
          tokenIn: tokens[0].address,
          tokenOut: tokens[2].address,
          fee: FeeAmount.MEDIUM,
          amountIn: 10000,
          // -2%
          sqrtPriceLimitX96: encodePriceSqrt(100, 102),
        })

        await snapshotGasCost(gasEstimate)
        expect(initializedTicksCrossed).to.eq(2)
        expect(quote).to.eq(9876)
        expect(sqrtPriceX96After).to.eq('78461416398214494518137075974')
      })

      it('2 -> 0', async () => {
        const {
          amountOut: quote,
          sqrtPriceX96After,
          initializedTicksCrossed,
          gasEstimate,
        } = await quoter.callStatic.quoteExactInputSingle({
          tokenIn: tokens[2].address,
          tokenOut: tokens[0].address,
          fee: FeeAmount.MEDIUM,
          amountIn: 10000,
          // +2%
          sqrtPriceLimitX96: encodePriceSqrt(102, 100),
        })

        await snapshotGasCost(gasEstimate)
        expect(initializedTicksCrossed).to.eq(2)
        expect(quote).to.eq(9876)
        expect(sqrtPriceX96After).to.eq('80002401480092647043275825331')
      })
    })

    describe('#quoteExactOutput', () => {
      it('0 -> 2 cross 2 tick', async () => {
        const {
          amountIn,
          sqrtPriceX96AfterList,
          initializedTicksCrossedList,
          gasEstimate,
        } = await quoter.callStatic.quoteExactOutput(
          encodePath([tokens[2].address, tokens[0].address], [FeeAmount.MEDIUM]),
          15000
        )

        await snapshotGasCost(gasEstimate)
        expect(initializedTicksCrossedList.length).to.eq(1)
        expect(initializedTicksCrossedList[0]).to.eq(2)
        expect(amountIn).to.eq(15266)

        expect(sqrtPriceX96AfterList.length).to.eq(1)
        expect(sqrtPriceX96AfterList[0]).to.eq('78055484925225186366719814250')
      })

      it('0 -> 2 cross 2 where tick after is initialized', async () => {
        // The swap amount is set such that the active tick after the swap is -120.
        // -120 is an initialized tick for this pool. We check that we count it.
        const {
          amountIn,
          sqrtPriceX96AfterList,
          initializedTicksCrossedList,
          gasEstimate,
        } = await quoter.callStatic.quoteExactOutput(
          encodePath([tokens[2].address, tokens[0].address], [FeeAmount.MEDIUM]),
          4000
        )

        await snapshotGasCost(gasEstimate)
        expect(sqrtPriceX96AfterList.length).to.eq(1)
        expect(sqrtPriceX96AfterList[0]).to.eq('78925183124234553652466484583')
        expect(initializedTicksCrossedList.length).to.eq(1)
        expect(initializedTicksCrossedList[0]).to.eq(1)
        expect(amountIn).to.eq(4028)
      })

      it('0 -> 2 cross 1 tick', async () => {
        const {
          amountIn,
          sqrtPriceX96AfterList,
          initializedTicksCrossedList,
          gasEstimate,
        } = await quoter.callStatic.quoteExactOutput(
          encodePath([tokens[2].address, tokens[0].address], [FeeAmount.MEDIUM]),
          4000
        )

        await snapshotGasCost(gasEstimate)
        expect(initializedTicksCrossedList.length).to.eq(1)
        expect(initializedTicksCrossedList[0]).to.eq(1)
        expect(amountIn).to.eq(4028)

        expect(sqrtPriceX96AfterList.length).to.eq(1)
        expect(sqrtPriceX96AfterList[0]).to.eq('78925183124234553652466484583')
      })

      it('0 -> 2 cross 0 tick starting tick initialized', async () => {
        // Tick before 0, tick after 1. Tick 0 initialized.
        await createPoolWithZeroTickInitialized(nft, wallet, tokens[0].address, tokens[2].address)
        const {
          amountIn,
          sqrtPriceX96AfterList,
          initializedTicksCrossedList,
          gasEstimate,
        } = await quoter.callStatic.quoteExactOutput(
          encodePath([tokens[2].address, tokens[0].address], [FeeAmount.MEDIUM]),
          100
        )

        await snapshotGasCost(gasEstimate)
        expect(initializedTicksCrossedList.length).to.eq(1)
        expect(initializedTicksCrossedList[0]).to.eq(1)
        expect(amountIn).to.eq(102)

        expect(sqrtPriceX96AfterList.length).to.eq(1)
        expect(sqrtPriceX96AfterList[0]).to.eq('79224353749984660976447641891')
      })

      it('0 -> 2 cross 0 tick starting tick not initialized', async () => {
        const {
          amountIn,
          sqrtPriceX96AfterList,
          initializedTicksCrossedList,
          gasEstimate,
        } = await quoter.callStatic.quoteExactOutput(
          encodePath([tokens[2].address, tokens[0].address], [FeeAmount.MEDIUM]),
          10
        )

        await snapshotGasCost(gasEstimate)
        expect(initializedTicksCrossedList.length).to.eq(1)
        expect(initializedTicksCrossedList[0]).to.eq(0)
        expect(amountIn).to.eq(12)

        expect(sqrtPriceX96AfterList.length).to.eq(1)
        expect(sqrtPriceX96AfterList[0]).to.eq('79227415151390029490108778999')
      })

      it('2 -> 0 cross 2 ticks', async () => {
        const {
          amountIn,
          sqrtPriceX96AfterList,
          initializedTicksCrossedList,
          gasEstimate,
        } = await quoter.callStatic.quoteExactOutput(
          encodePath([tokens[0].address, tokens[2].address], [FeeAmount.MEDIUM]),
          15000
        )

        await snapshotGasCost(gasEstimate)
        expect(initializedTicksCrossedList.length).to.eq(1)
        expect(initializedTicksCrossedList[0]).to.eq(2)
        expect(amountIn).to.eq(15266)
        expect(sqrtPriceX96AfterList.length).to.eq(1)
        expect(sqrtPriceX96AfterList[0]).to.eq('80418457990491712052658169814')
      })

      it('2 -> 0 cross 2 where tick after is initialized', async () => {
        // The swap amount is set such that the active tick after the swap is 120.
        // 120 is an initialized tick for this pool. We check that we don't count it.
        const {
          amountIn,
          sqrtPriceX96AfterList,
          initializedTicksCrossedList,
          gasEstimate,
        } = await quoter.callStatic.quoteExactOutput(
          encodePath([tokens[0].address, tokens[2].address], [FeeAmount.MEDIUM]),
          6223
        )

        await snapshotGasCost(gasEstimate)
        expect(initializedTicksCrossedList[0]).to.eq(2)
        expect(sqrtPriceX96AfterList.length).to.eq(1)
        expect(sqrtPriceX96AfterList[0]).to.eq('79708347284616623071328874084')
        expect(initializedTicksCrossedList.length).to.eq(1)
        expect(amountIn).to.eq(6280)
      })

      it('2 -> 0 cross 1 tick', async () => {
        const {
          amountIn,
          sqrtPriceX96AfterList,
          initializedTicksCrossedList,
          gasEstimate,
        } = await quoter.callStatic.quoteExactOutput(
          encodePath([tokens[0].address, tokens[2].address], [FeeAmount.MEDIUM]),
          5000
        )

        await snapshotGasCost(gasEstimate)
        expect(initializedTicksCrossedList[0]).to.eq(1)
        expect(sqrtPriceX96AfterList.length).to.eq(1)
        expect(sqrtPriceX96AfterList[0]).to.eq('79610650345278553149096442257')
        expect(initializedTicksCrossedList.length).to.eq(1)
        expect(amountIn).to.eq(5039)
      })

      it('2 -> 1', async () => {
        const {
          amountIn,
          sqrtPriceX96AfterList,
          initializedTicksCrossedList,
          gasEstimate,
        } = await quoter.callStatic.quoteExactOutput(
          encodePath([tokens[1].address, tokens[2].address], [FeeAmount.MEDIUM]),
          9876
        )

        await snapshotGasCost(gasEstimate)
        expect(sqrtPriceX96AfterList.length).to.eq(1)
        expect(sqrtPriceX96AfterList[0]).to.eq('80018424474373247788705202921')
        expect(initializedTicksCrossedList[0]).to.eq(0)
        expect(amountIn).to.eq(10000)
      })

      it('0 -> 2 -> 1', async () => {
        const {
          amountIn,
          sqrtPriceX96AfterList,
          initializedTicksCrossedList,
          gasEstimate,
        } = await quoter.callStatic.quoteExactOutput(
          encodePath([tokens[0].address, tokens[2].address, tokens[1].address].reverse(), [
            FeeAmount.MEDIUM,
            FeeAmount.MEDIUM,
          ]),
          9754
        )

        await snapshotGasCost(gasEstimate)
        expect(sqrtPriceX96AfterList.length).to.eq(2)
        expect(sqrtPriceX96AfterList[0]).to.eq('80008566067688571924091539210')
        expect(sqrtPriceX96AfterList[1]).to.eq('78461450029948276832549133451')
        expect(initializedTicksCrossedList[0]).to.eq(0)
        expect(initializedTicksCrossedList[1]).to.eq(2)
        expect(amountIn).to.eq(10000)
      })
    })

    describe('#quoteExactOutputSingle', () => {
      it('0 -> 1', async () => {
        const {
          amountIn,
          sqrtPriceX96After,
          initializedTicksCrossed,
          gasEstimate,
        } = await quoter.callStatic.quoteExactOutputSingle({
          tokenIn: tokens[0].address,
          tokenOut: tokens[1].address,
          fee: FeeAmount.MEDIUM,
          amount: MaxUint128,
          sqrtPriceLimitX96: encodePriceSqrt(100, 102),
        })

        await snapshotGasCost(gasEstimate)
        expect(amountIn).to.eq(9976)
        expect(initializedTicksCrossed).to.eq(0)
        expect(sqrtPriceX96After).to.eq('78447570448055484695608110440')
      })

      it('1 -> 0', async () => {
        const {
          amountIn,
          sqrtPriceX96After,
          initializedTicksCrossed,
          gasEstimate,
        } = await quoter.callStatic.quoteExactOutputSingle({
          tokenIn: tokens[1].address,
          tokenOut: tokens[0].address,
          fee: FeeAmount.MEDIUM,
          amount: MaxUint128,
          sqrtPriceLimitX96: encodePriceSqrt(102, 100),
        })

        await snapshotGasCost(gasEstimate)
        expect(amountIn).to.eq(9976)
        expect(initializedTicksCrossed).to.eq(0)
        expect(sqrtPriceX96After).to.eq('80016521857016594389520272648')
      })
    })
  })
})
