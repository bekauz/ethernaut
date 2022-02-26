import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { assert, expect } from "chai";
import { BigNumber, Contract, Signer } from "ethers";
import { ethers } from "hardhat";

const INSTANCE_ADDRESS = "0x30a9052735c4F551c8d0f33782B59549d418571e";

let owner: SignerWithAddress;
let attacker: SignerWithAddress;
let txn: any;
let contract: Contract;
let fakeContract: Contract;

describe.only("CoinFlip", () => {

    beforeEach(async () => {
        [owner, attacker] = await ethers.getSigners();
        const fakeContractFactory = await ethers.getContractFactory("FakeCoinFlip");

        contract = await ethers.getContractAt(
            "CoinFlip",
            INSTANCE_ADDRESS,
            owner
        );

        fakeContract = await fakeContractFactory.deploy(contract.address);
    });

    it("Should solve the challenge", async function () {
        
        expect(await contract.consecutiveWins()).to.equal(BigNumber.from(0));        

        for (let i = 0; i < 10; i++) {
            // call the fake contract which will in turn call the real one
            txn = await fakeContract.flip();
            await txn.wait();
        }

        expect(await contract.consecutiveWins()).to.equal(BigNumber.from(10));        
    });
});