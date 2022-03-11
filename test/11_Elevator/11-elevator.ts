import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { expect } from "chai";
import { Contract } from "ethers";
import { ethers } from "hardhat";
import { getNewInstance, submitInstance } from "../utils";

const LEVEL_ADDRESS = "0xaB4F3F2644060b2D960b0d88F0a42d1D27484687";

let owner: SignerWithAddress;
let attacker: SignerWithAddress;
let txn: any;
let contract: Contract;
let attackContract: Contract;

describe.only("Elevator", () => {

    beforeEach(async () => {
        [owner, attacker] = await ethers.getSigners();

        const contractFactory = await ethers.getContractFactory("Elevator");
        const challengeAddr = await getNewInstance(LEVEL_ADDRESS);
        contract = await contractFactory.attach(challengeAddr);

        const attackFactory = await ethers.getContractFactory("ElevatorAttack");
        attackContract = await attackFactory.deploy(contract.address);
    });

    it("Should solve the challenge", async function () {
        expect(await submitInstance(contract.address)).to.be.false;
        expect(await contract.top()).to.be.false;
        
        txn = await attackContract.attack();
        await txn.wait();

        expect(await contract.top()).to.be.true;
        expect(await submitInstance(contract.address), "level is not complete").to.be.true;
    });
});