import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { expect } from "chai";
import { Contract } from "ethers";
import { ethers } from "hardhat";
import { getNewInstance, submitInstance } from "../utils";

const LEVEL_ADDRESS = "0xe6BA07257a9321e755184FB2F995e0600E78c16D";

let owner: SignerWithAddress;
let attacker: SignerWithAddress;
let txn: any;
let contract: Contract;
let attackContract: Contract;

describe.only("Reentrance", () => {

    beforeEach(async () => {
        [owner, attacker] = await ethers.getSigners();

        const contractFactory = await ethers.getContractFactory("Reentrance");
        const challengeAddr = await getNewInstance(LEVEL_ADDRESS, ethers.utils.parseEther("0.001"));
        contract = await contractFactory.attach(challengeAddr);

        const attackContractFactory = await ethers.getContractFactory("ReentranceAttack");
        attackContract = await attackContractFactory.deploy(contract.address);
    });

    it("Should solve the challenge", async function () {
        expect(await submitInstance(contract.address)).to.be.false;

        txn = await attackContract.donate({
            value: ethers.utils.parseEther("0.001")
        });
        await txn.wait();

        console.log(await contract.balanceOf(attackContract.address));

        
        expect(await submitInstance(contract.address), "level is not complete").to.be.true;
    });
});