import { LogDescription } from "@ethersproject/abi"
import { ethers, network } from "hardhat"
import { DeployFunction } from "hardhat-deploy/dist/types"
import { HardhatRuntimeEnvironment } from "hardhat/types"
import {
    developmentChains,
    networkConfig,
    VERIFICATION_BLOCK_CONFIRMATIONS,
} from "../helper-hardhat-config"

import verify from "../utils/verify"

const VRF_SUB_FUND_AMOUNT = "1000000000000000000000"

const deployRaffle: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
    const { deployments, getNamedAccounts, network, ethers } = hre
    const { deploy, log } = deployments
    const { deployer } = await getNamedAccounts()
    const chainId = network.config.chainId
    let vrfCoordinatorV2Address, subscriptionID

    // if on developement chain
    if (chainId) {
        const vrfCoordinatorV2Mock = await ethers.getContract("VRFCoordinatorV2Mock")
        vrfCoordinatorV2Address = vrfCoordinatorV2Mock.address
        const txnResponse = await vrfCoordinatorV2Mock.createSubscription()
        const txnReceipt = await txnResponse.wait(1)
        subscriptionID = txnReceipt.events[0].args.subId

        // Fund the subscription
        await vrfCoordinatorV2Mock.fundSubscription(subscriptionID, VRF_SUB_FUND_AMOUNT)
    } else {
        // else if not on local network
        vrfCoordinatorV2Address = networkConfig[network.config.chainId!]["vrfCoordinatorV2"]
        subscriptionID = networkConfig[network.config.chainId!]["subscriptionId"]
    }

    const waitBlockConfirmations = developmentChains.includes(network.name)
        ? 1
        : VERIFICATION_BLOCK_CONFIRMATIONS
    log("----------------------------------------------------")

    const entranceFee = networkConfig[network.config.chainId!]["entranceFee"]
    const gasLane = networkConfig[network.config.chainId!]["gasLane"]
    const callbackGasLimit = networkConfig[network.config.chainId!]["callbackGasLimit"]
    const interval = networkConfig[network.config.chainId!]["interval"]

    const args = [
        vrfCoordinatorV2Address,
        entranceFee,
        gasLane,
        subscriptionID,
        callbackGasLimit,
        interval,
    ]

    const raffle = await deploy("Raffle", {
        from: deployer,
        args: args,
        log: true,
        waitConfirmations: waitBlockConfirmations,
    })

    if (!developmentChains.includes(network.name) && process.env.ETHERSCAN_API_KEY) {
        log("Verifying...")
        await verify(raffle.address, args)
    }
    log("------------------------------------------")
}

export default deployRaffle

deployRaffle.tags = ["all", "raffle"]
