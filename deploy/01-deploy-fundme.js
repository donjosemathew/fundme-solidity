//import
require("dotenv").config();
//main function

//calling for main function

const {
  networkConfig,
  developmentChains,
} = require("../helper-hardhat-config");
const { network } = require("hardhat");
const { verify } = require("../utils/verify");
module.exports = async ({ getNamedAccounts, deployments }) => {
  const { deploy, log } = deployments;
  const { deployer } = await getNamedAccounts();
  const chainId = network.config.chainId;
  const address = "0xD4a33860578De61DBAbDc8BFdb98FD742fA7028e";

  let ethUsdPriceFeedAddress;
  //= networkConfig[chainId]["ethUsdPriceFeed"]
  //const args = [ethUsdPriceFeedAddress];
  //developmentChains.includes(network.name)
  if (chainId == 31337) {
    const ethUserAggregator = await deployments.get("MockV3Aggregator");
    ethUsdPriceFeedAddress = ethUserAggregator.address;
    console.log("jbj");
  } else {
    ethUsdPriceFeedAddress = networkConfig[chainId]["ethUsdPriceFeed"];
  }
  const fundme = await deploy("FundMe", {
    from: deployer,
    args: [ethUsdPriceFeedAddress],
    log: true,
    waitConfirmations: network.config.blockConfirmations || 1,
  });
  console.log(ethUsdPriceFeedAddress);
  if (
    !developmentChains.includes(network.name) &&
    process.env.ETHERSCAN_API_KEY
  ) {
    //VERIFY
    await verify(fundme.address, args);
  }
};

module.exports.tags = ["all", "fundme"];
