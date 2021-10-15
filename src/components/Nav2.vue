<template>
	<div class="nav-box" @click.stop="closeNav">
		<el-row style="width:100%;display: flex;justify-content: center;">
			<el-col :xs='24' :sm="22" :md="20" :lg="17" class="nav">
				<div style="text-align: left;" @click.stop="closeNav">
					<router-link  to="/Home">
						<img v-if="langIndex == 0" class="logo" src="../assets/img/logoen.png" />
						<img v-else class="logo" src="../assets/img/logoch.png" />
					</router-link>
				</div>
				<img :id="showBlock" @click.stop="openNav" width="25px" height="25px" src="../assets/img/nav-open.png" />
				<div class="nav-show nav-item " :style="showCss">
					<div class="nav-block">
						<div @click.stop="closeNav">
							<router-link to="/Home"><span>{{words.home[langIndex]}}</span></router-link>
						</div>
						<div @click.stop="closeNav">
							<router-link to="/Reward"><span>{{words.reward[langIndex]}}</span></router-link>
						</div>
					</div>
				</div>
				<div class="nav-show" :style="showCss"><button class="buy light-color"><a target="_blank"  id="buy1" class="light-color" :href="buyUrl">{{words.buyZGoat[langIndex]}}</a></button></div>
				
				<div>
					<button v-if="walletAddress == ''" @click="walletDeal" class="wallet-btn href-icon">{{words.walletConnect[langIndex]}}</button>
					<button class="wallet-btn" v-else>{{showAddress(walletAddress)}}</button>
				</div>
				<div class="nav-show contact" :style="showCss">
					<!--<a target="_blank" class="nav-link" href="https://twitter.com/Goat22412341"><span class="href-icon iconfont twitter "></span></a>-->
					<a target="_blank" class="nav-link" href="https://t.me/zgoat_org"><span class="href-icon iconfont icon-telegram "></span></a>
					<a target="_blank" class="nav-link" :href="doc_url[langIndex]"><span class="href-icon iconfont doc"></span></a>
				</div>
				<div  v-if="!showFlag" class="check-lang" :style="showCss">
					<span :class="langIndex == 0 ? 'router-link-active': ''"  @click="changeLang(0)">English</span>
					<span style="margin: 0 10px;"> | </span>
					<span :class="langIndex == 1 ? 'router-link-active': ''"  @click="changeLang(1)">中文</span>
				</div>
				
				<el-dropdown v-if="showFlag" @command="changeLang" style='width:100px'>
					<span class="el-dropdown-link">{{selectLang[langIndex]}}<i class="el-icon-arrow-down el-icon--right"></i></span>
					<el-dropdown-menu slot="dropdown">
						<el-dropdown-item command='0' >English</el-dropdown-item>
						<el-dropdown-item command='1' >中文</el-dropdown-item>
					</el-dropdown-menu>
				</el-dropdown>
			</el-col>
		</el-row>
		<el-row class="mobile-nav"  v-if="!showFlag">
			<el-col :xs="8">
				<span class="href-icon iconfont icon-telegram "></span>
				<span>邀请返佣</span>
			</el-col>
			<el-col :xs="8">
				<span class="href-icon iconfont icon-telegram "></span>
				<span>空投活动</span>
			</el-col>
			<el-col :xs="8">
				<span class="href-icon iconfont icon-telegram "></span>
				<span>质押解锁</span>
			</el-col>
		</el-row>
	</div>
</template>

<script>
	//	import 'element-ui/lib/theme-chalk/display.css';

	import {web3, Web3Eth, BLOCKCHAIN_CONFIG, Zgoat_token } from "../assets/js/web3config";
	let ethereumTop = window.ethereum
	import {words} from "../assets/js/words"
	
	export default {
		name: "Nav2",
		props: {},
		mounted: function() {
			this.showBlock = 'nav-controller';
			var _this = this;
			
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

					console.log(ethereumTop.chainId, BLOCKCHAIN_CONFIG)
					var etherChainId = web3.utils.hexToBytes(ethereumTop.chainId)[0]
					console.log('chainId', etherChainId, _this.chainId)
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
				buyUrl: 'https://pancakeswap.finance/swap?outputCurrency=' + Zgoat_token,
				walletAddress: '',
				doc_url : ["https://doc.zgoat.org","https://doc.zgoat.org/v/eng/"],
				isShowMenu: true,
				selectLang: ['English', '中文'],
				langIndex: 0,
				words:words,
				showFlag:true
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
			async checkAddress() {
				var storageInfo = localStorage.getItem('wallet_address')
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
					}catch{
						
						if (_this.$store.state.walletAddress == '' && localStorage.getItem('wallet_address')){
							_this.walletAddress = localStorage.getItem('wallet_address')
							_this.$store.commit("SET_ADDRESS", localStorage.getItem('wallet_address'));
						}else if(!_this.walletAddress == true){
							_this.openTip('icon-alert', words.connecstFail[_this.langIndex])
						}
						
					}
					
				}
			},
			openNav: function() {
				if(this.isShowMenu) {
					document.querySelector('.nav-app').style.height = '100%'
					document.querySelector('.nav-box').style.height = '100%'
					this.showCss = {
						display: 'block'
					}
				} else {
					document.querySelector('.nav-app').style.height = '80px'
					document.querySelector('.nav-box').style.height = '80px'
					this.showCss = {
						display: 'none'
					}
				}
				this.isShowMenu = !this.isShowMenu
			},
			closeNav: function() {
				console.log('close')
				window.scrollTo(0, 0)
				var docHeight = document.body.clientWidth;
				console.log(docHeight)

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
		}
	}
</script>

<style scoped="scoped">
	
	@import url("../assets/nav.css");
	.router-link-active {
		color: #FF6C80!important;
		font-weight: bold;
	}
	.check-lang{
		display: none;
		justify-content: center;
		align-items: center;
		color: #ffc2ca;
		cursor: pointer;
		background: #FFF;
		padding: 30px 0;
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
	.mobile-nav>div{
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}
</style>