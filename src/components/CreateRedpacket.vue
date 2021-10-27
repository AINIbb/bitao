<template>
	<div style="height: 100%;padding:22px;display: flex;justify-content:center;">
		<el-col v-if="!create_success" :xs="24" :sm="10" style="text-align: left;" class="create-info">
			<div class="check-chain">
				<button @click="open_drawer('chain')">{{chain_list[chain_index].name}}<i style="margin-left: 6px;" class="el-icon-arrow-down"></i></button>
			</div>
			
			<div class="packet_count packet_params">
				<span>红包个数</span>
				<div>
					<input @input="getSingleAmount" v-model="repacket_info.count" style="text-align: right;" placeholder="填写个数" />
					<span>个</span>
				</div>
				
			</div>
			<div style="color: #B29B9D;font-size: 13px;">当前为{{repacket_info.get_type == '0' ? '拼手气红包' : '普通红包'}}，可选择<a style="color: #ff455c;cursor: pointer;text-decoration: underline;" @click="check_get_pick_type">{{repacket_info.get_type == '1' ? '拼手气红包' : '普通红包'}}</a></div>
			
			<div v-if="repacket_info.get_type == '1'" class="packet_params">
				<span>单个金额</span>
				<div>
					<input @input="getSingleAmount" style="text-align: right;width: 100px;" placeholder="0"  v-model="singleAmount"/>
					<span style="color: #FFE6EA;margin: 0 10px;">|</span>
					<img />
					<span @click="open_drawer('token')">{{getselecttoken()}} <i class="el-icon-caret-bottom"></i></span>
				</div>
			</div>
			
			<div class="packet_params">
				<span>总金额</span>
				<div v-if="repacket_info.get_type == '0'">
					<input v-model="repacket_info.amount" style="text-align: right;width: 100px;" placeholder="0" />
					<span style="color: #FFE6EA;margin: 0 10px;">|</span>
					<img />
					<span @click="open_drawer('token')">{{getselecttoken()}} <i class="el-icon-caret-bottom"></i></span>
				</div>
				<div v-else>
					<span>{{repacket_info.amount}}</span>
				</div>
			</div>
			<div class="packet_params"><input v-model="repacket_info.description" style="width: 100%;" placeholder="祝福语:恭喜发财,大吉大利"/></div>
			<!-- <div style="color: #8F7074;margin: 23px 0 15px 0;border: solid 1px #FFF8F9;">高级设置<i class="el-icon-caret-bottom"></i></div>
			<div class="packet-setting">
				<div>
					<span>仅限新用户领取</span> 
					<el-switch
						v-model="value1"
						active-color="#ffe6ea"
						inactive-color="#ff6c80">
					</el-switch>
				</div>
				<div style="color: #c7abae;font-size: 11px;">开启此选项后，只有在当前24h内关联了电报、推特、微信等社交账号的用户才可以领取该红包</div>
				<div>
					<span>分享有奖</span> 
					<el-switch
						v-model="value2"
						active-color="#ffe6ea"
						inactive-color="#ff6c80">
					</el-switch>
				</div>
				<div>
					<span>仅限官方群领取</span> 
					<el-switch
						v-model="value3"
						active-color="#ffe6ea"
						inactive-color="#ff6c80">
					</el-switch>
				</div>
				<div>
					<span>仅限指定平台领取</span>
					<div class="select-platform">
						选择平台
						<i style="font-size: 16px;" class="el-icon-caret-bottom"></i>
					</div>
					  
				</div>
			</div> -->
			<div style="text-align: center;">
				<button style="background: #FF6C80;color: #fff;font-size: 16px;padding: 11px 58px;border-radius: 22px;margin: 33px 0 28px 0;" @click="inputpassword">塞钱进红包</button>
			</div>
			<div style="text-align:center;color: #B29B9D;font-size: 11px;">未领取的红包，将于24h后发起退款</div>
		</el-col>
		
		<div v-else class="create-success" >
			<i style="font-size: 30px;color: #FF6C80;margin-top: 30px;" class="el-icon-circle-check"></i>
			<div style="font-size: 18px;color: #FF6C80;font-weight: bold;margin: 13px 0;">创建红包成功</div>
			<div style="width:100px;height:26px;border-radius:20px;line-height:26px;background: #FF6C80;color: #FCF9FA;font-size: 11px;margin-bottom: 8px;">拼手气红包</div>
			<div class="redpackt-img">
				<div class="redpackt-img-top">
					<div style="width: 100%;text-align: left;padding-top: 15px;padding-left: 10px;">
						<img style="width: 53px;" src="../assets/img/logoch.png" />
					</div>
					<div style="text-align: center;color: #fff;margin-top: 30px;">
						<span style="font-size: 25px;">{{repacket_info.amount}}</span> ZGoat
					</div>
					<div style="color: #fed3aa;font-size: 13px;margin-top: 13px;">
						{{repacket_info.description}}
					</div>
				</div>
				<div class="redpackt-img-bottom">
					<span style="color: #FFC2CA;font-size: 10px;text-align: center;position: relative;top: 70px;" >*仅限在官网、电报群、推特平台领取</span>
				</div>
			</div>
			<div class="share">
				<div>
					<div style="color: #FF6C80;opacity: 1;" class="iconfont icon-telegram"></div>
					<div>分享到Telegram</div>
				</div>
				<div>
					<div style="color: #FF6C80;opacity: 1;" class="iconfont twitter"></div>
					<div>分享到Twitter</div>
				</div>
				<div @click="shareByImg">
					<div style="color: #FF6C80;font-size: 20px;" class="el-icon-picture share-img"></div>
					<div>生成海报</div>
				</div>
			</div>
			<div class="bottom-bg"></div>
		</div>
		<el-drawer
		  custom-class='select-digao'
		  :withHeader="showClose"
		  :visible.sync="drawer.chain"
		  :show-close="showClose"
		  :direction="direction">
		  <div class="chain-name" v-for="(item,index) in chain_list" @click="select_chain_id(index)">{{item.name}} 链</div>
		  <div style="line-height: 60px;border-top: solid #faf7f7 6px;">取消</div>
		</el-drawer>
		<el-drawer
		  custom-class='select-digao2'
		  :withHeader="showClose"
		  :visible.sync="drawer.token"
		  :show-close="showClose"
		  :direction="direction">
		  <div style="color: #9D2435;font-size: 18px;line-height: 3.75rem;">选择代币</div>
		<!--  <div style="display: flex;justify-content: space-between;align-items: center;">
			  <div class="search-token">
				  <i style="color: #B29B9D;font-size: 20px;" class="el-icon-search"></i>
				  <input placeholder="输入代币或合约地址" style="width: 80%;margin-left: 10px;border: none;"/>
			  </div>
			  
			  <span style="color: #B29B9D;">取消</span>
		  </div> -->
		  <div class="token-list" v-for="(item,index) in token_list" v-if="item.chain_id==chain_list[chain_index].id" @click="check_token(item)">
			  <img style="width: 40px;height: 40px;margin-right: 20px;border-radius: 50%;background: #A79393;" src=""></img>
			  <div style="width: 100%;display: flex;flex-direction: column;justify-content: space-between;border-bottom: solid 1px #FFE6EA;padding: 20px 0;">
				  <div style="display: flex;justify-content: space-between;align-items: center;color: #9D2435;font-size: 16px;font-weight: bold;">
					  <span>{{item.name}}</span>
					  <span>{{item.num}}</span>
				  </div>
				  <div style="text-align: left;color: #B29B9D;font-size: 11px;">{{item.short_address}}</div>
			  </div>
		  </div>
		  <div style="line-height: 60px;border-top: solid #faf7f7 6px;">取消</div>
		</el-drawer>
		<el-dialog title="设置零钱密码" width='360px' :center="showClose" :visible.sync="drawer.set_address">
			<SetPassword :address="walletAddress" @introduce='setpassword_success'></SetPassword>
		</el-dialog>
		<el-dialog :show-close="showClose"  width='340px' :visible.sync="drawer.shareImg">
			<div>
				<canvas id="shareimg" width="264" height="351" style="width:296px;height: 393px;"></canvas>
				<button style="padding: 10px 20px;background: #FF455C;color: #fff;border: none;border-radius: 28px;margin-top: 30px;">保存图片</button>
			</div>
		</el-dialog>
	</div>
</template>

<script>
	import QRCode from 'qrcode'
	import {
		Web3Eth,
		loginFlag,
		maxNum,
		requestApi,
		BLOCKCHAIN_CONFIG
	} from "../assets/js/web3config";
	import SetPassword from './SetPassword.vue'
	export default {
		name:'CreateRedpacket',
		components:{SetPassword},
		async mounted() {
			var _this = this;
			this.lang = localStorage.getItem('lang');
			try{
				var chainId = BLOCKCHAIN_CONFIG.defaultChainId;
				const getChainId = await Web3Eth.getChainId()
				if(chainId == getChainId){
					var address_now = localStorage.getItem('wallet_address')
					if(this.$store.state.walletAddress != '') {
						this.walletAddress = this.$store.state.walletAddress;
						this.repacket_info.owner_address = this.$store.state.walletAddress;
					}else if(address_now != ''){
						this.walletAddress = address_now
						this.repacket_info.owner_address = address_now;
					}
				}
			}catch(e){
				var getlogin = localStorage.getItem('login_address')
				this.walletAddress = getlogin;
				this.repacket_info.owner_address = getlogin;
				//TODO handle the exception
				console.log(e)
			}
			this.$http({
				method: 'get',
				url: requestApi + 'getToken',
				headers: {
					'Content-Type': 'application/x-www-form-urlencoded'
				},
				params:{address:this.walletAddress}
			}).then((res) => {
				var chain_list = {}
				res.data.data.forEach(item=>{
					if(item.chain_id in chain_list){
						console.log('redpeat')
					}else{
						chain_list[item.chain_id] = {id:item.chain_id,name: item.chain_name}
					}
					item.short_address = item.address.substring(0,4) + '...' + item.address.substring(38,42)
				})
				
				var newchain_list = []
				for(var key in chain_list){
					newchain_list.push(chain_list[key])
				}
				
				_this.chain_list = newchain_list;
				_this.token_list = res.data.data;
				_this.select_token_id = res.data.data[0].id;
				// _this.repacket_info.token_address = res.data.data[0]['address']
				_this.address_status = res.data.addressdata;
				_this.repacket_info.chain_type = newchain_list[0].id || '97'
			})
			
			
		},
		data(){
			return{
				showClose:false,
				lang:1,
				create_success:false,
				chain_index:0,
				chain_list:['BSC'],
				walletAddress: '',
				value1:false,
				value2:true,
				value3:true,
				drawer: {'chain':false,'token':false,set_address:false,shareImg:false},
				direction: 'btt',
				token_list:[],
				singleAmount:0,
				select_token_id:0,
				address_status: 1,
				repacket_info:{
					count:0,
					amount:0,
					description:'大吉大利恭喜发财',
					token_address:'',
					owner_address:'',
					chain_type: '97',
					share:'0',
					platform: '1',
					get_type:'0',
					expire_time: ''
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
			},
			listenLangChange(lang) {
				console.log('lang change', this.$store.state.lang)
				this.lang = Object.assign({}, lang);
				this.lang = lang;
			}
		},
		methods:{
			open_drawer:function(type){
				var newdrawer = this.drawer;
				for(var key in newdrawer){
					newdrawer[key] = false;
				}
				newdrawer[type] = true;
			},
			select_chain_id:function(index){
				this.chain_index = index;
				this.repacket_info.chain_type = this.chain_list[index].id;
				var list = this.token_list.filter(x=>x.chain_id == this.chain_list[index].id);
				this.select_token_id = list[0].id;
				this.drawer['chain'] = false;
			},
			getselecttoken:function(){
				var list = this.token_list.filter(x=>x.id == this.select_token_id)
				var name = list.length > 0 ? list[0].name : ''
				return name;
			},
			check_token:function(info){
				this.repacket_info.token_address = info.address;
				this.select_token_id = info.id;
				this.drawer['token'] = false;
			},
			submitinfo:function(password){
				var info = this.repacket_info;
				info.password = password;
				var _this = this;
				this.$http({
					method: 'get',
					url: requestApi + 'createPacket',
					headers: {
						'Content-Type': 'application/x-www-form-urlencoded'
					},
					params:info
				}).then((res) => {
					if(res.data.statu == 1000){
						
						if(loginFlag == 1){
							this.openTip('el-icon-lock','请复制官网链接（https://zgoat.org），前往DAPP浏览器设置密码')
						}else{
							_this.drawer.set_address = true
						}
						
					}else if(res.data.statu == 1001){
						_this.$message.error('密码错误')
					}else if(res.data.statu == 1002){
						_this.$message.error('余额不足')
					}else{
						_this.create_success = true
					}
					
				})
			},
			inputpassword:function(){
				var _this = this
				var info = this.repacket_info;
				if(info.amount == '' || info.amount == 0){
					this.$message.error('请填写总金额')
					return
				}
				if(info.count == '' || info.count == 0){
					this.$message.error('请填写个数')
					return
				}
				if(info.token_address == ''){
					this.$message.error('请选择代币')
					return
				}
				if(_this.address_status != 1){
					if(loginFlag == 1){
						this.openTip('el-icon-lock','请复制官网链接（https://zgoat.org），前往DAPP浏览器设置密码')
					}else{
						this.drawer.set_address = true
					}
					
					return
				}
				this.$prompt('请输入密码', {
				  confirmButtonText: '确定',
				  cancelButtonText: '取消',
				}).then(({ value }) => {
				    _this.submitinfo(value)
				}).catch(() => {
				       
				});
			},
			openTip: function(iconClass, tipText) {
				var tip = "<div><span style='font-size:56px;color:#ff6c80;margin-bottom:30px' class='" + iconClass + "'></span><div style='color:#FF6C80;text-align:left;'>" + tipText +
					"</div></div>"
				this.$alert(tip, {
					center: true,
					lockScroll: false,
					dangerouslyUseHTMLString: true,
					confirmButtonClass: 'tip-pop-ok',
					confirmButtonText: '复制链接',
					cancelButtonClass: 'tip-pop-ok'
				});
			},
			setpassword_success:function(){
				this.drawer.set_address = false;
				this.$prompt('请输入密码', {
				  confirmButtonText: '确定',
				  cancelButtonText: '取消',
				}).then(({ value }) => {
				    _this.submitinfo(value)
				}).catch(() => {
				       
				});
			},
			shareByImg:function(){
				//this.shareimgsrc = c.toDataURL('share/png')
				var _this = this;
					var domt = document.getElementById('shareimg');
					var ctx = domt.getContext('2d');
					var dpr = window.devicePixelRatio || 1
					var bsr = ctx.webkitBackingStorePixelRatio ||
						  ctx.mozBackingStorePixelRatio ||
						  ctx.msBackingStorePixelRatio ||
						  ctx.oBackingStorePixelRatio ||
						  ctx.backingStorePixelRatio || 1;
					var radio =  dpr / bsr;
					domt.width = 264 * radio
					domt.height = 351 * radio	  
					domt = domt.getContext("2d").setTransform(radio, 0, 0, radio, 0, 0)
					var select_token = _this.token_list.filter(x=>x.id=_this.select_token_id)
					var img = new Image()
					img.src = 'https://cdn.bitaochain.com/upload/picture/202110/18/0a7bae56144e021a1e556699ce4793fb.png'
					img.onload = function(){
						ctx.drawImage(img,0,0,264,351);
						ctx.font = '14px Arial'
						ctx.fillStyle = "#ffcba1"
						ctx.textAlign='center'
						ctx.fillText(_this.walletAddress.substring(0,4) + '...' + _this.walletAddress.substring(38,42) + ' 发出的红包', 132,80)
						ctx.font = '20px Arial'
						ctx.fillText(_this.repacket_info.description,132,132)
						ctx.font = '12px Arial'
						ctx.fillStyle = "#fde3aa"
						ctx.fillText('扫码领取' + select_token[0].name, 132,280)
						ctx.fillStyle = "#ffc2ca"
						ctx.font = '11px Arial'
						ctx.fillText('*仅限在微信、推特、电报群平台领取', 132,330)
						var qrurl = 'https://www.baidu.com'
						var qrimg = new Image()
						QRCode.toDataURL(qrurl,{margin:1,color:{dark: '#aa0a1f'}}).then(res=>{
							qrimg.src = res
						})
						qrimg.onload = function(){
							ctx.drawImage(qrimg,97,190,70,70)
						}
						_this.drawer.shareImg = true;
					}
			},
			check_get_pick_type:function(){
				if(this.repacket_info.get_type == '0'){
					this.repacket_info.get_type = '1'
				}else{
					this.repacket_info.get_type = '0'
				}
				
			},
			getSingleAmount:function(){
				if(this.repacket_info.get_type == '1'){
					console.log(this.singleAmount,this.repacket_info.count)
					var totalamount = parseInt(this.singleAmount) * parseInt(this.repacket_info.count)
					this.repacket_info.amount = totalamount ? totalamount : 0
				}
				
			}
		}
		
	}
</script>
<style>
	.select-digao{
		border-radius: 28px 28px 0 0;
	}
	.select-digao2{
		border-radius: 28px 28px 0 0;
		padding: 0 22px;
	}
	
</style>
<style scoped="scoped">
	
	@import url("../assets/nav.css");
	.icon-telegram,.twitter,.share-img{
		background: #FFE6EA;
		width: 37px;
		height: 37px;
		border-radius: 50%;
		line-height: 37px;
		margin-bottom: 11px;
	}
	.share>div{
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		width: 150px;
	}
	.share{
		display: flex;
		justify-content: space-between;
		align-items: center;
		font-size: 13px;
		color: #8F7074;
		width: 90%;
		margin-top: 30px;
	}
	.redpackt-img-top{
		width: 240px;
		height: 168px;
		background: linear-gradient(to bottom,#ff3954,#ff6174);
		border-radius: 28px 28px 0 0;
		margin-top: 20px;
		position: relative;
	}
	.redpackt-img-top::after{
		content: '';
		width: 100%;
		height: 40px;
		position: absolute;
		left: 0;
		bottom: -35px;
		border-radius:0 0 100% 100% ;
		background: #ff6174;
	}
	.redpackt-img-bottom{
		height: 120px;
		background: linear-gradient(to right,#f60d2d, #ff3952, #f00d2c);
		width: 240px;
		border-radius: 0 0 28px 28px;
	}
	.bottom-bg{
		position: fixed;
		bottom: 0;
		width: 100%;
		height: 70px;
		z-index: 100;
		background: linear-gradient(to bottom, #ff6c80,#ff455c);
	}
	.bottom-bg::after{
		content: '';
		width: 100%;
		height: 40px;
		position: absolute;
		left: 0;
		top: -18px;
		border-radius:0 0 100% 100% ;
		background: #fff;
	}
	.create-success{
		position: absolute;
		top: 0;
		width: 100%;
		height: 100vh;
		display: flex;
		background: none;
		align-items: center;
		flex-direction: column;
		background:  linear-gradient(to bottom, #fdf5f6,#fff,#fff);
	}
	button{
		background: none;
		border: none;
		
	}
	.create-info input{
		border: none;
		font-size: 16px;
	}
	.create-info input{
		color: #FF6C80;
	}
	.create-info input::-webkit-input-placeholder { /* WebKit, Blink, Edge */
	    color: #FFC2CA;
	}
	.create-info input:-moz-placeholder { /* Mozilla Firefox 4 to 18 */
	   color:    #FFC2CA;
	}
	.create-info input::-moz-placeholder { /* Mozilla Firefox 19+ */
	   color:    #FFC2CA;
	}
	.create-info input:-ms-input-placeholder { /* Internet Explorer 10-11 */
	   color:   #FFC2CA;
	}
	.create-info input::-ms-input-placeholder { /* Microsoft Edge */
	   color:    #FFC2CA;
	}
	.search-token input::-webkit-input-placeholder { /* WebKit, Blink, Edge */
	    color: #B29B9D;
	}
	.search-toke input:-moz-placeholder { /* Mozilla Firefox 4 to 18 */
	   color:    #B29B9D;
	}
	.search-toke input::-moz-placeholder { /* Mozilla Firefox 19+ */
	   color:    #B29B9D;
	}
	.search-toke input:-ms-input-placeholder { /* Internet Explorer 10-11 */
	   color:   #B29B9D;
	}
	.search-toke input::-ms-input-placeholder { /* Microsoft Edge */
	   color:    #B29B9D;
	}	
	.check-chain button{
		padding: 5px 13px;
		background: #FF6C80;
		color: #fff;
		font-size: 13px;
		border-radius: 26px;
	}
	.packet_params{
		background: #fff;
		/* width: 100%; */
		height: 60px;
		line-height: 60px;
		color: #9D2435;
		font-size: 16px;
		border-radius: 9px;
		padding: 0 14px;
		margin: 20px 0;
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
	.packet-setting{
		background: #fff;
		border-radius: 11px;
		padding: 22px 13px;
		color: #8F7074;
		font-size: 16px;
	}
	.packet-setting>div{
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin: 13px 0;
	}
	.select-platform{
		color: #FFC2CA;
		border: solid 1px #FFC2CA;
		border-radius: 18px;
		font-size: 12px;
		padding: 3px 12px;
	}
	.chain-name{
		font-size: 16px;
		line-height: 58px;
		border-top: #F0E1E2 1px solid;
	}
	.search-token{
		border: solid 1px #B29B9D;
		width: 80%;
		height: 35px;
		line-height: 35px;
		display: flex;
		align-items: center;
		padding-left: 13px;
		border-radius: 20px;
		
	}
	.token-list{
		display: flex;
		justify-content: space-between;
		align-items: center;
		height: 82px;
	}
</style>
	