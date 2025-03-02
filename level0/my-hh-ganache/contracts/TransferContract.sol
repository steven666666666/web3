// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract TransferContract {
    event TransferReceived(address indexed from, uint256 amount);
    event TransferSent(address indexed to, uint256 amount);

    // 接收ETH的默认函数
    receive() external payable {
        emit TransferReceived(msg.sender, msg.value);
    }

    // 主动转账到合约的函数
    function transferToContract() external payable {
        emit TransferReceived(msg.sender, msg.value);
    }

    // 从合约转账到其他地址
    function transferToAddress(address payable _to, uint256 _amount) external {
        require(_amount <= address(this).balance, "Insufficient balance");
        _to.transfer(_amount);
        emit TransferSent(_to, _amount);
    }

    // 获取合约余额
    function getBalance() external view returns (uint256) {
        return address(this).balance;
    }
}