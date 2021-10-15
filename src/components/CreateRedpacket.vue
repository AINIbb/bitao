<template>
	<div class="create_con">
		<div>当前地址：{{walletAddress}}</div>
		<div><label>代币名称: </label><input v-model="name" type="text"/></div>
		<div><label>syboml: </label><input v-model="symbol" type="text"/></div>
		<div><button @click="create_event">创建</button></div>
	</div>
</template>

<script>
	import {
		Web3Eth,
		maxNum
	} from "../assets/js/web3config";
	
	export default {
		name:'CreateContract',
		async mounted() {
			var _this = this;
			this.lang = localStorage.getItem('lang');
			const accounts = await Web3Eth.getAccounts()
			this.walletAddress = accounts[0];
			
		},
		data(){
			return{
				lang:1,
				walletAddress: ''
			}
		},
		methods:{
			
		}
		
	}
	</script>
	