import bn from "bignumber.js";
import { BigNumber, Contract } from "ethers";
import { ethers, waffle, run } from "hardhat";

const pancakeV3PoolDeployer = '0xB0edb49557c583290368e04FffaBb293FC224Ae1';
const pancakeV3Factory = '0xC200B8E8eE9A4BFd22a2F31a3a64e581A3c9e793';
const swapRouter = '0xCbBEc95002838Aa770ED13889d52E911a13d55d1';
const nftDescriptor = '0xcF7C39A23F4Aaba3ab182f88c10E025693569871';
const nftDescriptorEx = '0x3a20994A97faD01D0BeB15655db23293608c1d60';
const nonfungibleTokenPositionDescriptor = '0xDD312467b28783F6833121f34c2A5F78A91D60E8';
const nonfungiblePositionManager = '0x88122D163F9363f4EE8C59b5fA9761b1C48ed3a1';

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
  const [owner] = await ethers.getSigners();
  const provider = waffle.provider;
  console.log("owner", owner.address);

  await run(`verify:verify`, {
    address: swapRouter,
    contract: 'contracts/SwapRouter.sol:SwapRouter',
    constructorArguments: [
      pancakeV3PoolDeployer,
      pancakeV3Factory,
      '0xae13d989daC2f0dEbFf460aC112a837C89BAa7cd', //WBNB
    ],
  });

  await run(`verify:verify`, {
    address: nftDescriptor,
    contract: 'contracts/libraries/NFTDescriptor.sol:NFTDescriptor',
    constructorArguments: [],
  });

  await run(`verify:verify`, {
    address: nftDescriptorEx,
    contract: 'contracts/NFTDescriptorEx.sol:NFTDescriptorEx',
    constructorArguments: [],
  });

  // await run(`verify:verify`, {
  //     address: nonfungibleTokenPositionDescriptor,
  //     contract: 'contracts/NonfungibleTokenPositionDescriptor.sol:NonfungibleTokenPositionDescriptor',
  //     constructorArguments: [
  //         '0xae13d989daC2f0dEbFf460aC112a837C89BAa7cd', //WBNB
  //         '0x4554480000000000000000000000000000000000000000000000000000000000',
  //         nftDescriptorEx
  //     ],
  // });

  await run(`verify:verify`, {
    address: nonfungiblePositionManager,
    contract: 'contracts/NonfungiblePositionManager.sol:NonfungiblePositionManager',
    constructorArguments: [
      pancakeV3PoolDeployer,
      pancakeV3Factory,
      "0xae13d989daC2f0dEbFf460aC112a837C89BAa7cd", // WBNB
      nonfungibleTokenPositionDescriptor,
    ],
  });

}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
