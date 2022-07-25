import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers"
import { assert, expect } from "chai"
import { BigNumber, Contract } from "ethers"
import { deployments, ethers, getNamedAccounts, network } from "hardhat"
import { developmentChains, networkConfig } from "../../helper-hardhat-config"

// This skips if you are running a local network and run only on a testnet
developmentChains.includes(network.name)
    ? describe.skip
    : describe("Raffle", async function () {
          let raffle: Contract

          let entranceFee: BigNumber
          let player: SignerWithAddress
          let accounts: SignerWithAddress[]
          let raffleContract: Contract

          beforeEach(async function () {
              accounts = await ethers.getSigners()
              player = accounts[1] // can't use accounts[0] because that is a deployer
              await deployments.fixture(["all"])
              raffleContract = await ethers.getContract("Raffle")
              raffle = raffleContract.connect(player)
              entranceFee = await raffle.getEntranceFee()
          })

          describe("fulfillRandomWords", () => {
              it("works with live chainlink keepers and Chainlink VRF, we get a random winner", async () => {
                  // enter the raffle
                  console.log("Setting up test...")
                  const startingTimeStamp = await raffle.getLastTimeStamp()
                  const accounts = await ethers.getSigners()

                  console.log("Setting up Listener...")

                  await new Promise<void>(async (resolve, reject) => {
                      try {
                      } catch (e) {
                          console.log(e)
                          reject(e)
                      }
                  })
                  // setup listner before we enter the raffle

                  // Then enter the raffle
                  console.log("Entering Raffle...")
                  const tx = await raffle.enterRaffle({ value: entranceFee })
                  await tx.wait(1)
                  console.log("Ok, time to wait...")
              })
          })
      })
