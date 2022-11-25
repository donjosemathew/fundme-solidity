const { deployments, ethers, getNamedAccounts } = require("hardhat");
const { assert, expect } = require("chai");
describe("fundme", function () {
  let fundMe;
  let deployer;
  let mockV3Aggregator;
  const sendValue = ethers.utils.parseEther("1");
  beforeEach(async function () {
    deployer = (await getNamedAccounts()).deployer;
    await deployments.fixture(["all"]);
    fundMe = await ethers.getContract("FundMe", deployer);
    mockV3Aggregator = await ethers.getContract("MockV3Aggregator", deployer);
  });
  describe("constructor", async function () {
    it("Sets the aggregator addresses correctly", async function () {
      const response = await fundMe.getPriceFeed();
      assert.equal(response, mockV3Aggregator.address);
    });
  });
  describe("fund", async function () {
    it("Fails if you don't send ether", async function () {
      await expect(fundMe.fund()).to.be.revertedWith(
        "You need to spend more ETHS"
      );
    });
    it("updated the amount funded data structure", async function () {
      await fundMe.fund({ value: sendValue });
      const response = await fundMe.addressToAmountFunded(deployer.address);
      assert.equal(response.toString(), sendValue.toString());
    });
  });
});
