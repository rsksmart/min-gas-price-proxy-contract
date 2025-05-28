# Min Gas Price Proxy Contract

This is a simple Min Gas price proxy contract used to get fiat stable gas price in the format expected by the RSKj node. This hardhat project deploys a simple “gas price proxy” contract which reads a BTC price from an existing MoCState contract, converts it from wei to whole units, and exposes it via `getConvertedPrice()`.

## Contents

- `contracts/`
  - `MocGasPriceProxyContract.sol` — the proxy contract
- `scripts/`
  - `deploy-proxy.js` — deployment script for RSK networks
- `test/`
  - `fixtures.js` — helper functions to deploy mock & proxy
  - `MocGasPriceProxyContract.test.js` — unit tests
- `hardhat.config.js` — network & compiler setup
- `.env` — private keys & addresses
- `package.json` — project metadata & scripts

---

## Prerequisites

- [Node.js](https://nodejs.org/) ≥ 16  
- [npm](https://www.npmjs.com/)  
- An RSK Testnet or Mainnet mnemonic in your `.env`

---

## Installation

```bash
git clone <your-repo-url>
cd min-gas-price-proxy-contract
npm install
```

---

## Configuration

Create a file named `.env` in the project root with the MocState address for the network you are deploying. For example, for testnet:
```bash
# .env
MNEMONIC="your twelve-word wallet mnemonic"
MOC_STATE_ADDR="0x0adb40132cB0ffcEf6ED81c26A1881e214100555"
```

- `MNEMONIC`: your wallet’s mnemonic (used by Hardhat to derive deployer account)  
- `MOC_STATE_ADDR`: the address of the existing MoCState contract

---

## Networks

Your `hardhat.config.js` includes:

```js
networks: {
  hardhat: {},
  rsktestnet: {
    url: "https://public-node.testnet.rsk.co",
    chainId: 31,
    accounts: { mnemonic: MNEMONIC }
  },
  rskmainnet: {
    url: "https://public-node.rsk.co",
    chainId: 30,
    accounts: { mnemonic: MNEMONIC }
  }
}
```

- Use `--network rsktestnet` for Testnet  
- Use `--network rskmainnet` for Mainnet

---

## Deployment

To deploy the proxy pointing at MoCState in the Rootstock testnet:

```bash
npx hardhat run scripts/deploy-proxy.js --network rsktestnet
```

You’ll see an output like:

```
🚀 Deploying proxy, pointing at MoCState: 0x...
✅ Proxy deployed to: 0x...
```

If you want to deploy at mainnet, just change to the mainnet configuration.

---

## Testing

Unit tests spin up a local Hardhat network, deploy a mock MoCState, and verify that `getConvertedPrice()` works as expected:

```bash
npm test
# which runs: npx hardhat test
```

---

## Contract Overview

```solidity
interface IMoCState {
  function getBitcoinPrice() external view returns (uint256);
}

contract MocGasPriceProxyContract {
  address public IMoCState_addr;

  constructor(address _mocStateAddr) {
    require(_mocStateAddr != address(0), "Invalid MoCState address");
    IMoCState_addr = _mocStateAddr;
  }

  function getConvertedPrice() external view returns (uint256) {
    uint256 priceInWei = IMoCState(IMoCState_addr).getBitcoinPrice();
    return priceInWei / 10**18;
  }
}
```

- **Constructor arg**: address of the on-chain MoCState
- **`getConvertedPrice()`**: reads the BTC price (in wei) and returns it divided by 10¹⁸

---

## Useful npm Scripts

```jsonc
"scripts": {
  "test":       "hardhat test",
  "deploy:rsktestnet": "hardhat run scripts/deploy-proxy.js --network rsktestnet",
  "deploy:rskmainnet": "hardhat run scripts/deploy-proxy.js --network rskmainnet"
}
```

- `npm test` → run unit tests  
- `npm run deploy:proxy` → deploy to RSK Testnet  

---

## License

MIT
