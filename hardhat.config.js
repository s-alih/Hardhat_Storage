require("@nomiclabs/hardhat-waffle")
require("dotenv").config()
require("./tasks/block_numer")
require("@nomiclabs/hardhat-etherscan")
require("hardhat-gas-reporter")
require("solidity-coverage")

const GOERIL_RPC_URL = process.env.GOERIL_RPC_URL || "https://georil.goeril.com"
const PRIVATE_KEY = process.env.PRIVATE_KEY || "0xafd"
const ETHERSCAN_API_KEY = process.env.ETHERSCAN_API_KEY || "key"
const COINMARKETCAP_API_KEY = process.env.COINMARKETCAP_API_KEY || "key"

module.exports = {
    solidity: "0.8.7",
    networks: {
        goeril: {
            url: GOERIL_RPC_URL,
            accounts: [PRIVATE_KEY],
            chainId: 5,
        },
        localhost: {
            url: "http://localhost:8545",
            //accounts:thanks hardhat
            chainId: 31337,
        },
    },
    gasReporter: {
        enabled: false,
        outputFile: "gas-report.txt",
        noColors: true,
        currency: "USD",
        coinmarketcap: COINMARKETCAP_API_KEY,
        token: "MATIC",
    },
    etherscan: {
        apiKey: ETHERSCAN_API_KEY,
    },
}
