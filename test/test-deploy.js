const { ethers } = require("hardhat")
const { assert, expect } = require("chai")

describe("Simple Storage", () => {
    let simpleStorage, SimpleStorageFactory
    beforeEach(async () => {
        SimpleStorageFactory = await ethers.getContractFactory("SimpleStorage")
        simpleStorage = await SimpleStorageFactory.deploy()
    })
    it("Should Start with a Favorate number 0", async () => {
        const currentValue = await simpleStorage.retrive()
        const expectedValue = "0"
        assert.equal(currentValue.toString(), expectedValue)
    })
    it("Should be able to update the value", async () => {
        const updatedVAlue = "7"
        const transactionResponse = await simpleStorage.store(updatedVAlue)
        await transactionResponse.wait(1)
        const currentValue = await simpleStorage.retrive()
        assert.equal(currentValue.toString(), updatedVAlue)
    })
})
