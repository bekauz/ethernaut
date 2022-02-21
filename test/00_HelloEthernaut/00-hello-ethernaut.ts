import { expect } from "chai";
import { Contract } from "ethers";
import { ethers } from "hardhat";

const contract = {
    "methods": {},
    "abi": [
      {
        "inputs": [
          {
            "internalType": "string",
            "name": "_password",
            "type": "string"
          }
        ],
        "stateMutability": "nonpayable",
        "type": "constructor"
      },
      {
        "inputs": [
          {
            "internalType": "string",
            "name": "passkey",
            "type": "string"
          }
        ],
        "name": "authenticate",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function",
        "signature": "0xaa613b29"
      },
      {
        "inputs": [],
        "name": "getCleared",
        "outputs": [
          {
            "internalType": "bool",
            "name": "",
            "type": "bool"
          }
        ],
        "stateMutability": "view",
        "type": "function",
        "constant": true,
        "signature": "0x3c848d78"
      },
      {
        "inputs": [],
        "name": "info",
        "outputs": [
          {
            "internalType": "string",
            "name": "",
            "type": "string"
          }
        ],
        "stateMutability": "pure",
        "type": "function",
        "constant": true,
        "signature": "0x370158ea"
      },
      {
        "inputs": [],
        "name": "info1",
        "outputs": [
          {
            "internalType": "string",
            "name": "",
            "type": "string"
          }
        ],
        "stateMutability": "pure",
        "type": "function",
        "constant": true,
        "signature": "0xd4c3cf44"
      },
      {
        "inputs": [
          {
            "internalType": "string",
            "name": "param",
            "type": "string"
          }
        ],
        "name": "info2",
        "outputs": [
          {
            "internalType": "string",
            "name": "",
            "type": "string"
          }
        ],
        "stateMutability": "pure",
        "type": "function",
        "constant": true,
        "signature": "0x2133b6a9"
      },
      {
        "inputs": [],
        "name": "info42",
        "outputs": [
          {
            "internalType": "string",
            "name": "",
            "type": "string"
          }
        ],
        "stateMutability": "pure",
        "type": "function",
        "constant": true,
        "signature": "0x2cbd79a5"
      },
      {
        "inputs": [],
        "name": "infoNum",
        "outputs": [
          {
            "internalType": "uint8",
            "name": "",
            "type": "uint8"
          }
        ],
        "stateMutability": "view",
        "type": "function",
        "constant": true,
        "signature": "0xc253aebe"
      },
      {
        "inputs": [],
        "name": "method7123949",
        "outputs": [
          {
            "internalType": "string",
            "name": "",
            "type": "string"
          }
        ],
        "stateMutability": "pure",
        "type": "function",
        "constant": true,
        "signature": "0xf0bc7081"
      },
      {
        "inputs": [],
        "name": "password",
        "outputs": [
          {
            "internalType": "string",
            "name": "",
            "type": "string"
          }
        ],
        "stateMutability": "view",
        "type": "function",
        "constant": true,
        "signature": "0x224b610b"
      },
      {
        "inputs": [],
        "name": "theMethodName",
        "outputs": [
          {
            "internalType": "string",
            "name": "",
            "type": "string"
          }
        ],
        "stateMutability": "view",
        "type": "function",
        "constant": true,
        "signature": "0xf157a1e3"
      }
    ],
    "address": "0x7f57FCB659Ab27CC4644604Ad3714e1C22CCbC18",
    "contract": {
      "_requestManager": {
        "providers": {},
        "subscriptions": {}
      },
      "providers": {},
      "options": {},
      "methods": {},
      "events": {},
      "_address": "0x7f57FCB659Ab27CC4644604Ad3714e1C22CCbC18",
      "_jsonInterface": [
        {
          "inputs": [
            {
              "internalType": "string",
              "name": "_password",
              "type": "string"
            }
          ],
          "stateMutability": "nonpayable",
          "type": "constructor"
        },
        {
          "inputs": [
            {
              "internalType": "string",
              "name": "passkey",
              "type": "string"
            }
          ],
          "name": "authenticate",
          "outputs": [],
          "stateMutability": "nonpayable",
          "type": "function",
          "signature": "0xaa613b29"
        },
        {
          "inputs": [],
          "name": "getCleared",
          "outputs": [
            {
              "internalType": "bool",
              "name": "",
              "type": "bool"
            }
          ],
          "stateMutability": "view",
          "type": "function",
          "constant": true,
          "signature": "0x3c848d78"
        },
        {
          "inputs": [],
          "name": "info",
          "outputs": [
            {
              "internalType": "string",
              "name": "",
              "type": "string"
            }
          ],
          "stateMutability": "pure",
          "type": "function",
          "constant": true,
          "signature": "0x370158ea"
        },
        {
          "inputs": [],
          "name": "info1",
          "outputs": [
            {
              "internalType": "string",
              "name": "",
              "type": "string"
            }
          ],
          "stateMutability": "pure",
          "type": "function",
          "constant": true,
          "signature": "0xd4c3cf44"
        },
        {
          "inputs": [
            {
              "internalType": "string",
              "name": "param",
              "type": "string"
            }
          ],
          "name": "info2",
          "outputs": [
            {
              "internalType": "string",
              "name": "",
              "type": "string"
            }
          ],
          "stateMutability": "pure",
          "type": "function",
          "constant": true,
          "signature": "0x2133b6a9"
        },
        {
          "inputs": [],
          "name": "info42",
          "outputs": [
            {
              "internalType": "string",
              "name": "",
              "type": "string"
            }
          ],
          "stateMutability": "pure",
          "type": "function",
          "constant": true,
          "signature": "0x2cbd79a5"
        },
        {
          "inputs": [],
          "name": "infoNum",
          "outputs": [
            {
              "internalType": "uint8",
              "name": "",
              "type": "uint8"
            }
          ],
          "stateMutability": "view",
          "type": "function",
          "constant": true,
          "signature": "0xc253aebe"
        },
        {
          "inputs": [],
          "name": "method7123949",
          "outputs": [
            {
              "internalType": "string",
              "name": "",
              "type": "string"
            }
          ],
          "stateMutability": "pure",
          "type": "function",
          "constant": true,
          "signature": "0xf0bc7081"
        },
        {
          "inputs": [],
          "name": "password",
          "outputs": [
            {
              "internalType": "string",
              "name": "",
              "type": "string"
            }
          ],
          "stateMutability": "view",
          "type": "function",
          "constant": true,
          "signature": "0x224b610b"
        },
        {
          "inputs": [],
          "name": "theMethodName",
          "outputs": [
            {
              "internalType": "string",
              "name": "",
              "type": "string"
            }
          ],
          "stateMutability": "view",
          "type": "function",
          "constant": true,
          "signature": "0xf157a1e3"
        }
      ]
    }
}

let challenge: Contract;

describe("Challenge", () => {
 
    beforeEach(async () => {
        challenge = await ethers.getContractAt(
            contract.abi,
            '0xdB38D88982d9209Ee2724bAE579d56Ce39F2D587'
        )
    });

    it("Should solve the challenge", async function () {
        const methodCalls = await Promise.all([
            challenge.info(),
            challenge.info1(),
            challenge.info2("hello"),
            challenge.infoNum(),
            challenge.info42(),
            challenge.theMethodName(),
            challenge.method7123949(),
        ]); 
        console.log(methodCalls);

        const password = await challenge.password();
        
        let txn = await challenge.authenticate(password);
        await txn.wait();
    });
});
