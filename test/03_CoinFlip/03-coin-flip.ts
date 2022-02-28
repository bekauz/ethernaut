import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { expect } from "chai";
import { BigNumber, Contract } from "ethers";
import { ethers } from "hardhat";
import { getNewInstance, submitInstance } from "../utils";

const LEVEL_ADDRESS = "0x4dF32584890A0026e56f7535d0f2C6486753624f";

let owner: SignerWithAddress;
let attacker: SignerWithAddress;
let txn: any;
let contract: Contract;
let fakeContract: Contract;

describe("CoinFlip", () => {

    beforeEach(async () => {
        [owner, attacker] = await ethers.getSigners();
        // get instance of the challenge contract
        const contractFactory = await ethers.getContractFactory("CoinFlip");
        const challengeAddr = await getNewInstance(LEVEL_ADDRESS);
        contract = await contractFactory.attach(challengeAddr);

        // get instance of the fake contract attached to the challenge
        const fakeContractFactory = await ethers.getContractFactory("FakeCoinFlip");
        fakeContract = await fakeContractFactory.deploy(contract.address);
    });

    it("Should solve the challenge", async function () {
        
        expect(await contract.consecutiveWins()).to.equal(BigNumber.from(0));        
        expect(await submitInstance(contract.address)).to.be.false;

        for (let i = 0; i < 10; i++) {
            // call the fake contract which will in turn call the real one
            txn = await fakeContract.flip();
            await txn.wait();
        }

        expect(await contract.consecutiveWins()).to.equal(BigNumber.from(10));
        expect(await submitInstance(contract.address), "level is not complete").to.be.true;
    });
});