import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { expect } from "chai";
import { BigNumber, BigNumberish, Bytes, Contract, utils } from "ethers";
import { arrayify } from "ethers/lib/utils";
import { ethers } from "hardhat";
import { boolean } from "hardhat/internal/core/params/argumentTypes";
import { getNewInstance, submitInstance } from "../utils";

const LEVEL_ADDRESS = "0x11343d543778213221516D004ED82C45C3c8788B";

let owner: SignerWithAddress;
let attacker: SignerWithAddress;
let txn: any;
let contract: Contract;

describe.only("Privacy", () => {

    beforeEach(async () => {
        [owner, attacker] = await ethers.getSigners();

        const contractFactory = await ethers.getContractFactory("Privacy");
        const challengeAddr = await getNewInstance(LEVEL_ADDRESS);
        contract = await contractFactory.attach(challengeAddr);
    });

    it("Should solve the challenge", async function () {
        expect(await submitInstance(contract.address)).to.be.false;
        expect(await contract.locked()).to.be.true;

        let locked: any = await owner.provider?.getStorageAt(contract.address, 0);
        let ID: any = await owner.provider?.getStorageAt(contract.address, 1);
        let flattening: any = await owner.provider?.getStorageAt(contract.address, 2);
        let denomination: any = await owner.provider?.getStorageAt(contract.address, 3);
        let awkwardness: any = await owner.provider?.getStorageAt(contract.address, 4);
        let data: any = await owner.provider?.getStorageAt(contract.address, 5);

        expect(ethers.utils.isHexString(ID)).to.be.true;
        expect(ethers.utils.isBytesLike(ID)).to.be.true;

        let dataArray: Uint8Array = arrayify(data);
        
        console.log(dataArray);  
        console.log(ethers.utils.zeroPad(dataArray.slice(16, 24), 16))

        expect(await contract.locked()).to.be.false;
        expect(await submitInstance(contract.address), "level is not complete").to.be.true;
    });
});