const { expect } = require("chai");
const { ethers } = require("hardhat");
const { loadFixture } = require("@nomicfoundation/hardhat-network-helpers");
const { mockAndProxyFixture } = require("./fixtures");

describe("MocGasPriceProxyContract", function () {
  it("returns the price in whole units", async function () {
    const { mock, proxy } = await loadFixture(mockAndProxyFixture);

    // set 20 000 ETH-wei (i.e. 20 000 * 10^18)
    await mock.setPrice(ethers.parseUnits("20000", "ether"));

    // dividing by 10^18 should give 20000
    expect(await proxy.getConvertedPrice()).to.equal(20000);
  });

  it("reverts if deployed with the zero address", async function () {
    const Factory = await ethers.getContractFactory("MocGasPriceProxyContract");
    await expect(
      Factory.deploy(ethers.ZeroAddress)
    ).to.be.revertedWith("Invalid MoCState address");
  });
});
