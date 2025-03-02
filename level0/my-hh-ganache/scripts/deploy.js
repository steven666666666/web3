const hre = require("hardhat");

async function main() {
  // 1. 获取部署者账户
  const [deployer] = await hre.ethers.getSigners();
  console.log("部署者地址:", deployer.address);

  // 2. 编译并部署合约
  const SimpleStorage = await hre.ethers.getContractFactory("SimpleStorage");
  const contract = await SimpleStorage.deploy();

  // 3. 等待部署确认
  await contract.waitForDeployment();

  // 4. 获取合约地址
  const contractAddress = await contract.getAddress();
  console.log("合约地址:", contractAddress);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });