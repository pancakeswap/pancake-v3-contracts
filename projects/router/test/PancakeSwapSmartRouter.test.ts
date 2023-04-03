import { ether, time, constants, BN, expectRevert, expectEvent, balance } from "@openzeppelin/test-helpers";
import { advanceBlock, advanceBlockTo } from "@openzeppelin/test-helpers/src/time";
import { artifacts, contract, ethers } from "hardhat";
import { parseEther } from "ethers/lib/utils";
import { BigNumber } from "ethers";
import { assert, expect } from "chai";

const PancakeStableSwapFactory = artifacts.require("stable-swap/contracts/PancakeStableSwapFactory.sol");
const PancakeStableSwapLPFactory = artifacts.require("stable-swap/contracts/PancakeStableSwapLPFactory.sol");
const PancakeStableSwapTwoPoolDeployer = artifacts.require("stable-swap/contracts/PancakeStableSwapTwoPoolDeployer.sol");
const PancakeStableSwapThreePoolDeployer = artifacts.require("stable-swap/contracts/PancakeStableSwapThreePoolDeployer.sol");
const PancakeStableSwapTwoPool = artifacts.require("stable-swap/contracts/PancakeStableSwapTwoPool.sol");
const PancakeStableSwapThreePool = artifacts.require("stable-swap/contracts/PancakeStableSwapThreePool.sol");
const PancakeStableSwapTwoPoolInfo = artifacts.require("stable-swap/contracts/utils/PancakeStableSwapTwoPoolInfo.sol");
const PancakeStableSwapThreePoolInfo = artifacts.require("stable-swap/contracts/utils/PancakeStableSwapThreePoolInfo.sol");
const PancakeStableSwapInfo = artifacts.require("stable-swap/contracts/utils/PancakeStableSwapInfo.sol");
const LPToken = artifacts.require("stable-swap/contracts/PancakeStableSwapLP.sol");
const Token = artifacts.require("stable-swap/contracts/test/Token.sol");
const FeeOnTransferToken = artifacts.require("exchange-protocol/contracts/test/FeeOnTransferToken.sol");
const PancakeFactory = artifacts.require("exchange-protocol/contracts/PancakeFactory.sol");
const PancakePair = artifacts.require("exchange-protocol/contracts/PancakePair.sol");
const PancakeRouter = artifacts.require("exchange-protocol/contracts/PancakeRouter.sol");
const WrappedBNB = artifacts.require("exchange-protocol/contracts/libraries/WBNB.sol");
const StableSwapRouterHelper = artifacts.require("./libraries/StableSwapRouterHelper.sol");
const SmartRouter = artifacts.require("./SmartRouter.sol");



contract("SmartRouter", ([admin, bob, carol]) => {
    let stableSwapLPFactory;
    let stableSwapFactory;
    let stableSwap2PoolDeployer;
    let stableSwap3PoolDeployer;
    let stableSwap2PoolInfo;
    let stableSwap3PoolInfo;
    let stableSwapPoolInfo;
    let BUSD;
    let USDC
    let USDT;
    let FeeToken;
    let stable2Pool_BUSD_USDC;
    let stable2Pool_LP_BUSD_USDC;
    let stable2Pool_token0;
    let stable2Pool_token1;
    let stable2PoolInfo;
    let stable2Pool_WBNB_BUSD;
    let stable2Pool_LP_WBNB_BUSD;
    let stable2Pool_WBNB_BUSD_token0;
    let stable2Pool_WBNB_BUSD_token1;
    let stable2PoolInfo_WBNB_BUSD;
    let stableBNB2PoolInfo;
    let stable3Pool_BUSD_USDC_USDT;
    let stable3Pool_LP_BUSD_USDC_USDT;
    let stable3Pool_token0;
    let stable3Pool_token1;
    let stable3Pool_token2;
    let stable3PoolInfo;
    const A = 1000;
    const Fee = 4000000;
    const AdminFee = 5000000000;
    let pancakeFactory;
    let pancakeRouter;
    let WBNB;
    let pool_WBNB_BUSD;
    let pool_BUSD_USDC;
    let pool_WBNB_USDC;
    let pool_BUSD_FeeToken;
    let stableSwapRouterHelper;
    let smartRouter;
    const BNB_ADDRESS = '0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE';



    before(async () => {
        /** Tokens */
        WBNB = await WrappedBNB.new( { from: admin } );
        BUSD = await Token.new("Binance USD", "BUSD", 18, { from: admin });
        USDC = await Token.new("USD Coin", "USDC", 18, { from: admin });
        USDT = await Token.new("Tether USD", "USDT", 18, { from: admin });
        FeeToken = await FeeOnTransferToken.new("Fee On Transfer Token", "FeeToken", 18, { from: admin });

        await BUSD.mint(bob, parseEther("3000000"), { from: bob });
        await BUSD.mint(carol, parseEther("3000000"), { from: carol });
        await USDC.mint(bob, parseEther("3000000"), { from: bob });
        await USDC.mint(carol, parseEther("3000000"), { from: carol });
        await USDT.mint(bob, parseEther("3000000"), { from: bob });
        await USDT.mint(carol, parseEther("3000000"), { from: carol });
        await FeeToken.mint(bob, parseEther("3000000"), { from: bob });
        await FeeToken.mint(carol, parseEther("3000000"), { from: carol });
        await WBNB.deposit({ from: bob, value:  parseEther("300")});
        await WBNB.deposit({ from: carol, value:  parseEther("300")});


        /** Create Stable Swap */
        stableSwapLPFactory = await PancakeStableSwapLPFactory.new({ from: admin });
        stableSwap2PoolDeployer = await PancakeStableSwapTwoPoolDeployer.new({ from: admin });
        stableSwap3PoolDeployer = await PancakeStableSwapThreePoolDeployer.new({ from: admin });
        stableSwapFactory = await PancakeStableSwapFactory.new(stableSwapLPFactory.address, stableSwap2PoolDeployer.address, stableSwap3PoolDeployer.address, {
            from: admin,
        });
        stableSwap2PoolInfo = await PancakeStableSwapTwoPoolInfo.new({ from: admin });
        stableSwap3PoolInfo = await PancakeStableSwapThreePoolInfo.new({ from: admin });
        stableSwapPoolInfo = await PancakeStableSwapInfo.new(stableSwap2PoolInfo.address, stableSwap3PoolInfo.address, { from: admin });

        await stableSwapLPFactory.transferOwnership(stableSwapFactory.address, { from: admin });
        await stableSwap2PoolDeployer.transferOwnership(stableSwapFactory.address, { from: admin });
        await stableSwap3PoolDeployer.transferOwnership(stableSwapFactory.address, { from: admin });

        await stableSwapFactory.createSwapPair(BUSD.address, USDC.address, A, Fee, AdminFee, { from: admin });
        stable2PoolInfo = await stableSwapFactory.getPairInfo(BUSD.address, USDC.address);
        stable2Pool_BUSD_USDC = await PancakeStableSwapTwoPool.at(stable2PoolInfo.swapContract);
        stable2Pool_LP_BUSD_USDC = await LPToken.at(stable2PoolInfo.LPContract);
        stable2Pool_token0 = await Token.at(stable2PoolInfo.token0);
        stable2Pool_token1 = await Token.at(stable2PoolInfo.token1);
        await stableSwapFactory.createSwapPair(WBNB.address, BUSD.address, A, Fee, AdminFee, { from: admin });
        stable2PoolInfo_WBNB_BUSD = await stableSwapFactory.getPairInfo(WBNB.address, BUSD.address);
        stable2Pool_WBNB_BUSD = await PancakeStableSwapTwoPool.at(stable2PoolInfo_WBNB_BUSD.swapContract);
        stable2Pool_LP_WBNB_BUSD = await LPToken.at(stable2PoolInfo_WBNB_BUSD.LPContract);
        stable2Pool_WBNB_BUSD_token0 = await Token.at(stable2PoolInfo_WBNB_BUSD.token0);
        stable2Pool_WBNB_BUSD_token1 = await Token.at(stable2PoolInfo_WBNB_BUSD.token1);
        await stableSwapFactory.createThreePoolPair(BUSD.address, USDC.address, USDT.address, A, Fee, AdminFee, { from: admin });
        stable3PoolInfo = await stableSwapFactory.getThreePoolPairInfo(BUSD.address, USDC.address);
        stable3Pool_BUSD_USDC_USDT = await PancakeStableSwapThreePool.at(stable3PoolInfo.swapContract);
        stable3Pool_LP_BUSD_USDC_USDT = await LPToken.at(stable3PoolInfo.LPContract);
        stable3Pool_token0 = await Token.at(stable3PoolInfo.token0);
        stable3Pool_token1 = await Token.at(stable3PoolInfo.token1);
        stable3Pool_token2 = await Token.at(stable3PoolInfo.token2);


        /** Initialize Stable Swap */
        await BUSD.approve(stable2Pool_BUSD_USDC.address, parseEther("1000000"), { from: bob });
        await USDC.approve(stable2Pool_BUSD_USDC.address, parseEther("1000000"), { from: bob });

        await expectRevert(
            stable2Pool_BUSD_USDC.add_liquidity([0, parseEther("1")], 0, { from: bob }),
            "Initial deposit requires all coins"
        );

        await expectRevert(
            stable2Pool_BUSD_USDC.add_liquidity([parseEther("1"), 0], 0, { from: bob }),
            "Initial deposit requires all coins"
        );
    
        await stable2Pool_BUSD_USDC.add_liquidity(
            [parseEther("1000000"), parseEther("1000000")],
            parseEther("2000000"),
            {
                from: bob,
            }
        );

        await WBNB.approve(stable2Pool_WBNB_BUSD.address, parseEther("100"), { from: bob });
        await BUSD.approve(stable2Pool_WBNB_BUSD.address, parseEther("20000"), { from: bob });
    
        await stable2Pool_WBNB_BUSD.add_liquidity(
            [parseEther("100"), parseEther("20000")],
            parseEther("0"),
            {
                from: bob,
            }
        );

        await BUSD.approve(stable3Pool_BUSD_USDC_USDT.address, parseEther("1000000"), { from: bob });
        await USDC.approve(stable3Pool_BUSD_USDC_USDT.address, parseEther("1000000"), { from: bob });
        await USDT.approve(stable3Pool_BUSD_USDC_USDT.address, parseEther("1000000"), { from: bob });

        await expectRevert(
            stable3Pool_BUSD_USDC_USDT.add_liquidity([0, parseEther("1"), 0], 0, { from: bob }),
            "Initial deposit requires all coins"
        );

        await expectRevert(
            stable3Pool_BUSD_USDC_USDT.add_liquidity([parseEther("1"), 0, 0], 0, { from: bob }),
            "Initial deposit requires all coins"
        );
    
        await expectRevert(
            stable3Pool_BUSD_USDC_USDT.add_liquidity([0, 0, parseEther("1")], 0, { from: bob }),
            "Initial deposit requires all coins"
        );

        await stable3Pool_BUSD_USDC_USDT.add_liquidity(
            [parseEther("1000000"), parseEther("1000000"), parseEther("1000000")],
            parseEther("3000000"),
            {
                from: bob,
            }
        );


        /** Create Smart Router */
        stableSwapRouterHelper = await StableSwapRouterHelper.new({ from: admin });
        SmartRouter.link(stableSwapRouterHelper);
        smartRouter = await SmartRouter.new(
            constants.ZERO_ADDRESS, // 
            constants.ZERO_ADDRESS, //
            constants.ZERO_ADDRESS, //
            stableSwapFactory.address, 
            stableSwapPoolInfo.address, 
            WBNB.address, 
            { from: admin, }
        );


        /** Initialize Smart Router */
        for (let thisUser of [bob, carol]) {
            await BUSD.approve(smartRouter.address, constants.MAX_UINT256, {
                from: thisUser,
            });

            await USDC.approve(smartRouter.address, constants.MAX_UINT256, {
                from: thisUser,
            });

            await USDT.approve(smartRouter.address, constants.MAX_UINT256, {
                from: thisUser,
            });

            await WBNB.approve(smartRouter.address, constants.MAX_UINT256, {
                from: thisUser,
            });

            await FeeToken.approve(smartRouter.address, constants.MAX_UINT256, {
                from: thisUser,
            });
        }
    });



    describe("Check setups and info", () => {
        it("Check Stable Swap", async () => {
            assert.equal(stable2PoolInfo.swapContract, stable2Pool_BUSD_USDC.address);
            assert.equal(stable2PoolInfo.token0, stable2Pool_token0.address);
            assert.equal(stable2PoolInfo.token1, stable2Pool_token1.address);
            assert.equal(stable2PoolInfo.LPContract, stable2Pool_LP_BUSD_USDC.address);

            assert.equal(stable3PoolInfo.swapContract, stable3Pool_BUSD_USDC_USDT.address);
            assert.equal(stable3PoolInfo.token0, stable3Pool_token0.address);
            assert.equal(stable3PoolInfo.token1, stable3Pool_token1.address);
            assert.equal(stable3PoolInfo.token2, stable3Pool_token2.address);
            assert.equal(stable3PoolInfo.LPContract, stable3Pool_LP_BUSD_USDC_USDT.address);

            await expectRevert(
                stable2Pool_BUSD_USDC.add_liquidity([parseEther("1"), parseEther("1")], parseEther("2.1"), {
                  from: bob,
                }),
                "Slippage screwed you"
            );
        
            await expectRevert(
                stable2Pool_BUSD_USDC.add_liquidity([parseEther("1"), parseEther("1")], 0, {
                  from: bob,
                  value: ether("1"),
                }),
                "Inconsistent quantity"
            );
        
            let LP_balance = await stable2Pool_LP_BUSD_USDC.balanceOf(bob);
            let LP_totalSupply = await stable2Pool_LP_BUSD_USDC.totalSupply();
            assert.equal(parseEther("2000000").toString(), LP_balance.toString()); 
            assert.equal(LP_totalSupply.toString(), LP_balance.toString());

            await expectRevert(
                stable3Pool_BUSD_USDC_USDT.add_liquidity([parseEther("1"), parseEther("1"), parseEther("1")], parseEther("3.1"), {
                  from: bob,
                }),
                "Slippage screwed you"
            );
        
            await expectRevert(
                stable3Pool_BUSD_USDC_USDT.add_liquidity([parseEther("1"), parseEther("1"), parseEther("1")], 0, {
                  from: bob,
                  value: ether("1"),
                }),
                "Inconsistent quantity"
            );
        
            LP_balance = await stable3Pool_LP_BUSD_USDC_USDT.balanceOf(bob);
            LP_totalSupply = await stable3Pool_LP_BUSD_USDC_USDT.totalSupply();
            assert.equal(parseEther("3000000").toString(), LP_balance.toString());
            assert.equal(LP_totalSupply.toString(), LP_balance.toString());
        });
    });


    
    describe("User swap via SmartRouter", () => {
        it("Carol exact output swap BUSD -> USDC on stable 2pool & exact output swap USDC -> 100 USDT on stable 3pool", async () => {
            const deadline = new BN(await time.latest()).add(new BN("100"));

            const usdtBalanceBefore = await USDT.balanceOf(carol);

            const exactOnputData = smartRouter.contract.methods.exactOutputStableSwap([BUSD.address, USDC.address, USDT.address], [2, 3], parseEther("100"), parseEther("105")).encodeABI();
            const result = await smartRouter.multicall(deadline, [exactOnputData], {from: carol});

            const usdtBalanceAfter = await USDT.balanceOf(carol);
            assert.equal((usdtBalanceAfter.sub(usdtBalanceBefore)).toString(), parseEther("100").toString());
        });

        it("Carol exact input swap 100 BUSD -> USDC on stable 2pool & exact output swap USDC -> 100 USDT on stable 3pool", async () => {
            const deadline = new BN(await time.latest()).add(new BN("100"));

            const busdBalanceBefore = await BUSD.balanceOf(carol);
            const usdtBalanceBefore = await USDT.balanceOf(carol);

            const exactInput2PoolData = smartRouter.contract.methods.exactInputStableSwap([BUSD.address, USDC.address], [2], parseEther("100"), 0).encodeABI();
            const exactOnput3PoolData = smartRouter.contract.methods.exactOutputStableSwap([USDC.address, USDT.address], [3], parseEther("100"), parseEther("105")).encodeABI();
            const result = await smartRouter.multicall(deadline, [exactInput2PoolData, exactOnput3PoolData], {from: carol});

            const busdBalanceAfter = await BUSD.balanceOf(carol);
            const usdtBalanceAfter = await USDT.balanceOf(carol);
            assert.equal((busdBalanceBefore.sub(busdBalanceAfter)).toString(), parseEther("100").toString());
            assert.equal((usdtBalanceAfter.sub(usdtBalanceBefore)).toString(), parseEther("100").toString());
        });

        it("Carol exact output swap BUSD -> 100 USDC on stable 2pool & exact output swap BUSD -> 100 USDC on stable 3pool", async () => {
            const deadline = new BN(await time.latest()).add(new BN("100"));

            const usdcBalanceBefore = await USDC.balanceOf(carol);

            const exactOutput2PoolData = smartRouter.contract.methods.exactOutputStableSwap([BUSD.address, USDC.address], [2], parseEther("100"), parseEther("105")).encodeABI();
            const exactOnput3PoolData = smartRouter.contract.methods.exactOutputStableSwap([BUSD.address, USDC.address], [3], parseEther("100"), parseEther("105")).encodeABI();
            const result = await smartRouter.multicall(deadline, [exactOutput2PoolData, exactOnput3PoolData], {from: carol});

            const usdcBalanceAfter = await USDC.balanceOf(carol);
            assert.equal((usdcBalanceAfter.sub(usdcBalanceBefore)).toString(), parseEther("200").toString());
        });

        it("Carol exact input swap 100 BUSD -> USDC on stable 2pool & exact output swap BUSD -> USDT -> 100 USDC on stable 3pool", async () => {
            const deadline = new BN(await time.latest()).add(new BN("100"));

            const exactInput2PoolData = smartRouter.contract.methods.exactInputStableSwap([BUSD.address, USDC.address], [2], parseEther("100"), 0).encodeABI();
            const exactOnput3PoolData = smartRouter.contract.methods.exactOutputStableSwap([BUSD.address, USDT.address, USDC.address], [3, 3], parseEther("100"), parseEther("105")).encodeABI();
            const result = await smartRouter.multicall(deadline, [exactInput2PoolData, exactOnput3PoolData], {from: carol});
        });

        it("Carol exact output swap BUSD -> 1 BNB on stable 2pool", async () => {            
            const deadline = new BN(await time.latest()).add(new BN("100"));

            const tracker = await balance.tracker(carol);

            const exactOutput2PoolData = smartRouter.contract.methods.exactOutputStableSwap([BUSD.address, WBNB.address], [2], parseEther("1"), parseEther("10")).encodeABI();
            const unwrapWETH9Data = smartRouter.contract.methods.unwrapWETH9(parseEther("1")).encodeABI();
            const result = await smartRouter.multicall(deadline, [exactOutput2PoolData, unwrapWETH9Data], {from: carol, gasPrice: 339817});

            const gasCost = result.receipt.gasUsed * 339817;
            assert.equal((await tracker.delta()).toString(), parseEther("1").sub(gasCost).toString());
            assert.equal((await WBNB.balanceOf(carol)).toString(), parseEther("300").toString());
        });

        it("Carol exact output swap BNB -> 100 BUSD on stable 2pool", async () => {
            const amounts = await stableSwapRouterHelper.getAmountsIn(
                stableSwapFactory.address, 
                stableSwapPoolInfo.address, 
                [WBNB.address, BUSD.address], 
                [2], 
                parseEther("100")
            );
            const inputBNBAmount = amounts[0];
            
            const deadline = new BN(await time.latest()).add(new BN("100"));

            const tracker = await balance.tracker(carol);
            const busdBalanceBefore = await BUSD.balanceOf(carol);

            const exactOutputData = smartRouter.contract.methods.exactOutputStableSwap([WBNB.address, BUSD.address], [2], parseEther("100"), parseEther("100")).encodeABI();
            const result = await smartRouter.multicall(deadline, [exactOutputData], {from: carol, value: inputBNBAmount, gasPrice: 260991});

            const gasCost = result.receipt.gasUsed * 260991;
            const busdBalanceAfter = await BUSD.balanceOf(carol);

            assert.equal((await tracker.delta()).abs().toString(), BigNumber.from(inputBNBAmount.toString()).add(gasCost).toString());
            assert.equal((busdBalanceAfter.sub(busdBalanceBefore)).toString(), parseEther("100").toString());
            assert.equal(await balance.current(smartRouter.address), 0);
            assert.equal(await WBNB.balanceOf(smartRouter.address), 0);
        });
    });



    describe("Owner operation", () => {
        it("Update StableSwapRouter", async () => {
            const oldStableSwapFactory = await smartRouter.stableSwapFactory();
            const oldStableSwapInfo = await smartRouter.stableSwapInfo();

            const result = await smartRouter.setStableSwap(constants.ZERO_ADDRESS, constants.ZERO_ADDRESS, { from: admin });

            const newStableSwapFactory = await smartRouter.stableSwapFactory();
            const newStableSwapInfo = await smartRouter.stableSwapInfo();

            assert.notEqual(oldStableSwapFactory, newStableSwapFactory);
            assert.notEqual(oldStableSwapInfo, newStableSwapInfo);
        });
    });
});
