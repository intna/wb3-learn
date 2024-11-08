import { ethers } from "hardhat"
import { SimpleStorage, SimpleStorage__factory } from "../typechain-types"
import { assert } from "console"
import { expect } from "chai"

describe("SimpleStorage", () => {
  let simpleStorage: SimpleStorage
  let simpleStorageFactory: SimpleStorage__factory
  beforeEach(async function () {
    simpleStorageFactory = await ethers.getContractFactory("SimpleStorage")
    simpleStorage = await simpleStorageFactory.deploy()
  })

  it("should start with a favorite number of 0", async function () {
    const currentValue = await simpleStorage.retrieve()
    expect(currentValue).to.equal(0)
  })

  it("Should update when we call store", async function () {
    let expectedValue = 7
    let transactionResponse = await simpleStorage.store(expectedValue)
    await transactionResponse.wait()
    let currentValue = await simpleStorage.retrieve()
    expect(currentValue).to.equal(expectedValue)
  })
})