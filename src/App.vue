<template>
	<div id="app">
		<div class="nav-app" style="position: fixed;top: 0;z-index: 66;width: 100%;">
			<Nav></Nav>
		</div>
		<div class="main">
			<keep-alive><router-view></router-view></keep-alive>
		</div>
		<!-- <BottomTip v-if="showFlag"></BottomTip> -->
		<!-- <a id="showBuy" style="text-decoration: none;" target="_blank" :href="buyUrl"><button class="buyzgoat">{{lang == 1 ? '购买 ZGoat' : 'BUY ZGoat'}}</button></a> -->
	</div>
</template>

<script>
	import {Zgoat_token } from "./assets/js/web3config";
	import Nav from './components/Nav.vue'
	import BottomTip from './components/BottomTip.vue'
	export default {
		name: 'App',
		created() {
			if(localStorage.getItem('lang')){
				this.langIndex = localStorage.getItem('lang')
			}else{
				localStorage.setItem('lang', 1)
				this.$store.commit("SET_LANG", 1);
			}
			this.lang = localStorage.getItem('lang')
			var docHeight = document.body.clientWidth;
			if(docHeight < 700) {
				this.showFlag = false
			}
		},
		data(){
			return{
				showFlag:true,
				buyUrl: 'https://pancakeswap.finance/swap?outputCurrency=' + Zgoat_token,
			}
		},
		components: {
			Nav,
			BottomTip
		}
	}
</script>

<style>
	@font-face {
			font-family: poppins;
			src: url('assets/Poppins.ttf');
	}
	body,html {
		margin: 0;
		font-family: poppins;
		background: #FFF8F9!important;
	}
	span,div{
		word-break: break-word!important;
	}
	#app {
		font-family: Avenir, Helvetica, Arial, sans-serif;
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
		text-align: center;
		color: #2c3e50;
		word-wrap:break-word;
	}
	@font-face {
		font-family: "iconfont";
		/* Project id  S*/
		src: url('assets/iconfont.ttf') format('truetype');
	}
	.iconfont {
		font-family: "iconfont" !important;
		/*font-size: 24px;*/
		font-style: normal;
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
	}
	.icon-t:before {
	  content: "\e607";
	  font-size: 16px;
	  font-weight: 300;
	  
	  position: relative;
	  left: 4px;
	}
	.icon-copy:before{
		 color:#9D2435 ;
	    content: "\e642";
	    font-size: 20px;
	   
	}
	
	.icon-together:before {
	  content: "\e60c";
	  color: #FFC2CA;
	  font-size: 16px;
	}
	
	.icon-coin:before{
		content: '\e66c';
		color: #9D2435;
		font-size:20px ;
	}
	.icon-setting:before{
		content: '\e603';
		color: #9D2435;
		font-size:18px ;
	}
	.icon-redpacket:before{
		content: '\e6f4';
		color: #9D2435;
		font-size:20px ;
	}
	.icon-record:before{
		content: '\e628';
		color: #9D2435;
		font-size:18px ;
	}
	.icon-charge-record:before {
	  content: "\e6a1";
		color: #9D2435;
		font-size:20px ;
	}
	@font-face {
		font-family: "icontip";
		src: url("assets/icontip.ttf?t=1624420291843") format('truetype');
	}
	.icontip {
		font-family: "icontip" !important;
		font-size: 16px;
		font-style: normal;
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
	}
	.icon-alert {
		content: "\e7ca";
	}
	
	.icon-success {
		content: "\e655";
	}
	
	.icon-time {
		content: "\e602";
	}
	
	.main {
		/* width: 100%; */
		height: 100%;
		padding-left: 180px;
		margin-top: 80px;
		position: relative;
		font-family: poppins;
		background: #FFF8F9;
		padding-bottom: 30px;
	}
	
	@font-face {
		font-family: "icontip";
		src: url("assets/icontip.woff") format('woff');
	}
	
	.icontip {
		font-family: "icontip" !important;
		font-size: 4rem;
		font-style: normal;
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
		color: #FF6C80;
	}
	
	.icon-alert::before {
		content: "\e7ca";
	}
	
	.icon-success::before {
		content: "\e655";
	}
	
	.icon-time::before {
		content: "\e602";
	}
	
	.tip-text {
		color: #FF6C80;
		margin-top: 5px;
	}
	
	.tip-pop-ok {
		background-color: #FF6C80!important;
		height: 44px!important;
		width: 240px!important;
		border: none!important;
		border-radius: 67px!important;
		margin-top: 20px!important;
	}
	
	.tip-pop-ok:hover {
		background-color: #FF6C80;
		width: 240px;
		height: 44px;
		border: none;
		border-radius: 67px;
		margin-top: 20px;
	}
	.tip-pop-look{
		background-color: #FF6C80!important;
		height: 44px!important;
		width: 150px!important;
		border: none!important;
		border-radius: 67px!important;
		margin-top: 20px!important;
		color: #fff!important;
	}
	.tip-pop-ok:hover {
		background-color: #FF6C80;
		width: 150px;
		height: 44px;
		color: #fff!important;
		border: none;
		border-radius: 67px;
		margin-top: 20px;
	}
	.buyzgoat{
		width: 90px;
		height: 90px;
		border-radius: 50%;
		color: #fff;
		border: none;
		font-size: 20px;
		background: linear-gradient(to bottom,#FF7C8E,#F8536A);
		box-shadow: 0 0 8px rgba(148, 16, 16, 0.2);
	}
	#showBuy{
		display: none;
		position: fixed;
	    right: -2px;
	    border-radius: 60px 0 0 60px;
	    bottom: 100px;
	    border: solid 1px #FF6C80;
	    padding: 8px 15px 8px 8px;
	    background: rgba(255, 219, 224, 0.8);	
		z-index: 999999999;
	}
	.address-input input::-webkit-input-placeholder {
		/* WebKit, Blink, Edge */
		
		color: #FFC2CA;
	}
	.address-input input:-moz-placeholder {
		/* Mozilla Firefox 4 to 18 */
		
		color: #FFC2CA;
	}
	.address-input input::-moz-placeholder {
		/* Mozilla Firefox 19+ */
		
		color: #FFC2CA;
	}
	.address-input input:-ms-input-placeholder {
		/* Internet Explorer 10-11 */
		
		color: #FFC2CA;
	}
	@media screen and (max-width: 700px) {
		.buyzgoat{
			width: 60px!important;
			height: 60px!important;
			font-size: 12px!important;
		}
		
		#showBuy{
			display: block!important;
		}
		.main{
			padding-left: 0!important;
		}
	}
</style>