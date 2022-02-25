import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { assert, expect } from "chai";
import { Contract, Signer } from "ethers";
import { ethers } from "hardhat";

const INSTANCE_ADDRESS = "0x30a9052735c4F551c8d0f33782B59549d418571e";

let owner: SignerWithAddress;
let attacker: SignerWithAddress;
let txn: any;
let contract: Contract;


describe.only("CoinFlip", () => {

    beforeEach(async () => {
        [owner, attacker] = await ethers.getSigners();

        contract = await ethers.getContractAt(
            "CoinFlip",
            INSTANCE_ADDRESS,
            owner
        );
    });

    it("Should solve the challenge", async function () {

    });
});