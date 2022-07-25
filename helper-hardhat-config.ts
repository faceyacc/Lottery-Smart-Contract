import { BigNumber } from "ethers"
import { ethers } from "hardhat"

export interface networkConfigItem {
    name?: string
    subscriptionID?: string
    gasLane?: string
    interval?: string
    entranceFee?: BigNumber
    callbackGasLimit?: string
    vrfCoordinatorV2?: string
}

export interface networkConfigInfo {
    [key: number]: networkConfigItem
}

export const networkConfig: networkConfigInfo = {
    31337: {
        name: "localhost",
        subscriptionID: "9158",
        gasLane: "0xd89b2bf150e3b9e13446986e571fb9cab24b13cea0a43ea20a6049a85cc807cc", // 30 gwei
        interval: "30",
        entranceFee: ethers.utils.parseEther("0.1"),
        callbackGasLimit: "500000",
    },
    4: {
        name: "rinkeby",
        subscriptionID: "9158",
        gasLane: "0xd89b2bf150e3b9e13446986e571fb9cab24b13cea0a43ea20a6049a85cc807cc", // 30 gwei
        interval: "30",
        entranceFee: ethers.utils.parseEther("0.1"),
        callbackGasLimit: "500000",
        vrfCoordinatorV2: "0x6168499c0cFfCaCD319c818142124B7A15E857ab",
    },
}

export const developmentChains = ["hardhat", "localhost"]
export const VERIFICATION_BLOCK_CONFIRMATIONS = 6
