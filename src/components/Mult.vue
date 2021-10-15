<template>
	<div style="text-align: center;margin-bottom: 200px;">
		<div class="mult-ad" style="position: relative;width: 80%;margin-left: 10%;margin-top: 120px;margin-bottom:40px">
			<div style="width: 100%;display: flex;justify-content: flex-end;margin-bottom: 40px;">
				<!-- <button class="mult-button" @click="addaddress">添加地址</button> -->
				<button class="mult-button" @click="addnum">一键添加数量</button>
			</div>
			<!-- <table>
				<tr>
					<th>地址</th>
					<th>数量</th>
					<th>操作</th>
				</tr>
				<tr v-for="(item,index) in list">
					<td>
						<input v-model="item.address" />
					</td>
					<td>
						<input v-model="item.num"  />
					</td>
					<td :data-index="index" @click="deleteIndex"><span style="cursor: pointer;text-decoration: underline;">删除</span></td>
				</tr>
			</table> -->
			<textarea class="address_info" placeholder="address"  v-model="address_info"></textarea>
			<textarea class="address_info"  placeholder="num" v-model="address_num"></textarea>
		</div>
		
		<button class="mult-button" v-if="approvebtn == true" @click="approve">授权</button>
		<button class="mult-button" @click="submit">提交</button>
		<el-dialog @close='closePop' :visible.sync="invitePopShowAble">
			<div>
				<div><input style="width: 250px;padding:0 20px;line-height: 42px;font-size: 20px;border: solid 1px #E3D7D9;border-radius: 3px;" v-model="allnum" placeholder="统一转账数量" /></div>
				<button style="margin-top: 40px;" class="mult-button" @click="confirm">确定</button>
			</div>
		</el-dialog>
	</div>
</template>
<script>
	import {
		web3,
		bitao,
		Web3Eth,
		maxNum,
		requestApi,
		Zgoat_token,
	} from "../assets/js/web3config";
	import ERC20 from "../assets/abis/ERC20.json"
	const mult_address = '0x2173Aca186a2C2B14Ccec1C880b053B0942053EA'
	const contractMultERC20 = new web3.eth.Contract(ERC20, mult_address);
	export default {
		name: "Mult",
		mounted(){
			
				var address_now = localStorage.getItem('wallet_address')
				if(this.$store.state.walletAddress != '') {
					this.walletAddress = this.$store.state.walletAddress
				}else if(address_now != ''){
					this.walletAddress = address_now
				}
				var _this = this
				bitao.methods.allowance(this.walletAddress, mult_address).call().then(res => {
					console.log('approve num', res)
					if(res == 0) {
						_this.approvebtn = true
					}
				})
		},
		data() {
			return {
				approvebtn:false,
				multaddress:'0x2173Aca186a2C2B14Ccec1C880b053B0942053EA',
				list:[],
				address_info: '',
				transfer_num: 0,
				address_num: '',
				allnum: 0,
				invitePopShowAble:false
			}
		},
		methods:{
			addnum:function(){
				this.invitePopShowAble = true;
			},
			confirm:function(){
				// this.address_info =  this.address_info.replace('\n', '')
				var address = this.address_info.split('\n').filter(x=>x!='')
				var addressnum = []
				for(var i=0 ; i< address.length; i++){
					addressnum.push(this.allnum)
				}
				this.address_num = addressnum.join(',')
				this.invitePopShowAble = false
			},
			addaddress:function(){
				this.list.push({address:'', num: 0})
				this.list = this.list
			},
			deleteIndex:function(ev){
				var index = ev.currentTarget.dataset.index;
				var newlist = this.list;
				newlist.splice(index,1)
				this.list = newlist;
			},
			approve:function(){
				var _this = this;
				var stakeNum = maxNum.toString();
				const data = bitao.methods.approve(this.multaddress, stakeNum).encodeABI();
				const transactionParameters = {
					to: Zgoat_token, // Required except during contract publications.
					from: _this.walletAddress, // must match user's active address.
					value: 0,
					data: data
				};
				let loadingInstance1 = _this.$loading({
					fullscreen: true,
				});
				Web3Eth.sendTransaction(transactionParameters).on('transactionHash', function() {
					
				}).on('receipt', async function(receipt) {
					loadingInstance1.close()
					window.alert('授权成功')
					_this.approvebtn = false
				}).on('error', function() {
					loadingInstance1.close()
				})
			},
			submit:function(){
				console.log( this.address_info.toString())
				if(this.approvebtn){
					window.alert('please approve zgoat')
					return
				}
				this.address_num =  this.address_num.replace('\n', '')
				var zero = '000000000'
				var address_list = this.address_info.split('\n').filter(x=>x!='')
				var num_list = this.address_num.split(',')
				num_list.forEach((item,index)=>{
					num_list[index] = item.toString() + zero
				})
				
				var data = contractMultERC20.methods.sendBatch(Zgoat_token,address_list,num_list ).encodeABI();
				const transactionParameters = {
					to: mult_address,
					from: ethereum.selectedAddress,
					value: 0,
					data: data
				};
				let loadingInstance1 = this.$loading({
					fullscreen: true,
				});
				Web3Eth.sendTransaction(transactionParameters).on('transactionHash', function() {
					
				}).on('receipt', async function(receipt) {
					window.alert('转账成功')
					loadingInstance1.close()
				}).on('error', function() {
					loadingInstance1.close()
				})
			},
			
		}
		
		
	}

</script>
<style scoped="scoped">
	table{
		width: 100%;
		margin-top: 200px;
		margin-bottom: 100px;
		border: solid 1px #E3D7D9;
	}
	tr{
		height: 42px;
		width: 100%;
	}
	td{
		border-bottom: solid 1px #E3D7D9;
		border-left: solid 1px #E3D7D9;
	}
	th{
		background: #E3D7D9;
		line-height: 40px;
	}
	table td, table th{
		width: 40%;
	}
	table input{
		width: 90%;
		line-height: 34px;
		border: none;
	}
	.mult-button{
		width: 150px;
		background: #E3D7D9;
		border: none;
		line-height: 40px;
		border-radius: 3px;
	}
	.address_info{
		width: 100%;
		height: 300px;
		font-size: 16px;
		border: solid 1px #E3D7D9;
	}
</style>