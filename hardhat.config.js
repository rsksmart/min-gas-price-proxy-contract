// hardhat.config.js
require("dotenv/config");
require("@nomicfoundation/hardhat-toolbox");

const { MNEMONIC } = process.env;
if (!MNEMONIC) throw new Error("Missing MNEMONIC in .env");

module.exports = {
  solidity: "0.8.25",
  defaultNetwork: "hardhat",
  networks: {
    hardhat: {},
    rsktestnet: {
      url: "https://public-node.testnet.rsk.co",
      chainId: 31,
      accounts: {
        mnemonic: MNEMONIC,
        initialIndex: 0,
        count: 1
      }
    },
    rskmainnet: {
      url: "https://public-node.rsk.co",
      chainId: 30, 
      accounts: {
        mnemonic: MNEMONIC,
        initialIndex: 0,
        count: 1
      }
  }
}
};
