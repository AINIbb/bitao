<template>
	<div style="padding:22px;height: 100%;display: flex;justify-content: center;">
		<el-col :xs="24" :sm="10" style="text-align: left;" class="create-info">
			<div class="check-chain">
				<button>{{chain_list[chain_index]}}<i style="margin-left: 6px;" class="el-icon-arrow-down"></i></button>
			</div>
			
			<div class="packet_count packet_params">
				<span>红包个数</span>
				<div>
					<input style="text-align: right;" placeholder="填写个数" />
					<span>个</span>
				</div>
				
			</div>
			<div style="color: #B29B9D;font-size: 13px;">当前为拼手气红包，可选择<a style="color: #ff455c;">普通红包</a></div>
			
			<div class="packet_params">
				<span>总金额</span>
				<div>
					<input style="text-align: right;" placeholder="0" />
					<img />
					<span></span>
					<i class="el-icon-caret-bottom"></i>
				</div>
			</div>
			<div class="packet_params"><input style="width: 100%;" placeholder="祝福语:恭喜发财,大吉大利"/></div>
			<div style="color: #8F7074;margin: 23px 0 15px 0;border: solid 1px #FFF8F9;">高级设置<i class="el-icon-caret-bottom"></i></div>
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
			</div>
			<div style="text-align: center;">
				<button style="background: #E3D7D9;color: #B29B9D;font-size: 16px;padding: 11px 58px;border-radius: 22px;margin: 33px 0 28px 0;">塞钱进红包</button>
			</div>
			<div style="text-align:center;color: #B29B9D;font-size: 11px;">未领取的红包，将于24h后发起退款</div>
		</el-col>
		<el-drawer
		  custom-class='select-digao'
		  :withHeader="showClose"
		  :visible.sync="drawer.chain"
		  :show-close="showClose"
		  :direction="direction">
		  <div class="chain-name" v-for="item in chain_list">{{item}} 链</div>
		  <div style="line-height: 60px;border-top: solid #faf7f7 6px;">取消</div>
		</el-drawer>
		<el-drawer
		  custom-class='select-digao2'
		  :withHeader="showClose"
		  :visible.sync="drawer.token"
		  :show-close="showClose"
		  :direction="direction">
		  <div style="color: #9D2435;font-size: 18px;line-height: 3.75rem;">选择代币</div>
		  <div style="display: flex;justify-content: space-between;align-items: center;">
			  <div class="search-token">
				  <i style="color: #B29B9D;font-size: 20px;" class="el-icon-search"></i>
				  <input placeholder="输入代币或合约地址" style="width: 80%;margin-left: 10px;"/>
			  </div>
			  
			  <span style="color: #B29B9D;">取消</span>
		  </div>
		  <div class="token-list" v-for="item in token_list">
			  <img style="width: 40px;height: 40px;margin-right: 20px;border-radius: 50%;background: #A79393;" src=""></img>
			  <div style="width: 100%;display: flex;flex-direction: column;justify-content: space-between;border-bottom: solid 1px #FFE6EA;padding: 20px 0;">
				  <div style="display: flex;justify-content: space-between;align-items: center;color: #9D2435;font-size: 16px;font-weight: bold;">
					  <span>name</span>
					  <span>num</span>
				  </div>
				  <div style="text-align: left;color: #B29B9D;font-size: 11px;">adddress</div>
			  </div>
		  </div>
		  <div style="line-height: 60px;border-top: solid #faf7f7 6px;">取消</div>
		</el-drawer>
		<div class="create-success" v-if="create_success">
			<i style="font-size: 30px;color: #FF6C80;margin-top: 30px;" class="el-icon-circle-check"></i>
			<div style="font-size: 18px;color: #FF6C80;font-weight: bold;margin: 13px 0;">创建红包成功</div>
			<div style="width:100px;height:26px;border-radius:20px;line-height:26px;background: #FF6C80;color: #FCF9FA;font-size: 11px;margin-bottom: 8px;">拼手气红包</div>
			<div class="redpackt-img">
				<div class="redpackt-img-top">
					<div style="width: 100%;text-align: left;padding-top: 15px;padding-left: 10px;">
						<img style="width: 53px;" src="../assets/img/logoch.png" />
					</div>
					<div style="text-align: center;color: #fff;margin-top: 30px;">
						<span style="font-size: 25px;">200,200,000</span> ZGoat
					</div>
					<div style="color: #fed3aa;font-size: 13px;margin-top: 13px;">
						ZGoat百倍共识，冲向月球
					</div>
				</div>
				<div class="redpackt-img-bottom">
					<span style="color: #FFC2CA;font-size: 10px;text-align: center;position: relative;top: 70px;" >*仅限在官网、电报群、推特平台领取</span>
				</div>
			</div>
			<div class="bottom-bg"></div>
		</div>
	</div>
</template>

<script>
	import {
		Web3Eth,
		maxNum
	} from "../assets/js/web3config";
	
	export default {
		name:'CreateRedpacket',
		async mounted() {
			var _this = this;
			this.lang = localStorage.getItem('lang');
			const accounts = await Web3Eth.getAccounts()
			this.walletAddress = accounts[0];
			
		},
		data(){
			return{
				showClose:false,
				lang:1,
				create_success:true,
				chain_index:0,
				chain_list:['BSC','HECO','ERC'],
				walletAddress: '',
				value1:false,
				value2:true,
				value3:true,
				drawer: {'chain':false,'token':true},
				direction: 'btt',
				token_list:[{
					name:'123',
					num:'123',
					address:'dfdgfgfhgh',
					img:'',
				},{
					name:'123',
					num:'123',
					address:'dfdgfgfhgh',
					img:'',
				},{
					name:'123',
					num:'123',
					address:'dfdgfgfhgh',
					img:'',
				}]
			}
		},
		methods:{
			
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
		height: 100%;
		display: flex;
		background: linear-gradient(to bottom, #fdf5f6,#fff,#fff);
		align-items: center;
		flex-direction: column;
	}
	button{
		background: none;
		border: none;
		
	}
	input{
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
	