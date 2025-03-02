// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract MyToken is ERC20, Ownable {
    constructor() 
        ERC20("MyToken", "MTK") 
        Ownable(msg.sender) 
    {
        _mint(msg.sender, 1000000 * 10**decimals());
    }

    // 铸币功能（仅拥有者）
    function mint(address to, uint256 amount) public onlyOwner {
        _mint(to, amount);
    }

    // 销毁功能
    function burn(uint256 amount) public {
        _burn(msg.sender, amount);
    }
}