// test/fixtures.js
const { ethers } = require("hardhat");

async function deployMockMoCState() {
  const Factory = await ethers.getContractFactory("MockMoCState");
  const mock = await Factory.deploy();
  await mock.waitForDeployment();
  return mock;
}

async function deployProxy(mocStateAddress) {
  const Factory = await ethers.getContractFactory("MocGasPriceProxyContract");
  const proxy = await Factory.deploy(mocStateAddress);
  await proxy.waitForDeployment();
  return proxy;
}

async function mockAndProxyFixture() {
  // 1) deploy the mock
  const mock = await deployMockMoCState();
  // 2) fetch its real address
  const mocStateAddress = await mock.getAddress(); 
  // 3) deploy your proxy pointing at that address
  const proxy = await deployProxy(mocStateAddress);
  return { mock, proxy };
}

module.exports = {
  deployMockMoCState,
  deployProxy,
  mockAndProxyFixture,
};
