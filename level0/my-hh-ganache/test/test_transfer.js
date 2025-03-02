const { ethers } = require("ethers");
require("dotenv").config();

async function main() {
  // 配置参数（需要替换的部分↓↓）
  const GANACHE_RPC = "http://localhost:7545";
  const CONTRACT_ADDRESS = "0xcD3b9bDb6Aa738060FfA537A08b9A043e020E05d"; // 你的合约地址
  const SENDER_PRIVATE_KEY = process.env.PRIVATE_KEY; // 发送者私钥
  const RECIPIENT_ADDRESS = "0x8493942E8D5DD28F9612874C752422279c317950"; // 接收地址

  // 初始化提供者和签名者
  const provider = new ethers.providers.JsonRpcProvider(GANACHE_RPC);
  const signer = new ethers.Wallet(SENDER_PRIVATE_KEY, provider);

  // 创建合约实例
  const contractABI = [
    "function transferToAddress(address, uint256)",
    "function transferToContract() payable",
    "event TransferReceived(address indexed from, uint256 amount)"
  ];

  const contract = new ethers.Contract(CONTRACT_ADDRESS, contractABI, signer);

  // ========== 执行转账操作 ==========

  // 操作1：向合约转账
  // 执行转账（测试用小额）
  try {
    const tx = await contract.transferToAddress(
      RECIPIENT_ADDRESS, // Ganache 第二个账户
      ethers.parseEther("0.5"), // 转账金额
      {
        gasLimit: 100000,
        gasPrice: ethers.parseUnits("10", "gwei")
      }
    );

    console.log("交易哈希:", tx.hash);
    const receipt = await tx.wait();
    console.log("交易确认，消耗 Gas:", receipt.gasUsed.toString());
  } catch (error) {
    console.error("交易失败:", error.message);
  }

  // 操作2：从合约转出到其他地址
  const withdrawAmount = ethers.utils.parseEther("0.8"); // 转出0.8 ETH
  const tx2 = await contract.transferToAddress(
    RECIPIENT_ADDRESS,
    withdrawAmount
  );
  console.log("转出交易已发送，哈希:", tx2.hash);
  await tx2.wait();
  console.log("✅ 资金已转出到目标地址");

  // ========== 验证结果 ==========
  // 查看合约余额
  const contractBalance = await provider.getBalance(CONTRACT_ADDRESS);
  console.log("合约余额:", ethers.utils.formatEther(contractBalance), "ETH");

  // 查看接收方余额
  const recipientBalance = await provider.getBalance(RECIPIENT_ADDRESS);
  console.log("接收方余额:", ethers.utils.formatEther(recipientBalance), "ETH");
}

main().catch(console.error);
