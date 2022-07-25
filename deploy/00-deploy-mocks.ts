import { ethers, network } from "hardhat"
import { DeployFunction } from "hardhat-deploy/dist/types"
import { HardhatRuntimeEnvironment } from "hardhat/types"

import { developmentChains } from "../helper-hardhat-config"

const BASE_FEE = ethers.utils.parseEther("0.25") // premium for chainlink contract
const GAS_PRICE_LINK = 1e9 // 1000000000

const deployMocks: DeployFunction = async function name(hre: HardhatRuntimeEnvironment) {
    const { deployments, getNamedAccounts } = hre
    const { deploy, log } = deployments
    const { deployer } = await getNamedAccounts()
    const args = [BASE_FEE, GAS_PRICE_LINK]

    if (developmentChains.includes(network.name)) {
        log("Local netowrk detected! Deploying Mocks.....................")

        // deploy a mock vrfcoordinatorV2
        await deploy("VRFCoordinatorV2Mock", {
            from: deployer,
            log: true,
            args: args,
        })

        log("Mocks Deployed!")
        log("-----------------------------------------------------")
    }
}

export default deployMocks
deployMocks.tags = ["all", "mocks"]
