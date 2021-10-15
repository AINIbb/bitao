<template>
	<div>
		<el-row style="background: #FF6C80;padding: 80px 15px;color: #fff;display: flex;justify-content: center;">
			<el-col v-if="lang==1" :xs="24" :sm="18" style="text-align: left;line-height: 34px;">
				为了不断地进行市场推广，ZGoat产品在设计之初就考虑了诸多市场推广方案，包括：心愿单、空投、社群活动等等。空投的ZGoat由运营账号提供，各个社群的群主如果有意合作，可联系商务负责人进行对接。
			</el-col>
			<el-col v-else  :xs="24" :sm="18" style="text-align: left;line-height: 34px;">
				In order to keep ZGoat being hot topic, markeing schemes such as airdrop will keep carrying out without interruption. ZGoat marketing schemes is embeded in ZGoat application at the beginning of design, including: Wishlist, AirDrop, Community Activities and so on.The amount of ZGoat for airdrop is provided by the Marketing Management Account. Any community that has a good impression on ZGoat can make a win-win cooperation, contacts us as soon as possible. 
			</el-col>
		</el-row>
		<div style="display: flex;flex-direction: column;align-items: center;padding: 20px 15px;">
			<el-col class="coop-list" :xs="24" :sm="18">
				<div class="coop-header">{{lang == 1 ? '合作的基本要求': 'Basic cooperation requirements'}}</div>
				<div class="coop-content">
					<div><div class="coop-dot"><span></span></div>{{baseRequires[0][lang]}}</div>
					<div><div class="coop-dot"><span></span></div>{{baseRequires[1][lang]}}</div>
					<div><div class="coop-dot"><span></span></div>{{baseRequires[2][lang]}}</div>
				</div>
			</el-col>
			
			<el-col class="coop-list"  :xs="24" :sm="18">
				<div class="coop-header">{{lang == 1? '商务联系方式': 'Business Contact Information'}}</div>
				<div class="coop-content">
					<div><div class="coop-dot"><span></span></div>{{baseRequires[3][lang]}} <a style="color: #FF6C80;" target="_blank" href="https://t.me/zgoat.org">https://t.me/zgoat.org</a></div>
					<div><div class="coop-dot"><span></span></div>{{baseRequires[4][lang]}}</div>
				</div>
			</el-col>
		</div>
	</div>
</template>

<script>
	export default {
		name:'cooperate',
		async mounted() {
			this.lang = localStorage.getItem('lang')
		},
		data(){
			return{
				lang:1,
				baseRequires: [
					['community related crypto, Telegram group member ≥ 3000, or Twitter following ≥ 30000, or WeChat group member ≥ 300','社群为加密行业社群，电报人数>3000人，或推特关注量>3w人，或微信群>300人'],
					['Low threshold of airdrop participation','空投形式的参与门槛低'],
					['Entertainment','具备一定的娱乐性'],
					['Telegraph： ','电报：'],
					['WeChat: zgoat_org','微信：zgoat_org']
				]
			}
		},
		methods:function(){
			
		}
		
	}
</script>

<style scoped="scoped">
	.coop-list{
		    color: #9D2435;
		    font-size: 16px;
		    text-align: left;
		    position: relative;
		    background: #fff;
		    box-shadow: 0 0 10px rgb(253 167 167 / 40%);
		    margin-bottom: 20px;
		    border-radius: 15px;
		    top: -48px;
		
	}
	.coop-header{
		color: #8F7074;
		line-height: 57px;
		border-bottom: solid 1px #F0E1E2;
		padding: 0 25px;
	}
	.coop-content{
		padding: 25px;
		font-size: 14px;
		line-height: 32px;
	}
	.coop-content>div{
		display: flex;
		align-items: center;
	}
	.coop-dot{
		display: inline-block;
		    border: solid 1px #9D2435;
		    border-radius: 50%;
		    padding: 2px;
		    width: 5px;
		    height: 5px;
		    line-height: 1px;
		    text-align: center;
			margin-right: 8px;
	}
	.coop-dot span{
		display: inline-block;
		width: 5px;
		height: 5px;
		border-radius: 50%;
		background: #9D2435;
	}
</style>
