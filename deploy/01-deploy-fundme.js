//import

//main function

//calling for main function

const { networkConfig } = require("../helper-hardhat-config");
const { network } = require("hardhat");
module.exports = async ({ getNamedAccounts, deployments }) => {
  const { deploy, log } = deployments;
  const { deployer } = await getNamedAccounts();
  const chainId = network.config.chainId;
  const address = "0xD4a33860578De61DBAbDc8BFdb98FD742fA7028e";

  const ethUsdPriceFeedAddress = networkConfig[chainId]["ethUsdPriceFeed"];
  const fundme = await deploy("FundMe", {
    from: deployer,
    args: [],
    log: true,
  });
};
