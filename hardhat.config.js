// hardhat.config.js
require("dotenv/config");
require("@nomicfoundation/hardhat-toolbox");
require("@nomicfoundation/hardhat-verify");


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
    },
  },
  sourcify: {
    enabled: false
  },  
  etherscan: {    
    apiKey: {
      rsktestnet: 'RSK_TESTNET_RPC_URL',
      rskmainnet: 'RSK_MAINNET_RPC_URL'
    },
    customChains: [
      {
        network: "rsktestnet",
        chainId: 31,
        urls: {
          apiURL: "https://rootstock-testnet.blockscout.com/api/",
          browserURL: "https://rootstock-testnet.blockscout.com/",
        }
      },
      {
        network: "rskmainnet",
        chainId: 30,
        urls: {
          apiURL: "https://rootstock.blockscout.com/api/",
          browserURL: "https://rootstock.blockscout.com/",
        }
      },
    ]
  },
};
