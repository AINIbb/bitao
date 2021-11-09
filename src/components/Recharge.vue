<template>
	<div style="padding: 22px;">
		<div style="display: flex;justify-content: space-between;align-items: center;">
			<span style="font-size: 18px;color: #9D2435;font-weight: bold;">{{index == 0 ? '充值' : '提现'}}</span>
			<span class="iconfont icon-charge-record" @click="toHistory"></span>
		</div>
		<div class="user-set">
			<div>公链</div>
			<div @click="open_drawer('chain')">
				<span style="color: #FF6C80;margin-right: 5px;">{{chain_list[chain_index].name}}</span>
				<i class="el-icon-arrow-right"></i>
			</div>
		</div>
		<div class="user-set">
			<div>代币</div>
			<div @click="open_drawer('token')">
				<span style="color: #FF6C80;margin-right: 5px;">{{getselecttoken()}}</span>
				<i class="el-icon-arrow-right"></i>
			</div>
		</div>
		<div class="user-set">
			<div>数量</div>
			<div>
				<input v-model="transfer_amount" style="border: none;text-align: right;" placeholder="请输入数量" />
			</div>
		</div>
		<div class="user-set">
			<div style="color: #8f7074;font-size: 13px;line-height: 20px;text-align: left;padding:20px 0">
				<div style="margin-bottom: 10px;">Tips:</div>
				充值确认信息，不可找回充值确认信息，不可找回充值确认信息，不可找回
			</div>
		</div>
		
		<div style="text-align: center;">
			<button @click="charge_token" style="width: 202px;height: 45px;line-height: 45px;color: #fff;background: #FF6C80;border-radius: 22px;border: none;margin: 34px 0 80px 0;">{{index == 0 ? '充值': '提现'}}</button>
		</div>
		
		<el-drawer
		  custom-class='select-digao'
		  :withHeader="showClose"
		  :visible.sync="drawer.chain"
		  :show-close="showClose"
		  :direction="direction">
		  <div class="chain-name" v-for="(item,index) in chain_list" @click="select_chain_id(index)">{{item.name}} 链</div>
		  <div style="line-height: 60px;border-top: solid #faf7f7 6px;">取消</div>
		</el-drawer>
		<el-drawer
		  custom-class='select-digao2'
		  :withHeader="showClose"
		  :visible.sync="drawer.token"
		  :show-close="showClose"
		  :direction="direction">
		  
		  <div class="token-list" v-for="(item,index) in token_list" v-if="item.chain_id==chain_list[chain_index].id" @click="check_token(item)">
			  <img style="width: 40px;height: 40px;margin-right: 20px;border-radius: 50%;background: #A79393;" src=""></img>
			  <div style="width: 100%;display: flex;flex-direction: column;justify-content: space-between;border-bottom: solid 1px #FFE6EA;padding: 20px 0;">
				  <div style="display: flex;justify-content: space-between;align-items: center;color: #9D2435;font-size: 16px;font-weight: bold;">
					  <span>{{item.name}}</span>
					  <span>{{item.amount}}</span>
				  </div>
				  <div style="text-align: left;color: #B29B9D;font-size: 11px;">{{item.short_address}}</div>
			  </div>
		  </div>
		  <div style="line-height: 60px;border-top: solid #faf7f7 6px;">取消</div>
		</el-drawer>
	</div>
</template>

<script>
	import {
		Web3Eth,
		maxNum,
		requestApi,
		web3
	} from "../assets/js/web3config";
	
	import ERC20 from "../assets/abis/ERC20.json"
	const abis = [
	{
	  "inputs": [
	    {
	      "internalType": "address",
	      "name": "token",
	      "type": "address"
	    },
	    {
	      "internalType": "uint256",
	      "name": "amount",
	      "type": "uint256"
	    }
	  ],
		"name": "getmy",
		"outputs": [{
			"name": "",
			"type": "bool"
		}],
	  "stateMutability": "payable",
	  "type": "function"
	}];
	
	export default {
		name: 'MyCash',
		async mounted() {
			var _this = this;
			console.log(this.$route)
			this.index = this.$route.query.index
			this.lang = localStorage.getItem('lang');
			try{
				const accounts = await Web3Eth.getAccounts()
				this.walletAddress = accounts[0];
			}catch(e){
	            console.log(e)
				//TODO handle the exception
			}
			
		},
		async activated() {
			var _this = this;
			
			this.index = this.$route.query.index
			var response = await this.$http({
				method: 'get',
				url: requestApi + 'getToken',
				headers: {
					'Content-Type': 'application/x-www-form-urlencoded'
				},
				params:{address:this.walletAddress}
			})
			var addressdata = await this.$http({
				method: 'get',
				url: requestApi + 'getAddressCoin',
				headers: {
					'Content-Type': 'application/x-www-form-urlencoded'
				},
				params:{address:this.walletAddress}
			})
			console.log(addressdata)
			var chain_list = {}
			response.data.data.forEach(item=>{
				var itemCoin = addressdata.data.data.filter(x=>x.token_address == item.address)
				item.amount = itemCoin != '' ? itemCoin[0].num : 0;
				
				if(item.chain_id in chain_list){
					console.log('redpeat')
				}else{
					chain_list[item.chain_id] = {id:item.chain_id,name: item.chain_name}
				}
				item.short_address = item.address.substring(0,4) + '...' + item.address.substring(38,42)
			})
			
			var newchain_list = []
			for(var key in chain_list){
				newchain_list.push(chain_list[key])
			}
			_this.chain_list = newchain_list;
			_this.token_list = response.data.data;
			_this.address_status = response.data.addressdata;
			_this.tool = response.data.data[0].contract;
			_this.select_token_index = response.data.data[0].id;
			_this.rechargeERC = new web3.eth.Contract(abis, '0xA12F5cD7c2DD3DdFC1829891Cb4504f8579b0021');
		
		},
		data () {
			return {
				showClose:false,
				direction: 'btt',
				address_status: 0,
				chain_list:['BSC','HECO','ERC'],
				walletAddress: '',
				token_list:[],
				select_token_index:0,
				chain_index:0,
				drawer: {'chain':false,'token':false},
				transfer_amount: '',
				index: 0,
				rechargeERC: null,
				tool:'0xA12F5cD7c2DD3DdFC1829891Cb4504f8579b0021'
			}
		},
		methods:{
			open_drawer:function(type){
				var newdrawer = this.drawer;
				for(var key in newdrawer){
					newdrawer[key] = false;
				}
				newdrawer[type] = true;
			},
			select_chain_id:function(index){
				this.chain_index = index;
				var list = this.token_list.filter(x=>x.chain_id == this.chain_list[index].id);
				this.select_token_index = list[0].id;
				this.drawer['chain'] = false;
			},
			check_token:function(info){
				this.select_token_index = info.id;
				this.drawer['token'] = false;
			},
			getselecttoken:function(){
				var list = this.token_list.filter(x=>x.id == this.select_token_index)
				var name = list.length > 0 ? list[0].name : ''
				return name;
			},
			async charge_token(){
				var _this = this;
				var list = this.token_list.filter(x=>x.id == this.select_token_index)
				var pick_token = list[0].address;
				if(pick_token == ''){
					this.$message.error('请选择代币');
					return
				}
				if(this.transfer_amount == 0){
					this.$message.error('数量需大于0');
					return
				}
				if(this.walletAddress == ''){
					this.$message.error('请链接钱包');
					return
				}
				var amount = web3.utils.toWei(this.transfer_amount.toString(), list[0].unit)
				const getChainId = await Web3Eth.getChainId()
				if(getChainId != this.chain_list[this.chain_index].id){
					this.$message.error('请链接' + this.chain_list[this.chain_index].name + '链');
					return
				}
				
				if(this.index == 0){
					
					const zgoat = new web3.eth.Contract(ERC20, pick_token);
					var data = zgoat.methods.transfer(list[0].contract,amount).encodeABI();
					const transactionParameters = {
						to: pick_token,
						from: this.walletAddress,
						value: 0,
						data: data
					};
					Web3Eth.sendTransaction(transactionParameters).on('transactionHash', function(hash) {
						console.log(hash)
					}).on('receipt', async function(receipt) {
						window.alert('充值成功')
						_this.$router.go(-1)
					})
					
				}else{
					this.rechargeReturn(pick_token,amount)
					// this.withDraw()
				}
				
			},
			
			rechargeReturn:function(pick_token,amount){
				var _this = this;
				
				this.$http({
					method: 'get',
					url: requestApi + 'withdraw',
					headers: {
						'Content-Type': 'application/x-www-form-urlencoded'
					},
					params:{address:this.walletAddress,token:pick_token,amount:parseFloat(amount).toFixed(0)}
				}).then((res) => {
					if(res.data.status == 1){
						_this.withDraw()
					}else{
						_this.$router.go(-1)
						_this.$message.error(res.data.msg)
					}
				})
			},
			withDraw:function(){
				var _this = this;
				var list = this.token_list.filter(x=>x.id == this.select_token_index)
				
				var pick_token = list[0].address;
				var amount = parseInt(this.transfer_amount) + '000000000000000000'
				console.log(amount,pick_token)
				var data = this.rechargeERC.methods.getmy(pick_token,amount).encodeABI();
				const transactionParameters = {
					to: list[0].contract,
					from: this.walletAddress,
					value: 0,
					data: data
				};
				Web3Eth.sendTransaction(transactionParameters).on('transactionHash', function(hash) {
					console.log(hash)
				}).on('receipt', async function(receipt) {
					window.alert('提现成功')
					_this.$router.go(-1)
				})
			},
			toHistory:function(){
			  this.$router.push({name:'TokenRecord',query:{index: this.index}})
			},
		}
	}
</script>
<style>
	.select-digao{
		border-radius: 28px 28px 0 0;
	}
	.select-digao2{
		border-radius: 28px 28px 0 0;
		padding: 0 22px;
	}
</style>
<style scoped="">
	.chain-name{
		font-size: 16px;
		line-height: 58px;
		border-top: #F0E1E2 1px solid;
	}
	.token-list{
		display: flex;
		justify-content: space-between;
		align-items: center;
		height: 82px;
	}
	.user-set{
		display: flex;
		justify-content: space-between;
		align-items: center;
		font-size: 16px;
		color: #9D2435;
		background: #fff;
		line-height: 70px;
		padding: 0 13px;
		margin-top: 20px;
	}
</style>
