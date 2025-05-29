require("dotenv/config");
const { ethers } = require("hardhat");

async function main() {
  const MOC_STATE_ADDR = process.env.MOC_STATE_ADDR;
  if (!MOC_STATE_ADDR) throw new Error("🛑 Please set MOC_STATE_ADDR in your .env");

  console.log("🚀 Deploying proxy, pointing at MoCState:", MOC_STATE_ADDR);
  const Proxy = await ethers.getContractFactory("MocGasPriceProxyContract");
  const proxy = await Proxy.deploy(MOC_STATE_ADDR);
  await proxy.waitForDeployment();

  console.log("✅ Proxy deployed to:", await proxy.getAddress());
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
