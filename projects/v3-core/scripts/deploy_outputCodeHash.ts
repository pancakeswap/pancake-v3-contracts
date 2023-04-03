import bn from "bignumber.js";
import { Contract, ContractFactory, utils, BigNumber } from "ethers";
import { ethers, waffle } from "hardhat";

const WBNB = "0xae13d989daC2f0dEbFf460aC112a837C89BAa7cd"; // BSC TESTNET

type ContractJson = { abi: any; bytecode: string };
const artifacts: { [name: string]: ContractJson } = {
  // eslint-disable-next-line global-require
  OutputCodeHash: require("../artifacts/contracts/test/OutputCodeHash.sol/OutputCodeHash.json"),
};

async function main() {
  const [owner] = await ethers.getSigners();
  const provider = waffle.provider;
  console.log("owner", owner.address);

  const OutputCodeHash = new ContractFactory(
    artifacts.OutputCodeHash.abi,
    artifacts.OutputCodeHash.bytecode,
    owner
  );
  const outputCodeHash = await OutputCodeHash.deploy();
  console.log("outputCodeHash", outputCodeHash.address);

  // deployer must set factory address
  const hash = await outputCodeHash.getInitCodeHash();
  console.log('hash: ', hash);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
