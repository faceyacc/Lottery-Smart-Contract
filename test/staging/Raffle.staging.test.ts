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

                  // setup listner before we enter the raffle
                  await new Promise<void>(async (resolve, reject) => {
                      try {
                          const recentWinner = await raffle.getRecentWinner()
                          const raffleState = await raffle.getRaffleState()
                          const winnerEndingBalance = await accounts[0].getBalance()
                          const endingTimeStamp = await raffle.getLastTimeStamp()

                          await expect(raffle.getPlayer(0)).to.be.reverted // check if players array is reset
                          assert.equal(recentWinner.toString(), accounts[0].address)
                          assert.equal(raffleState, 0) // raffle state should be open after winner is declared
                          assert.equal(
                              winnerEndingBalance.toString(),
                              winnerStartingBalance.add(entranceFee).toString()
                          )
                          assert(endingTimeStamp > startingTimeStamp)
                          resolve()
                      } catch (e) {
                          console.log(e)
                          reject(e)
                      }
                  })

                  // Then enter the raffle
                  console.log("Entering Raffle...")
                  const tx = await raffle.enterRaffle({ value: entranceFee })
                  await tx.wait(1)
                  console.log("Ok, time to wait...")
                  const winnerStartingBalance = await accounts[0].getBalance()
              })
          })
      })
