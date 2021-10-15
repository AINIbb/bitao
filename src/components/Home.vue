<template>
	<div>
		<div class="ivite ">
			<el-row class="ivite2 animate__animated">
				<el-col :xs='24' :sm="22" :md="20" :lg="14" style="display: flex;justify-content: center;">
					<div>{{words.referrerWord[lang]}}</div>
				</el-col>
				<el-col :xs="12"><button id="invite-get-fee" class="href-icon" data-type='fee' @click="referEvent">{{words.toBeReferrer[lang]}}</button></el-col>
			</el-row>
		</div>
		<div class="token_omics center-flex" style="background: #fff;">

			<el-col xs="24" :sm="9" class="omics-content">
				<h1 class="light-color h-title">{{words.tokenNomics[lang]}}</h1>
				<div style="display: flex;width: 100%;display: flex;margin-top:20px;justify-content: space-between;align-items: center;">
					<button style="cursor: pointer;" :class="checkChain ? 'bsc-btn': 'heco-btn'" id="lookBSC" @click="checkChainEvent(1)">BSC</button>
					<button style="cursor: pointer;" :class="!checkChain ? 'bsc-btn': 'heco-btn'" id="lookHECO" @click="checkChainEvent(2)">{{words.otherChain[lang]}}</button>
				</div>

				<div v-if="checkChain" id="omics1" class="omics-text">
					<div class="anim-con1 animate__animated" style="line-height: 35px;">
						<div class="weight-color ">{{words.maxSupply[lang]}}</div>
						<div class="weight-color">{{words.initialBurnt[lang]}}</div>
						<div class="weight-color">{{words.inviteReward[lang]}}</div>
						<div class="weight-color">
							<span>{{words.contract[lang]}} : {{Zgoat_token.substring(0,20) + '...'}}</span> 
							<span v-if="copyFlag" style="font-size: 20px;color:#9D2435" class="href-icon icontip icon-success"></span>
							
							<span v-else  @click="copylp_token" style="font-size: 20px;" class="href-icon iconfont icon-copy"></span>
							
						</div>
						<div @click="addContract" style="color: #F89C35;margin:20px 0;display: flex;justify-content: center;">
							<div class="href-icon" style="display: flex;align-items: center;justify-content: center;padding: 5px 10px;border-radius: 31px; background: #FFF7F0;">
								<img src="../assets/img/matemask.png" />
								<span style="line-height: 25px;margin-left: 5px;">{{words.addZgoat[lang]}}</span>
							</div>
						</div>
					</div>

					<!-- <div class="light-color" style="line-height: 30px;">
						<div style="display: flex;justify-content: space-between;align-items: center;"><span>{{words.eatzero[lang]}}</span><span>{{words.nextPhase[lang]}}</span></div>
						<div class="lines-coming ">
							<div class="lines-active animate__animated">
								<div class="active-dot  ">52%</div>
							</div>
						</div>
						<div style="text-align: left;font-size: 12px;">{{words.nextPhaseWord[lang]}}</div>
					</div> -->
					
				</div>

				<div v-if="!checkChain" id="omics2" class="omics-text" style="background: #fff;">
					<div class="weight-color" style="font-size: 22px;">{{words.otherChainComingSoon[lang]}}</div>
					<div class="weight-color" style="line-height: 35px;font-size: 16px;margin: 30px 0;text-align: left;">
						{{words.otherChainTip[lang]}}
					</div>
					<img style="width: 40%;" src="../assets/img/heco_comesoon.png" />
				</div>

			</el-col>

		</div>

		<div class="title-decribe center-flex">
			<el-col :xs='24' :sm="22" :md="20" :lg="14" class="title-text">
				<el-col :xs="24" :sm="16" class="title-text-detail">
					<h1 class="little-girl animate__animated  animate__fadeInUp">{{words.littleGirl[lang]}}</h1>
					<div class="girl-decribe animate__animated  animate__fadeInUp">{{words.littleGirlWord[lang]}}</div>
				</el-col>
				<el-col :xs="24" :sm="8" class='title-decribe-bg'>
					<img style="border: solid 1px #FF909F;background: #FF909F;" width="100%" src="../assets/img/background1.png" />
				</el-col>

			</el-col>
			<!-- <el-col class="social-data" :xs='24' :sm="22" :md="20" :lg="14">

				<el-col :xs="12" :sm="5" class="data-item animate__animated  animate__fadeInUp">
					<img src="../assets/img/title-supply.png" />
					<div>
						<div class="num weight-color">Over 57%</div>
						<div class="light-color">{{words.blackHole[lang]}}</div>
					</div>
				</el-col>
				<el-col :xs="12" :sm="5" class="data-item animate__animated  animate__fadeInUp">
					<img src="../assets/img/title-telegram.png" />
					<div>
						<div class="num weight-color">Over 26000</div>
						<div class="light-color">{{words.telegram[lang]}}</div>
					</div>
				</el-col>
				<el-col :xs="12" :sm="5" class="data-item animate__animated  animate__fadeInUp">
					<img src="../assets/img/title-holders.png" />
					<div>
						<div class="num weight-color">Over 209000</div>
						<div class="light-color">{{words.holders[lang]}}</div>
					</div>
				</el-col>

				<el-col :xs="12" :sm="5" class="data-item animate__animated  animate__fadeInUp">
					<img src="../assets/img/title-twitter.png" />
					<div>
						<div class="num weight-color">Over 0</div>
						<div class="light-color">{{words.twitter[lang]}}</div>
					</div>
				</el-col>
			</el-col> -->
		</div>
		<div class="airdrop">

			<div class="light-color" style="width: 100%;text-align: center;">
				<h1 class="h-title">{{words.airdrop[lang]}}</h1>
				<div style="margin-top: 10px;font-size: 16px;">{{words.aridropTitle[lang]}}</div>
			</div>
			<el-row style="width: 100%;display: flex;justify-content: center;">

				<el-col :xs='24' :sm="22" :md="20" :lg="14" class=" airdrop-text">
					<el-col :xs="24" :sm="12" class="airdop-time" style="background: #fff;">
						
						<div class="airdrop-base-info" >
							<div class="light-color href-icon" style="display: flex;align-items: center;flex-wrap: wrap;position: relative;" >
								<!-- <div v-if="!airdropInfoShow" class="together" style="width: 100%;margin-left: 0;margin-bottom: 20px;">
									<div><img src="../assets/img/favicon.png"/><span>ZGoat</span></div>
									<div><img :src="wishInfo.logo1"/><span> {{wishInfo.platform_name}}</span></div>
								</div> -->
								<div class="together" @click="toWishDetail" >
									<img style="border: solid 1px #FF6C80;box-sizing: border-box;padding: 2px;" src="../assets/img/favicon.png"/>
									<img style="position: relative;left: -10px;" :src="wishInfo.logo1"/>
								</div>
								<div @click="toWishDetail" style="font-size: 30px;text-decoration: underline;">{{wishInfo.title_en}}</div>
								<div v-if="airdropFlag == 1" @click="toClaim" style="padding: 3px 20px;background: #fff;color: #FF6C80;border: solid 1px #FF6C80;border-radius: 30px 0 0 30px;position: absolute;right: -41px;font-size: 14px;">{{words.wishClaim[lang]}}</div>
							</div>
							<div class="light-color">{{lang ==0 ? wishInfo.attr1: wishInfo.attr1_ch}}</div>
							<div class="light-color">{{lang ==0 ? wishInfo.attr2: wishInfo.attr2_ch}}</div>
							<div class="light-color">{{lang ==0 ? wishInfo.attr3: wishInfo.attr3_ch}}</div>
						</div>
						<div v-if="airDropTime >= 0" id="time-go" class="light-color h-title" style="margin:0 0;text-align: center;">
							<div class="count-down" v-if="airdropFlag == 1">{{words.endDown[lang]}}</div>
							<div class="count-down" v-if="airdropFlag == 2">{{words.startDown[lang]}}</div>
							<div v-html="timeGoing"></div>
						</div>
						<div v-else style="display: flex;flex-direction: column;align-items: center;justify-content: center;">
							<img src="../assets/img/timeover.png" />
						</div>
						<!-- ['href-icon', {airdrop_btn:airdropFlag == 1,airdrop_btn_slim:airdropFlag == 2 || airdropFlag == -1}] -->
						<div class="airdop-button">
							<button v-if="airdropFlag !=0" data-type='wish' id="invitefrient" class="href-icon" style="background: #fff;border: solid 1px #FF6C80;color: #FF6C80;" @click="openInvitePop">{{words.supportBtn[lang]}}</button>
							<button v-if="airdropFlag !=0" data-type='share' id="share-goats" class="href-icon airdrop_btn" @click="openInvitePop">{{words.inviteFriendBtn[lang]}}</button>
							<div v-if="airdropFlag == 0" style="width: 100%;text-align: center;">
								<button data-type='share' id="share-goats" class="href-icon airdrop_btn" @click="openInvitePop">{{words.wishClaim[lang]}}</button>
							</div>
						</div>
					</el-col>
					<el-col :xs="24" :sm="12" class='airdrop-derc'>
						<div v-if="lang == 0 ">
							<div style="margin-bottom: 20px;">Click the button "Support", then copy the text to comment in Zuck's Facebook, You will probably get airdrop reward:</div>
							<div>1) {{wishInfo.top1_reward}} ZGoat each for Top {{wishInfo.top1_num}} players</div>
							<div>2) {{wishInfo.top2_reward}} ZGoat each for Top {{wishInfo.top2_num}} players</div>
							<div>3) Inviting friend will get extra reward {{wishInfo.invite_reward}} each, at most {{wishInfo.invite_most}}</div>
							<div>4) If balance of your wallet more than {{wishInfo.ten_times_num}}ZGoat, Airdrop reward 10X </div>
						</div>
						<div v-else>
							<div style="margin-bottom: 20px;">点击“立即参与”按钮，然后复制内容在Zuck的Facebook评论区里，您将会获得空投奖励：</div>
							<div>1) 前{{wishInfo.top1_num}} 名，每人{{wishInfo.top1_reward}} ZGoat</div>
							<div>2) 前{{wishInfo.top2_num}}名，每人{{wishInfo.top2_reward}} ZGoat</div>
							<div>3) 每成功邀请1名好友，额外奖励{{wishInfo.invite_reward}} ZGoat，最多{{wishInfo.invite_most}} ZGoat</div>
							<div>4) 若钱包余额超过{{wishInfo.ten_times_num}} ZGoat，奖励 X 10倍</div>
						</div>
						<div class="center-flex airdrop-bg" style="width: 100%;margin-top:20px"><img width="60%" src="../assets/img/airdrop-background.png" /></div>
					</el-col>
				</el-col>
			</el-row>
		</div>

		<!--<div class="innovation">
			<div style="margin-bottom: 45px;text-align: center;padding: 0 20px;">
				<h1 class="h-title">INNOVATION</h1>
				<div style="font-size: 16px;margin-top: 10px;">Think Different , Make Consensus Magic More </div>
			</div>
			<el-col  :xs='24' :sm="22" :md="20" :lg="14"  class="innovation-data ">
				<el-col :xs="24" class="data-item">
					<img src="../assets/img/inn-1.png" />
					<div class="num weight-color">Decentralized Invite Reward</div>

					<div class="light-color" style="text-align: left;width: 100%;">Invitation mechanism is the first attempt, and written into contract. Referrer will Be Rewarded 60% Tx Fee Of Distributed To Holder Permanently! </div>

				</el-col>

				<el-col :xs="24" class="data-item">
					<img src="../assets/img/inn3.png" />
					<div class="num weight-color">EatZero Burnt</div>
					<div class="light-color" style="text-align: left;width: 100%;">Based On Initial 72h Average Price, If Price Eats One "Zero", Burnt 5% ZGoat In LP Of Owner. As a result, The price higher, ZGoat burnt more, ZGoat values more.</div>
				</el-col>
				<el-col :xs="24" class="data-item">
					<img src="../assets/img/inn2.png" />
					<div class="num weight-color">Wish Airdrop</div>
					<div class="light-color" style="text-align: left;width: 100%;">Users can get airdrop by delivering wish to more people. Consensus Is Magical, Just Say Wish Out, which Maybe Come True Magically Oneday</div>
				</el-col>
				

			</el-col>
			<el-col  :xs='24' :sm="22" :md="20" :lg="14"  class="innovation-data ">
				<el-col :xs="24" class="data-item">
					<img src="../assets/img/inn4.png" />
					<div class="num weight-color">Reward 10x Than CEX</div>
					<div class="light-color" style="text-align: left;width: 100%;">According to invitation mechanism , one can earn more token by inviting friends, and reward is ten times than CEX, which is very attractive</div>

				</el-col>
				<el-col :xs="24" class="data-item ">
					<img src="../assets/img/inn5.png" />
					<div class="num weight-color">No Fee Dex</div>
					<div class="light-color" style="text-align: left;width: 100%;">Exchange benifit always from transaction fee, the larger volume of transaction, the more exchange earns. as a result, if no fee exchange appears, it will make great completion</div>
				</el-col>

				<el-col :xs="24" class="center-flex sm-bg">
					<button style="width: 218px;height: 50px;border-radius: 30px;" class="heco-btn"><a id="buy2" class="weight-color" href="https://exchange.pancakeswap.finance/#/swap">CLICK TO BUY ZGoat</a></button>
				</el-col>
			</el-col>
		</div>-->

		<!-- <div class="plan" style="display: flex;flex-direction: column;align-items: center;margin-top:80px;background: #FFF2F4;padding: 80px 0;">
			<h1 class="light-color h-title" style="text-align: center;">{{words.futurePlan[lang]}}</h1>
			<el-row :xs='24' :sm="22" :md="20" :lg="14" class="center-flex plan-content">
				<img width="303px" height="482px" src="../assets/img/plan-background.png" />
				<el-col :sx="24" :sm="12" class="plan-detail">
					<div class="plan-detail-word2">
						<img src="../assets/img/plan2.png" />
						<div>
							<div class="light-color plan-big-size">{{words.wishList[lang]}}</div>
							<div class="weight-color plan-small-size plan-detail-word">{{words.wishListWord[lang]}}</div>
						</div>
					</div>
					<div class="plan-detail-word2">
						<img src="../assets/img/plan1.png" />
						<div>
							<div class="light-color plan-big-size">{{words.bridge[lang]}}</div>
							<div class="weight-color plan-small-size plan-detail-word">{{words.bridgeWord[lang]}}</div>
						</div>
					</div>
					<div class="plan-detail-word2">
						<img src="../assets/img/plan3.png" />
						<div>
							<div class="light-color plan-big-size">{{words.entertainment[lang]}}</div>
							<div class="weight-color plan-small-size plan-detail-word">{{words.playWord[lang]}}</div>
						</div>
					</div>
					<div class="plan-detail-word2">
						<img src="../assets/img/ttt.png" />
						<div>
							<div class="light-color plan-big-size">{{words.noFee[lang]}}</div>
							<div class="weight-color plan-small-size plan-detail-word">{{words.noFeeWord[lang]}}</div>
						</div>
					</div>
					<div class="plan-detail-word2">
						<img src="../assets/img/plan5.png" />
						<div>
							<div class="light-color plan-big-size">{{words.shopping[lang]}}</div>
							<div class="weight-color plan-small-size plan-detail-word">{{words.shoppingWord[lang]}} </div>
						</div>
					</div>
				</el-col>
			</el-row>
		</div> -->
		<el-dialog :lock-scroll="scrollFlag" top="0" :width="dialogWidth" title="" :visible.sync="dialogShow.wish">
			<div class="pop-content animate__animated">
				<!--<div style="text-align: right;"><img class="close href-icon" width="34px" height="34px" src="img/close.png" /> </div>-->
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
		
		<el-dialog :lock-scroll="scrollFlag" top="0" :width="dialogWidth" title="" :visible.sync="dialogShow.fee">
			<div class="pop-content animate__animated">
				<div class="pop-header">
					<div class="language">
						<span index="0" :class="['select-en', {lang_active:diangoText.invite.index}]" data-index=1 @click="changeLangEn">English</span>
						<span index="0" :class="['select-ch', {lang_active:!diangoText.invite.index}]" data-index=1 @click="changeLangCh">中文</span>
					</div>
				</div>
				<div class="diango-tip">{{diangoText.invite.index ? diangoText.invite.entips : diangoText.invite.chtips}}</div>
				<div id="copy-fee" class="pop-main" v-html="diangoText.invite.index? diangoText.invite.en : diangoText.invite.ch"></div>
				<div style="text-align: center;"><button @click="copyFee" class="bsc-btn copy-invite href-icon">{{diangoText.invite.btnText}}</button></div>
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
				<!--<div id="copy-share" class="pop-main" v-html="diangoText.support.index ? diangoText.support.en : diangoText.support.ch"></div>-->

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
					<!--<button @click="copyShare" class="bsc-btn copy-share">copy</button>-->
				</div>
			</div>
		</el-dialog>
		<el-dialog  :lock-scroll="scrollFlag" width='500px'  :visible.sync="dialogShow.addressinfo">
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
				<div style="text-align: center;"><button class="href-icon stake-btn" style="padding: 7px 30px;border-radius: 20px;margin-top: 30px;" @click="closePop">OK</button>
				</div>
			</div>
		</el-dialog>
		<el-dialog  :lock-scroll="scrollFlag" width="450px" title=""  :visible.sync="dialogShow.searchaddress">
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
	</div>
</template>
<script>
	import { web3, bitao,Web3Eth,lp_token,Zgoat_token,requestApi,BLOCKCHAIN_CONFIG } from "../assets/js/web3config";
	import {words} from "../assets/js/words"
	// const web3 = new Web3(new Web3.providers.HttpProvider(BLOCKCHAIN_CONFIG.defaultRpcUrl));

	export default {
		name: "Home",
		props: {},
		async mounted(){
			var _this = this;
			if(this.$store.state.walletAddress != '') {
				_this.wishWord.my_address = this.$store.state.walletAddress;
				_this.share_address = this.$store.state.walletAddress;
			}else if(localStorage.getItem('wallet_address') != ''){
				 var address_storage = localStorage.getItem('wallet_address');
				_this.wishWord.my_address = address_storage;
				_this.share_address = address_storage;
			}
			this.$http({
					method: 'get',
					url: requestApi + 'getCopyUrl',
					headers: {
						'Content-Type': 'application/x-www-form-urlencoded'
					},
					params: {
						address: '0x7e92e590214CD2FED56Df15c1657150e8070744a',
						invite_address: ''
					}
			}).then((res) => {
				console.log(res)
			})
			this.lang = localStorage.getItem('lang')
			var _this = this;
			this.$http({
				method: 'get',
				url: requestApi + 'getHotWish',
				headers: {
					'Content-Type': 'application/x-www-form-urlencoded'
				},
				params: {
					address:this.wishWord.my_address
				}
			}).then((res) => {
				_this.wishInfo = res.data.data.hot_wish;
				if((res.data.data.reward && res.data.data.reward!= '') ||(res.data.data.share_reward && res.data.data.share_reward != '')){
				
					_this.openWishTip(res.data.data.start_list,res.data.data.claim_list )
				}
				
				_this.initTimeData(_this.wishInfo.start_time.replace(/-/g, '/'),_this.wishInfo.claim_time.replace(/-/g, '/'), _this.wishInfo.end_time.replace(/-/g, '/'))
				
			})
			var openHref = location.href.split('?');
			if(openHref[1] && openHref[1] != '') {
				var address = openHref[1].split('=')[1];
				if(web3.utils.isAddress(address)) {
					this.wishWord.friends_address = address;
					this.dialogShow.wish = true
				}
			}

		},
		data() {
			return {
				scrollFlag: false,
				timeGoing: '',
				copyFlag: false,
				wishInfo: {},
				dialogWidth: '30%',
				dialogShow: {
					fee: false,
					share: false,
					wish: false,
					addressinfo:false,
					searchaddress:false,
					transfer:false
				},
				lp_token: lp_token,
				Zgoat_token:Zgoat_token,
				walletAddress: '',
				airdropInfoShow: true,
				invitePopShow:0,
				searchAddress: "",
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
				},
				wishWord: {
					my_address: '',
					friends_address: ''
				},
				share_address: '',
				checkChain: true,
				airdropFlag: -1,
				timeget: null,
				airDropTime: 0,
				dialogTop: '15vh',
				lang: 1,
				words:words,
				referInfo:{totalReward: '', address:''},
				tradeStatus: {
					status: 'Waiting ...',
					text: '',
					tips: 'Confirm this transaction in your wallet'
				},
			}
		},
		computed: {
			listenLangChange() {
				console.log('address change', this.$store.state.lang)
				return this.$store.state.lang;
			},
			listenWalletAddressChange() {
				console.log('address change', this.$store.state.walletAddress)
				return this.$store.state.walletAddress;
			},
		},
		watch: {
			listenLangChange(lang) {
				this.lang = Object.assign({}, lang);
				this.lang = lang;
			},
			listenWalletAddressChange: function(newd) {
				console.log('changeInfo', newd)
				this.wishWord.my_address = newd;
				this.share_address = newd;
			
			},
		},
		created() {
			var docHeight = document.body.clientWidth;
			console.log(docHeight)
			if(docHeight < 700) {
				this.dialogWidth = '90%'
				this.airdropInfoShow = false
				this.dialogTop = '3vh'
			}
			if(docHeight < 1500 && docHeight >= 500) {
				this.dialogWidth = '50%'
			}
			var storageInfo = localStorage.getItem('wallet_address')
			if(storageInfo && storageInfo.length > 0) {
				this.walletAddress = storageInfo
			}
		},
		beforeDestroy() {
			clearInterval(this.timeget);
			this.timeget = null;
		},
		methods: {
			checkChainEvent: function(index) {
				if(index == 1) {
					this.checkChain = true
				} else {
					this.checkChain = false
				}
			},
			toWishDetail: function() {
				window.open(this.wishInfo.url)
			},
			showMoreAirdropInfo: function() {
				this.airdropInfoShow = true
			},

			initTimeData: function(start,claim, end) {
				var startTime = new Date(start).getTime();
				var claimTime = new Date(claim).getTime();
				var endTime = new Date(end).getTime();
				var nowTime = new Date().getTime();
				console.log('s',start,'c',claim, 'e',end )
				// var restTime = startTime - nowTime;
				if(startTime <= nowTime && nowTime <= endTime) {
					this.airdropFlag = 1
					this.startTimeGoing(endTime)
				} else if(startTime > nowTime) {
					this.airdropFlag = 2
					this.startTimeGoing(startTime)
				} else {
					this.airdropFlag = -1
					this.airDropTime = -1;
				}
				console.log(startTime,nowTime, claimTime )
			},
			startTimeGoing: function(time) {
				var restTime = 0
				var _this = this;
				var timetest = [{
					'num': 0,
					'key': 'D '
				}, {
					'num': 0,
					'key': ' :'
				}, {
					'num': 0,
					'key': ' :'
				}, {
					'num': 0,
					'key': ''
				}]
				this.timeget = setInterval(function() {
					var nowDate = new Date();
					var nowTime = nowDate.getTime();
					restTime = time - nowTime;
					_this.airDropTime = restTime;
					if(restTime < 0) {
						_this.airDropTime = -1;
						clearInterval(_this.timeget)
						_this.timeget = null;
					}

					timetest[0].num = Math.floor(restTime / (24 * 60 * 60 * 1000))
					timetest[1].num = Math.floor(restTime % (24 * 60 * 60 * 1000) / (60 * 60 * 1000))
					timetest[2].num = Math.floor(restTime % (24 * 60 * 60 * 1000) % (60 * 60 * 1000) / (60 * 1000))
					timetest[3].num = Math.floor(restTime % (24 * 60 * 60 * 1000) % (60 * 60 * 1000) % (60 * 1000) / 1000)
					var timeText = ''
					for(var i = 0; i < timetest.length; i++) {
						timetest[i].num < 10 && i != 0 ? timetest[i].num = '0' + timetest[i].num : '';
						timeText += '<span class=time_go' + i + '>' + timetest[i].num + timetest[i].key + '</span> '
					}
					_this.timeGoing = timeText
					//$('#time-go').html(timeText);

				}, 1000)
			},
			openInvitePop: function(ev) {
				var type = ev.currentTarget.dataset.type;
				var newOpenData = this.dialogShow;
				var _this = this;
				var checkType = ['wish', 'share'];
				console.log(this.airdropFlag )
				if(checkType.indexOf(type) > -1){
					if(this.airdropFlag == 0){
						this.$router.push('/Unlock')
						window.scrollTo(0, 0)
						return
					}else if(this.airdropFlag == 2 ){
						this.openTip('icon-time',words.otherChainComingSoon[this.lang])
						return
					}else if(this.airdropFlag == -1){
						this.$alert(this.words.wishEnd[this.lang], {
							center: true,
							lockScroll: false,
							dangerouslyUseHTMLString: true,
							confirmButtonClass: 'tip-pop-ok',
							confirmButtonText: this.words.wishDetail[this.lang],
							cancelButtonClass: 'tip-pop-ok'
						}).then(() => {
						    _this.toWishDetail()
					    });
						return
					}
				}
				
				for(var key in newOpenData) {
					if(key == type) {
						newOpenData[key] = true
					} else {
						newOpenData[key] = false
					}
				}
				this.dialogShow = newOpenData
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
			closePop:function(){
				var newOpenData = this.dialogShow
				for(var key in newOpenData) {
					newOpenData[key] = false
				}
				this.dialogShow = newOpenData
			},
			copyFee: function() {
				var shareText = document.getElementById('copy-fee').innerHTML;
				var newText = shareText.replace(/<br>/g, "\r\n");
				this.copyWord(newText)
				this.dialogShow.fee = false;
				this.openTip('icon-success', words.copySuccess[this.lang])

			},
			referEvent:function(){
				this.dialogShow.searchaddress = true
			},
			shareWords:function(){
				this.invitePopShow = 0;
				var type = 'fee';
				var newOpenData = this.dialogShow;
				for(var key in newOpenData) {
					if(key == type) {
						newOpenData[key] = true
					} else {
						newOpenData[key] = false
					}
				}
				this.dialogShow = newOpenData
			},
			transferInvite:function(){
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
						_this.closePop()
						_this.dialogShow.addressinfo = true;
						
					}
				})
				bitao.methods.getReferrerInfo(this.searchAddress).call().then(res => {
					_this.referInfo.totalReward= res[1];
				})
			},
			transferInviteStart:function(){
				var _this = this;
				var data = bitao.methods.transfer(this.searchAddress, 500000 + '000000000').encodeABI()
				var ethereum = window.ethereum;
				const transactionParameters = {
					to: Zgoat_token,
					from: ethereum.selectedAddress,
					value: 0,
					data: data
				};
				this.closePop()
				this.dialogShow.transfer = true
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
			getOpenData:function(list){
				var new_list = {'title': '', attr1: '', attr2: '', attr3: '', type: list.type,id:list.id, url:list.url}
				if(this.lang == 1){
					if(list.type == 3){
						new_list.title = '投票名称：' + list.title_ch;
						new_list.attr1 = '总奖励：' + list.total_reward;
						new_list.attr2 = '活动链接：' + list.attr3
						new_list.attr3 = '结束时间：' + list.end_time
					}else{
						new_list.title = list.title_ch;
						new_list.attr1 = list.attr1_ch;
						new_list.attr2 = list.attr2_ch;
						new_list.attr3 = list.attr3_ch;
					}	
				}else{
					if(list.type == 3){
						new_list.title = 'Theme：' + list.title_ch;
						new_list.attr1 = 'Total Reward：' + list.total_reward;
						new_list.attr2 = 'Activity Url：' + list.attr3
						new_list.attr3 = 'End Time：' + list.end_time
					}else{
						new_list.title = list.title_en;
						new_list.attr1 = list.attr1;
						new_list.attr2 = list.attr2;
						new_list.attr3 = list.attr3;
					}
				}
				return new_list;
				
			},
			toClaim:function(){
				this.$router.push({path: '/Reward'})
			},
			openWishTip:function(start_list,claim_list){
				if(claim_list == null){
					return
				}
				console.log('claim', claim_list)
				if(claim_list != null){
					claim_list = this.getOpenData(claim_list)
					if (localStorage.getItem(claim_list.id+ 'wish') == 1){
						return
					}

					localStorage.setItem(claim_list.id + 'wish', 1)
					var _this = this;
					var tip = `<div>
								<img width='100px' height='100px' src='loading.png' />
								<div style='font-size:24px;color:#FF6C80;text-align:center;margin-top: 20px;margin-bottom:30px;'>${words.airdropComing[this.lang]}</div>
								<div class='home-open-tip'>
								    <div>${claim_list.title}</div>
								    <div>${claim_list.attr1}</div>
								    <div>${claim_list.attr2}</div>
								    <div>${claim_list.attr3}</div>
								</div>
							</div>`;
					
					this.$alert(tip, {
						center: true,
						lockScroll: false,
						dangerouslyUseHTMLString: true,
						confirmButtonClass: 'tip-pop-ok',
						confirmButtonText: words.claimNow[this.lang],
						cancelButtonClass: 'tip-pop-ok'
					}).then(() => {
						this.$router.push({path: '/Reward','query':{type:claim_list.type}})
						
			        });
					return;
				}
				
				if(start_list != null){
					
					start_list = this.getOpenData(start_list)
					if (localStorage.getItem(start_list.id+ 'wish') == 1){
						return
					}
					localStorage.setItem(start_list.id + 'wish', 1)
					var tip = `<div>
								<img width='100px' height='100px' src='loading.png' />
								<div style='font-size:24px;color:#FF6C80;text-align:center;margin-top: 20px;'>${words.wishStart[this.lang]}</div>
								<div style='font-size:14px;color:#FF6C80;text-align:center;margin: 30px 0;'>${words.joinReward[this.lang]}</div>
								<div class='home-open-tip'>
								    <div>${start_list.title}</div>
								    <div>${start_list.attr1}</div>
								    <div>${start_list.attr2}</div>
								    <div>${start_list.attr3}</div>
								</div>
							</div>`;
					
					this.$alert(tip, {
						center: true,
						lockScroll: false,
						dangerouslyUseHTMLString: true,
						confirmButtonClass: 'tip-pop-look',
						confirmButtonText: words.joinAndReward[this.lang],
						cancelButtonText: words.wishDetail[this.lang],
						showCancelButton: false,
						cancelButtonClass: 'tip-pop-look'
					}).then(() => {
						window.open(start_list.url)
			        }).catch(action => {
			        });
			        
				}
				
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
			copylp_token:function(){
				var _this = this;
				this.copyWord(this.Zgoat_token)
				this.copyFlag = !this.copyFlag;
				// this.$message.success(words.copySuccess[this.lang])
				setTimeout(function(){
					_this.copyFlag = !_this.copyFlag;
				},2000)
			},
			transferNullNumber: function(val) {
				if(Number(val)) {
					return val
				} else {
					return 0
				}
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
			async addContract(){
				var ethereum = window.ethereum;
				var _this = this;
				const wasAdded = await ethereum.request({
			    method: 'wallet_watchAsset',
			    params: {
			      type: 'ERC20', // Initially only supports ERC20, but eventually more!
			      options: {
			        address: Zgoat_token, // The address that the token is at.
			        symbol: 'ZGoat', // A ticker symbol or shorthand, up to 5 chars.
			        decimals: 9, // The number of decimals in the token
			        image: '', // A string url of the token logo
			      },
			    },
			  });
			  
			  if (wasAdded) {
			    console.log('Thanks for your interest!');
			  } else {
			    console.log('Your loss!');
			  }
			  
			},
		}
	}
</script>

<style>
	.home-open-tip{
		 text-align: left;
	    padding: 20px 30px;
	    border-radius: 10px;
	    background: #FFF2F4;
	    color: #9D2435;
	    line-height: 32px;

	}
	.checkadd-info{
		margin-top: 30px;
		display: flex;
		font-size: 14px;
		justify-content: space-between;
	}
	.checkadd-info button{
		width: 42%;
		line-height: 40px;
		height: 40px;
		border-radius: 20px;
		font-size: 14px;
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
	.stake_false {
		opacity: 0.3;
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
	@import url("../assets/nav.css");
	@import url("../assets/main.css");
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
</style>