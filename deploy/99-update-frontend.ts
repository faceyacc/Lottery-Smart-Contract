import fs from "fs"
import { FRONT_END_ADDRESSES_FILE } from "../helper-hardhat-config"
import { FRONT_END_ABI_FILE } from "../helper-hardhat-config"
import { DeployFunction } from "hardhat-deploy/types"
import { HardhatRuntimeEnvironment } from "hardhat/types"
import { ethers } from "hardhat"
import { Interface } from "@ethersproject/abi"

const updateContractAddresses: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
    const { network, ethers } = hre

    const chainId: number = network.config.chainId!

    if (process.env.UPDATE_FRONT_END) {
        console.log("Writing to frontend...")

        const raffle = await ethers.getContract("Raffle")

        fs.writeFileSync(
            FRONT_END_ABI_FILE,
            raffle.interface.format(ethers.utils.FormatTypes.json) as string
        )

        const contractAddressess = JSON.parse(fs.readFileSync(FRONT_END_ADDRESSES_FILE, "utf-8"))

        if (chainId.toString() in contractAddressess) {
            if (!contractAddressess[chainId].includes(raffle.address)) {
                contractAddressess[chainId].push(raffle.address)
            }
        } else {
            contractAddressess[chainId!] = [raffle.address]
        }
        fs.writeFileSync(FRONT_END_ADDRESSES_FILE, JSON.stringify(contractAddressess))
        console.log("Front end written")
    }
}

// const updateAbi: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
//     const { ethers } = hre
//     const raffle = await ethers.getContract("Raffle")

//     fs.writeFileSync(
//         FRONT_END_ABI_FILE,
//         raffle.interface.format(ethers.utils.FormatTypes.json) as string
//     )
// }

export default updateContractAddresses
updateContractAddresses.tags = ["all", "frontend"]
