const hre = require("hardhat");

async function main() {
  const contractAddress = "0x0Fc3758b0732D7F1500F647528f1ca02f233f619"; // 替换为你的合约地址
  const SimpleStorage = await hre.ethers.getContractFactory("SimpleStorage");
  const contract = SimpleStorage.attach(contractAddress);

  // 设置值
  const tx = await contract.setValue(42);
  await tx.wait();
  console.log("值已设置为 42");

  // 获取值
  const value = await contract.getValue();
  console.log("当前值:", value.toString());
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });