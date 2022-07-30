const { ethers, run, network } = require("hardhat")
require("dotenv").config()
require("@nomiclabs/hardhat-etherscan")

async function main() {
    const SimpleStorageFactory = await ethers.getContractFactory(
        "SimpleStorage"
    )
    console.log("Deploying simple storage")
    const simpleStorage = await SimpleStorageFactory.deploy()
    await simpleStorage.deployed()

    console.log(`contract deployed to ${simpleStorage.address}`)
    console.log(network.config)
    if (network.config.chainId === 5 && process.env.ETHERSCAN_API_KEY) {
        console.log("waiting for block confirmation")
        await simpleStorage.deployTransaction.wait(6)
        await verify(simpleStorage.address, [])
    }

    const currentValue = await simpleStorage.retrive()
    console.log(`Current value:${currentValue}`)

    // updating the value
    const transactionResponse = await simpleStorage.store(42)
    await transactionResponse.wait(1)
    const updatedValue = await simpleStorage.retrive()
    console.log(`updated value ${updatedValue}`)
}

async function verify(address, args) {
    try {
        console.log("verifing contract .....")
        await run("verify:verify", {
            address: address,
            constructorArguments: args,
        })
    } catch (e) {
        if (e.message.toLowerCase().includes("already verified")) {
            console.log("already verified")
        } else {
            console.log(e)
        }
    }
}

// main
main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error)
        process.exit(1)
    })
