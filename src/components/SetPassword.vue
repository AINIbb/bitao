<template>
	<div>
		<div class="pass-info">
			<div>
				<i style="font-size: 22px;color: #666;" class="el-icon-postcard"></i>
				<span style="font-size: 10px;white-space: nowrap;margin-left: 10px;display: inline-block;">{{address}}</span>
			</div>
			<div>
				<i style="font-size: 22px;color: #FF6C80;" class="el-icon-lock"></i>
				<el-input style="border: none;" placeholder="请输入密码" v-model="pass_value" show-password></el-input>
			</div> 
			<div>
				<i style="font-size: 22px;color: #FF6C80;" class="el-icon-lock"></i>
				<el-input placeholder="请再次输入密码" v-model="confirm_value" show-password></el-input>
			</div>
		</div>
		
		<div>
			<button  @click="setPassword" style="width: 210px;height: 39px;background: #FF6C80;color: #B29B9D;border-radius: 19px;border:none;margin-top: 40px;">确定</button>
		</div>
	</div>
</template>

<script>
	import {requestApi,Web3Eth} from "../assets/js/web3config";
	export default {
	  name: 'SetPassword',
	  props:['address'],
	  mounted() {
	  	// if(this.$router.params)
		console.log(this.$route.params)
	  },
	  data () {
	    return {
	      pass_value: '',
		  confirm_value:''
	    }
	  },
	  methods:{
		 async setPassword(){
			 var _this = this;
			 if(this.pass_value == ''){
				this.$message.error('请输入密码');
				return
			 }
			 if(this.confirm_value == ''){
				this.$message.error('请再次输入密码');
				return
			 }
			 if(this.pass_value != this.confirm_value){
				  this.$message.error('密码错误');
				  return
				  
			 }
			 this.$http({
			 	method: 'get',
			 	url: requestApi + 'getLoginCode',
			 	headers: {
			 		'Content-Type': 'application/x-www-form-urlencoded'
			 	},
			 	params:{address:_this.address}
			 }).then((res) => {
				 var hex='';
				 var pass = _this.pass_value + res.data.data;
				 console.log(pass,_this.address)
				 for(var i = 0; i<pass.length; i ++){
				 	 hex += ''+ pass.charCodeAt(i).toString(16)
				 }
				 var hexMessage ="0x"+ hex
				 Web3Eth.personal.sign(hexMessage,_this.address).then(res=>{
					 console.log(res)
					 _this.sendPassword(res)
				 })
				 
			 })
			 
			
		 },
		 sendPassword:function(hashvalue){
			 var _this = this;
			 this.$http({
			 	method: 'get',
			 	url: requestApi + 'setPassword',
			 	headers: {
			 		'Content-Type': 'application/x-www-form-urlencoded'
			 	},
				params:{
					password:_this.pass_value,
					hash:hashvalue,
					address: _this.address
				}
			 }).then((res) => {
			 	if(res.data.statu == 1004){
					_this.$message({
					  message: '设置成功',
					  type: 'success'
					});
					_this.$emit('introduce')
				}else{
					_this.$message.error('签名错误')
				}			 
			 })
		 }
	  }
	}
</script>
<style>
	.el-input__inner{
		border: none;
	}
	.el-dialog{
		border-radius: 20px;
	}
</style>
<style scoped="scoped">
	
	input{
		border: none;
		
	}
	.pass-info>div{
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 15px 0;
		border-bottom: solid 1px #FFE6EA;
	}
	
</style>
