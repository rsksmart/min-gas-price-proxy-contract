require("dotenv/config");
const { ethers } = require("hardhat");

async function main() {
  const MOC_STATE_ADDR = process.env.MOC_STATE_ADDR;
  if (!MOC_STATE_ADDR) throw new Error("🛑 Please set MOC_STATE_ADDR in your .env");

  // Get private key from environment
  const PRIVATE_KEY = process.env.PRIVATE_KEY;
  if (!PRIVATE_KEY) throw new Error("Please set PRIVATE_KEY in your .env");

  // Create wallet from private key
  const provider = ethers.provider;
  const wallet = new ethers.Wallet(PRIVATE_KEY, provider);


  console.log("🚀 Deploying proxy with wallet:", wallet.address);
  console.log("💰 Wallet balance:", ethers.formatEther(await provider.getBalance(wallet.address)), "RBTC");
  console.log("📋 Pointing at MoCState:", MOC_STATE_ADDR);

  const Proxy = await ethers.getContractFactory("MocGasPriceProxyContract", wallet);

  console.log("🚀 Deploying proxy, pointing at MoCState:", MOC_STATE_ADDR);
  const proxy = await Proxy.deploy(MOC_STATE_ADDR);
  await proxy.waitForDeployment();

  console.log("✅ Proxy deployed to:", await proxy.getAddress());
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
