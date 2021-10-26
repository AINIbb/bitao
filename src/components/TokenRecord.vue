<template>
	<div style="display: flex;justify-content: center;">
		<el-col :xs="24" :sm="10" style="padding: 0 17px;">
			<div style="color: #9D2435;font-size: 18px;padding-left: 20px;text-align: left;padding-top: 30px;">
				<span>{{index == 0 ? '充值记录' : '提现记录'}}</span>
			</div>
			<div style="background: #fff;border-radius: 9px;margin-top: 20px;">
				<div v-if="index == 0" class="token_list" v-for="item in list1">
					<div style="display: flex;justify-content: space-between;font-size: 16px;">
						<span style="color: #9D2435;">{{item.token_name}}</span>
						<span style="color: #FF6C80;">+{{item.amount}}</span>
					</div>
					<div style="color: #B29B9D;font-size: 11px;text-align: left;">{{item.time}}</div>
				</div>

				<div v-if="index == 1" class="token_list" v-for="item in list2">
					<div style="display: flex;justify-content: space-between;font-size: 16px;">
						<span style="color: #9D2435;">{{item.token_name}}</span>
						<span style="color: #8F7074;">-{{item.amount}}</span>
					</div>
					<div style="color: #B29B9D;font-size: 11px;text-align: left;">{{item.time}}</div>
				</div>
			</div>
			
		</el-col>
	</div>
</template>

<script>
	import {requestApi,loginFlag,BLOCKCHAIN_CONFIG,Web3Eth} from "../assets/js/web3config";
	export default {
		name: 'TokenRecord',
		activated() {
			var _this = this;
			
			this.index = this.$route.query.index
			this.$http({
				method: 'get',
				url: requestApi + 'rechargeRecordByAddress',
				headers: {
					'Content-Type': 'application/x-www-form-urlencoded'
				},
				params:{address:this.walletAddress}
			}).then((res) => {
				res.data.data.forEach(item=>{
					var time = new Date(item.time)
					item.type = parseInt(item.type)
					item['time'] = time.getFullYear() + '-' + (time.getMonth() + 1) + '-' + time.getDate()
				})
				if(res.data.data.length > 0){
					_this.list1 = res.data.data.filter(x=>x.type == 0);
					_this.list2 = res.data.data.filter(x=>x.type == 1);
				}
				console.log(_this.list2)
				
			})
		},
		async mounted() {
			var chainId = BLOCKCHAIN_CONFIG.defaultChainId;
			this.index = this.$route.query.index
			var address_now = localStorage.getItem('wallet_address')
			if(this.$store.state.walletAddress != '') {
				this.walletAddress = this.$store.state.walletAddress
			}else if(address_now != ''){
				this.walletAddress = address_now
			}
			
		},
		data () {
		    return {
					walletAddress:'',
					list1:[],
					list2:[],
					index: 0
		    }
		},
		methods:{
			
		}
	}
</script>

<style scoped="scoped">
	.token_list{
		padding:22px 16px;
		border-bottom: solid 1px #FFE6EA;
	}
</style>
