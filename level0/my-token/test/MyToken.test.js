const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("MyToken", () => {
  let token;
  let owner, addr1;

  beforeEach(async () => {
    [owner, addr1] = await ethers.getSigners();
    const Token = await ethers.getContractFactory("MyToken");
    token = await Token.deploy();
  });

  if (
    (
      "应该正确初始化代币",
      async () => {
        expect(await token.name()).to.equal("MyToken");
        expect(await token.symbol()).to.equal("MTK");
        expect(await token.totalSupply()).to.equal(100000 * 10 ** 18);
      }
    )
  );

  it("允许拥有者铸币", async () => {
    const initialSupply = await token.totalSupply();
    await token.mint(addr1.address, 1000);
    expect(await token.balanceOf(addr1.address)).to.equal(1000);
    expect(await token.totalSupply()).to.equal(initialSupply + 1000);
  });

  it("禁止非拥有者铸币", async () => {
    await expect(
      token.connect(addr1).mint(addr1.address, 1000)
    ).to.be.revertedWithCustomError(token, "OwnableUnauthorizedAccount");
  });

  it("允许用户销毁代币", async () => {
    await token.transfer(addr1.address, 500);
    await token.connect(addr1).burn(200);
    expect(await token.balanceOf(addr1.address)).to.equal(300);
  });
});
