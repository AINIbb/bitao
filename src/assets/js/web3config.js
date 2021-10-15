const BLOCKCHAIN_CONFIG = {
  isDebug: false,
  // defaultChainId: 65,
  defaultChainId:56,
  defaultSymbol: 'BNB',
  defaultRpcUrl:  'https://bsc-dataseed.binance.org/',
  // defaultRpcUrl:'https://bsc-dataseed1.ninicoin.io'
 }
var bitaoABI = [{
		"inputs": [{
			"name": "addr",
			"type": "address"
		}],
		"name": "getReferrerAddr",
		"outputs": [{
			"name": "",
			"type": "address"
		}],
		"stateMutability": "view",
		"type": "function"
	}, {
		"inputs": [{
			"name": "addr",
			"type": "address"
		}],
		"name": "getReferrerInfo",
		"outputs": [{
			"name": "",
			"type": "uint256"
		}, {
			"name": "",
			"type": "uint256"
		}],
		"stateMutability": "view",
		"type": "function"
	}, {
		"inputs": [{
			"name": "account",
			"type": "address"
		}],
		"name": "unlockedOf",
		"outputs": [{
			"name": "",
			"type": "uint256"
		}],
		"stateMutability": "view",
		"type": "function"
	}, {
		"inputs": [{
			"name": "account",
			"type": "address"
		}],
		"name": "lockedOf",
		"outputs": [{
			"name": "",
			"type": "uint256"
		}],
		"stateMutability": "view",
		"type": "function"
	}, {
		"inputs": [{
			"name": "account",
			"type": "address"
		}],
		"name": "claimableUnlocked",
		"outputs": [{
			"name": "",
			"type": "uint256"
		}],
		"stateMutability": "view",
		"type": "function"
	}, {
		"inputs": [{
			"name": "account",
			"type": "address"
		}],
		"name": "getUnlockSpeed",
		"outputs": [{
			"name": "",
			"type": "uint256"
		}],
		"stateMutability": "view",
		"type": "function"
	}, {
		"inputs": [],
		"name": "claim",
		"outputs": [{
			"name": "",
			"type": "uint256"
		}],
		"payable": true ,
		"type": "function"
	}, {
		"inputs": [{
			"name": "amount",
			"type": "uint256"
		}],
		"name": "stake",
		"outputs": [{
			"name": "",
			"type": "bool"
		}],
		"type": "function"
	}, {
		"inputs": [{
			"name": "amount",
			"type": "uint256"
		}],
		"name": "unstake",
		"outputs": [{
			"name": "",
			"type": "bool"
		}],
		"type": "function"
	},{
		"inputs": [{
			"name": "account",
			"type": "address"
		}],
		"name": "getStaked",
		"outputs": [{
			"name": "",
			"type": "uint256"
		}],
		"type": "function"
	},{
    "inputs": [
      {
        "internalType": "address",
        "name": "spender",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "amount",
        "type": "uint256"
      }
    ],
    "name": "approve",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "function"
  },{
    "inputs": [
      {
        "internalType": "address",
        "name": "recive",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "amount",
        "type": "uint256"
      }
    ],
    "name": "transfer",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "function"
  },{
    "inputs": [
      {
        "internalType": "address",
        "name": "owner",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "spender",
        "type": "address"
      }
    ],
    "name": "allowance",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  }]
var lp_abi = [
	{
		"inputs": [{
			"name": "account",
			"type": "address"
		}],
		"name": "balanceOf",
		"outputs": [{
			"name": "",
			"type": "uint256"
		}],
		"stateMutability": "view",
		"type": "function"
	}, 
]
var airdropabi = [{
			"inputs": [{
				"name": "_total",
				"type": "uint256"
			},{
				"name": "_v",
				"type": "uint8"
			},{
				"name": "_r",
				"type": "bytes32"
			},{
				"name": "_s",
				"type": "bytes32"
			}],
			"name": "claim",
			"outputs": [{
				"name": "",
				"type": "bool"
			}],
			"type": "function"
		}]
// const  Zgoat_token ='0x3e3c8Adb5aCE06DEeE32eC56ab2Cd46f2562A0B7'
// const lp_token = '0x9608e4dab82a63c9614ac05269bb7fed0c851dfb'

const Zgoat_token = '0x16030ed3c8b9d7ecf741aabde04b6dc6630e12cb';
const lp_token = '0x253ad7EDE0C7Ec0B2a9B418f0463F082B5Cb81B3'
import Web3 from 'web3'
import Eth from "web3-eth"

var ethereum = window.ethereum;
async function getether(){
	if (window.ethereum) {
		await window.ethereum.enable();
	}
}

getether()
const Web3Eth = new Eth(ethereum);
const maxNum = new Web3.utils.BN('2').pow(new Web3.utils.BN('256')).sub(new Web3.utils.BN('1'));
const web3 = new Web3(new Web3.providers.HttpProvider(BLOCKCHAIN_CONFIG.defaultRpcUrl));
const lpInterface = new web3.eth.Contract(lp_abi, lp_token);
const bitao = new web3.eth.Contract(bitaoABI,Zgoat_token);
const testRequestApi = "http://39.99.133.20:9899/";
const relrequestApi = "https://zgoat.org/api/";
const requestApi = relrequestApi;
export {BLOCKCHAIN_CONFIG,web3, bitaoABI,bitao,lpInterface,Web3Eth,Zgoat_token,lp_token,maxNum, requestApi,airdropabi};
