require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.28",
  networks: {
    // 配置 Ganache 网络
    ganache: {
      url: "http://localhost:7545", // Ganache 默认 RPC URL
      chainId: 1337, // Ganache 默认 Chain ID
      accounts: [
        // 使用 Ganache 提供的私钥（示例，实际替换为你 Ganache 的私钥）
        "0x85a4f19d82f8aa18f7e8aa282cbbf3dc13293190a0dea4ac400d2056eae8b2b1", 
      ],
    },
     sepolia: {
      url:process.env.RPC_URL,
      accounts: [process.env.PRIVATE_KEY]
    }

  },
};
