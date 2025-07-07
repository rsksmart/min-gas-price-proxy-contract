const { Wallet, JsonRpcProvider, formatEther } = require("ethers");
require("dotenv").config();

const provider = new JsonRpcProvider("https://public-node.rsk.co");
const wallet = new Wallet(process.env.PRIVATE_KEY, provider);

async function main() {
    const balance = await provider.getBalance(wallet.address);
    console.log("Address:", wallet.address);
    console.log("RBTC balance:", formatEther(balance), "RBTC");
}

main();