require("@nomicfoundation/hardhat-toolbox");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.20",

  networks: {
    ganache: {
      url: "http://localhost:7545",
      accounts: [
        "0x85a4f19d82f8aa18f7e8aa282cbbf3dc13293190a0dea4ac400d2056eae8b2b1" // Ganache 默认私钥
      ]
    }
  }
};
