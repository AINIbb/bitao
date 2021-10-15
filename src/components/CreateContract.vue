<template>
	<div class="create_con">
		<div>当前地址：{{walletAddress}}</div>
		<div><label>代币名称: </label><input v-model="name" type="text"/></div>
		<div><label>syboml: </label><input v-model="symbol" type="text"/></div>
		<div><button @click="create_event">创建</button></div>
	</div>
</template>

<script>
	import {Debug} from 'web3-eth-debug';
	import Web3 from 'web3'
	import ERC20 from "../assets/abis/ERC20.json"
	const web3 = new Web3(new Web3.providers.HttpProvider('https://data-seed-prebsc-1-s1.binance.org:8545/'));
	import {
		Web3Eth,
		maxNum
	} from "../assets/js/web3config";
	const zgoat = new web3.eth.Contract(ERC20, '0xb20b24b57863ebD63Db5eee82Ae51384f447aD18');
	const debug = new Debug('https://data-seed-prebsc-1-s1.binance.org:8545/');
	const abis = [
  {
    "inputs": [
      {
        "internalType": "string",
        "name": "name",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "symbol",
        "type": "string"
      },
      {
        "internalType": "address",
        "name": "minter",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "routerAddress",
        "type": "address"
      }
    ],
	"name": "deployErc20Token",
	"outputs": [{
		"name": "",
		"type": "address"
	}],
    "stateMutability": "payable",
    "type": "function"
  }];
    var createContractAB = new web3.eth.Contract(abis, '0x766b086EACe8f47B4f67b292d0667532ccaC4e95');
	export default {
		name:'CreateContract',
		async mounted() {
			var _this = this;
			this.lang = localStorage.getItem('lang');
			const accounts = await Web3Eth.getAccounts()
			this.walletAddress = accounts[0]//recoverTypedSignature
			
		},
		data(){
			return{
				lang:1,
				walletAddress: '',
				name: '',
				symbol: '',
				tooladdress: '0x766b086EACe8f47B4f67b292d0667532ccaC4e95',
				routeraddress: '0xcde540d7eafe93ac5fe6233bee57e1270d3e330f'
			}
		},
		methods:{
			approve: function() {
				var _this = this;
				var stakeNum = maxNum.toString();
				return new Promise((resolve, reject) => {
					const data = zgoat.methods.approve(_this.tooladdress, stakeNum).encodeABI();
					const transactionParameters = {
						to: '0xb20b24b57863ebD63Db5eee82Ae51384f447aD18', 
						from: _this.walletAddress, // must match user's active address.
						value: 0,
						data: data
					};
					
					Web3Eth.sendTransaction(transactionParameters).on('transactionHash', function() {
						
					}).on('receipt', async function(receipt) {
						console.log(receipt)
						resolve(true)
					}).on('error', function() {
						reject(false)
					})
				})
			},
			async create_event(){
				var _this = this;
				var allowanceInfo = await zgoat.methods.allowance(this.walletAddress, this.tooladdress).call()
				console.log(allowanceInfo)
				if(allowanceInfo == 0) {
					await this.approve()
				}
				var name = this.name;
				var symbol = this.symbol;
				var useraddress = this.walletAddress;
				var routeradd = this.routeraddress;
				console.log(name,symbol,useraddress,routeradd)
				var data = createContractAB.methods.deployErc20Token(name,symbol,useraddress,routeradd).encodeABI();
				var ethereum = window.ethereum;
				const transactionParameters = {
					to: '0x766b086EACe8f47B4f67b292d0667532ccaC4e95',
					from: this.walletAddress,
					value: 0,
					data: data
				};
				var newtx=''
				Web3Eth.sendTransaction(transactionParameters).on('transactionHash', function(hash) {
					console.log(hash)
					newtx = hash
				}).on('receipt', async function(receipt) {
					console.log(receipt)
					debug.getTransactionTrace(newtx,{}).then(res=>{
						console.log(res)
						var newadd = res.returnValue.replace('000000000000000000000000', '0x');
						_this.$alert('您的合约地址为：' + newadd, {
							center: true,
							lockScroll: false,
							dangerouslyUseHTMLString: true,
						})
						
					})
				})
			},
		}
		
	}
</script>

<style>
	.create_con{
		padding: 50px;
		width: 100%;
		display: flex;
		align-items: center;
		flex-direction: column;
	}
	.create_con div{
		margin: 20px;
		font-size: 14px;
		padding: 0 100px;
		display: flex;
		width: 450px;
		justify-content: flex-start;
	}
	.create_con input{
		width: 200px;
		height: 30px;
		border-radius: 4px;
		border: solid 1px #E3D7D9;
		margin-left: 10px;
	}
	.create_con button{
		width: 100px;
		height: 30px;
		border-radius: 4px;
		border:none;
		background: #B29B9D;
		
	}
</style>
