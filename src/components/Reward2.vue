<template>
	<div class="reward">
		<div class="reward-main" style="width: 100%;padding:64px 10px;background: #FFF8F9;display: flex;justify-content: center;flex-direction: column;align-items: center;">
			
			<el-col :xs="24"  :sm='20' :lg="18" style="max-width: 1240px;display: flex;justify-content: space-between;flex-wrap: wrap;">
				
				<el-col :xs="24" :sm='10'>
					
					<div class="claim-info" style="flex-direction: column;">
						<div style="display: flex;justify-content: space-between;width: 100%;align-items: center;">
							<span class="light-color" style="font-size: 16px;font-weight: 300;">{{words.unlockZgoat[lang]}}</span>
							<button @click="getClaim" class="href-icon claim-btn">{{words.claim[lang]}}</button>
						</div>
						<div style="font-size: 34px;color:#FF6C80;text-align: left;width: 100%;font-weight: bold;">{{transferUnit(walletInfo.claim_num , 1e9 , 2)}}</div>
					</div>
				</el-col>
				<el-col :xs="24" :sm='13'  style="position: relative;" >
					<div class="claim-info" style="flex-direction: column;">
						<div class="earn-single" >{{words.inviteRate[this.lang]}}</div>
						
						<div class="earn-data">
							<div>
								<span>{{words.networkTopRate[this.lang]}}</span>
								<span style="position: relative;font-weight: bold;font-size: 34px;">{{topOneEarn}}{{words.times[lang]}}</span>
							</div>
							<div>
								<span>{{words.myRate[this.lang]}}</span>
								<span style="position: relative;font-weight: bold;font-size: 34px;">{{walletInfo.returnEarn}}{{words.times[lang]}}</span>
							</div>
							<div>
								<span style="">{{words.referrerRate[this.lang]}}</span>
								<span style="position: relative;font-weight: bold;font-size: 34px;">{{walletInfo.referEarn}}{{words.times[lang]}}</span>
							</div>
						</div>
					</div>
				</el-col>
			</el-col>
			
			<el-col :xs='24' :sm='20' :lg="18" style='border: solid 1px #FF6C80;max-width: 1240px;background: #FF6C80;border-radius: 16px;overflow: hidden;'>
				<div class="information" style="">
					<div v-if="walletAddress == ''" style="color: #9D2435;display: flex;align-items: center;">
						<span style="color: #9D2435;font-size: 18px;margin-right: 5px;" class="icontip icon-alert"></span>
						<span>{{words.walletPleaseTip[lang]}}</span>
					</div>
					<div v-else-if="showInfo">{{walletAddress}}</div>
					<div v-else>
						{{walletAddress.substring(0,4) + '...' + walletAddress.substring(walletAddress.length-4,walletAddress.length)}}
					</div>
					<button class="checkMore href-icon " @click="checkMoreAddressInfo" style="">{{words.checkReferrer[lang]}}</button>
				</div>

				<div style="width: 100%;font-size: 0.8rem;">
					<el-col :xs="24" :sm="12" class='reward-info'>
						<div>
							<span>{{words.totalReward[lang]}}</span>
							<span>{{getAllreward()}} ZGoat</span>
						</div>

						<div>
							<span v-popover:popover2 style="display: flex;align-items: center;position: relative;">
								<span style="margin-right: 5px;">{{words.consense[lang]}}</span>
								<span class="tip-icon">
									<span class="iconfont icon-t"></span>
									<el-popover popper-class='popover-word' style="word-break: break-word;" ref="popover2" placement="bottom" title="" width="200" trigger="click" :content="words.consTip[lang]">
									</el-popover>
								</span>
							</span>
							<div>
								<span>{{walletInfo.point}}</span>
							</div>
						</div>
						<div style="overflow: ellipsis;word-spacing: initial;">
							<span>{{words.referrer[lang]}}</span>
							<span v-if="walletInfo.referrer == ''">No Referrer</span>
							<span v-else-if="showInfo">{{walletInfo.referrer}}</span>
							<span v-else>{{walletInfo.referrer.substring(0,6) + '...' + walletInfo.referrer.substring(walletInfo.referrer.length-6,walletInfo.referrer.length)}}</span>
						</div>
						<div>
							<span>{{words.referrerReward[lang]}}</span>
							<span>{{walletInfo.refer_reward}} ZGoat</span>
						</div>
					</el-col>

					<el-col :xs="24" :sm="12" class='lp-info'>
						<div class="lp-title">
							<div style="display: flex;align-items: center;">
								<img src="../assets/img/favicon.png" />
								<img style="position: relative;left: -13px;" src="../assets/img/bnb.png" />
								<span>ZGoat-BNB</span>
								<span class="tip-icon" v-popover:popover6>
									<span class="iconfont icon-t"></span>
									<el-popover popper-class='popover-word' style="word-break: break-word;" ref="popover6" placement="bottom" title="" width="170" trigger="click" :content="words.stakeAdvice[lang]"></el-popover>
								</span>
							</div>
							
						</div>
						<div class="lp-data">
							<el-col :xs="24" :sm="8">
								<span class="event-name">{{words.staked[lang]}}</span>
								<span>{{transferUnit(walletInfo.lp_stake,1e18, 4)}} Lp</span>
							</el-col>
							<el-col :xs="24" :sm="8">
								<span class="event-name">
									<span>{{words.unlockSpeed[lang]}}</span>
								<span class="tip-icon" v-popover:popover4>
										<span class="iconfont icon-t"></span>
								<el-popover popper-class='popover-word' style="word-break: break-word;" ref="popover4" placement="bottom" title="" width="170" trigger="click" :content="words.speedTip[lang]"></el-popover>
								</span>
								</span>
								<span>{{walletInfo.lock_speed}}</span>
							</el-col>
							<el-col :xs="24" :sm="8">
								<span class="event-name">
									<span>{{words.lockedZgoat[lang]}}</span>
									<span class="tip-icon" v-popover:popover3>
										<strong></strong><span class="iconfont icon-t"></span>
										<el-popover popper-class='popover-word' style="word-break: break-word;" ref="popover3" placement="bottom" title="" width="170" trigger="click" :content="words.lockedZgoatTip[lang]"></el-popover>
									</span>
								</span>
								<span>{{transferUnit(walletInfo.unlocked_num, 1e9, 2)}} ZGoat</span>
							</el-col>
							<el-col :xs="24" :sm="24" style="display: flex;flex-wrap: nowrap;flex-direction: row;margin-top: 30px;">
								<el-col :xs="8" :sm="8" class='lp-btns'><button class="href-icon" @click="getLP"><a class="add-LP ">{{words.getLp[lang]}}</a></button></el-col>
								<el-col :xs="8" :sm="8" class='lp-btns'><button class="href-icon" @click="deposit">{{words.stake[lang]}}</button></el-col>
								<el-col :xs="8" :sm="8" class='lp-btns'><button class="href-icon unstake-btn" @click="unstake">{{words.unstake[lang]}}</button>
								</el-col>
							</el-col>
						</div>
					</el-col>
				</div>
			</el-col>
		</div>

		<el-col :xs="24" :sm="20" :lg="18" id='wish-content' class="wish-list" style='max-width: 1240px;'>
			<div class="wish-bar ">
				<button :class="checkMeta == 1 ? 'active-check' : ''" @click="checkMetaIndex(1)">{{words.wishReward[lang]}}</button>
				<button :class="checkMeta == 2 ? 'active-check': ''" style="margin-left: 25px;" @click="checkMetaIndex(2)">{{words.market[lang]}}</button>
				<!-- <button :class="checkMeta == 3 ? 'active-check': ''" style="margin-left: 25px;" @click="checkMetaIndex(3)">{{words.vote[lang]}}</button> -->
			</div>
			<el-col v-if="wishList.length == 0">
				<div style="margin-top: 60px;opacity: 0.5;" class="loading-trade">
					<svg t="1625624656279" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4499" width="48" height="48">
						<path d="M538.5344 266.4448a133.12 133.12 0 1 1 133.12-133.12 133.4272 133.4272 0 0 1-133.12 133.12zM255.0144 372.1984a121.6768 121.6768 0 1 1 121.6768-121.6768 121.856 121.856 0 0 1-121.6768 121.6768zM134.72 647.424a107.3664 107.3664 0 1 1 107.3664-107.264A107.52 107.52 0 0 1 134.72 647.424z m120.32 272.4608a90.9824 90.9824 0 1 1 90.9824-90.9824A91.1616 91.1616 0 0 1 255.04 919.8848zM538.5344 1024a79.36 79.36 0 1 1 79.36-79.36 79.36 79.36 0 0 1-79.36 79.36z m287.6928-134.144a64.1792 64.1792 0 1 1 64.1792-64.1792 64.3584 64.3584 0 0 1-64.1792 64.1792z m117.76-296.704a52.6336 52.6336 0 1 1 52.6592-52.6336 52.608 52.608 0 0 1-52.6336 52.6336z m-158.72-338.7136a40.96 40.96 0 1 1 12.0064 28.8512 40.5248 40.5248 0 0 1-12.0064-28.8512z" p-id="4500" fill="#FF6C80"></path>
					</svg>
				</div>
				<div style="width: 100%;padding:50px 0;text-align: center;color: #ccc;">{{requestStatus}}</div>
			</el-col>
			<el-col v-for="(row,index) in wishList" :key="index" :xs="24" :sm="12" >
				<div class="wish-list-main" v-if="row.type == checkMeta && checkMeta != 3">
					<div class="wish-coder href-icon" @click="toWishDetail(row.id)">{{lang == 0 ? row.title_en : row.title_ch}}</div>
					<div class="wish-content">
						<div>{{lang ==0 ? row.attr1: row.attr1_ch}} </div>
						<div>{{lang ==0 ? row.attr2: row.attr2_ch}}</div>
						<div v-html="lang ==0 ? row.attr3: row.attr3_ch"></div>
						<div class="time-going">
							<div v-if="row.effecive == 2">{{words.startDown[lang]}}</div>
							<div v-if="row.effecive == 1">{{words.claimDown[lang]}}</div>
							<div v-html="timeArray[row.id]"></div>
						</div>
						<div style="text-align: center;">
							<button :data-id="row.id" :class="row.effecive == 1 ? 'wish-claim' : 'no-active-btn'"  @click.stop="claimReward">
								<span v-if="row.effecive == 1">{{words.wishClaim[lang]}}</span>
								<span v-else-if="row.effecive == 0">{{words.wishClaimEnd[lang]}}</span>
								<span v-else-if="row.effecive == 2">{{words.comingSoon[lang]}}</span>
							</button>
						</div>
					</div>
				</div>
				<div class="wish-list-main" v-if="row.type == checkMeta && checkMeta == 3">
					<div class="wish-coder href-icon" @click="toWishDetail(row.id)">{{lang == 0 ? row.title_en : row.title_ch}}</div>
					<div class="wish-content">
						<div>{{words.totalReward[lang]}}：{{row.total_reward}}</div>
						<div>{{words.voteJoinStatus[lang]}}： {{row.stake ? words.voteStakeStatus[lang] : words.voteUnStakeStatus[lang]}}</div>
						<div>{{words.voteUrl[lang]}}：<a target="_blank" :href="row.attr3">{{lang == 1 ? '点击参与': 'Click here' }}</a></div>
						<div class="time-going">
							<div v-if="row.effecive == 2">{{words.startDown[lang]}}</div>
							<div v-if="row.effecive == 1">{{words.claimDown[lang]}}</div>
							<div v-html="timeArray[row.id]"></div>
						</div>
						<div style="text-align: center;">
							<button :data-id="row.id" :class="row.effecive == 1 ? 'wish-claim' : 'no-active-btn'"  @click.stop="claimReward">
								<span v-if="row.effecive == 1">{{words.wishClaim[lang]}}</span>
								<span v-else-if="row.effecive == 0">{{words.wishClaimEnd[lang]}}</span>
								<span v-else-if="row.effecive == 2">{{words.comingSoon[lang]}}</span>
							</button>
						</div>
					</div>
				</div>
			</el-col>
			
		</el-col>
		<el-col :xs="24" :sm="16">
		</el-col>
		<!-- <div class="clear-zero">
			<div class="clear-zero-title" style="">{{words.eatReward[lang]}}</div>
			<el-col :xs="24" :sm="16" class="zero-main">
				<div class="clear-zero-item">
					<div v-if="!showInfo" class="dot" style="background-color: #FF6C80;border: solid 2px #fff;"></div>
					<div>{{words.launchPrice[lang]}}: $0.00001</div>
					<div>{{words.estimate[lang]}}: 100BNB</div>
					<div>{{words.finishing[lang]}}: 45.24%</div>
					<button class="rule-btn href-icon" @click="openZeroTip">{{words.rewardsRuleBtn[lang]}}</button>

				</div>
				<div class="clear-zero-item">
					<div v-if="!showInfo" class="dot"></div>
					<div>{{words.launchPrice[lang]}}: $0.0001</div>
					<div>{{words.estimate[lang]}}: 100BNB</div>
					<div>{{words.finishing[lang]}}: 0%</div>
					<button class="coming-btn href-icon" @click="openTip('icon-time',words.otherChainComingSoon[lang])">{{words.comingSoon[lang]}}</button>

				</div>
				<div class="clear-zero-item">
					<div v-if="!showInfo" class="dot"></div>
					<div>{{words.launchPrice[lang]}}: $0.001</div>
					<div>{{words.estimate[lang]}}: 100BNB</div>
					<div>{{words.finishing[lang]}}: 0%</div>
					<button class="coming-btn href-icon" @click="openTip('icon-time',words.otherChainComingSoon[lang])">{{words.comingSoon[lang]}}</button>

				</div>
			</el-col>

			<div class="lines-dot">
				<el-col :xs="24" :sm="16" class="zero-main" style="margin: 0;">
					<div class="clear-zero-item">
						<div class="dot" style="background-color: #FF6C80;border: solid 2px #fff;"></div>
					</div>
					<div class="clear-zero-item">
						<div class="dot"></div>
					</div>
					<div class="clear-zero-item">
						<div class="dot"></div>
					</div>
				</el-col>
			</div>
		</div> -->
		<el-dialog @close='closePop' :lock-scroll="scrollFlag" width='500px' v-if='invitePopShow == 1' :visible="invitePopShowAble">
			<div class="pop-content col-xs-11 col-sm-4">
				<div class="pop-header">
					<div class="referrer-no">{{words.checkTitle[lang]}}</div>
					<!--<div v-else class="diango-tip">Referrer's BSC address</div>-->
				</div>
				<div class="search-info">
					<div class="address-info">
						<div>
							<div>{{words.totalReward[lang]}}</div>
							<div class="address-reward">{{transferNullNumber(searchInfo.totalReward)}} ZGoat</div>
						</div>
						<div>
							<div>{{words.consense[lang]}}</div>
							<div class="address-reward">{{transferNullNumber(searchInfo.contribution)}}</div>
						</div>
					</div>
				</div>
				<!--v-if="referInfo.bonus"-->
				<div class="refer-info" v-if="referInfo.bonus">
					<div style="font-weight: bold;margin-bottom: 12px;">{{words.referrerInfo[lang]}}</div>
					<div style="margin-bottom: 20px;">{{referInfo.bonus.address}}</div>
					<div class="address-info">
						<div>
							<div>{{words.referrerTotalReward[lang]}}</div>
							<div class="address-reward">{{transferNullNumber(referInfo.totalReward)}} ZGoat</div>
						</div>
					</div>
				</div>
				<div class="refer-info " v-else>
					<div style="font-weight: bold;margin-bottom: 16px;text-align: center;line-height: 80px;">{{words.noReferrer[lang]}}
					</div>
				</div>

				<div style="text-align: center;"><button class="href-icon close-diango diango-btn" @click="closePop">OK</button>
				</div>
			</div>
		</el-dialog>
		<el-dialog @close='closePop' :lock-scroll="scrollFlag" width="450px" title="" v-if='invitePopShow == 2' :visible="invitePopShowAble">
			<div class="pop-content col-xs-11 col-sm-4">
				<div class="pop-header">
					<div class="diango-tip">{{words.checkReferrerTip[lang]}}</div>
				</div>

				<div class="address-input" style="margin-top: 0;">
					<input :placeholder="words.receiveInput[lang]" v-model="searchAddress" />
				</div>
				<div style="text-align: center;"><button id="loading-check" class=" href-icon diango-btn" @click="inviteInfoRequest(0)">{{words.checkBtn[lang]}}</button></div>
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
				<div style="text-align: center;"><button @click="copyFee" class="bsc-btn copy-invite">copy</button>
				</div>
			</div>
		</el-dialog>
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
				<button :disabled="stakeInput==0" @click="unstakeSubmit" :class="['href-icon stake-btn',{stake_false:stakeInput==0} ]">{{words.unstake[lang]}}</button>
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
		requestApi,
		
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
		name: "Reward",
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

			this.initWebData()
			if(docHeight < 1500 && docHeight >= 500) {
				this.dialogWidth = '50%'
			}
			var address_now = localStorage.getItem('wallet_address')
			if(this.$store.state.walletAddress != '') {
				console.log('address', this.$store.state.walletAddress)
				this.walletAddress = this.$store.state.walletAddress
				this.initData()
				this.inviteInfoRequest(1)
			}else if(address_now != ''){
				this.walletAddress = address_now
				this.initData()
				this.inviteInfoRequest(1)
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
				walletInfo: {
					reward: '--',
					point: '--',
					referrer: '',
					refer_reward: '--',
					lp_stake: '--',
					lock_speed: '--',
					unlocked_num: '--',
					claim_num: '--',
					returnEarn:'0',
					referEarn: '0'
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
				checkMeta: 1,
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
			checkMetaIndex: function(flag) {
				this.checkMeta = flag;
			},
			updateInfo: function() {
				clearInterval(this.getTimeSpeed)
				this.getTimeSpeed = null;
				clearInterval(this.timeInter)
				this.timeInter = null

				this.initData()
				this.inviteInfoRequest(1)
			},
			getAllreward:function(){
				var allNum = parseInt(this.walletInfo.web_reward)
				return allNum ? allNum: 0
			},
			transferUnit: function(num, uit, fixed) {

				if(num === '--') return '--'

				var value = num / uit;
				return value.toFixed(fixed)
			},
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
					var wishList = res.data.data.wishList
					 
					_this.topOneEarnCount = res.data.data.topEarn.rate;
					 console.log('top1.', res.data.data.topEarn.rate)
					_this.wishList = wishList;
					if(_this.$route.query.type){
						var wish_location = document.getElementById('wish-content').offsetTop
						console.log('distance', wish_location)
						window.scrollTo(0, wish_location)
						_this.checkMeta = _this.$route.query.type
					}
					_this.initTimeData(wishList)
				}).catch(res => {
					console.log(res)
					_this.requestStatus = 'request fail'
				})
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
				// _this.walletInfo.reward = (result.referAmount / 1e9).toFixed(2);
				_this.walletInfo.unlocked_num = result.lockNum;
				_this.walletInfo.claim_num = result.claimAble;
				_this.getShowSpeedData(result.speed, result.claimAble, result.lockNum);
				_this.walletInfo.tobeUseNum = result.unlockNum;
				var stakemin =  (result.lockNum /1e9 / 86400 / 100 / 3.6 ).toFixed(2) 
				var stakemax = (result.lockNum / 1e9 / 86400 / 100 ).toFixed(2)
				_this.words.adviceLp[0] = _this.words.adviceLp[0].replace('num1',stakemin)
				_this.words.adviceLp[0] = _this.words.adviceLp[0].replace('num2', stakemax)
				_this.words.adviceLp[1] = _this.words.adviceLp[1].replace('num1', stakemin)
				_this.words.adviceLp[1] = _this.words.adviceLp[1].replace('num2', stakemax)
				
				var topOneEarn =  _this.topOneEarnCount * (result.zgoat/(result.bnb*1e9)) 
				this.topOneEarn = topOneEarn > 1 ? parseInt(topOneEarn.toFixed(2)*100) + '%': '--'
				console.log('top1', topOneEarn)
				if(result.referCount != 0){
					var myEarn = result.referAmount/1e9 * (result.zgoat/(result.bnb*1e9)) / result.referCount;
					_this.walletInfo.returnEarn = myEarn > 1 ? parseInt(myEarn.toFixed(2)*100) + '%': '--';
					
				}
				if(refer_address != '0x0000000000000000000000000000000000000000'){
					bitao.methods.getReferrerInfo(refer_address).call().then(res => {
						var referEarn =  res[1]/1e9 * (result.zgoat/(result.bnb*1e9)) / res[0];
						_this.walletInfo.referEarn = referEarn > 1 ? parseInt(referEarn.toFixed(2)*100) + '%': '--';
					})
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
			checkMoreAddressInfo: function() {
				this.invitePopShow = 2;
				this.invitePopShowAble = true;
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
				console.log(stakeNum)
				var data = bitao.methods.stake(stakeNum).encodeABI();
				var ethereum = window.ethereum;
				const transactionParameters = {
					to: Zgoat_token,
					from: ethereum.selectedAddress,
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
					from: ethereum.selectedAddress,
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
			toWishDetail: function(id) {
				var urltext = this.wishList.filter(x => x.id == id)[0].url
				console.log(urltext)
				if(urltext != '') {
					window.open(urltext)
				}
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
						data[i]['effecive'] = 0
					} else if(nowDate <= data[i].endTime && nowDate >= data[i].claimTime) {
						data[i]['effecive'] = 1
					} else {
						data[i]['effecive'] = 2
					}

				}
				this.timeInter = setInterval(function() {

					var nowDate = new Date().getTime();
					for(var i = 0; i < data.length; i++) {
						if(nowDate > data[i].endTime) {
							go_time = -1
						} else if(nowDate <= data[i].endTime && nowDate >= data[i].claimTime) {
							go_time = data[i].endTime - nowDate //claim time
						} else {
							go_time = data[i].claimTime - nowDate //start tim
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
				_this.getUserVoteInfo(voteList)
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
			inviteInfoRequest: function(type) {
				var _this = this;
				var checkAdress = this.searchAddress;
				let loadingInstance1;
				if(type == 1) {
					checkAdress = this.walletAddress
				} else if(this.searchAddress.length > 42 || this.searchAddress.length < 40) {
					_this.openTip('icon-alert', words.addressFail[_this.lang])
					return
				} else {
					loadingInstance1 = this.$loading({
						target: '#loading-check',
						fullscreen: false,
					});
				}

				this.$http({
					method: 'get',
					url: requestApi + 'getInviteInfo',
					headers: {
						'Content-Type': 'application/x-www-form-urlencoded'
					},
					params: {
						address: checkAdress
					}
				}).then((response) => {
					if(loadingInstance1) loadingInstance1.close()
					_this.searchInviteInfo(response, type)
				}).catch((res) => {
					console.log(res)
					if(loadingInstance1) loadingInstance1.close()
					if(type != 1) _this.openTip('icon-alert', words.requestFail[_this.lang])

				})
			},
			searchInviteInfo: function(response, type) {

				var _this = this;
				var search_point = 0,
					refer_point = 0,
					refer_reward = 0,
					search_reward = 0;
				var data = response.data.msg;
				console.log(data.checkAdd.contribution, '///////////////////////')
				if(data.checkAdd.bonus) {
					search_reward = data.checkAdd.bonus.invite_reward;
					Number(data.checkAdd.wish_reward.total_num) ? search_reward += Number(data.checkAdd
						.wish_reward.total_num) * 1e9 : ''
					Number(data.checkAdd.wish_share.total_num) ? search_reward += Number(data.checkAdd
						.wish_share.total_num) * 1e9 : ''

					search_reward = (search_reward / 1e9).toFixed(2)

					if(data.checkAdd.contribution > 0) {
						search_point = (data.checkAdd.contribution / 1e18).toFixed(2)
					} else {
						search_point = 0
					}
				}

				if(data.referAdd.bonus) {
					refer_reward = data.referAdd.bonus.invite_reward;
					console.log(Number(data.referAdd.refer_reward.total_num))
					Number(data.referAdd.refer_reward.total_num) ? refer_reward += Number(data.referAdd
						.refer_reward.total_num) * 1e9 : '';
					Number(data.referAdd.refer_share.total_num) ? refer_reward += Number(data.referAdd
						.refer_share.total_num) * 1e9 : '';

					refer_reward = (refer_reward / 1e9).toFixed(2)
					if(data.referAdd.contribution > 0) {
						refer_point = (data.referAdd.contribution / 1e18).toFixed(2)

					} else {
						refer_point = 0
					}
				}
				console.log('reward', search_point)
				console.log('refer_reward', search_reward)
				if(type == 1) {
					this.walletInfo.web_reward = search_reward
					this.walletInfo.point = search_point
					this.walletInfo.refer_reward = refer_reward
					this.walletInfo.referrer = data.referAdd.bonus ? data.referAdd.bonus.address : ''

				} else {
					_this.referInfo = data.referAdd;
					_this.searchInfo = data.checkAdd;

					_this.referInfo.totalReward += refer_reward;
					_this.referInfo.contribution = refer_point;

					_this.searchInfo.totalReward += search_reward;
					_this.searchInfo.contribution = search_point;

					_this.invitePopShow = 1;
					_this.invitePopShowAble = true;
				}

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
		display: flex;
		flex-wrap: wrap;
		justify-content: center;
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
	
	.stake-btn {
		background: #FF6C80;
		color: #fff;
		width: 240px;
		height: 44px;
		line-height: 44px;
		text-align: center;
		border: none;
		font-size: 1rem;
		border-radius: 30px;
	}
	
	.stake_false {
		opacity: 0.3;
	}
	
	@import url("../assets/reward.css");
</style>