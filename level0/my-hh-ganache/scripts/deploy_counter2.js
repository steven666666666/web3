async function main() {
    const [deployer] = await ethers.getSigners();
    const Counter = await ethers.getContractFactory("Counter");
    const counter = await Counter.deploy();
    console.log("合约地址:", counter.target);
  
    // 触发 increment 并获取交易收据
    const tx = await counter.increment();
    const receipt = await tx.wait();

    console.log("交易收据中的原始日志:", receipt.logs);
  
    // 解析事件日志
    const event = receipt.logs.map(log => counter.interface.parseLog(log))[0];
    if (event && event.name === "Incremented") {
      console.log(`账户 ${event.args.caller} 触发 increment，新值: ${event.args.newCount}`);
    }

    
  }
  
  main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
  });