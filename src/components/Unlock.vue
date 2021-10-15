<template>
	<div class="reward">
		<div class="reward-main" style="padding:40px 10px;background: #FFF8F9;display: flex;justify-content: center;flex-direction: column;align-items: center;">
			
			<el-col :xs="24"  :sm='20' :lg="18" style="max-width: 1240px;display: flex;justify-content: space-between;flex-wrap: wrap;">
				
				<el-col :xs="24" >
					
					<div class="claim-info" style="position: relative;padding: 20px 30px;flex-direction: column;">
						<div class="earn-single">
							<span>{{words.price[lang]}}：{{walletInfo.price}} BNB/ZGoat</span>
						</div>
						
						<div style="width: 100%;text-align: center;display: flex;justify-content: center;margin-top: 30px;">
							<div style="display: flex;flex-direction:column;align-items: center;color:#FF8152;margin-right: 15px;width: 43%;">
								<span style="margin-bottom: 5px;font-size: 14px;">{{words.balanceAll[lang]}}</span>
								 <span class="big-font" style="font-weight: bold;">{{transferUnit(walletInfo.allZGoat, 1e9, 0)}}</span>
							</div>
							
							<div style="display: flex;flex-direction:column;align-items: center;color: #FF8152;width: 43%;">
								<span  style="margin-bottom: 5px;font-size: 14px;">{{words.balanceAva[lang]}}</span>
								<span  class="big-font" style="font-weight: bold;">{{transferUnit(walletInfo.tobeUseNum, 1e9, 0)}}</span>
							</div>
						</div>
						
					</div>
				</el-col>
				
				<!-- <el-col :xs="24" :sm='12'  style="position: relative;" >
					<div class="claim-info" style="flex-direction: column;padding: 35px 0;position: relative;">
						<div class="earn-single" >{{words.inviteRate[lang]}}</div>
						<div style="width:100%;text-align: right; position: relative;top: -15px;">
							<button @click="inviteEvent" class="invite-btn">{{words.inviteNow[lang]}}</button>
						</div>
						<div class="earn-data">
							<div>
								<span>{{words.networkTopRate[lang]}}</span>
								<span  class="big-font" style="position: relative;font-weight: bold;">{{walletInfo.returnEarn}}</span>
							</div>
							<div>
								<span>{{words.myRate[lang]}}</span>
								<span class="big-font" style="position: relative;font-weight: bold;">{{transferUnit(walletInfo.total_reward, 1e9, 0)}}</span>
							</div>
							<div>
								<span style="">{{words.referrerRate[lang]}}</span>
								<span class="big-font" style="position: relative;font-weight: bold;">{{walletInfo.refer_count}}</span>
							</div>
						</div>
					</div>
				</el-col> -->
			</el-col>
			
			<el-col :xs='24' :sm='20' :lg="18" style='border: solid 1px #FF6C80;max-width: 1240px;border-radius: 16px;overflow: hidden;margin-top: 0px;'>
				<div v-if="!showInfo" class="information" style="background: #FF6C80;color: #fff;flex-wrap: wrap;">
					<div style="display: flex;align-items: center;">
						<div style="font-size: 14px;margin-right: 10px;">{{words.unlockZgoat[lang]}} </div>
						<div v-if="walletInfo.claim_num>0 " style="width: 110px;border: solid 1px #fff;height: 6px;padding: 1px;line-height: 8px;border-radius: 5px;">
							<div id="lines-coming2" :style="'width:' + (line_width*90) + 'px'"></div>
						</div>
						<span v-if="walletInfo.claim_num>0 " style="margin-left: 10px;">{{(line_width*100).toFixed(1)}}%</span>
					</div>
					
					<div  style="width: 100%;display: flex;justify-content: space-between;align-items: center;">
						<div style="font-size: 25px;">{{transferUnit(walletInfo.claim_num , 1e9 , 0)}}</div>
						<button @click="getClaim" class="href-icon claim-btn">{{words.claim[lang]}}</button>
					</div>
				</div>
					
				<div v-else  class="information" style="background: #FF6C80;color: #fff;">
					<div style="display: flex;align-items: center;">
						<div class="lp-title" style="position: absolute;">
							<img style="border: solid 1px #FF6C80;" src="../assets/img/favicon.png" />
							<img style="position: relative;left: -13px;border: solid 1px #FF8152;" src="../assets/img/bnb.png" />
						</div>
						<span style="margin-left: 55px;">ZGoat-BNB</span>
						<span class="tip-icon" v-popover:popover6>
							<span class="iconfont icon-t"></span>
							<el-popover popper-class='popover-word' style="word-break: break-word;" ref="popover6" placement="bottom" title="" width="170" trigger="click" :content="words.stakeAdvice[lang]"></el-popover>
						</span>
						<a v-if="showInfo" class="href-icon" style="color: #FFC2CA;margin-left:20px;font-size:14px;text-decoration: underline;" @click="openDoc">{{words.lockHow[lang]}}</a>
					</div>
					<button @click="getClaim" class="href-icon claim-btn">{{words.claim[lang]}}</button>
				</div>

				<div style="width: 100%;font-size: 0.8rem; background: #fff;">
					
					<el-col  class='lp-info'>
						
						<el-col v-if="showInfo==false" :xs="24" :sm="5" style="display: flex;align-items: center; height: 100%;color: #FF6C80;">
							<div class="lp-title" style="position: absolute;">
								<img style="border: solid 1px #FF6C80;" src="../assets/img/favicon.png" />
								<img style="position: relative;left: -13px;border: solid 1px #FF8152;" src="../assets/img/bnb.png" />
							</div>
							<span style="margin-left: 55px;font-weight: bold;font-size: 16px;">ZGoat-BNB</span>
							<span class="tip-icon" v-popover:popover6>
								<span class="iconfont icon-t"></span>
								<el-popover popper-class='popover-word' style="word-break: break-word;" ref="popover6" placement="bottom" title="" width="170" trigger="click" :content="words.stakeAdvice[lang]"></el-popover>
							</span>
							<a class="href-icon" style="color: #FF6C80;margin-left:20px;font-size:14px;text-decoration: underline;" @click="openDoc">{{words.lockHow[lang]}}</a>
						</el-col>
						
						<el-col :xs="24" class="lp-data">
							<el-col v-if="showInfo" :xs="24" :sm="5">
								<span class="event-name">{{words.lockedZgoat[lang]}}</span>
								<span class="lp-data-attr">{{transferUnit(walletInfo.unlocked_num, 1e9, 0)}}</span>
							</el-col>
							<el-col :xs="24" :sm="5"  style="position: relative;">
								<span class="event-name">
									<span v-if="showInfo">{{words.unlockZgoat[lang]}}</span>
									<span v-else>{{words.lockedZgoat[lang]}}</span>
									<span class="tip-icon" v-popover:popover3>
										<span class="iconfont icon-t"></span>
										<el-popover popper-class='popover-word' style="word-break: break-word;" ref="popover3" placement="bottom" title="" width="170" trigger="click" :content="words.lockedZgoatTip[lang]"></el-popover>
									</span>
								</span>
								
								<div v-if="showInfo" style="width: 100%;">
									<span class="lp-data-attr">{{transferUnit(walletInfo.claim_num , 1e9 , 0)}}</span>
									<div v-if="walletInfo.claim_num > 0" style="width: 100%;position: absolute;display: flex;justify-content: center;align-items: center;">
										<div style="width: 110px;border: solid 1px #FF6C80;height: 6px;padding: 1px;line-height: 8px;border-radius: 5px;">
											<div id="lines-coming" :style="'width:' + (line_width*90) + 'px'"></div>
										</div>
										<span style="margin-left:4px;">{{(line_width*100).toFixed(1)}}%</span>
									</div>
								</div>
								<span v-else class="lp-data-attr">{{transferUnit(walletInfo.unlocked_num , 1e9 , 0)}}</span>
								
							</el-col>
							<el-col :xs="24" :sm="5">
								<span class="event-name">{{words.staked[lang]}} LP</span>
								<span class="lp-data-attr">{{transferUnit(walletInfo.lp_stake,1e18, 4)}}</span>
							</el-col>
							<el-col :xs="24" :sm="5">
								<span class="event-name">
									<span>{{words.unlockSpeed[lang]}}</span>
								<span class="tip-icon" v-popover:popover4>
										<span class="iconfont icon-t"></span>
								<el-popover popper-class='popover-word' style="word-break: break-word;" ref="popover4" placement="bottom" title="" width="170" trigger="click" :content="words.speedTip[lang]"></el-popover>
								</span>
								</span>
								<span class="lp-data-attr">{{walletInfo.lock_speed}}</span>
							</el-col>
							<el-col :xs="24" :sm="4" style="align-items: flex-end;">
								<!-- <el-col :xs="8" :sm="8" class='lp-btns'><button class="href-icon" @click="getLP"><a class="add-LP ">{{words.getLp[lang]}}</a></button></el-col> -->
								<button class="href-icon stake-btn" @click="deposit">{{words.stake[lang]}}</button>
								<button class="href-icon unstake-btn" @click="unstake">{{words.unstake[lang]}}</button>
								
							</el-col>
						</el-col>
					
					</el-col>
				</div>
			</el-col>
		</div>
		
		
		<div style="color: #B29B9D;font-size: 14px;"><span class="iconfont icon-t" style="margin-right: 10px;position: relative;top: 1px;"></span>{{words.inviteTransferTip[lang]}}</div>
		<el-dialog @close='closePop' :top="dialogTop" :lock-scroll="scrollFlag" :width="dialogWidth" v-if='invitePopShow == 4' :visible="invitePopShowAble">
			<div class="pop-content animate__animated">
				<div style="display: flex;justify-content: space-between;color: #FF6C80;align-items: center;margin-bottom:20px">
					<span>{{words.youCons[lang]}}</span><span style="font-size: 22px;font-weight: bold;">{{walletInfo.point}}</span>
				</div>
				<div style="padding: 24px;background: #FFF2F4;line-height:26px;margin-bottom:20px;color: #9D2435;" v-html="words.rewardsRule[lang]"></div>
				<div class="href-icon" style="display: flex;justify-content: center;" @click="closePop">
					<div style="width: 240px;height: 44px;line-height: 44px;text-align: center;color: #fff;background: #FF6C80;border-radius: 20px;">{{words.close[lang]}}</div>
				</div>
			</div>
		</el-dialog>
		<el-dialog @close='closePop' width='400px' v-if='invitePopShow ==7' :visible.sync="invitePopShowAble">
			<div style="display: flex;justify-content: center;flex-direction: column;align-items: center;">
				<div class="loading-trade">
					<svg t="1625624656279" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4499" width="48" height="48">
						<path d="M538.5344 266.4448a133.12 133.12 0 1 1 133.12-133.12 133.4272 133.4272 0 0 1-133.12 133.12zM255.0144 372.1984a121.6768 121.6768 0 1 1 121.6768-121.6768 121.856 121.856 0 0 1-121.6768 121.6768zM134.72 647.424a107.3664 107.3664 0 1 1 107.3664-107.264A107.52 107.52 0 0 1 134.72 647.424z m120.32 272.4608a90.9824 90.9824 0 1 1 90.9824-90.9824A91.1616 91.1616 0 0 1 255.04 919.8848zM538.5344 1024a79.36 79.36 0 1 1 79.36-79.36 79.36 79.36 0 0 1-79.36 79.36z m287.6928-134.144a64.1792 64.1792 0 1 1 64.1792-64.1792 64.3584 64.3584 0 0 1-64.1792 64.1792z m117.76-296.704a52.6336 52.6336 0 1 1 52.6592-52.6336 52.608 52.608 0 0 1-52.6336 52.6336z m-158.72-338.7136a40.96 40.96 0 1 1 12.0064 28.8512 40.5248 40.5248 0 0 1-12.0064-28.8512z" p-id="4500" fill="#FF6C80"></path>
					</svg>
				</div>
				<div style='color:#FF6C80;margin: 30px 0;font-size: 20px;'>{{tradeStatus.status}}</div>
				<div style="color:#FF6C80;background: #FFF8F9;width: 250px;font-size: 14px;text-align: center;line-height: 32px;border-radius: 16px;">
					{{tradeStatus.text}}
				</div>
				<div style="color: #666;font-size: 12px;margin-top: 30px;">{{tradeStatus.tips}}</div>
			</div>
		</el-dialog>
		<el-dialog @close='closePop' :width="showInfo? '450px' : '350px'" v-if='invitePopShow == 5' title="" :visible.sync="invitePopShowAble">
			<div>
				<div class="light-color" style="text-align: left;margin-bottom: 15px;">{{words.unstake[lang]}} ZGoat-BNB</div>
				<div class="input-lpnum">
					<div class="lp-logo">
						<img src="../assets/img/favicon.png" /><img style="position: relative;left: -13px;" src="../assets/img/bnb.png" />
					</div>
					<div style="display: flex;align-items: center;">
						<input v-on:input='getStakeInputNum' v-model="stakeInput" type="text" />
						<button class="max-btn href-icon" @click="maxSelect">Max</button>
					</div>
				</div>
				<div style="color: #A79393;font-size: 14px;margin-top:16px;margin-bottom:36px; text-align: right;">
					{{words.desposit[lang]}} : {{transferUnit(walletInfo.lp_stake, 1e18,6)}}</div>
				<button style="padding: 8px 40px;border-radius: 20px;" :disabled="stakeInput==0" @click="unstakeSubmit" :class="['href-icon stake-btn',{stake_false:stakeInput==0} ]">{{words.unstake[lang]}}</button>
			</div>
		</el-dialog>
		<el-dialog @close='closePop' :width="showInfo ? '450px': '350px'" v-if='invitePopShow == 6' title="" :visible.sync="invitePopShowAble">
			<div>
				<div class="light-color" style="text-align: left;margin-bottom: 15px;">
					<span>{{words.stake[lang]}} ZGoat-BNB </span>
					<span style="font-weight:300;font-size: 12px;">（ {{words.adviceLp[lang]}} ）</span>
				</div>
				<div class="input-lpnum">
					<div class="lp-logo">
						<img src="../assets/img/favicon.png" /><img style="position: relative;left: -13px;" src="../assets/img/bnb.png" />
					</div>
					<div style="display: flex; align-items: center;">
						<input v-on:input='getStakeInputNum' v-model="stakeInput" type="text" />
						<button class="max-btn href-icon" @click="maxSelect">Max</button>
					</div>
				</div>
				<div style="color: #A79393;font-size: 14px;margin-top:16px;margin-bottom:36px; text-align: right;">
					<div>{{words.balance[lang]}} : {{transferUnit(userLpNum, 1e18,6)}}</div>
				</div>
				<div style="display: flex;flex-direction: column;justify-content: center;align-items: center;">
					<button v-if="approvebtn" @click="approve" class="stake-btn href-icon" id="loading-dom" style="margin-bottom: 20px;">{{words.approve[lang]}}</button>
					<button :disabled="approvebtn || stakeInput==0" @click="stakeEvent" :class="['stake-btn href-icon',{stake_false:approvebtn || stakeInput==0} ]">{{words.stake[lang]}}</button>
				</div>
			</div>
		</el-dialog>
	</div>
</template>

<script>
	//	import Eth from "web3-eth";
	//	let Web3Eth = new Eth(ethereumTop)
	import ERC20 from "../assets/abis/ERC20.json"
	import { aggregate as aggregateTool } from '@makerdao/multicall'
	import { words } from "../assets/js/words"
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
	import {
		Decimal
	} from 'decimal.js'
	import BigNumber from 'bignumber.js';
	const config = {
		rpcUrl: 'https://bsc-dataseed1.ninicoin.io',
		multicallAddress: '0xCfE3cDa77Ca2072119E5AD7d20d51fd977b3bdFC'
	};
	const contractLPERC20 = new web3.eth.Contract(ERC20, lp_token);

	export default {
		name: "Unlock",
		created() {
			// bitao.methods.claimableUnlocked('0x1f271cd26f7e5f075e789765ece2239863dcd5e6').call().then(res => {
			// 	console.log('test',res)
			// })

		},
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
			var chainId = BLOCKCHAIN_CONFIG.defaultChainId;
			const getChainId = await Web3Eth.getChainId()
			if(chainId == getChainId){
				var address_now = localStorage.getItem('wallet_address')
				if(this.$store.state.walletAddress != '') {
					console.log('address', this.$store.state.walletAddress)
					this.walletAddress = this.$store.state.walletAddress
					this.initData()
				}else if(address_now != ''){
					this.walletAddress = address_now
					this.initData()
				}
			}
			console.log(this.walletAddress,'/////////')
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
				if(this.walletAddress != '') {
					this.updateInfo()
				}

			},
			listenLangChange(lang) {
				console.log('lang change', this.$store.state.lang)
				this.lang = Object.assign({}, lang);
				this.lang = lang;
			}
		},
		data() {
			return {
				words: words,
				topOneEarn: '--',
				tradeStatus: {
					status: 'Waiting ...',
					text: '',
					tips: 'Confirm this transaction in your wallet'
				},
				requestStatus: 'loading...',
				showInfo: true,
				walletAddress: '',
				wishList: [],
				line_width:0,
				walletInfo: {
					reward: '--',
					point: '--',
					referrer: '',
					refer_reward: '--',
					lp_stake: '--',
					lock_speed: '--',
					unlocked_num: '--',
					claim_num: '--',
					returnEarn:'--',
					referEarn: '0',
					allZGoat:'--'
				},
				searchInfo: {},
				referInfo: {},
				scrollFlag: false,
				searchAddress: '',
				dialogWidth: '35%',
				dialogWidth2: '20%',
				invitePopShow: 0,
				invitePopShowAble: true,
				userWishReward: '******',
				rewardBSCaddress: '',
				approvebtn: false,
				dialogTop: '15vh',
				sildeValue: 100,
				userLpNum: 0,
				stakeInput: 0,
				getTimeSpeed: null,
				lpUrl: 'https://pancakeswap.finance/add/BNB/' + Zgoat_token,
				timeArray: Object.assign({}),
				diangoText: {
					"invite": {
						"chtips": "复制并转发以下内容给你的好友，获得好友BSC地址，若是第一个转账给好友≥1,000,000 ZGoat的人，将成为该好友的推荐者，永久享受该好友地址60%的返佣奖励",
						"entips": "Copy and share the content to your friend, send ≥ 1,000,000 ZGoat to your friend's address as the first one, then you will be the referrer of the address, and Rewarded 60% Transaction Fee Of Distributed To Holder Permanently!",
						"en": "ZGoat(Zuck's Goat) is a wish token, aiming to help people say wish out. Invitation Reward Mechanism has been written in contract for the first time. To Be Your Referrer By Sending ≥ 1,000,000 ZGoat To Your Address As The First One.<br /><br />Website：https://zgoat.org<br />Telegram : https://t.me/zgoat_org<br /><br />total Supply ：21000 Billion（of which 52% burnt in Blackhole）<br />BSC Contract：0x16030ed3c8b9d7ecf741aabde04b6dc6630e12cb<br /><br />According to reward mechanism, if you don't have referrer, type your BSC address, I will send you ZGoat.",
						"index": true,
						"btnText": 'Copy',
						"ch": "ZGoat（扎克的山羊）是扎克伯格的小迷妹发起的心愿Token。首次采用去中心化邀请返佣机制（已写入合约），第一个向某地址转账≥100w ZGoat 将被合约认定为该地址的推荐者。<br /><br />官网：https://zgoat.org<br />Telegram：https://t.me/zgoat_org<br /><br />总量：210000亿（52%已打入黑洞销毁）<br />BSC合约地址：0x16030ed3c8b9d7ecf741aabde04b6dc6630e12cb<br /><br />根据邀请返佣规则，如果你还没有推荐人，请留下你的BSC地址，我给你转账"
					},
					"support": {
						"chtips": "复制以下内容给好友，好友若参与活动获得奖励，每个好友你将获得额外100,000 ZGoat的奖励，总奖励不超过1,000,000 ZGoat",
						"entips": "Copy the content to your friend, you will get extra 100,000 ZGoat reward if your friend joins the activity  and obtains reward, total extra reward 1,000,000 ZGoat at most",
						"en": "ZGoat(Zuck's Goat) is a wish token, aiming to help people say wish out. Invitation Reward Mechanism has been written in contract for the first time. \n\nZGoat WISH001 Airdrop\nTheme：ZGoat From Zero\nAward： 100,000,000 ZGoat（For Top 1200）\n\nInput your Address to obtain reward：",
						"index": true,
						"btnText": 'Copy',
						"ch": "ZGoat（扎克的山羊）是扎克伯格的小迷妹发起的心愿Token。首次采用去中心化邀请返佣机制（已写入合约），推荐者可永久享受该地址持币分红手续费60%的返佣奖励。\n\nZGoat WISH001 空投活动\n主题：ZGoat From Zero\n奖励：100,000,000 ZGoat（前5000名）\n\n输入你的钱包地址领取奖励："
					}
				},
				lang: 0,
			}
		},
		methods: {
			
			updateInfo: function() {
				clearInterval(this.getTimeSpeed)
				this.getTimeSpeed = null;
				clearInterval(this.timeInter)
				this.timeInter = null
				this.initData()
			},
			getAllreward:function(){
				var allNum = parseInt(this.walletInfo.web_reward)
				return allNum ? allNum: 0
			},
			transferUnit: function(num, uit, fixed) {

				if(num === '--') return '--'
				var value = num / uit;
				
				return value.numberFormat(fixed,'.', ',')
			},
			
			initData() {
				console.log('ggggg', this.walletAddress)
				if(this.walletAddress == '') return;
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
			async getAddressBlockInfo() {
				
				if(this.walletAddress == '') return;
				let _this = this;
				var refer_address = ''
				bitao.methods.getReferrerAddr(this.walletAddress).call().then(res => {
					console.log('add', res)
					refer_address = res;
				})
				
				
				_this.getLPNum()
				_this.getLPStake()
				const watcher = await aggregateTool(
					[{
						target: Zgoat_token,
						call: ['getReferrerInfo(address)(uint256, uint256)', this.walletAddress],
						returns: [
							['referCount', val => val],
							['referAmount', val => val]
						]
					},{
						target: Zgoat_token,
						call: ['lockedOf(address)(uint256)', this.walletAddress],
						returns: [
							['lockNum', val => val]
						]
					}, {
						target: Zgoat_token,
						call: ['unlockedOf(address)(uint256)', this.walletAddress],
						returns: [
							['unlockNum', val => val]
						]
					},  {
						target: Zgoat_token,
						call: ['getUnlockSpeed(address)(uint256)', this.walletAddress],
						returns: [
							['speed', val => val]
						]
					}, {
						target: Zgoat_token,
						call: ['claimableUnlocked(address)(uint256)', this.walletAddress],
						returns: [
							['claimAble', val => val]
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
				console.log()
				_this.walletInfo.unlocked_num = result.lockNum;
				_this.walletInfo.claim_num = result.claimAble;
				_this.walletInfo.refer_count = result.referCount;
				_this.line_width =  (result.claimAble / result.lockNum) 
				_this.getShowSpeedData(result.speed, result.claimAble, result.lockNum);
				_this.walletInfo.tobeUseNum = result.unlockNum;
				_this.walletInfo.price = (result.zgoat/(result.bnb*1e9)).toFixed(12)
				_this.walletInfo.allZGoat = result.lockNum + result.unlockNum;
				
				var stakemin =  (result.lockNum /1e9 / 86400 / 100 / 3.6 ).toFixed(2) 
				var stakemax = (result.lockNum / 1e9 / 86400 / 100 ).toFixed(2)
				_this.words.adviceLp[0] = _this.words.adviceLp[0].replace('num1',stakemin)
				_this.words.adviceLp[0] = _this.words.adviceLp[0].replace('num2', stakemax)
				_this.words.adviceLp[1] = _this.words.adviceLp[1].replace('num1', stakemin)
				_this.words.adviceLp[1] = _this.words.adviceLp[1].replace('num2', stakemax)
				
				if(_this.refer_info && _this.refer_info.refer_cost > 0){
					var myEarn = result.referAmount/1e9 / _this.refer_info.refer_cost;
					_this.walletInfo.returnEarn = myEarn*100 < 0.01 ? 0 : (myEarn*100).toFixed(2) + '%'
					
				}else{
					_this.walletInfo.returnEarn =  0;
				}
				
			},

			getShowSpeedData: function(speed, unLock, lockNum) {
				if(speed == 0) {
					this.walletInfo.lock_speed = '203-12167' + '%';
				} else {
					var apy = (speed / 1e27) * 10512000 / (lockNum / 1e9)
					apy = apy * 100 > 12167 ? 12167 : (apy * 100).toFixed(0)
					this.walletInfo.lock_speed = apy + '%';
				}
			},
			openDoc:function(){
				if(this.lang == 1){
					window.open('https://doc.zgoat.org/v/eng/qi-ta/xin-shou-jiao-cheng/5.-ru-he-jie-suo-zgoat')
				}else{
					window.open('https://doc.zgoat.org/qi-ta/xin-shou-jiao-cheng/5.-ru-he-jie-suo-zgoat')
				}
				
			},
			getclaimableUnlocked: function() {
				var _this = this;
				bitao.methods.claimableUnlocked(this.walletAddress).call().then(res => {
					_this.walletInfo.claim_num = res
				})
			},
			getLPNum: function() {
				var _this = this;
				lpInterface.methods.balanceOf(this.walletAddress).call().then(res => {
					_this.userLpNum = res
				})
			},
			getLPStake: function() {
				var _this = this;
				bitao.methods.getStaked(this.walletAddress).call().then(res => {
					_this.walletInfo.lp_stake = res
				})
			},
			approve: function() {
				var _this = this;
				var stakeNum = maxNum.toString();
				return new Promise((resolve, reject) => {
					const data = contractLPERC20.methods.approve(Zgoat_token, stakeNum).encodeABI();
					const transactionParameters = {
						to: lp_token, // Required except during contract publications.
						from: _this.walletAddress, // must match user's active address.
						value: 0,
						data: data
					};
					let loadingInstance1 = this.$loading({
						target: '#loading-dom',
						fullscreen: false,
					});
					Web3Eth.sendTransaction(transactionParameters).on('transactionHash', function() {
						resolve(true)
					}).on('receipt', async function(receipt) {
						console.log(receipt)
						_this.approvebtn = false
						loadingInstance1.close()

					}).on('error', function() {
						loadingInstance1.close()
						_this.openTip('icon-alert', words.approveFail[_this.lang])
						reject(false)
					})
				})
			},
			async stakeEvent() {
				
				var _this = this;
				var getTransfervalue = this.getTransferNumber(this.stakeInput)
				if(Number(getTransfervalue) > this.userLpNum) {
					this.$messge.error('wrong input')
					return
				}

				var stakeNum = getTransfervalue;
				var allowanceInfo = await contractLPERC20.methods.allowance(this.walletAddress, Zgoat_token).call()

				if(allowanceInfo - stakeNum < 0) {
					await this.approve()
				}

				this.invitePopShow = 7
				this.invitePopShowAble = true;
				var data = bitao.methods.stake(stakeNum).encodeABI();
				var ethereum = window.ethereum;
				const transactionParameters = {
					to: Zgoat_token,
					from: this.walletAddress,
					value: 0,
					data: data
				};
				_this.tradeStatus.tips = 'Confirm this transaction in your wallet';
				_this.tradeStatus.text = 'Stake ' + _this.stakeInput.toString().substring(0, 8) + ' BNB-ZGoat'
				Web3Eth.sendTransaction(transactionParameters).on('transactionHash', function(hash) {
					console.log(hash)
					_this.tradeStatus.status = 'Waiting ...'
				}).on('receipt', async function() {
					_this.closePop()
					_this.openTip('icon-success', words.stakeSuccess[_this.lang])
					_this.stakeInput = 0;
				}).on('error', function(error) {
					console.log(error)
					_this.closePop()
					_this.stakeInput = 0;
					_this.openTip('icon-alert', words.stakeFail[_this.lang])
				})

			},
			getTransferNumber: function(val) {
				var newVal = val.toString().split('.')
				var num = newVal.join('')
				console.log(newVal)
				if(newVal[1]) {
					var dotLength = newVal[1].length;
					for(var m = 0; m < 18 - dotLength;) {
						m++
						console.log('m', m)
						num += '0';
					}
				} else {
					for(var n = 0; n < 18;) {
						n++
						num += '0';
					}
				}
				return num;
			},
			unstakeSubmit: function() {
				if(!this.checkConnectWallet()){
					return
				}
				var _this = this;
				var getTransfervalue = this.getTransferNumber(this.stakeInput)
				if(Number(getTransfervalue) > this.walletInfo.lp_stake) {
					this.$messge.error('wrong input')
					return
				}
				var stakeNum = getTransfervalue
				var data = bitao.methods.unstake(stakeNum).encodeABI();
				var ethereum = window.ethereum;
				const transactionParameters = {
					to: Zgoat_token,
					from: this.walletAddress,
					value: 0,
					data: data
				};
				this.invitePopShow = 7
				this.invitePopShowAble = true;
				this.tradeStatus.text = words.unstake[_this.lang] + ' ' + this.stakeInput.toString().substring(0, 8) + ' BNB-ZGoat'
				this.tradeStatus.tips = words.confirmTrade[_this.lang];
				Web3Eth.sendTransaction(transactionParameters).on('transactionHash', function(hash) {
					console.log(hash)
					_this.tradeStatus.status = words.waiting[_this.lang]

				}).on('receipt', async function(receipt) {
					console.log(receipt)
					_this.closePop()
					_this.stakeInput = 0;
					_this.openTip('icon-success', words.unstakeSuccess[_this.lang])

				}).on('error', function(error) {
					_this.closePop()
					_this.stakeInput = 0;
					_this.openTip('icon-alert', words.unstakeFail[_this.lang])
					console.log(error)
				})
			},
			getClaim: function() {
				console.log('claim', this.checkConnectWallet())
				if(!this.checkConnectWallet()){
					return
				}
				var _this = this;
				if(this.walletInfo.claim_num == 0) {
					_this.openTip('icon-alert', words.noData[_this.lang])
					return;
				}
				var userGetNum = this.transferUnit(this.walletInfo.claim_num, 1e9, 2)
				var data = bitao.methods.claim().encodeABI();
				var ethereum = window.ethereum;
				const transactionParameters = {
					to: Zgoat_token,
					from: ethereum.selectedAddress,
					value: 0,
					data: data
				};
				this.invitePopShow = 7
				this.invitePopShowAble = true;
				this.tradeStatus.text = words.claim[_this.lang] +' ' + userGetNum + ' ZGoat'
				this.tradeStatus.tips = words.confirmTrade[_this.lang];
				Web3Eth.sendTransaction(transactionParameters).on('transactionHash', function(hash) {
					console.log(hash)
					_this.tradeStatus.status = words.waiting[_this.lang]
				}).on('receipt', async function() {
					_this.closePop()
					_this.stakeInput = 0;
					_this.openTip('icon-success', words.claimSuccess[_this.lang])
				}).on('error', function(error) {
					_this.closePop()
					_this.openTip('icon-alert', words.claimFail[_this.lang])
					console.log(error)
				})
			},
			closePop: function() {
				this.invitePopShow = 0;
				this.invitePopShowAble = false;

				this.searchAddress = ''
			},
			openInviteInfo: function() {
				this.invitePopShow = 3;
				this.invitePopShowAble = true;
				console.log(this.invitePopShow)
			},
			changeLangEn: function() {
				this.diangoText.invite.index = true
			},
			changeLangCh: function() {
				this.diangoText.invite.index = false
			},
			
			transferNullNumber: function(val) {
				if(Number(val)) {
					return val
				} else {
					return 0
				}
			},
			claimReward: function(ev) {
				var id = ev.currentTarget.dataset.id;
				var select = this.wishList.filter(x=>x.id == id)[0];
				
				if(select.effecive == 2){
					this.openTip('icon-time',words.otherChainComingSoon[this.lang])
					return
				}
				
				var _this = this;
				this.invitePopShow = 7
				this.invitePopShowAble = true;
				_this.tradeStatus.status = words.waiting[this.lang];
				_this.tradeStatus.tips = '';
				_this.tradeStatus.text = '';
				
				
				this.$http({
					method: 'GET',
					url: requestApi +'claimReword',
					headers: {
						'Content-Type': 'application/x-www-form-urlencoded'
					},
					params: {
						address: _this.walletAddress,
						wish_id: id,
						type: select.type
					}
				}).then((response) => {
					console.log(response)
					_this.closePop()
					var userNum = Number(response.data.msg)
					if(userNum > 0) {
						var tipText = _this.words.wishClaimSuccess[_this.lang];
						var tip =
							"<div><span class='icontip icon-success'></span><div class='tip-text'>" + _this.words.claimSuccessTip[_this.lang] + "</div><div style='color:#FF6C80;margin-top:20px;margin-bottom:30px;font-weight:bold;font-size:20px' >" +
							userNum + " ZGoat</div><div style='color:#FFC2CA;font-size:14px'>" + tipText +
							"</div></div>"
						_this.$alert(tip, {
							center: true,
							lockScroll: false,
							dangerouslyUseHTMLString: true,
							confirmButtonClass: 'tip-pop-ok',
							cancelButtonClass: 'tip-pop-ok',
							confirmButtonText: _this.words.getLPToLock[_this.lang],
							callback: function() {
								_this.invitePopShow = 0;
								_this.invitePopShowAble = false;
								window.open(_this.lpUrl)
							}
						});

					} else{
						_this.closePop();
						_this.openTip('icon-alert',words.noData[_this.lang])
					}

				}).catch((res) => {
					_this.closePop();
					_this.openTip('icon-alert', words.requestFail[_this.lang])

				})
			},
			
			searchInviteInfo: function(response, type) {
			},
			formatTooltip: function(val) {
				return val + '%';
			},
			deposit: function() {
				if(!this.checkConnectWallet()){
					return
				}
				if(this.userLpNum == 0){
					this.insufficientLPUnstake('icon-alert',words.insufficientLPStake[this.lang])
					return
				}
				this.invitePopShow = 6;
				this.stakeInput = 0;
				// this.stakeInput = this.getShowUintToPage(this.userLpNum)
				this.invitePopShowAble = true;
			},

			unstake: function() {
				if(!this.checkConnectWallet()){
					return
				}
				console.log(this.lp_stake)
				if(this.lp_stake == 0){
					this.openTip('icon-alert',words.insufficientLPUnstake[this.lang])
					return
				}
				this.invitePopShow = 5;
				this.stakeInput = 0;
				// this.stakeInput = this.getShowUintToPage(this.walletInfo.lp_stake)
				this.invitePopShowAble = true;
			},
			getLP:function(){
				
				if(!this.checkConnectWallet()){
					return
				}
				
				var alertText = words.lockZgoatTip[this.lang]
				var btnText = words.getLp[this.lang]
				var openUrl = this.lpUrl
				var alerticon = ''
				var toUseCoin = this.walletInfo.tobeUseNum? (this.walletInfo.tobeUseNum / 1e9).toFixed(2) : 0;
				if(this.walletInfo.tobeUseNum < 1000){
					btnText = 'BUY ZGoat'
					openUrl = 'https://pancakeswap.finance/swap?outputCurrency=' + Zgoat_token
					alerticon =" <div style='text-align:right;width:270px;margin:0 auto;color: #9D2435;font-size:12px;'><span style='color: #9D2435;font-size: 14px;margin-right: 5px;' class='icontip icon-alert'></span>" + words.noBalance[this.lang]+ "</div>"
				}
				var tip = "<div ><img width='100px' height='100px' src='loading.png' /><div style='color:#9D2435;margin-top:5px;margin-bottom:20px;'>" + alertText +
					"</div>" + alerticon + "<div style='padding: 15px;background: #FFF2F4;margin:0 auto;color:#9D2435'> " + words.unLockUserNum[this.lang]
					+ toUseCoin +"</div></div>"
				this.$alert(tip, {
					center: true,
					lockScroll: false,
					dangerouslyUseHTMLString: true,
					confirmButtonClass: 'tip-pop-ok',
					confirmButtonText: btnText,
					cancelButtonClass: 'tip-pop-ok',
					
				}).then(() => {
		          window.open(openUrl)
		        });
				
			},
			maxSelect: function() {

				if(this.invitePopShow == 5) {
					this.stakeInput = this.getShowUintToPage(this.walletInfo.lp_stake)
				} else {
					this.stakeInput = this.getShowUintToPage(this.userLpNum)

				}

			},
			getShowUintToPage: function(val) {
				// return new BigNumber(val).div(1e18).toNumber();
				if(val == 0) return 0
				var num = val.toString()
				if(num.length > 18) {
					return num.substring(0, num.length - 18) + '.' + num.substring(num.length - 18, num.length)
				} else {
					var zero = '0.'
					for(var i = 0; i < 18 - num.length; i++) {
						zero += '0'
					}
					return zero + num
				}
			},
			getStakeInputNum: function(ev) {
				if(Number(ev.target.value) || ev.target.value == 0) {
					this.stakeInput = ev.target.value
				} else {
					this.stakeInput = ''
				}
			},
			copyFee: function() {
				var shareText = document.getElementById('copy-fee').innerHTML;
				console.log(shareText)
				var newText = shareText.replace(/<br>/g, "\r\n");
				console.log(newText)
				this.copyWord(newText)
				this.invitePopShow = 0;
				this.invitePopShowAble = false;
				console.log(this.invitePopShow)
				this.openTip('icon-alert', words.copySuccess[this.lang])

			},
			insufficientLPUnstake: function(iconClass, tipText){
				var _this = this
				var tip = "<div><span class='icontip " + iconClass + "'></span><div style='color:#FF6C80'>" + tipText +
					"</div></div>"
				this.$alert(tip, {
					center: true,
					lockScroll: false,
					dangerouslyUseHTMLString: true,
					confirmButtonClass: 'tip-pop-ok',
					confirmButtonText: 'Get LP',
					cancelButtonClass: 'tip-pop-ok'
				}).then(res=>{
					console.log(res)
					_this.getLP()
					
				});
			},
			async getUserVoteInfo(data){
				console.log()
				if (data.length == 0) return;
				var multQuery = []
				data.forEach(item=>{
					multQuery.push({
						target: item.contract,
						call: ['getUserStake(address)(bool)', this.walletAddress],
						returns: [
							[item.id, val => val],
						]
					})
				})
				var watcher = await aggregateTool(multQuery,config )
				var result = watcher.results.transformed;
				console.log('ggg', result)
				var wishList = this.wishList;
				wishList.forEach((item,index)=>{
					item.stake = result[item.id]
				})
				this.wishList = wishList;
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
				var tip = "<div><span class='icontip " + iconClass + "'></span><div style='color:#FF6C80'>" + tipText +
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
			
			openNotice: function(title, iconClasss, tipText) {
				var tiptext = "<div><span style='font-size: 24px' class='icontip " + iconClasss +
					"'><span style='font-size:16px;margin-left: 13px'>" + tipText +
					"</span><div><a style='font-size: 16px;'>check on oklink</a></div></div>"
				this.$notify({
					title: '',
					dangerouslyUseHTMLString: true,
					confirmButtonText: 'OK',
					message: tiptext
				})
			},
			openZeroTip: function() {
				this.invitePopShow = 4
				this.invitePopShowAble = true;
			},
			goTop: function() {
				window.scrollTo(0, 0)
				this.invitePopShow = 0
			},
			checkConnectWallet:function(){
				console.log(this.walletAddress)
				if(this.walletAddress == ''){
					this.openTip('icon-alert', words.connectFail[this.lang])
					return false;
				}else{
					return true;
				}
			},
		}
	}
</script>

<style>
	.reward {
		width: 100%;
		height: 100%;
		position: relative;
		overflow-x: hidden;
		padding-bottom: 80px;
		/* display: flex; */
		/* flex-wrap: wrap; */
		/* justify-content: center; */
	}
	
	.add-LP {
		text-decoration: none;
		color: #FF6C80;
	}
	
	.add-LP:active {
		color: #FF6C80;
	}
	
	.input-lpnum {
		background: #FFF2F4;
		border: solid 1px #FF6C80;
		display: flex;
		justify-content: flex-end;
		align-items: center;
		padding: 20px 10px;
		border-radius: 12px;
		position: relative;
	}
	
	.lp-logo {
		position: absolute;
		left: 10px;
	}
	
	.input-lpnum img {
		width: 36px;
		height: 36px;
	}
	
	.input-lpnum input {
		width: 150px;
		border: none;
		margin-right: 10px;
		background: none;
		color: #FF6C80;
		font-size: 20px;
		text-align: right;
		outline: none;
	}
	
	.max-btn {
		background: #FF6C80;
		color: #fff;
		height: 24px;
		/* line-height: 20px; */
		/* width: 50px; */
		text-align: center;
		font-size: 14px;
		border: none;
		border-radius: 12px;
	}
	
	
	.stake_false {
		opacity: 0.3;
	}
	.big-font{
		font-size: 32px;
	}
	@import url("../assets/reward.css");
</style>