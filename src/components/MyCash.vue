<template>
	<div style="width: 100%;display: flex;justify-content: center;">
		<el-col :xs="24" :sm="15" style="padding:25px 22px ;">
			
			<div class="user-info">
				<div style="color: #9D2435;font-size: 22px;margin-bottom: 5px;">昵称</div>
				<div style="color: #8F7074;font-size: 16px;display: flex;align-items: center;">
					<span>账号： {{walletAddress}} </span>
					<span v-if="copyFlag" class="href-icon icontip icon-success"></span>
					<span v-else  @click="copyaddress"  class="href-icon iconfont icon-copy"></span>
				</div>
			</div>
			
			<div class="cash-info">
				<!-- <div style="font-size: 13px;">零钱（ZGoat）</div> -->
				<!-- <div style="font-size: 30px;margin-top: 10px;margin-bottom: 20px;font-weight: bold;">124345466565</div> -->
				<div class="cash-operate">
					<button class="href-icon" style="background: #fff;color: #FF6C80;" @click="recharge(0)">充值</button>
					<button class="href-icon" style="background: none;color: #fff;border: solid 1px #fff;" @click="recharge(1)">提现</button>
				</div>
			</div>
			
			<div style="padding: 16px;background: #fff;border-radius: 9px;margin-top: 20px;margin-bottom: 80px;">
				<div class="coin-list" v-for="(item,index) in list">
					<img style="width: 40px;height: 40px;border-radius: 50%;background: #B29B9D;margin-right: 13px;" :src="item.img" />
					<div :class="index != list.length-1 ? 'border-no' : 'border-bott'" style="display: flex;justify-content: space-between;width: 90%;height:100%;align-items: center;">
						<div>{{item.name}}</div>
						<div style="display: flex;flex-direction: column;align-items: flex-end;">
							<span>{{item.num}}</span>
							<span style="font-size: 13px;color: #B29B9D;">{{item.token_address}}</span>
						</div>
					</div>
				</div>
				<div v-if="list.length == 0" style="color: #aaa;">暂无数据</div>
			</div>
			
		</el-col>
	</div>
	
</template>

<script>
	import {web3,requestApi ,loginFlag,Web3Eth,BLOCKCHAIN_CONFIG} from "../assets/js/web3config";
	export default {
	  name: 'MyCash',
	  activated(){
		  var _this = this;
		  this.initdata()
		  setInterval(function(){
			_this.initdata()
		  },5000)
		  
	  },
	  
	  async mounted() {
		    var _this = this;
			try{
					var address_now = localStorage.getItem('wallet_address')
					if(this.$store.state.walletAddress != '') {
						this.walletAddress = this.$store.state.walletAddress;
					}else if(address_now != ''){
						this.walletAddress = address_now
					}
				
			}catch(e){
				console.log(e)
				var getlogin = localStorage.getItem('login_address')
				this.walletAddress = getlogin;
				//TODO handle the exception
				console.log(e)
			}
			console.log(this.walletAddress)
	  	
	  },
	  computed: {
	  	listenWalletAddressChange() {
	  		console.log('address change', this.$store.state.walletAddress)
	  		return this.$store.state.walletAddress;
	  	},
	  	listenLangChange() {
	  		console.log('lang change', this.$store.state.lang)
	  		return this.$store.state.lang;
	  	}
	  },
	  watch: {
	  	listenWalletAddressChange: function(newd) {
	  		console.log('changeInfo', newd)
	  		this.walletAddress = newd;
	  	},
	  	listenLangChange(lang) {
	  		console.log('lang change', this.$store.state.lang)
	  		this.lang = Object.assign({}, lang);
	  		this.lang = lang;
	  	}
	  },
	  data () {
	    return {
			walletAddress:'',
			list:[],
			copyFlag:false
	    }
	  },
	  methods:{
		  initdata:function(){
			  var _this = this;
			  _this.$http({
			  	method: 'get',
			  	url: requestApi + 'getAddressCoin',
			  	headers: {
			  		'Content-Type': 'application/x-www-form-urlencoded'
			  	},
			  	params:{address:_this.walletAddress}
			  }).then((res) => {
			  	console.log(res.data)
			  	
			  	_this.list = res.data.data
			  }) 
		  },
		  copyWord: function(word) {
		  	var tag = document.createElement('textarea');
		  	tag.setAttribute('id', 'cp_hgz_input');
		  	tag.value = word;
		  	document.getElementsByTagName('body')[0].appendChild(tag)
		  	document.getElementById('cp_hgz_input').select()
		  	document.execCommand("copy");
		  	document.getElementById('cp_hgz_input').remove();
		  },
		  copyaddress:function(){
		  	var _this = this;
		  	this.copyWord(this.walletAddress)
		  	this.copyFlag = !this.copyFlag;
		  	// this.$message.success(words.copySuccess[this.lang])
		  	setTimeout(function(){
		  		_this.copyFlag = !_this.copyFlag;
		  	},2000)
		  },
		  recharge:function(index){
			  if(loginFlag == 1){
				  this.openTip('icon-alert','请在钱包浏览器中打开此链接')
			  }else{
				  this.$router.push({name:'Recharge',query:{index: index}})
			  }
		  },
		  openTip: function(iconClass, tipText) {
		  	var tip = "<div><span class='icontip " + iconClass + "'></span><div class='tip-text'>" + tipText +
		  		"</div></div>"
			var _this = this;
		  	this.$alert(tip, {
		  		center: true,
		  		lockScroll: false,
		  		dangerouslyUseHTMLString: true,
		  		confirmButtonClass: 'tip-pop-ok',
		  		confirmButtonText: 'OK',
		  		cancelButtonClass: 'tip-pop-ok'
		  	}).then(() => {
				_this.copyWord('https://zgoat.org')
				_this.$message.success('已为您复制链接')
			});
		  },
		  copyWord: function(word) {
		  	var tag = document.createElement('textarea')
		  	tag.setAttribute('id', 'cp_hgz_input');
		  	tag.value = word;
		  	document.getElementsByTagName('body')[0].appendChild(tag)
		  	document.getElementById('cp_hgz_input').select()
		  	document.execCommand("copy");
		  	document.getElementById('cp_hgz_input').remove();
		  
		  }
	  }
	}
</script>

<style scoped="scoped">
	.icon-success{
		font-size: 18px;
		color: #9D2435;
		margin-left: 2px;
	}
	.user-info{
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: flex-start;
	}
	.cash-info{
		margin-top: 25px;
		background: linear-gradient(to bottom, #ff6c80, #ff455c);
		padding: 28px 0;
		color: #fff;
		text-align: center;
		border-radius: 17px;
	}
	.cash-operate button{
		background: none;
		border: none;
		width: 101px;
		height: 31px;
		border-radius: 26px;
		font-size: 13px;
		margin: 0 25px;
	}
	.search-coin{
		background: #fff;
		border-radius: 9px;
		height: 45px;
		width: 100%;
		text-indent: 1em;
		border: none;
		margin-top: 17px;
	}
	.coin-list{
		width: 100%;
		display: flex;
		align-items: center;
		height: 86px;
		font-size: 16px;
		color: #9D2435;
	}
	.border-no{
		border-bottom: solid 1px #FFE6EA;
	}
</style>
