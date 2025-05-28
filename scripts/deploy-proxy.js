// scripts/deploy-proxy.js
import "dotenv/config";
import { ethers } from "hardhat";

async function main() {
  // 1) Get the MoCState address. You can either:
  //    • Read it from .env
  //    • Hard-code it here
  const MOC_STATE_ADDR = process.env.MOC_STATE_ADDR;
  if (!MOC_STATE_ADDR) {
    throw new Error("🛑 Please set MOC_STATE_ADDR in your .env");
  }

  // 2) Compile & grab the factory for your proxy
  const Proxy = await ethers.getContractFactory("MocGasPriceProxyContract");

  // 3) Deploy, passing the MoCState address into the constructor
  console.log("🚀 Deploying proxy, pointing at MoCState:", MOC_STATE_ADDR);
  const proxy = await Proxy.deploy(MOC_STATE_ADDR);

  // 4) Wait until it’s mined
  await proxy.waitForDeployment();

  // 5) Log the deployed proxy address
  console.log("✅ Proxy deployed to:", await proxy.getAddress());
}

main()
  .catch(err => {
    console.error(err);
    process.exit(1);
  });
