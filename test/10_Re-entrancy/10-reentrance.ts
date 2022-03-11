import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { expect } from "chai";
import { BigNumber, Contract } from "ethers";
import { ethers } from "hardhat";
import { getNewInstance, submitInstance } from "../utils";

const LEVEL_ADDRESS = "0xe6BA07257a9321e755184FB2F995e0600E78c16D";

let owner: SignerWithAddress;
let attacker: SignerWithAddress;
let txn: any;
let contract: Contract;
let attackContract: Contract;

describe("Reentrance", () => {

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
        let attackerBalance: BigNumber = await contract.balanceOf(attackContract.address);

        expect(attackerBalance).to.be.equal(BigNumber.from(0));

        txn = await attackContract.attack({
            value: ethers.utils.parseEther("1.1"),
            gasLimit: BigNumber.from("1000000")
        });
        await txn.wait();

        attackerBalance = await contract.balanceOf(attackContract.address);    

        expect(attackerBalance).to.be.gt(BigNumber.from(0));
        expect(await submitInstance(contract.address), "level is not complete").to.be.true;
    });
});