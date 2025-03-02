// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Counter {
    uint256 public count;

    event Incremented(address indexed caller, uint256 newCount);

    function increment() public {
        count += 1;
        emit Incremented(msg.sender, count);
    }

    function chargeBal() public payable{
        
    }
}
