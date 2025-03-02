async function main() {
    const [deployer] = await ethers.getSigners();
    const Counter = await ethers.getContractFactory("Counter");
    const counter = await Counter.deploy();
    console.log("合约地址:", counter.target);
  
    // 先设置事件监听器
    const filter = counter.filters.Incremented();
    counter.on(filter, (caller, newCount) => {
      console.log(`账户 ${caller} 触发 increment，新值: ${newCount}`);
    });
  
    // 触发 increment 并等待交易确认
    const tx = await counter.increment();
    await tx.wait(); // 确保交易被确认
  
    // 保持进程运行以监听事件（可选：测试环境下可能需要）
    await new Promise(resolve => setTimeout(resolve, 5000)); // 保持 5 秒
  }
  
  main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
  });