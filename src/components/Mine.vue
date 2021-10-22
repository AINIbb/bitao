<template>
	<div style="width: 100%;display: flex;justify-content: center;">
		<el-col :xs="24" :sm="12">
			<div class="user-info">
				<div :class="select_show==0 ? 'active-show': ''" @click="select_show=0">我收到的<span v-if="select_show==0"></span></div>
				<div :class="select_show==1 ? 'active-show': ''" @click="select_show=1">我创建的<span v-if="select_show==1"></span></div>
			</div>
			<div v-if="select_show==0" style="padding: 20px;background: #fff;">
				<div v-for="(item,index) in pick_list" :class="index == pick_list.length - 1 ? 'list-item2': 'list-item'">
					<div style="color: #9D2435;font-size: 16px;">
						<span>{{item.short_address}}</span>
						<span>{{item.amount}} {{item.token_name}}</span>
					</div>
					<div style="color: #B29B9D;font-size: 13px;">
						<span style="display: inline-block;width: 100%;text-align: left;">{{item.time}}</span>
					</div>
				</div>
			</div>
			
			<div v-else style="background: #fff;padding: 20px;">
				<div v-for="(item,index) in create_list" :class="index == create_list.length - 1 ? 'list-item2': 'list-item'">
					<div  style="color: #9D2435;font-size: 16px;">
						<span>{{item.get_type == '0' ? '拼手气红包': '普通红包'}}</span>
						<span>{{item.amount}} {{item.token_name}}</span>
					</div>
					<div style="color: #B29B9D;font-size: 13px;">
						<span>{{item.time}}</span>
						<span>已抢完 {{item.use_count}}/{{item.count}}</span>
					</div>
				</div>
			</div>
		</el-col>
	</div>
</template>

<script>
	import {requestApi,loginFlag,BLOCKCHAIN_CONFIG,Web3Eth} from "../assets/js/web3config";
	export default {
		name: 'MyCash',
		props:['address'],
		async mounted() {
			var chainId = BLOCKCHAIN_CONFIG.defaultChainId;
			const getChainId = await Web3Eth.getChainId()
			if(chainId == getChainId){
				var address_now = localStorage.getItem('wallet_address')
				if(this.$store.state.walletAddress != '') {
					this.walletAddress = this.$store.state.walletAddress
				}else if(address_now != ''){
					this.walletAddress = address_now
				}
			}else if(loginFlag == 1){
				this.walletAddress = localStorage.getItem('login_address')
			}
			var _this = this;
			this.$http({
				method: 'get',
				url: requestApi + 'pickRecordByAddress',
				headers: {
					'Content-Type': 'application/x-www-form-urlencoded'
				},
				params:{address:this.walletAddress}
			}).then((res) => {
				res.data.data.forEach(item=>{
					var time = new Date(item.time)
					item['time'] = time.getFullYear() + '-' + (time.getMonth() + 1) + '-' + time.getDate() 
					item['short_address'] = item['address'].substring(0,4) + '...' + item['address'].substring(38,42)
				})
				_this.pick_list = res.data.data;
				console.log(res.data.data)
				
			})
			
			this.$http({
				method: 'get',
				url: requestApi + 'packetRecordByAddress',
				headers: {
					'Content-Type': 'application/x-www-form-urlencoded'
				},
				params:{address:this.walletAddress}
			}).then((res) => {
				res.data.data.forEach(item=>{
					var time = new Date(item.time)
					item['time'] = time.getFullYear() + '-' + (time.getMonth() + 1) + '-' + time.getDate() 
				})
				_this.create_list = res.data.data;
			})
		},
		data () {
		  return {
					walletAddress:'',
					pick_list:[],
					create_list:[],
					select_show:0
		  }
		},
		methods:{
			
		}
	}
	  
</script>

<style scoped="scoped">
	.user-info{
		display: flex;
		justify-content: space-between;
		align-items: flex-start;
		padding: 34px 22px;
		padding: 30px;
	}
	.active-show{
		color: #FF6C80;
		position: relative;
	}
	.active-show>span{
		position: absolute;
		display: inline-block;
		width: 100%;
		height: 2px;
		background: #ff6c80;
		bottom: -5px;
		left: 0;
	}
	.list-item{
		border-bottom: solid 1px #FFE6EA;
		padding: 15px 0;
	}
	.list-item2{
		padding: 15px 0;
	}
	.list-item>div, .list-item2>div{
		display: flex;
		justify-content: space-between;
		align-items: center;
		line-height: 30px;
	}
</style>
