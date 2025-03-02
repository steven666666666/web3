const { ethers } = require("hardhat");

async function main() {
  // 获取合约实例
  const Token = await ethers.getContractFactory("MyToken");
  const token = await Token.attach("0xee02FD26A3d933A3eBEB78560BdEB6C85D487597");

  // 获取账户
  const [owner] = await ethers.getSigners();
  
  // 查询余额
  console.log("Owner balance:", await token.balanceOf(owner.address));

  // 转账操作
  const tx1 = await token.transfer(
    "0x8493942E8D5DD28F9612874C752422279c317950", 
    10
  );
  await tx1.wait();
  console.log("转账完成");

  console.log("0x8493942E8D5DD28F9612874C752422279c317950余额",await token.balanceOf("0x8493942E8D5DD28F9612874C752422279c317950"))

  console.log("合约余额",await token.balanceOf("0xee02FD26A3d933A3eBEB78560BdEB6C85D487597"))

  // 铸币操作
  const tx2 = await token.mint(owner.address, 5000);
  await tx2.wait();
  console.log("铸币完成");
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });