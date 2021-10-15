<template>
	<div style="">
		<div class="ivite ">
			<el-row class="ivite2 animate__animated">
				<el-col :xs="24" :sm="17" style="display: flex;justify-content: center;">
					<div>{{words.referrerWord[lang]}}</div>
				</el-col>
				<el-col :xs="12"><button id="invite-get-fee" class="href-icon" data-type='fee' @click="inviteEvent">{{words.toBeReferrer[lang]}}</button></el-col>
			</el-row>
		</div>
		<el-col :xs="24"  style="padding: 15px;position: relative;top: -40px;display: flex;justify-content: center;">
			<el-col :xs="24" :sm="13" class="claim-info" style="flex-direction: column;">
				<div class="earn-single" >{{words.inviteRate[this.lang]}}</div>
				
				<div class="earn-data">
					<div>
						<span>{{words.myRate[this.lang]}}</span>
						<span class="big-font" style="position: relative;margin-top: 5px;">{{transferUnit(walletInfo.total_reward,1e9, 0)}}</span>
					</div>
					<div>
						<span>{{words.referrerRate[this.lang]}}</span>
						<span class="big-font" style="position: relative;margin-top: 5px;">{{walletInfo.refer_count}}</span>
					</div>
					<div>
						<span style="">{{words.networkTopRate[this.lang]}}</span>
						<span class="big-font" style="position: relative;margin-top: 5px;">{{walletReferinfo}}<span v-if="walletReferinfo!==0">%</span>{{words.times[lang]}}</span>
					</div>
				</div>
			</el-col>
		</el-col>
		<div style="display: flex;justify-content: center;padding: 0 15px;">
			<el-col :xs="24" :sm="13" style="position: relative;top: -45px;text-align: left;padding-bottom: 80px;">
				<div class="rank-title">{{words.inviteRank[lang]}}</div>
				
				<div class="tabel-size" style="border: solid 1px #FF6C80;border-radius: 11px 11px; overflow-x: hidden;">
					
					<el-row class="rank-tar">
						<el-col :xs="8">{{words.address[lang]}}</el-col>
						<el-col :xs="6">{{words.allreward[lang]}}</el-col>
						<el-col :xs="5">{{words.referrerRate[lang]}}</el-col>
						<el-col :xs="5">{{words.networkTopRate[lang]}}</el-col>
					</el-row>
					
					<div style="box-sizing: border-box;text-align: center;line-height: 50px;">
						<el-col v-if="tableData.length == 0">
							<div style="margin-top: 60px;opacity: 0.5;" class="loading-trade">
								<svg t="1625624656279" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4499" width="48" height="48">
									<path d="M538.5344 266.4448a133.12 133.12 0 1 1 133.12-133.12 133.4272 133.4272 0 0 1-133.12 133.12zM255.0144 372.1984a121.6768 121.6768 0 1 1 121.6768-121.6768 121.856 121.856 0 0 1-121.6768 121.6768zM134.72 647.424a107.3664 107.3664 0 1 1 107.3664-107.264A107.52 107.52 0 0 1 134.72 647.424z m120.32 272.4608a90.9824 90.9824 0 1 1 90.9824-90.9824A91.1616 91.1616 0 0 1 255.04 919.8848zM538.5344 1024a79.36 79.36 0 1 1 79.36-79.36 79.36 79.36 0 0 1-79.36 79.36z m287.6928-134.144a64.1792 64.1792 0 1 1 64.1792-64.1792 64.3584 64.3584 0 0 1-64.1792 64.1792z m117.76-296.704a52.6336 52.6336 0 1 1 52.6592-52.6336 52.608 52.608 0 0 1-52.6336 52.6336z m-158.72-338.7136a40.96 40.96 0 1 1 12.0064 28.8512 40.5248 40.5248 0 0 1-12.0064-28.8512z" p-id="4500" fill="#FF6C80"></path>
								</svg>
							</div>
							<div style="width: 100%;padding:50px 0;text-align: center;color: #ccc;">{{requestStatus}}</div>
						</el-col>
						<el-row v-for="(item,index) in tableData"  :class="index%2==0 ? 'rank-tar2': 'rank-tar1'" style="display: flex;justify-content: space-between;">
							<el-col :xs="8" style="text-align: left;"><span style="margin-right: 5px;width: 30px;display: inline-block;text-align: center;">{{index+1}}</span> 0x...{{item.address.substring(38,42)}}</el-col>
							<el-col :xs="6">{{item.total_reward}}</el-col>
							<el-col :xs="5">{{item.refer_count}}</el-col>
							<el-col :xs="5">{{item.backrate}}<span v-if="item.backrate!=0">%</span></el-col>
						</el-row>
					</div>
				</div>
			</el-col>
		</div>
		<el-dialog @close='closePop' :lock-scroll="scrollFlag" width='500px' v-if='invitePopShow == 1' :visible="invitePopShowAble">
			<div class="pop-content col-xs-11 col-sm-4">
				<div class="pop-header">
					<div class="referrer-no">{{words.checkTitle[lang]}}</div>
				</div>
				<div class="refer-info ">
					<div style="font-weight: bold;margin-bottom: 12px;">{{words.referrerInfo[lang]}}</div>
					<div style="margin-bottom: 20px;">{{referInfo.address}}</div>
					<div class="address-info">
						<div>
							<div>{{words.referrerTotalReward[lang]}}</div>
							<div class="address-reward">{{transferNullNumber(referInfo.totalReward)}} ZGoat</div>
						</div>
					</div>
				</div>
				<div style="text-align: center;"><button class="href-icon close-diango diango-btn" @click="closePop">OK</button>
				</div>
			</div>
		</el-dialog>
		<el-dialog @close='closePop' :lock-scroll="scrollFlag" width="450px" title="" v-if='invitePopShow == 2' :visible="invitePopShowAble">
			<div class="pop-content col-xs-11 col-sm-4">
				<div class="pop-header">
					<div style="color: #534749;font-size: 14px;line-height: 30px;">{{words.referrerWord[lang]}}</div>
				</div>
				<div style="margin-top: 30px;font-size: 12px;color: #B29B9D;">{{words.checkReferrerTip[lang]}}</div>
				<div class="address-input" style="margin-top: 0;">
					<input :placeholder="words.receiveInput[lang]" v-model="searchAddress" />
					<div style="color: #B29B9D;font-size: 14px;text-align: right;margin-top: 12px;">({{words.inviteTransferNum[lang]}}：500000 ZGoat)</div>
				</div>
				
				<div class="checkadd-info" style="text-align: center;">
					<button id="loading-check" class=" href-icon unstake-btn" @click="shareWords">{{words.shareForfriends[lang]}}</button>
					<button :class="['stake-btn href-icon',{stake_false:searchAddress==''} ]" :disabled="searchAddress==''" @click="transferInvite">{{words.transferNow[lang]}}</button>
				</div>
			</div>
		</el-dialog>
		<el-dialog @close='closePop' :top="dialogTop" :lock-scroll="scrollFlag" :width="dialogWidth" title="" v-if='invitePopShow == 3' :visible="invitePopShowAble">
			<div class="pop-content animate__animated">
				<div class="pop-header">
					<div class="language">
						<span index="0" :class="['select-en href-icon', {lang_active:diangoText.invite.index}]" data-index=1 @click="changeLangEn">English</span>
						<span index="0" :class="['select-ch href-icon', {lang_active:!diangoText.invite.index}]" data-index=1 @click="changeLangCh">中文</span>
					</div>
				</div>
				<div class="diango-tip">
					{{diangoText.invite.index ? diangoText.invite.entips : diangoText.invite.chtips}}
				</div>
				<div id="copy-fee" class="pop-main" v-html="diangoText.invite.index ? diangoText.invite.en : diangoText.invite.ch"></div>
				<div style="text-align: center;"><button @click="copyFee" class="bsc-btn href-icon copy-invite">copy</button>
				</div>
			</div>
		</el-dialog>
	</div>
</template>

<script>
	import ERC20 from "../assets/abis/ERC20.json"
	import { words } from "../assets/js/words"
	import { aggregate as aggregateTool } from '@makerdao/multicall'
	import {
		web3,
		bitao,
		Web3Eth,
		Zgoat_token,
		lp_token,
		BLOCKCHAIN_CONFIG,
		maxNum,
		lpInterface,
		requestApi
	} from "../assets/js/web3config";
	
	import BigNumber from 'bignumber.js';
	const config = {
		rpcUrl: 'https://bsc-dataseed1.ninicoin.io',
		multicallAddress: '0xCfE3cDa77Ca2072119E5AD7d20d51fd977b3bdFC'
	};
	const contractLPERC20 = new web3.eth.Contract(ERC20, lp_token);
	
	
	export default {
		name:'Invite',
		async mounted() {
			this.lang = localStorage.getItem('lang')
			var docHeight = document.body.clientWidth;
			if(docHeight < 700) {
				this.dialogWidth = '90%'
				this.dialogTop = '3vh'
				this.showInfo = false
			}
		
			if(docHeight < 1500 && docHeight >= 500) {
				this.dialogWidth = '50%'
			}
			var address_now = localStorage.getItem('wallet_address')
			if(this.$store.state.walletAddress != '') {
				console.log('address', this.$store.state.walletAddress)
				this.walletAddress = this.$store.state.walletAddress
				this.initData()
			}else if(address_now != ''){
				this.walletAddress = address_now
				this.initData()
			}
			this.getRank()
		},
		data(){
			return{
				scrollFlag:false,
				words:words,
				walletAddress: '',
				refer_info: {},
				walletInfo:{
					total_reward : 0,
					refer_count: 0,
					returnEarn:0
				},
				tradeStatus: {
					status: 'Waiting ...',
					text: '',
					tips: 'Confirm this transaction in your wallet'
				},
				searchAddress:'',
				invitePopShowAble: false,
				invitePopShow:0,
				walletReferinfo: 0,
				referInfo:{totalReward: '', address:''},
				lang:1,
				tableData:[],
				diangoText: {
					"invite": {
						"chtips": "复制并转发以下内容给你的好友，获得好友BSC地址，若是第一个转账给好友≥500,000 ZGoat的人，将成为该好友的推荐者，永久享受该好友地址60%的返佣奖励",
						"entips": "Copy and share the content to your friend, send ≥ 500,000 ZGoat to your friend's address as the first one, then you will be the referrer of the address, and Rewarded 60% Transaction Fee Of Distributed To Holder Permanently!",
						"en": "ZGoat(Zuck's Goat) is a wish token, aiming to help people say wish out. Invitation Reward Mechanism has been written in contract for the first time. To Be Your Referrer By Sending ≥ 500,000 ZGoat To Your Address As The First One.<br /><br />Website：https://zgoat.org<br />Telegram : https://t.me/zgoat_org<br /><br />total Supply ：21000 Billion（of which 52% burnt in Blackhole）<br />BSC Contract：0x16030ed3c8b9d7ecf741aabde04b6dc6630e12cb<br /><br />According to reward mechanism, if you don't have referrer, type your BSC address, I will send you ZGoat.",
						"index": true,
						"btnText": 'Copy',
						"ch": "ZGoat（扎克的山羊）是扎克伯格的小迷妹发起的心愿Token。首次采用去中心化邀请返佣机制（已写入合约），第一个向某地址转账≥50w ZGoat 将被合约认定为该地址的推荐者。<br /><br />官网：https://zgoat.org<br />Telegram：https://t.me/zgoat_org<br /><br />总量：210000亿（52%已打入黑洞销毁）<br />BSC合约地址：0x16030ed3c8b9d7ecf741aabde04b6dc6630e12cb<br /><br />根据邀请返佣规则，如果你还没有推荐人，请留下你的BSC地址，我给你转账"
					},
					"support": {
						"chtips": "复制以下内容给好友，好友若参与活动获得奖励，每个好友你将获得额外100,000 ZGoat的奖励，总奖励不超过1,000,000 ZGoat",
						"entips": "Copy the content to your friend, you will get extra 100,000 ZGoat reward if your friend joins the activity  and obtains reward, total extra reward 1,000,000 ZGoat at most",
						"en": "ZGoat(Zuck's Goat) is a wish token, aiming to help people say wish out. Invitation Reward Mechanism has been written in contract for the first time. \n\nZGoat WISH001 Airdrop\nTheme：ZGoat From Zero\nAward： 100,000,000 ZGoat（For Top 1200）\n\nInput your Address to obtain reward：",
						"index": true,
						"btnText": 'Copy',
						"ch": "ZGoat（扎克的山羊）是扎克伯格的小迷妹发起的心愿Token。首次采用去中心化邀请返佣机制（已写入合约），推荐者可永久享受该地址持币分红手续费60%的返佣奖励。\n\nZGoat WISH001 空投活动\n主题：ZGoat From Zero\n奖励：100,000,000 ZGoat（前5000名）\n\n输入你的钱包地址领取奖励："
					}
				}
			}
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
				this.initData()
				this.getRank()
		
			},
			listenLangChange(lang) {
				console.log('lang change', this.$store.state.lang)
				this.lang = Object.assign({}, lang);
				this.lang = lang;
			}
		},
		methods:{
			getRank:function(){
				var _this = this;
				this.$http({
					method: 'get',
					url: requestApi + 'getHolderRank',
					headers: {
						'Content-Type': 'application/x-www-form-urlencoded'
					},
					params: {}
				}).then((res) => {
					var list = res.data.data;
					console.log(list,res.data.data)
					
					list.forEach((item,index)=>{
						
						var itemrate = item.total_reward / item.refer_cost;
						list[index].backrate = itemrate*100 < 0.01 ? 0: (itemrate*100).toFixed(1);
						if(this.walletAddress != null && item.address.toUpperCase() == _this.walletAddress.toUpperCase()){
							_this.walletReferinfo =itemrate*100 < 0.01 ? 0: (itemrate*100).toFixed(1)
						}
					})
					list = list.sort(function(a,b){
						return b.backrate - a.backrate
					})
					_this.tableData = list
					
					
				})
			},
			initData() {
				if(this.walletAddress == '' || this.walletAddress == null) return;
				var _this = this;
				this.getAddressBlockInfo()
				this.getTimeSpeed = setInterval(function() {
					_this.getAddressBlockInfo()
				}, 6000)
			
				this.$once('hook:beforeDestory', () => {
					clearInterval(_this.getTimeSpeed)
					_this.getTimeSpeed = null
				})
				contractLPERC20.methods.allowance(this.walletAddress, Zgoat_token).call().then(res => {
					console.log('approve num', res)
					if(res == 0) {
						_this.approvebtn = true
					}
				})
			},
			
			transferUnit: function(num, uit, fixed) {
			
				if(num === '--') return '--'
				var value = num / uit;
				
				return value.numberFormat(fixed,'.', ',')
			},
			async getAddressBlockInfo() {
				
				if(this.walletAddress == '' || this.walletAddress == null) return;
				let _this = this;
				var refer_address = ''
				console.log(this.walletAddress )
				bitao.methods.getReferrerAddr(this.walletAddress).call().then(res => {
					console.log('add', res)
					refer_address = res;
				})
				const watcher = await aggregateTool(
					[{
						target: Zgoat_token,
						call: ['getReferrerInfo(address)(uint256, uint256)', this.walletAddress],
						returns: [
							['referCount', val => val],
							['referAmount', val => val]
						]
					},{
						target: lp_token,
						call: ['getReserves()(uint256,uint256)'],
						returns: [
							['bnb', val => val],
							['zgoat', val => val],
						]
					}],
					config
				);
				var result = watcher.results.transformed;
				console.log(result)
				for(var key in result) {
					result[key] = new BigNumber(result[key]).toNumber();
				}
				_this.walletInfo.total_reward = result.referAmount;
				_this.walletInfo.refer_count = result.referCount;
				_this.walletInfo.price = (result.zgoat/(result.bnb*1e9)).toFixed(12)
				
				
			},
			copyFee: function() {
				var shareText = document.getElementById('copy-fee').innerHTML;
				var newText = shareText.replace(/<br>/g, "\r\n");
				this.copyWord(newText)
				this.invitePopShowAble = false;
				this.openTip('icon-success', words.copySuccess[this.lang])
			
			},
			copyWord: function(word) {
				var tag = document.createElement('textarea')
				tag.setAttribute('id', 'cp_hgz_input');
				tag.value = word;
				document.getElementsByTagName('body')[0].appendChild(tag)
				document.getElementById('cp_hgz_input').select()
				document.execCommand("copy");
				document.getElementById('cp_hgz_input').remove();
			
			},
			openTip: function(iconClass, tipText) {
				var tip = "<div><span class='icontip " + iconClass + "'></span><div class='tip-text'>" + tipText +
					"</div></div>"
				this.$alert(tip, {
					center: true,
					lockScroll: false,
					dangerouslyUseHTMLString: true,
					confirmButtonClass: 'tip-pop-ok',
					confirmButtonText: 'OK',
					cancelButtonClass: 'tip-pop-ok'
				});
			},
			changeLangEn: function(event) {
				var eventData = event.currentTarget.dataset;
				console.log(eventData)
				if(eventData.index == 1) {
					this.diangoText.invite.index = true;
					this.diangoText.invite.btnText = 'Copy';
				} else {
					this.diangoText.support.index = true;
					this.diangoText.support.btnText = 'Copy';
				}
			},
			changeLangCh: function(event) {
				var eventData = event.currentTarget.dataset;
				if(eventData.index == 1) {
					this.diangoText.invite.index = false;
					this.diangoText.invite.btnText = '复制';
				} else {
					this.diangoText.support.index = false;
					this.diangoText.support.btnText = '复制';
				}
			},
			tableRowClassName({row, rowIndex}) {
				if (rowIndex%2 == 0) {
				  return 'rank-tar1';
				}else{
					return 'rank-tar2'
				}
				return '';
			 },
			 inviteEvent:function(){
			 	this.invitePopShow = 2;
			 	this.invitePopShowAble = true;
			 },
			 
			 transferInvite:function(){
			 	var _this = this;
				var _this = this;
				if(!web3.utils.isAddress(this.searchAddress)) {
					this.openTip('icon-alert', words.addressFail[this.lang])
					return
				}
			 	bitao.methods.getReferrerAddr(this.searchAddress).call().then(res => {
			 		// _this.walletInfo.claim_num = res
			 		console.log(res)
			 		if(res == '0x0000000000000000000000000000000000000000'){
			 			_this.transferInviteStart()
			 			
			 		}else{
			 			_this.referInfo.address= res;
			 			_this.invitePopShow = 1;
			 			_this.invitePopShowAble = true;
			 			
			 		}
			 	})
			 	bitao.methods.getReferrerInfo(this.searchAddress).call().then(res => {
			 		_this.referInfo.totalReward= res[1];
			 	})
			 },
			 transferInviteStart:function(){
			 	var _this = this;
			 	var data = bitao.methods.transfer(this.searchAddress, 500000 + '000000000').encodeABI()
				console.log(Zgoat_token)
			 	var ethereum = window.ethereum;
			 	const transactionParameters = {
			 		to: Zgoat_token,
			 		from: ethereum.selectedAddress,
			 		value: 0,
			 		data: data
			 	};
			 	this.invitePopShow = 7
			 	this.invitePopShowAble = true;
			 	_this.tradeStatus.tips = 'Confirm this transaction in your wallet';
			 	_this.tradeStatus.text = 'Transfer'
			 	
			 	Web3Eth.sendTransaction(transactionParameters).on('transactionHash', function(hash) {
			 		console.log(hash)
			 		_this.tradeStatus.status = 'Waiting ...'
			 	}).on('receipt', async function() {
			 		_this.closePop()
			 		_this.openTip('icon-success', words.transferSuccess[_this.lang])
			 	}).on('error', function(error) {
			 		console.log(error)
			 		_this.closePop()
			 		_this.openTip('icon-alert', words.transferFail[_this.lang])
			 	})
			 },
			openInvitePop:function(){
				this.invitePopShowAble = true;
			},
			shareWords:function(){
				this.invitePopShow = 3;
				this.invitePopShowAble = true;
			},
			closePop:function(){
				this.invitePopShowAble = false
			},
			transferNullNumber: function(val) {
				if(Number(val)) {
					return val
				} else {
					return 0
				}
			},
		}
	}
</script>
<style>
	
	.el-table th{
		background: #FF6C80!important;
	}
	.address-info>div{
		color: #666;
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
	
	.rank-tar{
		background: #ff6c80!important;
		color: #fff;
		font-size: 14px;
		line-height: 50px;
		display: flex;
		text-align: center;
		
	}
	.el-table td, .el-table th.is-leaf{
		border: none!important;
	}
	.rank-tar2{
		
		color: #9D2435;
	}
	.rank-tar1{
		background: rgba(255, 194, 202, 0.2)!important;
		border: none!important;
		color: #9D2435;
	}
	.rank-title{
		color: #FF6C80;
		    font-size: 16px;
		    font-weight: bold;
		    padding: 0 14px;
			margin: 7px 0 20px 0;
	}
</style>
<style scoped="scoped">
	.loading-trade{
		
		animation: roateLoading 1s infinite;
	}
	@keyframes roateLoading{
		0%{
			transform: rotate(0deg);
		}
		100%{
			transform: rotate(360deg);
		}
	}
	.diango-btn{
		padding: 12px 55px ;
		color: #fff;
		border: none;
		background:#FF6C80 ;
		border-radius: 25px;
		margin-top: 30px;
		font-size: 1rem;
	}
	.referrer-no{
	    margin-bottom: 15px;
	    font-size: 14px;
	    font-weight: bold;
	    color: #666;
	}
	.reward-info>div{
		width: 100%;
		display: flex;
		margin-top: 34px;
		justify-content: space-between;
	}
	.refer-info{
		background: #FFF8F9;
	  	border-radius: 12px;
	  	color: #9D2435;
		font-size: 14px;
		overflow: hidden;
		margin-top: 30px;
		padding: 20px 15px;
		border: solid 1px #FF6C80;
	}
	.refer-info .address{
		
		background: #FFF2F4;
		padding: 15px 20px;
	}
	.search-info .address{
		background: #FCF9FA;
		padding: 15px 20px;
	}
	.stake_false {
		opacity: 0.3;
	}
	.checkadd-info{
		margin-top: 30px;
		display: flex;
		justify-content: space-between;
	}
	.checkadd-info button{
		width: 42%;
		line-height: 40px;
		height: 40px;
		border-radius: 20px;
	}
	.bsc-btn{
		background: #FF6C80;
		color: #fff;
		border: solid 1px #FF6C80;
	}
	.stake-btn{
			background: #FF6C80;
			color: #fff;
			border: none;
		}
	.unstake-btn{
		background: #fff;
		color: #FF6C80;
		border: solid 1px #FF6C80;
	}
	.claim-info{
		background: #fff;
		box-shadow: 0px 0px 10px rgba(253,167,167,0.4);
		height: 139px;
		border-radius:16px;
		margin-bottom: 20px;
		display: flex;
		justify-content: space-between;
		align-items: center;
		position: relative;
	}
	.earn-single{
		background: rgba(255, 108, 128, 0.2);
		border-radius: 16px 0 15px 0;
		padding: 5px 20px;
		display: inline-block;
		color: #FF6C80;
		font-size: 14px;
		position: absolute;
		top: 0;
		left: 0;
	
	}
	.earn-data{
		display: flex;align-items: center;
		justify-content: space-between;
		width: 90%;
		height: 100%;
		color: #FF6C80;
		font-size: 14px;
		margin-top: 30px;
		padding: 0 30px;
	}
	.earn-data>div{
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}
	.ivite {
		background: #FF6C80;
		text-align: center;
		font-size: 20px;
		color: #fff;
		padding: 80px!important;
		line-height: 40px;
		
	}
	
	.ivite2 {
		display: flex;
		flex-direction: column;
		align-items: center;
		padding: 0 20px;
		font-weight: 300;
	}
	
	.ivite button {
		width: 180px;
		height: 45px;
		background: #fff;
		color: #FF6C80;
		font-size: 14px;
		border: solid 1px #fff;
		line-height: 35px;
		border-radius: 30px;
		margin-top: 30px;
	}
	.language {
		color: #FF909F;
		background: #fff;
		cursor: pointer;
		overflow: hidden;
		border: solid 1px #FF6C80;
		border-radius: 34px;
		box-sizing:border-box;
		display: flex;
		align-items: flex-start;
		width: 150px;
		height: 35px;
		line-height: 35px;
	}
	.big-font{
		font-size: 28px;
	}
	.language span {
		width: 75px;
		text-align: center;
		height: 35px;
		
		display: inline-block;
		font-size: 14px;
	}
	
	.lang_active {
		background: #FF6C80;
		color: #fff;
	}
	@media screen and (max-width: 700px) {
		.big-font{
			font-size: 18px!important;
		}
		.tabel-size{
			font-size: 12px;
		}
		.ivite2 {
			font-size: 14px;
			font-weight: 200!important;
		}
		.ivite{
			padding: 60px 0!important;
			line-height: 26px!important;
		}
	}  
</style>
