const { task } = require("hardhat/config")

task("block_numer", "Get the current block number").setAction(
    async (taskArgs, hre) => {
        const block_numer = await hre.ethers.provider.getBlockNumber()
        console.log(`current block number: ${block_numer}`)
    }
)

module.exports = {}
