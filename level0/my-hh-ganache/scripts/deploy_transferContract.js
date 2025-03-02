async function main() {
    const TransferContract = await ethers.getContractFactory("TransferContract");
    const contract = await TransferContract.deploy();
    
   
    console.log("合约地址", contract.target);
  }
  
  main()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error(error);
      process.exit(1);
    });