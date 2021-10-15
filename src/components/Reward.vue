<template>
	<div style="">
		<el-row style="padding: 20px 20px 10px 20px;display: flex;justify-content: center;">
			<el-col :xs="24" :sm="18">
				<img  @click="toWechat" v-if="showInfo" width="100%" src="../assets/img/banner-pc.png" />
				<img  @click="toWechat" v-else  width="100%" src="../assets/img/banner-mobile.png"/>
			</el-col>
		</el-row>
		
		<el-row style="line-height: 30px;display: flex;justify-content: center;padding: 0 20px;">
			<el-col :xs="24" :sm="18" :lg="18" style="display: flex;align-items: center ;alborder-radius:5px;background: #fff;font-size: 14px;padding: 0 10px;border-radius: 6px;justify-content: space-between;">
				<div style="display: flex;align-items: center;">
					<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24">
					  <path id="icon" d="M75.21,64.054a12,12,0,1,0,12,12A12,12,0,0,0,75.21,64.054Zm-5.132,12.92h-1.62V73.312h1.62Zm5.717,5.491c-.229.626-1.744.559-1.744.559a9.682,9.682,0,0,1-1.981-4.4H73.72a6.265,6.265,0,0,0,1.752,2.9.97.97,0,0,1,.322.948Zm3.845-2.132S77.7,77.82,71.022,77.515l0-4.691s5.638-.206,8.6-3.728h0s2.529-.6,2.336,6.027c0,0,.269,4.567-2.313,5.21Z" transform="translate(-63.21 -64.054)" fill="#ff6c80"/>
					</svg>
					<a style="margin-left:10px;text-decoration: none;color:#8F7074 ;font-size: 12px;display: inline-block;position: relative;top: 1px;" href="https://doc.zgoat.org/v/eng/shi-chang/kong-tou-huo-dong/he-zuo" target="_blank">{{words.kol[lang]}}</a>
				</div>
				<span style="color:#8F7074">></span>
				
			</el-col>
			
		</el-row>
		
		<div style="width: 100%;display: flex;justify-content: center;margin-bottom: 50px;">
			<el-col :xs="24" :sm="18" :lg="18" id='wish-content' class="wish-list">
				<div class="wish-bar ">
					<button v-for="item in wish_nav" :class="checkMeta == item.type ?'active-check' : ''" style="margin-right: 25px;" @click="checkMetaIndex(item.type)">{{item.name[lang]}}</button>
				</div>
				<el-col v-if="wishList.length == 0">
					<div style="margin-top: 60px;opacity: 0.5;" class="loading-trade">
						<svg t="1625624656279" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4499" width="48" height="48">
							<path d="M538.5344 266.4448a133.12 133.12 0 1 1 133.12-133.12 133.4272 133.4272 0 0 1-133.12 133.12zM255.0144 372.1984a121.6768 121.6768 0 1 1 121.6768-121.6768 121.856 121.856 0 0 1-121.6768 121.6768zM134.72 647.424a107.3664 107.3664 0 1 1 107.3664-107.264A107.52 107.52 0 0 1 134.72 647.424z m120.32 272.4608a90.9824 90.9824 0 1 1 90.9824-90.9824A91.1616 91.1616 0 0 1 255.04 919.8848zM538.5344 1024a79.36 79.36 0 1 1 79.36-79.36 79.36 79.36 0 0 1-79.36 79.36z m287.6928-134.144a64.1792 64.1792 0 1 1 64.1792-64.1792 64.3584 64.3584 0 0 1-64.1792 64.1792z m117.76-296.704a52.6336 52.6336 0 1 1 52.6592-52.6336 52.608 52.608 0 0 1-52.6336 52.6336z m-158.72-338.7136a40.96 40.96 0 1 1 12.0064 28.8512 40.5248 40.5248 0 0 1-12.0064-28.8512z" p-id="4500" fill="#FF6C80"></path>
						</svg>
					</div>
					<div style="width: 100%;padding:50px 0;text-align: center;color: #ccc;">{{requestStatus}}</div>
				</el-col>
				
				<el-row :gutter="20">
					<el-col v-for="(row,index) in wishList" :key="index" :xs="24" :sm="12" >
						<div class="wish-list-main" v-if="row.type == checkMeta " style="background: #fff;overflow: hidden;">
							<!-- <div class="wish-time">活动时间：{{row['start_time'].substring(0,11)}}- {{row['end_time'].substring(5,11)}}</div> -->
							<div style="padding: 17px;">
								<div style="display: flex;justify-content: space-between;align-items: center;margin-bottom: 15px;position: relative;">
									<div class="wish-coder href-icon" @click="toWishDetail(row.id)">
										<img style="border: solid 1px #FF6C80;box-sizing: border-box;padding: 2px;" src="../assets/img/favicon.png" />
										<img style="position: relative;left: -10px;" :src="row.logo1" />
										<span>{{lang == 0 ? row.title_en : row.title_ch}}</span>
									</div>
									<button style="padding: 3px 20px;background: #fff;color: #FF6C80;border: solid 1px rgba(255, 108, 128, 0.4);border-radius: 30px 0 0 30px;position: absolute;right: -20px;font-size: 14px;" :data-id="row.id" v-if="row.effecive!=0 &&row.effecive!=3" @click="claim_reward">{{words.wishClaim[lang]}}</button>
								</div>
								
								<div class="wish-content">
									<div>{{lang ==0 ? row.attr1: row.attr1_ch}} </div>
									<div>{{lang ==0 ? row.attr2: row.attr2_ch}}</div>
									<div v-html="lang ==0 ? row.attr3: row.attr3_ch"></div>
								</div>
								<div  v-if="row.effecive && row.effecive != 0">
									<div class="count-down">{{row.effecive == 3 ? words.startDown[lang] : words.endDown[lang]}}</div>
									<div style="text-align: center;color: #FF6C80;font-weight: bold;" class="big-font" v-html="timeArray[row.id]"></div>
								</div>
								<div class="wish-btn" style="display: flex;justify-content: space-between;">
									<!-- <button :class="row.effecive==0 || row.effecive==3 ? 'stake_false' : ''" :disabled="row.effecive==0 || row.effecive==3 " :data-type="row.type" style="background: #fff;color: #FF6C80;" :data-id="row.id" @click="joinActivity">立即参与</button> -->
									<!-- <button :class="row.effecive==0 || row.effecive==3 ? 'stake_false' : ''" :disabled="row.effecive==0 || row.effecive==3 " :data-type="row.type" style="background: #FF6C80;color: #fff;" :data-id="row.id" @click="shareActivity">邀请好友</button> -->
									<button  :data-type="row.type" style="background: #fff;color: #FF6C80;" :data-id="row.id" @click="joinActivity">{{words.joinAndReward[lang]}}</button>
									<button  :data-type="row.type" style="background: #FF6C80;color: #fff;" :data-id="row.id" @click="shareActivity">{{words.inviteFriendBtn[lang]}}</button>
								</div>
							</div>
						</div>
					</el-col>
				</el-row>
			</el-col>
		</div>
		
		<el-dialog @close='closePop' width="360px"  v-if="dialog_type == 1" title="" :visible.sync="invitePopShowAble">
			<div style="padding: 0 0px;">
				<div style="margin-bottom: 20px;color: #9D2435;font-size: 20px;">{{words.comeGroup[lang]}}</div>
				<div style="margin-bottom: 20px;color: #9D2435;font-size: 16px;">{{words.comegrouptips[lang]}}</div>
				<div style="border-radius:11px;font-size:14px;color: #B29B9D;background: #FFFAFB;padding: 17px 27px;border: solid 1px #F0E1E2;">
					<img style="margin-bottom: 20px;" width="100%" :src="wx_group" />
					<div style="display: inline-block;text-align: left;">
						<div>Tips:</div>
						<div>1. {{words.wxTips1[lang]}}</div>
						<div>2. {{words.wxTips2[lang]}}</div>
						<div>3. {{words.wxTips3[lang]}}</div>
					</div>
				</div>
			</div>
		</el-dialog>
		<el-dialog @close='closePop' width="360px"  v-if="dialog_type == 2" title="" :visible.sync="invitePopShowAble">
			<div style="padding: 0 0px;">
				<div style="margin-bottom: 20px;color: #9D2435;font-size: 20px;">{{words.invitefriendtowx[lang]}}</div>
				<div style="margin-bottom: 20px;color: #9D2435;font-size: 16px;">{{words.wxInviteTitle[lang]}}</div>
				<div style="border-radius:11px;text-align:left;font-size:14px;color: #B29B9D;background: #FFFAFB;padding: 17px 37px;">
					<img width="100%" :src="wx_invite" />
				</div>
			</div>
		</el-dialog>
		<el-dialog :lock-scroll="scrollFlag" top="0" :width="dialogWidth" title="" :visible.sync="dialogShow.wish">
			<div class="pop-content animate__animated">
				<div style="color: #999;line-height: 30px;">{{words.supportTitle[lang]}}</div>
				<div class="invite-pop-text">{{wishInfo.story_text}}</div>
				<div class="address-input">
					<div>{{words.receiveAdd[lang]}}</div>
					<input :placeholder="words.receiveInput[lang]" v-model="wishWord.my_address" />
					<div class="light-color address-tip">
						<svg t="1623730019685" class="icon" viewBox="0 0 1181 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2800" width="16" height="16">
							<path d="M1157.592615 819.357538L693.405538 73.412923C636.849231-24.418462 544.610462-24.418462 488.132923 73.491692l-464.265846 745.944616c-56.556308 97.910154-8.900923 175.655385 104.132923 175.655384h928.452923c110.040615 0 157.696-80.659692 101.139692-175.655384zM547.603692 298.062769c0-23.000615 20.873846-43.165538 44.583385-43.165538 23.867077 0 44.662154 20.164923 44.662154 43.165538v302.473846c0 23.000615-20.795077 43.086769-44.662154 43.08677-23.709538 0-44.583385-20.086154-44.583385-43.165539V298.062769z m41.590154 529.880616a61.912615 61.912615 0 0 1-62.385231-60.416c0-31.744 29.696-60.494769 62.464-60.49477 32.768 0 62.464 28.750769 62.464 60.49477 0 31.665231-26.781538 60.416-62.464 60.416z" fill="#9D2435" p-id="2801"></path>
						</svg>address can't be empty</div>
				</div>
				<div class="address-input">
					<div>{{words.inviteAdd[lang]}}</div>
					<input :placeholder="words.inviteInput[lang]" v-model="wishWord.friends_address" type="text" />
				</div>
				<div style="text-align: center;"><button style="border:none" id="copy-wish-word" class="bsc-btn copy-invite href-icon" @click="copyWishWord">{{words.supportCopyBtn[lang]}}</button></div>
			</div>
		</el-dialog>
		<el-dialog :lock-scroll="scrollFlag" top="0" :width="dialogWidth" title="" :visible.sync="dialogShow.share">
			<div class="pop-content animate__animated">
				<div class="pop-header">
					<div class="language">
						<span index="0" :class="['select-en', {lang_active:diangoText.support.index}]" data-index=0 @click="changeLangEn">English</span>
						<span index="0" :class="['select-ch', {lang_active:!diangoText.support.index}]" data-index=0 @click="changeLangCh">中文</span>
					</div>
				</div>
				<div class="diango-tip">{{diangoText.support.index ? diangoText.support.entips : diangoText.support.chtips}}</div>
		
				<div v-if="diangoText.support.index" class="address-input invite-address-input" style="font-size: 16px;">
					<div>Wallet address to recieve reward</div>
					<input style="white-space: nowrap" v-model="share_address" placeholder="input the BSC address" type="text" />
				</div>
				<div v-else class="address-input invite-address-input" style="font-size: 16px;">
					<div>接收奖励钱包地址:</div>
					<input style="white-space: nowrap" v-model="share_address" placeholder="请输入BSC地址" type="text" />
				</div>
				<div style="text-align: center;">
					<button @click="shareForFriend" class="bsc-btn copy-invite href-icon">{{diangoText.support.btnText}}</button>
				</div>
			</div>
		</el-dialog>
		<el-dialog @close='closePop' width='400px' v-if='dialog_type ==3' :visible.sync="invitePopShowAble">
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
		
		<el-dialog @close='closePop' width='320px' v-if='dialog_type ==4' :visible.sync="invitePopShowAble">
			<div style="padding: 0 0px;">
				<div style="margin-bottom: 20px;color: #9D2435;font-size: 20px;">{{words.invitetelegramtitle[lang]}}</div>
				<div style="margin-bottom: 20px;color: #9D2435;font-size: 16px;">{{words.invitetelegram[lang]}}</div>
				<div style="border-radius:11px;font-size:14px;color: #B29B9D;background: #FFFAFB;padding: 17px 27px;">
					<img style="width: 100%;" src="https://cdn.bitaochain.com/upload/picture/202109/27/14be818f8cef4a5bba3df6b2ff756018.png"/>
				</div>
			</div>
			
		</el-dialog>
		<el-dialog @close='closePop' width='380px' v-if='dialog_type ==5' :visible.sync="invitePopShowAble">
			<div style="padding: 0 0px;">
				<div style="margin-bottom: 20px;color: #9D2435;font-size: 20px;">{{words.jointelegramtitle[lang]}}</div>
				<div style="margin-bottom: 20px;color: #9D2435;font-size: 16px;">{{words.jointelegram[lang]}}</div>
				<div style="border-radius:11px;font-size:14px;background: #FFFAFB;padding: 17px 27px;border: solid 1px #F0E1E2;">
					<div style="background: #fff;text-align: left;border-radius: 10px;color: #9D2435;">
						<div style="padding:20px 20px 0 20px;display: flex;align-items: center;flex-direction: column;border-bottom: dashed #FFC2CA 1px;">
							<div style="width: 100%;text-align: left;display: flex;align-items: center;"><span style="text-align:center;margin-right:5px;display: inline-block;width: 15px;height: 15px;font-size:12px;border-radius: 50%;background:#FF6C80;color: #fff;line-height: 16px;">1</span>{{words.comeTelegram[lang]}}</div>
							<img style="width: 150px;margin-top:10px;height: 150px;margin-bottom: 20px;" src="https://cdn.bitaochain.com/upload/picture/202109/27/072008c2d5f70f3917e1505cc3dc45e0.png" />
						</div>
						<div style="padding: 20px;display: flex;align-items: center;flex-direction: column;">
							<div style="width: 100%;text-align: left;display: flex;align-items: center;"><span style="text-align:center;margin-right:5px;display: inline-block;width: 15px;height: 15px;font-size:12px;border-radius: 50%;background:#FF6C80;color: #fff;line-height: 16px;">2</span>{{words.urlTelegrame[lang]}}</div>
							<a style="margin-top: 10px;color: #5B9EFF;" target="_blank" href="https://t.me/zgoat_org">https://t.me/zgoat_org</a>
						</div>
					</div>
					
					<div style="display: inline-block;text-align: left;margin-top: 10px;color: #B29B9D;">
						<div>Tips:</div>
						<div>1. {{words.telegramTips1[lang]}}</div>
						<div>2. {{words.telegramTips2[lang]}}</div>
						<div>3. {{words.wxTips3[lang]}}</div>
					</div>
				</div>
			</div>
			
		</el-dialog>
	</div>
</template>

<script>
	import ERC20 from "../assets/abis/ERC20.json"
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
		requestApi,
		airdropabi
	} from "../assets/js/web3config";
	
	export default {
		name:'Reward',
		data(){
			return{
				tradeStatus: {
					status: 'Waiting ...',
					text: '',
					tips: 'Confirm this transaction in your wallet'
				},
				timeArray: Object.assign({}),
				dialogWidth: '30%',
				dialogShow:{share:false,wish:false},
				wishList:[],
				checkMeta: 6,
				words:words,
				scrollFlag:false,
				showInfo:true,
				lang:1,
				walletAddress:"",
				wish_nav: [],
				wishInfo:{},
				requestStatus: 'loading...',
				dialog_type:0,
				wishWord: {
					my_address: '',
					friends_address: ''
				},
				share_address: '',
				invitePopShowAble:false,
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
				}
			}
		},
		async mounted() {
			this.lang = localStorage.getItem('lang')
			var docHeight = document.body.clientWidth;
			if(docHeight < 700) {
				this.dialogWidth = '90%'
				this.dialogTop = '3vh'
				this.showInfo = false
			}
			try{
				var chainId = BLOCKCHAIN_CONFIG.defaultChainId;
				const getChainId = await Web3Eth.getChainId()
				if(chainId == getChainId){
					var address_now = localStorage.getItem('wallet_address')
					if(this.$store.state.walletAddress != '') {
						this.walletAddress = this.$store.state.walletAddress;
						this.wishWord.my_address = this.$store.state.walletAddress;
						this.share_address = this.$store.state.walletAddress;
					}else if(address_now != ''){
						this.walletAddress = address_now
						this.wishWord.my_address = address_now;
						this.share_address = address_now;
					}
				}
				var hex='';
				var pass = '94251814'
				for(var i = 0; i<pass.length; i ++){
					 hex += ''+ pass.charCodeAt(i).toString(16)
				}
				var hexMessage ="0x"+ hex
				Web3Eth.personal.sign(hexMessage,this.walletAddress).then(res=>{
					console.log('signed',res)
					
				})
				
			}catch(e){
				//TODO handle the exception
				console.log(e)
			}
			
			this.initWebData()
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
				this.initWebData()
			},
			listenLangChange(lang) {
				console.log('lang change', this.$store.state.lang)
				this.lang = Object.assign({}, lang);
				this.lang = lang;
			}
		},
		methods:{
			initWebData: function() {
				var _this = this;
				this.$http({
					method: 'get',
					url: requestApi + 'getAllWishWeb',
					headers: {
						'Content-Type': 'application/x-www-form-urlencoded'
					},
					params: {
						'address': _this.walletAddress
					}
				}).then((res) => {
					_this.wishInfo = res.data.data.wishList[0];
					var wishList = res.data.data.wishList.reverse();
					var nav = [];
					var config = res.data.data.config;
					var user_reward = res.data.data.user_reward;
					_this.wx_group = res.data.data.wx_group;
					_this.wx_invite = res.data.data.wx_invite;
					
					wishList.forEach((item,index)=>{
						// if(item.start_time) {
						// 	item.start_time = item.start_time.replace(/-/g, '/')
						// 	item.end_time = item.end_time.replace(/-/g, '/')
						// 	item.claim_time = item.claim_time.replace(/-/g, '/')
							
						// 	item.endTime = new Date(item.end_time).getTime();
						// 	item.claimTime = new Date(item.claim_time).getTime();
						// 	item.startTime = new Date(item.start_time).getTime();
							
						// 	var nowDate = new Date().getTime();
						// 	if(nowDate > item.endTime) {
						// 		wishList[index]['effecive'] = 0  //ended
						// 	} else if(nowDate <= item.endTime && nowDate >= item.claimTime) {
						// 		wishList[index]['effecive'] = 1 //claim
						// 	} else if(nowDate > item.startTime){
						// 		wishList[index]['effecive'] = 2 //start
						// 	} else{
						// 		wishList[index]['effecive'] = 3 //no start
						// 	}
							
						// }
						// if(this.walletAddress != null && this.walletAddress != ''){
						// 	var itemreward = user_reward.filter(x=>x.wish_id == item.id)
						// 	if(itemreward != ''){
						// 		wishList[index].claim_status = 1
						// 	}else{
						// 		wishList[index].claim_status = 0
						// 	}
						// }else{
						// 	wishList[index].claim_status = 0
						// }
						
						var navindex = nav.filter(x=>x.type == item.type)
						if( navindex.length > 0 ){
							console.log()
						}else{
							nav.push({type:item.type,name:config[item.type]})
						}
					})
					_this.wish_nav = nav;
					_this.wishList = wishList;
					_this.initTimeData(wishList)
					console.log(nav)
					
				}).catch(res => {
					console.log(res)
				})
			},
			checkMetaIndex: function(flag) {
				this.checkMeta = flag;
			},
			initTimeData: function(data) {
				var _this = this;
				var go_time = 0;
				for(var i = 0; i < data.length; i++) {
					if(data[i].start_time) {
						data[i].start_time = data[i].start_time.replace(/-/g, '/')
						data[i].end_time = data[i].end_time.replace(/-/g, '/')
						data[i].claim_time = data[i].claim_time.replace(/-/g, '/')
					}
					data[i].endTime = new Date(data[i].end_time).getTime();
					data[i].claimTime = new Date(data[i].claim_time).getTime();
					data[i].startTime = new Date(data[i].start_time).getTime();
			
					var nowDate = new Date().getTime();
					if(nowDate > data[i].endTime) {
						data[i]['effecive'] = 0 //ended
					} else if(nowDate > data[i].startTime){
						data[i]['effecive'] = 2  //start
					}else{
						data[i]['effecive'] = 3 //no start
					}
			
				}
				this.timeInter = setInterval(function() {
			
					var nowDate = new Date().getTime();
					for(var i = 0; i < data.length; i++) {
						if(nowDate > data[i].endTime) {
							go_time = -1
						} else if(nowDate <= data[i].endTime && nowDate >= data[i].startTime) {
							go_time = data[i].endTime - nowDate //claim time
						} else if(nowDate < data[i].startTime){
							go_time = data[i].startTime - nowDate //start tim
						}
						data[i]['go_time'] = go_time
					}
					this.wishList = data;
					_this.timeGoing()
				}, 1000)
			
				this.$once('hook:beforeDestory', () => {
					clearInterval(_this.timeInter)
					_this.timeInter = null
				})
				var voteList = data.filter(x=>(x.type == 3 && x.contract!= null))
				
			},
			timeGoing: function() {
				var _this = this;
			
				var wishList = _this.wishList;
				var timeArray = _this.timeArray;
				var timetest = [{
					'num': 0,
					'key': 'D '
				}, {
					'num': 0,
					'key': ' : '
				}, {
					'num': 0,
					'key': ' : '
				}, {
					'num': 0,
					'key': ''
				}]
				wishList.forEach((item, index) => {
					if(item.go_time && item.go_time > 0) {
						timetest[0].num = Math.floor(item.go_time / (24 * 60 * 60 * 1000))
						timetest[1].num = Math.floor(item.go_time % (24 * 60 * 60 * 1000) / (60 *
							60 * 1000))
						timetest[2].num = Math.floor(item.go_time % (24 * 60 * 60 * 1000) % (60 *
							60 * 1000) / (60 * 1000))
						timetest[3].num = Math.floor(item.go_time % (24 * 60 * 60 * 1000) % (60 *
							60 * 1000) % (60 * 1000) / 1000);
						var timeText = ''
						for(var i = 0; i < timetest.length; i++) {
							timetest[i].num < 10 && i != 0 ? timetest[i].num = '0' + timetest[i]
								.num : '';
							timeText = timeText + timetest[i].num + timetest[i].key
						}
						item[index] = item;
						if(item[1]) item[1] = null;
						timeArray[item.id] = timeText;
					}
				})
				_this.wishList = wishList;
				_this.timeArray = Object.assign({}, timeArray);
			
			},
			claim_reward:function(ev){
				var _this = this;
				if(_this.walletAddress == ''){
					_this.openTip('icon-alert',words.connectFail[this.lang])
					return
				}
				//this.claimTransfer(1)
				var id = ev.currentTarget.dataset.id;
				var select = this.wishList.filter(x=>x.id == id)[0];
				let loadingInstance1 = this.$loading();
				this.$http({
					method: 'GET',
					url: requestApi +'claimReword',
					headers: {
						'Content-Type': 'application/x-www-form-urlencoded'
					},
					
					params: {
						address: web3.utils.toChecksumAddress(_this.walletAddress),
						wish_id: id,
						type: select.type
					}
				}).then((response) => {
					
					loadingInstance1.close()
					if(response.data.num == 0){
						_this.openTip('icon-alert', _this.words.rewardOver[_this.lang])
					}else if(response.data.num==-1){
						_this.openTip('icon-alert', _this.words.nojoinwx[_this.lang])
					}else if(response.data.num > 0){
						
						_this.claimTransfer(response)
					}
					
				}).catch(res=>{
					console.log(res)
					loadingInstance1.close()
				})
			},
			claimTransfer:function(res){
				try{
					
					var _this = this;
					var sign = res.data.msg[0].replace('\n', '').split(' ')
					const airdrop = new web3.eth.Contract(airdropabi, '0x6f8F9182Ea959bd3Fb05A5865983795b2756Edd0');
					var data1 = airdrop.methods.claim(res.data.num*1e9,Number(sign[2]), sign[0], sign[1]).encodeABI();
					
					this.tradeStatus.text = words.claim[_this.lang] +' ' + res.data.num + ' ZGoat'
					this.tradeStatus.tips = words.confirmTrade[_this.lang];
					this.dialog_type = 3;
					this.invitePopShowAble = true;
					const transactionParameters = {
						to: '0x6f8F9182Ea959bd3Fb05A5865983795b2756Edd0',
						from: this.walletAddress,
						value: 0,
						data: data1
					};
					Web3Eth.sendTransaction(transactionParameters).on('transactionHash', function(hash) {
						console.log(hash)
						_this.tradeStatus.status = words.waiting[_this.lang]
					}).on('receipt', async function() {
						_this.invitePopShowAble = false;
						_this.openTip('icon-success', words.claimSuccess[_this.lang])
					}).on('error', function(error) {
						console.log(error)
						_this.invitePopShowAble = false;
						_this.openTip('icon-alert', words.claimFail[_this.lang])
					})
				}catch(e){
					console.log(e)
				}
			},
		    closePop:function(){
		    	this.dialogShow.wish = false
		    	this.dialogShow.share = false
		    },
			copyWishWord: function() {
				var user_add = this.wishWord.my_address;
				var friend_add = this.wishWord.friends_address;
				var _this = this;
				if(!web3.utils.isAddress(user_add)) {
					this.openTip('icon-alert', words.addressFail[this.lang])
					return
				}
			
				if(friend_add != '' && !web3.utils.isAddress(user_add)) {
					this.openTip('icon-alert', words.addressFail[this.lang])
					return
				}
				//copy-wish-word
				let loadingInstance1 = this.$loading({
						target: '#copy-wish-word',
						fullscreen: false,
					});
				this.$http({
					method: 'get',
					url: requestApi + 'getCopyUrl',
					headers: {
						'Content-Type': 'application/x-www-form-urlencoded'
					},
					params: {
						address: user_add,
						invite_address: friend_add
					}
				}).then((res) => {
					console.log(res)
					var data = res.data.msg;
			        var mainText = document.getElementsByClassName('invite-pop-text')[0].innerText
					mainText = mainText + data[0] + '@http://zgoat.org@'
					if(friend_add) {
						mainText = mainText + data[1]
					}
					_this.copyWord(mainText)
					_this.dialogShow.wish = false
					_this.wishWord.my_address = '';
					_this.wishWord.friends_address = '';
					loadingInstance1.close()
					// window.open('https://twitter.com/aini75227696/status/1401738211378929669');
					
				}).catch(res=>{
					console.log(res)
					loadingInstance1.close()
				})
				
				
			},
			toWishDetail: function(id) {
				var urltext = this.wishList.filter(x => x.id == id)[0].url
				console.log(urltext)
				if(urltext != '') {
					window.open(urltext)
				}
			},
			shareForFriend: function() {
				console.log(web3.utils.isAddress(this.share_address))
				if(web3.utils.isAddress(this.share_address)== false) {
					this.openTip('icon-alert', words.addressFail[this.lang])
					return
				}
				var shareText = ''
				if(this.diangoText.support.index == true) {
					shareText = this.diangoText.support.en;
				} else {
					shareText = this.diangoText.support.ch;
				}
				var href123 = shareText + 'http://zgoat.org/#/Home';
				var newlocation = href123 + '?address=' + this.share_address
				this.copyWord(newlocation)
				this.dialogShow.share = false;
				this.openTip('icon-success', words.copySuccess[this.lang])
				this.share_address = ''
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
			toWechat:function(){
				this.$router.push('/Wechat')
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
			joinActivity:function(ev){
				console.log(ev.currentTarget)
				var type = ev.currentTarget.dataset.type;
				var id = ev.currentTarget.dataset.id;
				var select = this.wishList.filter(x=>x.id == id)[0];
				console.log(select.effecive )
				if(select.effecive == 3){
					this.openTip('icon-time',words.otherChainComingSoon[this.lang])
					return
				}else if(select.effecive == 0){
					this.openTip('icon-time',words.wishEnd[this.lang])
					return
				}
				
				if(type == 1){
					this.dialogShow.wish = true
					this.dialogShow.share = false
				}else if(type == 5){
					this.invitePopShowAble = true;
					this.dialog_type = 1;
				}else{
					this.invitePopShowAble = true;
					this.dialog_type = 5;
				}
				
			},
			shareActivity:function(ev){
				var type = ev.currentTarget.dataset.type;
				var id = ev.currentTarget.dataset.id;
				var select = this.wishList.filter(x=>x.id == id)[0];
				
				if(select.effecive == 3){
					this.openTip('icon-time',words.otherChainComingSoon[this.lang])
					return
				}else if(select.effecive == 0){
					this.openTip('icon-time',words.wishEnd[this.lang])
					return
				}
				if(type == 1){
					this.dialogShow.wish = false
					this.dialogShow.share = true
				}else if(type == 5){
					this.invitePopShowAble = true;
					this.dialog_type = 2;
				}else{
					this.invitePopShowAble = true;
					this.dialog_type = 4;
				}
				
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
		}
	}
</script>

<style scoped="scoped">
	/* @media screen and (max-width: 700px) {
		.wish-bar{
			padding-top: 0px!important;
		}
	} */
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
	.stake_false {
		opacity: 0.3;
	}
	.active-check{
		opacity: 1!important;
		font-weight: bold;
		position: relative;
		text-decoration: underline;
	}
	.wish-bar > button{
		opacity: 0.7;
		cursor: pointer;
	}
	
	.wish-list{
			padding: 0 20px 20px 20px;
	}
	.wish-bar{
		width: 100%;
		text-align: left;
		font-size: 16px;
		display: flex;
		padding:20px 15px 17px 0;
	}
	.wish-bar button{
		background: none;
		border: none;
		padding: 0;
		color: #FF6C80;
		font-size: 0.95rem;
	}
	.big-font{
		font-size: 24px;
	}
	.wish-list-main{
		/* border: solid 1px #FF6C80; */
		box-shadow: 0 0 16px #F0E1E2;
		border-radius: 16px;
		margin-bottom: 20px;
		text-align: left;
		position: relative;
		/* height: 220px; */
	}
	.wish-content{
		display: flex;
		flex-direction: column;
		justify-content: center;
		/*align-items: center;*/
		/* line-height: 33px; */
		font-size: 13px;
		color: #8F7074;
		margin-bottom: 20px;
	}
	.wish-content>div{
		margin-top: 6px;
	}
	.time-going{
		position: absolute;
		top: 10px;
		right: 20px;
		color: #A79393;
		line-height: 1.4rem;
		font-size: 0.8rem;
	}
	.wish-coder{
		color: #8F7074;
		font-weight: bold;
		text-decoration: underline;
		position: relative;
		display: flex;
		align-items: center;
	}
	.wish-coder img{
		width: 30px;
		height: 30px;
		border-radius: 50%;
	}
	.no-active-btn,.wish-claim{
		width: 160px;
		height:44px;
		border-radius: 30px;
		border: none;
		font-size: 14px;
		margin-top: 30px;
		cursor: pointer;
	}
	.no-active-btn{
		background:#E3D7D9 ;
	}
	.wish-claim{
		
		color: #fff;
		background: #FF6C80;
	}
	.wish-time{
		font-size: 12px;
		background: #FDF8F9;
		color: #8F7074;
		padding: 7px 17px;
	}
	.wish-btn{
		margin-top: 25px;
	}
	.wish-btn button{
		width: 40%;
		line-height: 35px;
		border-radius: 20px;
		border: solid 1px #FF6C80;
		font-size: 14px;
	}
	.diango {
		width: 100%;
		height: 100%;
		background: rgba(0, 0, 0, 0.2);
		display: flex;
		justify-content: center;
		align-items: center;
		position: absolute;
		top: 0;
		left: 0;
		display: none;
		z-index: 999999999;
		/* font-family: ui-sans-serif; */
	}
	
	.pop-content {
		/*width: 480px;*/
		/*min-height: 464px;*/
		background: #fff;
		text-align: left;
		word-wrap:break-word!important;
		
	}
	.count-down{
		width: 130px;
		height: 28px;
		background: #FFF8F9;
		border-radius: 30px;
		text-align: center;
		line-height: 28px;
		color: #FFC2CA;
		margin: 10px auto;
		font-size: 12px;
	}
	.pop-header {
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
	
	.close {
		opacity: 1 !important;
	}
	
	.diango-tip {
		color: #999999;
		margin-top:20px;
		margin-bottom: 20px;
		font-size: 16px;
		word-break: break-word;
	}
	.bsc-btn{
		background: #FF6C80;
		color: #fff;
		border: solid 1px #FF6C80;
	}
	.pop-main {
		color: #9D2435;
		padding: 20px;
		background: #FFF2F4;
		word-break: break-word;
	}
	
	.invite-pop-text {
		background: #FFF2F4;
		color: #9D2435;
		padding: 8px 12px;
		line-height: 23px;
		margin-top: 15px;
	}
	
	.address-input {
		margin-top: 32px;
		color: #666;
	}
	
	.address-input input {
		margin-top: 10px;
		border: solid 1px #FFC2CA;
		width: 100%;
		height: 42px;
		line-height: 35px;
		border-radius: 8px;
		font-size: 16px;
		text-indent: 0.5em;
		outline: none;
		box-sizing: border-box;
	
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
	.address-tip {
		padding-left: 20px;
		display: none;
		font-size: 12px;
		margin-top: 5px;
	}
	
	.copy-invite {
		padding: 0 30px;
		height: 45px;
		border-radius: 30px;
		font-size: 16px;
		margin-top: 40px;
		margin-bottom: 20px;
	}
</style>
