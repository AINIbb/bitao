<template>
	<div class="nav-box" @click.stop="closeNav">
		<el-row style="width:100%;display: flex;justify-content: center;">
			<el-col :xs='24' class="nav">
				<div style="text-align: left;" @click.stop="closeNav">
					<router-link  to="/Home">
						<img v-if="langIndex == 0" class="logo" src="../assets/img/logoen.png" />
						<img v-else class="logo" src="../assets/img/logoch.png" />
					</router-link>
				</div>
				<div :id="showBlock" >
					<img v-if="isShowMenu" @click.stop="openNav" width="25px" height="25px" src="../assets/img/nav-open.png" />
					<img v-else @click.stop="closeNav" width="25px" height="25px" src="../assets/img/nav-close.png" />
				</div>
				
				<!-- <div class="nav-show nav-item " :style="showCss">
					<div class="nav-block">
						<div @click.stop="closeNav">
							<router-link to="/Home"><span>{{words.home[langIndex]}}</span></router-link>
						</div>
						<div @click.stop="closeNav">
							<router-link to="/Reward"><span>{{words.reward[langIndex]}}</span></router-link>
						</div>
					</div>
				</div> -->
				<div style="display: flex;">
					<div class="nav-show" :style="showCss">
						<button class="buy light-color"><a target="_blank"  id="buy1" class="light-color" :href="buyUrl">{{words.buyZGoat[langIndex]}}</a></button>
					</div>
					
					<div style="margin: 0 20px;">
						<el-dropdown  @command="userNavCommand">
							<button v-if="walletAddress == ''" @click="walletDeal" class="wallet-btn href-icon">{{words.walletConnect[langIndex]}}</button>
							<button class="wallet-btn" v-else>{{showAddress(walletAddress)}}<i class="el-icon-arrow-down el-icon--right"></i></button>
							<el-dropdown-menu slot="dropdown">
							    <el-dropdown-item command='0' >我的账户</el-dropdown-item>
							    <el-dropdown-item command='1' >我要发红包</el-dropdown-item>
							    <el-dropdown-item command='2' >我的红包记录</el-dropdown-item>
							    <el-dropdown-item command='3' >设置零钱密码</el-dropdown-item>
							  </el-dropdown-menu>
						</el-dropdown>
					</div>
				</div>
				
				<!-- <div class="nav-show contact" :style="showCss">
					<a target="_blank" class="nav-link" href="https://t.me/zgoat_org"><span class="href-icon iconfont icon-telegram "></span></a>
					<a target="_blank" class="nav-link" :href="doc_url[langIndex]"><span class="href-icon iconfont doc"></span></a>
				</div> -->
				
				<!-- <el-dropdown v-if="showFlag" @command="changeLang" style='width:100px'>
					<span class="el-dropdown-link">{{selectLang[langIndex]}}<i class="el-icon-arrow-down el-icon--right"></i></span>
					<el-dropdown-menu slot="dropdown">
						<el-dropdown-item command='0' >English</el-dropdown-item>
						<el-dropdown-item command='1' >中文</el-dropdown-item>
					</el-dropdown-menu>
				</el-dropdown> -->
			</el-col>
		</el-row>
		<el-row class="mobile-nav" v-if="!showFlag">
			<el-col :xs="8">
				<a @click="getIndex(0)" :class="meta_index == 0 ? 'active-nav-item' : ''">
					<img v-if="meta_index == 0" src="../assets/img/reward-active.png" />
					<img v-else src="../assets/img/reward.png" />
					<span>{{words.reward[langIndex]}}</span>
				</a>
			</el-col>
			<el-col :xs="8" class="">
				<a @click="getIndex(1)" :class="meta_index == 1 ? 'active-nav-item' : ''">
					<img class="airdrop-tab" v-if="meta_index == 1" src="../assets/img/defi-active.png" />
					<img class="airdrop-tab" v-else src="../assets/img/defi.png" />
					<span style="position: relative;top: -3px;">{{words.airdropNav[langIndex]}}</span>
				</a>
			</el-col>
			<el-col :xs="8">
				<a @click="getIndex(2)" :class="meta_index == 2 ? 'active-nav-item' : ''">
					<img v-if="meta_index == 2" src="../assets/img/unlock-active.png" />
					<img v-else src="../assets/img/unlock.png" />
					<span>{{words.stakeNav[langIndex]}}</span>
				</a>
			</el-col>
		</el-row>
		<div class="right-nav"  v-if="!isShowMenu" @click.stop="closeNav">
			<div style="width: 180px;background: #fff;padding-bottom:80px;overflow: scroll;padding-top:80px;display: flex;flex-direction: column;align-items: center;">
				<router-link to="/Home">
					<span>{{words.home[langIndex]}}</span>
				</router-link>
				<div  @click='getIndex(0)'>
					<router-link to="/Invite">
						<span>{{words.reward[langIndex]}}</span>
					</router-link>
				</div>
				<div  @click='getIndex(1)'>
					<router-link to="/Reward">
						<span>{{words.airdropNav[langIndex]}}</span>
					</router-link>
				</div>
				<div  @click='getIndex(2)'>
					<router-link to="/Unlock">
						<span>{{words.stakeNav[langIndex]}}</span>
					</router-link>
				</div>
				
				<router-link to="/Cooperate">
					<span>{{words.cooperate[langIndex]}}</span>
				</router-link>
				<div class="href-icon" style="margin-top:14px;font-size:14px;color:#8F7074 ;width:100px;line-height:35px;border-radius: 26px;border: solid 1px #8F7074;background: none;"><a target="_blank" style="line-height: 20px;" :href="buyUrl">{{words.buyZGoat[langIndex]}}</a></div>
				<div style="margin-top: 34px;"></div>
				<div style="margin-bottom: 10px;width: 100%;border-top: solid 1px #8F7074;padding-top: 30px;">
					<a target="_blank" class="nav-link" href="https://t.me/zgoat_org" style="line-height: 38px;border: solid 1px #8F7074;width: 38px;"><span class="href-icon iconfont icon-telegram " style="color: #8F7074;"></span></a>
					<a target="_blank" class="nav-link" :href="doc_url[langIndex]" style="line-height: 38px;border: solid 1px #8F7074;width: 38px;"><span class="href-icon iconfont doc" style="color: #8F7074;"></span></a>
				</div>
				<a class="href-icon" @click="openUrl">{{words.whitePaper[langIndex]}}</a>
				<a class="href-icon" @click="openAudio">{{words.audit[langIndex]}}</a>
				<div class="check-lang">
					<span :class="langIndex == 0 ? 'router-link-active': ''"  @click="changeLang(0)">English</span>
					<span style="margin: 0 10px;"> | </span>
					<span :class="langIndex == 1 ? 'router-link-active': ''"  @click="changeLang(1)">中文</span>
				</div>
			</div>
		</div>
		<el-dialog :modal="dialogfull" title="设置零钱密码" width='360px'  :visible.sync="set_password">
			<SetPassword :address="walletAddress" @introduce='setpassword_success'></SetPassword>
		</el-dialog>
		<el-dialog :modal="dialogfull" title="连接钱包"  width='380px' :visible.sync="set_address">
			<div class="connect-type" >
				<div @click="connection_type=false" :class="!connection_type? 'active-conn': ''">连接钱包<span v-if="!connection_type"></span></div>
				<div @click="connection_type=true" :class="connection_type? 'active-conn': ''">密码登陆<span v-if="connection_type"></span></div>
			</div>
			<div>
				<div v-if="!connection_type" style="padding: 0 30px;">
					
					<div style="text-align: left;line-height: 28px;">
						<div style="margin: 80px 0 40px 0;" v-if="address_status==1">请复制官网链接（<a>https//:zgoat.org</a>）,打开钱包，粘贴链接到钱包浏览器</div>
						<div style="margin: 60px 0 10px 0;" v-else>{{connection_info.address}}<br/>该地址还没有设置密码，请复制网站链接至DAPP为当前地址设置密码</div>
					</div>
					<button style="background: #FF6C80;color: #fff;width: 240px;height: 44px;border:none;border-radius: 22px;margin-top:40px">复制链接</button>
				</div>
				<div v-else class="pass-info">
					<div>
						<i style="font-size: 22px;color: #FF6C80;" class="el-icon-postcard"></i>
						<el-input @input="getAddressInfo" type="text" placeholder="请输入地址" v-model="connection_info.address"  style="border: none;" ></el-input>
					</div>
					<div>
						<i style="font-size: 22px;color: #FF6C80;" class="el-icon-lock"></i>
						<el-input placeholder="请输入密码" v-model="connection_info.pass" show-password></el-input>
					</div> 
					<button @click="loginEvent"  style="background: #F0E1E2;color: #B29B9D;width: 240px;height: 44px;border:none;border-radius: 22px;margin-top:40px">登录</button>
				</div>
			</div>
		</el-dialog>
	</div>
</template>

<script>
	//	import 'element-ui/lib/theme-chalk/display.css';

	import {web3, Web3Eth, BLOCKCHAIN_CONFIG, Zgoat_token,requestApi } from "../assets/js/web3config";
	let ethereumTop = window.ethereum
	import {words} from "../assets/js/words"
	import SetPassword from './SetPassword.vue'
	export default {
		name: "Nav",
		props: {},
		components:{SetPassword},
		mounted: function() {
			this.showBlock = 'nav-controller';
			var _this = this;
			console.log(window.location.href)
			var routername = window.location.href.split('#/')[1]
			if(routername == 'Invite'){
				this.meta_index = 0
			}else if(routername == 'Unlock'){
				this.meta_index = 2
			}
			this.chainId = BLOCKCHAIN_CONFIG.defaultChainId;
			if(ethereumTop) {
				ethereumTop._metamask.isUnlocked().then(res => {
					if(!res) {
						console.log(res)
						_this.walletAddress = '';
						// _this.$store.commit("SET_ADDRESS",'');
					}
				})
				setTimeout(function() {
					var etherChainId = web3.utils.hexToBytes(ethereumTop.chainId)[0]
					if(ethereumTop.isConnected && etherChainId == _this.chainId) {
						_this.chainId = ethereumTop.chainId
					} else if(etherChainId != _this.chainId) {
						_this.walletAddress = ''
						_this.$store.commit("SET_ADDRESS", '');
						console.log('chain error')
					} else {
						console.log('ether error')
					}
				}, 1000)

				ethereumTop.on('accountsChanged', (accounts) => {
					// Handle the new accounts, or lack thereof.
					// "accounts" will always be an array, but it can be empty.
					if(accounts.length === 0) {
						this.handleAccountsChanged(accounts)
					} else if(accounts.length > 0 && this.walletAddress && this.walletAddress.length > 0 && this.walletAddress !== accounts[0]) {
						this.handleAccountsChanged(accounts)
					}
				});

				ethereumTop.on('chainChanged', (chainId) => {
					if(this.chainId && this.chainId !== chainId) {
						window.location.reload()
					}
				});

				ethereumTop.on('disconnect', (error) => {
					console.error(error)
					this.walletAddress = '';
				});
			}
			console.log(this.walletAddress)
		},
		data() {
			return {
				showBlock: '',
				showCss: {},
				chainId: 0,
				meta_index:1,
				connection_info:{address:'',pass:''},
				buyUrl: 'https://pancakeswap.finance/swap?outputCurrency=' + Zgoat_token,
				walletAddress: '',
				doc_url : ["https://doc.zgoat.org","https://doc.zgoat.org/v/eng/"],
				isShowMenu: true,
				selectLang: ['English', '中文'],
				langIndex: 0,
				words:words,
				showFlag:true,
				set_address:false,
				connection_type: false,
				dialogfull:false,
				set_password:false,
				address_status:1,
			}
		},
		created() {
			if(localStorage.getItem('lang')){
				this.langIndex = localStorage.getItem('lang')
			}else{
				localStorage.setItem('lang', 0)
			}
			var docHeight = document.body.clientWidth;
			if(docHeight < 700) {
				this.showFlag = false
			}else{
				this.isShowMenu = false;
			}
			this.checkAddress()
		},
		methods: {
			changeLang:function(e){
				console.log('change language')
				this.langIndex = Number(e)
				localStorage.setItem('lang', Number(e))
				this.$store.commit("SET_LANG", Number(e));
				console.log('store language',this.$store.state.lang)
				window.location.reload()
				
			},
			userNavCommand:function(e){
					var path = ['/MyCash','/CreateRedpacket', 'Mine']
					var index = parseInt(e)
					if (index == 3){
						this.set_password = true
					}else if(index == 2){
						this.$router.push({'name': path[index], 'params': {address:this.walletAddress}})
					}else{
						this.$router.push(path[index])
					}
					
			},
			loginEvent:function(){
				var data = this.connection_info;
				var _this = this
				this.$http({
					method: 'get',
					url: requestApi + 'login',
					headers: {
						'Content-Type': 'application/x-www-form-urlencoded'
					},
					params:data
				}).then((res) => {
					console.log(res)
					if(res.data.data == 1){
						_this.$store.commit("SET_ADDRESS", data.address);
						_this.walletAddress = data.address;
						_this.set_address = false;
						// window.location.reload()
						localStorage.setItem('login_address',data.address)
					}
				})
			},
			getAddressInfo:function(e){
				console.log(e)
				var _this = this;
				if(web3.utils.isAddress(e)){
					this.$http({
						method: 'get',
						url: requestApi + 'getToken',
						headers: {
							'Content-Type': 'application/x-www-form-urlencoded'
						},
						params:{address:e}
					}).then((res) => {
						_this.address_status =  res.data.addressdata;
						if(res.data.addressdata != 1){
							_this.connection_type = false
						}
					})
				}
			},
			async checkAddress() {
				var storageInfo = localStorage.getItem('wallet_address')
				try{
						const accounts = await Web3Eth.getAccounts()
						const getChainId = Web3Eth.getChainId()
						
						if(storageInfo && storageInfo.length > 0 && accounts[0].toUpperCase() == storageInfo.toUpperCase() && getChainId == this.chainId) {
							this.walletAddress = storageInfo
							this.$store.commit("SET_ADDRESS", storageInfo);
						} else if (this.$store.state.walletAddress != ''){
							this.walletAddress = this.$store.state.walletAddress
						}else{
							this.walletDeal()
						}
				}catch(e){
					this.walletDeal()
					//TODO handle the exception
				}
			},
			handleAccountsChanged: function(accounts) {
				var _this = this;
				Web3Eth.getChainId().then(res => {
					if(res != _this.chainId) {
						_this.openTip('icon-alert', words.switchNetwork[this.langIndex])
						_this.$store.commit("SET_ADDRESS", '');
					} else {
						if(accounts.length > 0) {
							localStorage.setItem('wallet_address', accounts[0])
							_this.walletAddress = accounts[0]
							_this.$store.commit("SET_ADDRESS", accounts[0]);

							console.log('store address', _this.$store.state.walletAddress)
						} else {
							_this.walletAddress = ''
						    _this.$store.commit("SET_ADDRESS", '');
						}
					}

				})

				console.log(this.walletAddress)
			},
			async walletDeal() {
				let _this = this
				console.log('start')
				if(typeof ethereumTop !== "undefined" && ethereumTop && ethereumTop.isMetaMask) {

					ethereumTop
						.request({
							method: 'eth_requestAccounts'
						})
						.then(_this.handleAccountsChanged)
						.catch((err) => {
							if(err.code === 4001) {
								console.log('Please connect to Wallet.');
								_this.$message.error('Please connect to your wallet!')
							} else {
								_this.$message.error('Please check your wallet!')
								console.log('Please continue Wallet pre request.');
								console.error(err);
							}
						})
				} else {
					try{
					    const accounts = await Web3Eth.getAccounts()
					    _this.handleAccountsChanged(accounts)
					}catch(error){
						console.log('error:',error)
						console.log(localStorage.getItem('login_address'))
						if (_this.$store.state.walletAddress == '' && localStorage.getItem('wallet_address')){
							_this.walletAddress = localStorage.getItem('wallet_address')
							_this.$store.commit("SET_ADDRESS", localStorage.getItem('wallet_address'));
						}else {
							if(localStorage.getItem('login_address') && localStorage.getItem('login_address') != ''){
								_this.$store.commit("SET_ADDRESS", localStorage.getItem('login_address'));
								_this.walletAddress =  localStorage.getItem('login_address');
							}else{
								_this.set_address = true
							}
						}
					}
					
				}
			},
			openNav: function() {
				
				this.isShowMenu = !this.isShowMenu
			},
			getIndex:function(index){
				var router = ['/Invite', '/Reward', '/Unlock']
				this.meta_index = index;
				console.log(this.meta_index )
				this.$router.push(router[index])
			},
			closeNav: function() {
				console.log('close')
				window.scrollTo(0, 0)
				var docHeight = document.body.clientWidth;
				

				if(docHeight < 700) {

					document.querySelector('.nav-box').style.height = '80px'
					document.querySelector('.nav-app').style.height = '80px'
					this.showCss = {
						display: 'none'
					}
					this.isShowMenu = true
				}

			},
			openTip: function(iconClass, tipText) {
				var _this = this;
				var tip = "<div><span class='icontip " + iconClass + "'></span><div style='color:#FF6C80'>" + tipText +
					"</div></div>"
				this.$alert(tip, {
					center: true,
					lockScroll: false,
					dangerouslyUseHTMLString: true,
					confirmButtonClass: 'tip-pop-ok',
					confirmButtonText: words.newPlayers[this.langIndex],
					cancelButtonClass: 'tip-pop-ok',
					
				}).then(() => {
					if(_this.langIndex == 1){
						window.open('https://doc.zgoat.org/v/eng/qi-ta/xin-shou-jiao-cheng')
					}else{
						window.open('https://doc.zgoat.org/qi-ta/xin-shou-jiao-cheng')
					}
					
			    });
			},
			showAddress: function() {
				var show = this.walletAddress.substring(0, 4) + '...' + this.walletAddress.substring(this.walletAddress.length - 4, this.walletAddress.length)
				return show;
			},
			openDoc:function(){
				
			},
			openUrl:function(){
				var lang = localStorage.getItem('lang');
				if(lang == 1){
					window.open('https://zgoat.org/ZGoat_book.pdf')
				}else{
					window.open('https://zgoat.org/ZGoatEng.pdf')
				}
			},
			openAudio:function(){
				window.open('https://zgoat.org/audit.pdf')
			},
		}
	}
</script>
<style>
	.el-input__inner{
		border: none!important;
	}
</style>
<style scoped="scoped">
	.el-dialog__wrapper{
		background: rgba(0,0,0,0.5);
		z-index: 999999999!important;
	}
	.pass-info>div{
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 15px 0;
		border-bottom: solid 1px #FFE6EA;
	}
	.pass-info input{
		height: 100%;
		width: 90%;
		font-size: 14px;
		color: #FF6C80;
	}
	.active-conn{
		color: #FF6C80;
		position: relative;
	}
	.active-conn>span{
		display: inline-block;
		width: 100%;
		height: 2px;
		bottom: -10px;
		left: 0;
		position: absolute;
		
		background: #FF6C80;
	}
	.right-nav{
		height:100%;overflow-y:scroll;
		padding-bottom: 60px;
		font-size: 14px;
	}
	.right-nav a{
		line-height: 55px;
		color: #8F7074;
		text-decoration: none;
		width: 100%;
		text-align: center;
	}
	.connect-type{
		display: flex;
		justify-content: center;
		align-items: center;
		font-size: 14px;
		margin-bottom: 30px;
	}
	.connect-type>div{
		margin: 0 30px;
		font-weight: bold;
	}
	@import url("../assets/nav.css");
	.nav-box{
		overflow: hidden;
		height: 80px!important;
	}
	.router-link-active {
		color: #FF6C80!important;
		font-weight: bold;
	}
	.check-lang{
		justify-content: center;
		align-items: center;
		color: #8F7074;
		cursor: pointer;
		background: #FFF;
		padding: 15px 0;
		position: relative;
		top: -2px;
	}
	#buy1:active {
		color: #FF6C80!important;
		text-decoration: none!important;
	}
	
	.el-dropdown-link {
		cursor: pointer;
		color: #FF6C80;
		font-weight: bold;
	}
	
	.el-icon-arrow-down {
		font-size: 16px;
	}
	.wallet-btn {
		font-size: 15px;
		padding: 9px 15px;
		border-radius: 20px;
		background: #ff6c80;
		border: 1px solid #ff6c80;
		color: #fff;
	}
	.mobile-nav{
		position: fixed;
		bottom: 0;
		width: 100%;
		border-top: solid 1px #E3D7D9;
		background: #fff;
		z-index: 9999;
		font-size: 12px;
	}
	.mobile-nav a{
		display: flex;
		height: 70px;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		text-decoration: none;
		color: #aaa;
	}
	.mobile-nav img{
		width: 25px;
		margin-bottom: 5px;
	}
	.active-nav-item{
		color: #FF6C80!important;
	}
	.airdrop-tab{
		transform: scale(2);
		width: 32px!important;
		position: relative;
		top: -11px;
	}
	
</style>