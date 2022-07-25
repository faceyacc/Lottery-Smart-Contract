import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers"
import { assert, expect } from "chai"
import { BigNumber, Contract } from "ethers"
import { deployments, ethers, getNamedAccounts, network } from "hardhat"
import { developmentChains, networkConfig } from "../../helper-hardhat-config"

// This runs only on a local network
!developmentChains.includes(network.name)
    ? describe.skip
    : describe("Raffle", async function () {
          let raffle: Contract
          let vrfCoordinatorV2Mock: Contract
          let entranceFee: BigNumber
          let player: SignerWithAddress
          let accounts: SignerWithAddress[]
          let raffleContract: Contract
          let interval: number

          const chainId = network.config.chainId

          beforeEach(async function () {
              accounts = await ethers.getSigners()
              player = accounts[1] // can't use accounts[0] because that is a deployer
              await deployments.fixture(["all"])
              vrfCoordinatorV2Mock = await ethers.getContract("VRFCoordinatorV2Mock")
              raffleContract = await ethers.getContract("Raffle")
              raffle = raffleContract.connect(player)
              entranceFee = await raffle.getEntranceFee()
              interval = (await raffle.getInterval()).toNumber()
          })

          describe("constructor", function () {
              it("initalizes the raffle correctly", async () => {
                  console.log(`Network chainId: ${network.config.chainId}`)

                  const raffleState = (await raffle.getRaffleState()).toString()
                  assert.equal(raffleState, "0")
                  assert.equal(interval.toString(), networkConfig[chainId!]["interval"])
              })
          })

          describe("enterRaffle", () => {
              it("reverts when you don't pay enough", async () => {
                  await expect(raffle.enterRaffle()).to.be.revertedWith(
                      "Raffle__NotEnoughETHEntered"
                  )
              })

              it("records player when they enter", async () => {
                  await raffle.enterRaffle({ value: entranceFee })
                  const contractPlayer = await raffle.getPlayer(0)
                  assert.equal(player.address, contractPlayer)
              })

              it("emits event on enter", async () => {
                  await expect(raffle.enterRaffle({ value: entranceFee })).to.emit(
                      raffle,
                      "RaffleEnter"
                  )
              })

              it("doesn't allow entrance when raffle is calculating", async () => {
                  await raffle.enterRaffle({ value: entranceFee })

                  //   Force some time to pass
                  await network.provider.send("evm_increaseTime", [interval + 1])
                  await network.provider.request({ method: "evm_mine", params: [] })

                  // pretending to be a chainlink keeper and put raffleState in CALCULATING mode
                  await raffle.performUpkeep([])
                  await expect(raffle.enterRaffle({ value: entranceFee })).to.be.revertedWith(
                      "Raffle_NotOpen"
                  )
              })
          })

          describe("checkUpKeep", () => {
              it("returns false if people haven't sent any ETH", async () => {
                  await network.provider.send("evm_increaseTime", [interval + 1])
                  await network.provider.request({ method: "evm_mine", params: [] })

                  // Simulate calling checkUpKeep()
                  const { upkeepNeeded } = await raffle.callStatic.checkUpkeep("0x")

                  // upkeepNeeded should be false because we didn't send any ETH
                  assert(!upkeepNeeded)
              })

              it("returns false if raffle isn't open", async () => {
                  await raffle.enterRaffle({ value: entranceFee })
                  await network.provider.send("evm_increaseTime", [interval + 1])
                  await network.provider.request({ method: "evm_mine", params: [] })

                  // Calling this func manke raffleState go to CALCULATING
                  await raffle.performUpkeep([])
                  const raffleState = await raffle.getRaffleState()
                  const { upkeepNeeded } = await raffle.callStatic.checkUpkeep("0x")
                  assert.equal(raffleState.toString() == "1", upkeepNeeded == false)
              })

              it("returns false if enough time hasn't passed", async () => {
                  await raffle.enterRaffle({ value: entranceFee })

                  // Enough time hasn't passed - this leads to returned false
                  await network.provider.send("evm_increaseTime", [interval - 1])
                  await network.provider.request({ method: "evm_mine", params: [] })

                  const { upkeepNeeded } = await raffle.callStatic.checkUpkeep("0x")
                  assert(!upkeepNeeded)
              })
              it("returns true if enough time has passed, has players, eth, and is open", async () => {
                  await raffle.enterRaffle({ value: entranceFee })
                  await network.provider.send("evm_increaseTime", [interval + 1])
                  await network.provider.request({ method: "evm_mine", params: [] })
                  const { upkeepNeeded } = await raffle.callStatic.checkUpkeep("0x")

                  assert(upkeepNeeded)
              })
          })

          describe("performUpKeep", () => {
              it("can only run if checkupkeep is true", async () => {
                  await raffle.enterRaffle({ value: entranceFee })
                  await network.provider.send("evm_increaseTime", [interval + 1])
                  await network.provider.request({ method: "evm_mine", params: [] })
                  const tx = await raffle.performUpkeep("0x")
                  assert(tx)
              })

              it("reverts when checkupkeep is false", async () => {
                  await expect(raffle.performUpkeep("0x")).to.be.revertedWith(
                      "Raffle__UpkeepNotNeeded"
                  )
              })

              it("updates the raffle state and emits a requestId", async () => {
                  await raffle.enterRaffle({ value: entranceFee })
                  await network.provider.send("evm_increaseTime", [interval + 1])
                  await network.provider.request({ method: "evm_mine", params: [] })

                  // Make call to performUpKeep
                  const txnResponse = await raffle.performUpkeep("0x")
                  const txnReceipt = await txnResponse.wait(1)

                  // Get raffle state
                  const raffleState = await raffle.getRaffleState()
                  // Get requestId
                  const requestId = txnReceipt!.events![1].args!.requestId

                  // Check if reqestIf is emmited
                  assert(requestId.toNumber() > 0)
                  // Check if raffe state is updated
                  assert(raffleState == 1)
              })
          })

          describe("fulfilRandomWords", () => {
              beforeEach(async () => {
                  await raffle.enterRaffle({ value: entranceFee })
                  await network.provider.send("evm_increaseTime", [interval + 1])
                  await network.provider.request({ method: "evm_mine", params: [] })
              })

              it("picks a winner, resets, and sends money", async () => {
                  const additionalEntrances = 3
                  const startingIndex = 2

                  for (let i = startingIndex; i < startingIndex + additionalEntrances; i++) {
                      raffle = raffleContract.connect(accounts[i])
                      await raffle.enterRaffle({ value: entranceFee })
                  }

                  const startingTimeStamp = await raffle.getLastTimeStamp()

                  await new Promise<void>(async (resolve, reject) => {
                      // Subscribe once to event calling listener when the event occurs.
                      raffle.once("WinnerPicked", async () => {
                          console.log("WinnerPicked even fired!")
                          try {
                              const recentWinner = await raffle.getRecentWinner()
                              const raffleState = await raffle.getRaffleState()
                              const winnerBalance = await accounts[2].getBalance()
                              const endingTimeStamp = await raffle.getLastTimeStamp()
                              await expect(raffle.getPlayer(0)).to.be.reverted
                              assert.equal(recentWinner.toString(), accounts[2].address)
                              assert.equal(raffleState.toString(), "0")
                              assert(endingTimeStamp > startingTimeStamp)
                              assert.equal(
                                  winnerBalance.toString(),
                                  startingBalance
                                      .add(entranceFee.mul(additionalEntrances).add(entranceFee))
                                      .toString()
                              )
                              resolve()
                          } catch (e) {
                              reject(e)
                          }
                      })

                      const tx = await raffle.performUpkeep("0x")
                      const txReceipt = await tx.wait(1)
                      const startingBalance = await accounts[2].getBalance()
                      await vrfCoordinatorV2Mock.fulfillRandomWords(
                          txReceipt!.events![1].args!.requestId,
                          raffle.address
                      )
                  })
              })
          })
      })
