import { ethers, network } from "hardhat";
import config from "../config";

import { parseEther } from "ethers/lib/utils";
const currentNetwork = network.name;

async function main() {
    // Remember to update the init code hash in SC for different chains before deploying


    
    /** SmartRouterHelper */
    console.log("Deploying SmartRouterHelper...");

    const SmartRouterHelper = await ethers.getContractFactory("SmartRouterHelper");

    const smartRouterHelper = await SmartRouterHelper.deploy();

    await smartRouterHelper.deployed();

    console.log("SmartRouterHelper deployed to:", smartRouterHelper.address);



    /** SmartRouter */
    const networkName = network.name;

    console.log("Deploying SmartRouter...");

    const SmartRouter = await ethers.getContractFactory("SmartRouter", {
        libraries: {
            SmartRouterHelper: smartRouterHelper.address
        }
    });

    const smartRouter = await SmartRouter.deploy(
        config.factoryV2[networkName],
        config.factoryV3[networkName],
        config.positionManager[networkName],
        config.stableFactory[networkName],
        config.stableInfo[networkName],
        config.WETH[networkName],
    );

    await smartRouter.deployed();

    console.log("SmartRouter deployed to:", smartRouter.address);
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });