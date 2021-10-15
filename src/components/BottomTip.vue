<template>
	<div class="bottom-tip">
		
		<!-- <div class="bottom-icon">
			<a target="_blank" href="https://t.me/zgoat_org"><span class="href-icon iconfont telegram-bottom "></span></a>
			<a target="_blank" href="https://doc.zgoat.org"><span class="href-icon iconfont doc-bottom"></span></a>
			
		</div>
		<div style="margin-top: 20px;">
			<a class="href-icon" @click="openUrl" style="margin-right: 20px;">{{words.whitePaper[lang]}}</a>
			<a class="href-icon" @click="openAudio">{{words.audit[lang]}}</a>
		</div> -->
		<div style="margin-top: 7px;">© ZGoat Token 2021 . All Rights Reserved</div>
		
	</div>
</template>

<script>
	import { words } from "../assets/js/words"
	export default {
		name: "BottomTip",
		props: {},
		data() {
			return {
				words:words
			}
		},
		created(){
		
			this.lang = localStorage.getItem('lang')	
		},
		computed: {
			listenLangChange() {
				console.log('lang change', this.$store.state.lang)
				return this.$store.state.lang;
			}
		},
		watch: {
			listenLangChange(lang) {
				console.log('lang change', this.$store.state.lang)
				this.lang = Object.assign({}, lang);
				this.lang = lang;
			}
		},
		methods: {
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
	.bottom-tip {
		width: 100%;
		color: #fff;
		background: #FF6C80;
		font-size: 14px;
		display: flex;
		align-items: center;
		flex-direction: column;
		padding: 20px 0 20px 0;
		position: fixed;
		bottom: 0;
		z-index: 0;
	}
	.bottom-icon{
		display: flex;
		justify-content: center;
		align-items: center;
	}
	.bottom-icon img {
		margin: 0 15px;
	}
	
	.time_go0 {
		margin-right: 20px;
	}
	.book{
	text-decoration: none;
	color:#FF6C80;
	font-weight: bold;
}
</style>