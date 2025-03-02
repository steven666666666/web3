const { ethers } = require("hardhat");

async function main() {
  const [deployer] = await ethers.getSigners();
  console.log("部署账户:", deployer.address);

  const Token = await ethers.getContractFactory("MyToken");
  const token = await Token.deploy();

  await token.waitForDeployment();
  console.log("代币地址：", await token.getAddress());
}

main().catch(error => {
  console.log(error);
  process.exitCode = 1;
});
