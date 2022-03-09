// SPDX-License-Identifier: MIT
pragma solidity ^0.6.0;


interface IReentrance {

    function donate(address _to) external payable;

    function balanceOf(address _who) external view returns (uint balance);

    function withdraw(uint _amount) external;
}


contract ReentranceAttack {

    IReentrance challenge;

    constructor(address _challengeAddress) public {
        challenge = IReentrance(_challengeAddress);
    }

    function donate() public payable {
        challenge.donate{value: msg.value}(address(this));
    }
}