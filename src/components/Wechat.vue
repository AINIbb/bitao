<template>
	<div style="display: flex;justify-content: center;flex-wrap: wrap;">
		<el-row class="all" style="width: 100%;background: #FF6C80;padding: 0 15px;">
			<el-col  :xs="24" :sm="18" style="border-radius: 20px;padding:20px 0;display: flex;align-items: center;justify-content: center;position: relative;top: -30px;font-size: 14px;">
				<div style="color: #fff; width: 53%;text-align: center;">
					<div>{{words.paytotal[lang]}}</div>
					<div style="font-size: 20px;">{{transferUnit(zgoat_reward, 1,0)}}</div>
				</div>
				<div style="color: #fff;width: 40%;text-align: center;">
					<div>{{words.groupjoin[lang]}}</div>
					<div style="font-size: 20px;">{{group_num}}</div>
				</div>
			</el-col>
		</el-row>
		<el-col  class="coop-list"  :xs="24" :sm="18">
			<div class="user-wx">
				<div>
					<div>{{words.username[lang]}}</div>
					<div class="big-font">{{userinfo.username}}</div>
				</div>
				<div>
					<div>{{words.wxreward[lang]}}</div>
					<div class="big-font">{{userinfo.total_reward}}</div>
				</div>
				<div>
					<div>{{words.referrerRate[lang]}}</div>
					<div class="big-font">{{userinfo.invite_num }}</div>
				</div>
			</div>
			<div class="earn-single">{{words.myinfo[lang]}}</div>
		</el-col>
		<el-col class="coop-list"  :xs="24" :sm="18">
			<div class="coop-header">{{lang == 1? '活动规则': 'Rules'}}</div>
			<div class="coop-content" style="font-size: 12px;">
				<div>{{rules[0][lang]}}</div>
				<div>{{rules[1][lang]}}</div>
				<div v-if="showmore" style="color: #8F7074;display: flex;flex-direction: column;align-items: flex-start;">
					<div style="color: #8F7074;">Tips</div>
					<div style="color: #8F7074;">{{rules[2][lang]}}</div>
					<span>{{rules[3][lang]}}</span>
					<span v-html="rules[4][lang]"></span>
					<span style="color: #9D2435;"><span style="font-size: 12px;color: #9D2435;margin-right: 5px;font-weight: bold;" class='icontip icon-alert'></span>{{rules[5][lang]}}</span>
					<span><a target="_blank" style="color:#9D2435" href="https://doc.zgoat.org/v/eng/shi-chang/kong-tou-huo-dong/he-zuo">{{words.kol[lang]}}</a></span>
				</div>
				<div style="display: flex;justify-content: center;position: relative;top: 10px;">
					<img v-if="showmore" @click="lookMore" style="width: 40px;height: 20px;cursor: pointer;" src="../assets/img/more.png" />
					<img v-else @click="lookMore"  style="width: 40px;height: 20px;cursor: pointer;" src="../assets/img/more-down.png" />
				</div>
			</div>
		</el-col>
		<el-col  :xs="24" :sm="18" style="margin: 0 15px;position: relative;top: -80px;display: flex;flex-direction: column;align-items: center;overflow: hidden;">
			<div style="font-size: 20px;font-weight: bold;color: #FF6C80;margin: 10px 0;text-align: left;width: 100%;text-indent: 1em;">{{lang == 1 ? '排行榜' : 'Rank'}}</div>
			<el-col style="background:#fff;border-radius: 20px;overflow: hidden;border: solid 1px #FF6C80;">
				<div style="font-size:14px;margin-bottom:20px;display: flex;align-items: center;line-height: 60px;padding: 0 15px;background: #fff;border-bottom: solid 1px #F0E1E2;justify-content: space-between;">
					<div style="display: flex;align-items: center;color: #8F7074;">
						<div :class="meta_index==0? 'active-tab':''" style="margin-right: 20px;cursor: pointer;position: relative;" @click="checkmeta(0)">{{lang == 1 ? '按个人排序': 'Users Sort'}}<div class="underline" v-if="meta_index==0"></div></div>
						<div :class="meta_index==1? 'active-tab':''" style="cursor: pointer;position: relative;" @click="checkmeta(1)">{{lang == 1 ? '按社群排序': 'Group Sort'}}<div class="underline" v-if="meta_index==1"></div></div>
					</div>
					<div style="position: relative;" v-if="meta_index == 0">
						<input :placeholder="words.searchaddress[lang]" @input="getsearchaddress" v-model="search_info" style="font-size:10px;outline:none;width: 120px;text-indent:1em;height: 30px;background: #FFF8F9;border-radius: 16px;border: none;color: #9D2435;" />
						<button @click="searchEvent(search_info)" style="background: none;border: none;height: 32px;width: 33px;color: #FF6C80;position: absolute;right:2px;top: 15px;"><i class="el-icon-search"></i></button>
					</div>
				</div>
				<el-table
				     v-if="meta_index == 0"
				    :data="search ? searchdata : list"
				    style="width: 100%"
				    :row-class-name="tableRowClassName">
					<el-table-column
					   align='center'
					  prop="index"
					  width="45"
					  label="">
					</el-table-column>
				    <el-table-column
					   align='left'
				      prop="username"
				      :label="words.username[lang]">
				    </el-table-column>
					<el-table-column
					align='center'
					  prop="address_short"
					  :label="words.address[lang]">
					</el-table-column>
					<el-table-column
					align='center'
					  prop="total_reward"
					  :label="words.wxreward[lang]">
					</el-table-column>
				    <el-table-column
					align='center'
				      prop="invite_num"
				      :label="words.referrerRate[lang]">
				    </el-table-column>
				</el-table>
				<el-table
				       v-if="meta_index == 1"
				      :data="list2"
				      style="width: 100%"
				      :row-class-name="tableRowClassName">
					  <el-table-column
					     align='center'
					    prop="index"
					    width="45"
					    label="">
					  </el-table-column>
				      <el-table-column
				  	   align='left'
				        prop="group_id"
						
				        :label="words.groupid[lang]">
				      </el-table-column>
				  	
				  	<el-table-column
				  	align='center'
				  	  prop="group_name"
				  	  :label="words.groupname[lang]">
				  	</el-table-column>
				  	<el-table-column
				  	align='center'
				  	  prop="num"
				  	  :label="words.joinNum[lang]">
				  	</el-table-column>
				</el-table>
			    
			</el-col>
			
			<div style="margin: 30px 0;width: 100%;">
				<el-pagination
				  v-if="total_num > 15 && meta_index == 0"
				  @current-change="getPage" 
				  background
				  page-size="15"
				  layout="prev, pager, next"
				  :total="total_num">
				</el-pagination>
			</div>
		</el-col>
		
		
	</div>
</template>

<script>
	import { words } from "../assets/js/words"
	import {
		bitao,
		maxNum,
		requestApi,
	} from "../assets/js/web3config";
	export default {
		name:'Wechat',
		async mounted() {
			
			this.lang = localStorage.getItem('lang')
			this.initdata(0)
			var ethereum = window.ethereum;
			var _this = this;
			this.$http({
				method: 'get',
				url: requestApi + 'searchAddress',
				headers: {
					'Content-Type': 'application/x-www-form-urlencoded'
				},
				params: {
					'address': ethereum.selectedAddress
				}
			}).then((res) => {
				if(res.data.data == ''){
					return
				}
				var info = res.data.data.info;
				info.total_reward = res.data.data.invite.length*100000 + 400000;
				info.invite_num = res.data.data.invite.length
			    _this.userinfo = info;
			})
			
			this.$http({
				method: 'get',
				url: requestApi + 'getGroupdata',
				headers: {
					'Content-Type': 'application/x-www-form-urlencoded'
				},
				params: {
					'page': 0
				}
			}).then((res) => {
				var list = res.data.data;
				_this.group_num = res.data.data.length;
				
				list.sort(function(a,b){
					return b.num - a.num
				})
				list.forEach((item,index)=>{
					item.index = index + 1
				})
				_this.list2 = list
				_this.zgoat_reward = res.data.reward.total
				
			})
		},
		data(){
			return{
				lang:1,
				list:[],
				list2:[],
				words:words,
				meta_index:0,
				total_num:0,
				search_info: '',
				search: false,
				searchdata:[],
				group_num:0 ,
				zgoat_reward: 0,
				userinfo:{'username':'--',total_reward: '--', invite_num: '--'},
				showmore:false,
				rules:[
					['1. Join WeChat group, obtain 400,000 ZGoat reward, one WeChat ID for once','1、用户加入官方微信群，接龙登记成功即奖励40w个ZGoat，一个微信只能登记一次'],
					['2. Invite friend to obtain 100,000 ZGoat extra reward, at most 25,000,000 ZGoat','2、用户邀请好友入群，好友接龙登记成功即奖励10w个ZGoat，邀请奖励最多2500w'],
					["1. To let user experience 'unlock ZGoat', if address is new, extra 50,000 ZGoat extra airdrop",'1、为方便新用户尽快了解 ZGoat 质押解锁流程，若用户登记成功的地址为新地址时，额外赠送5w个空投，空投需质押解锁'],
					['2. When amount of inviting friend exceeds to 50, extra 500,000 ZGoat airdrop for each 50, which needs unlock','2、用户邀请好友入群，邀请人数每超过 50 人，额外赠送 50w 个 ZGoat 空投，空投需要质押解锁'],
					['3. Claim reward on official website: <a target="_blank" href="https://zgoat.org">https://zgoat.org</a> or <a target="_blank" href="https://zgoat.net">https://zgoat.net</a>','3、奖励请登陆 ZGoat 官网：<a target="_blank" href="https://zgoat.org">https://zgoat.org</a> 或者 <a target="_blank" href="https://zgoat.net">https://zgoat.net</a> 领取'],
					['Note that, reward will be cancelled if any cheat or disallowed ads in group','特别提醒：作弊的、群里发无关广告的，直接拉黑名单！']
				]
			}
		},
		methods: {
			transferUnit: function(num, uit, fixed) {
			
				if(num === '--') return '--'
				var value = num / uit;
				
				return value.numberFormat(fixed,'.', ',')
			},
			lookMore:function(){
				this.showmore = !this.showmore;
			},
			searchEvent:function(data){
				this.search = true
				this.searchRequest(this.search_info)
			},
			initdata:function(page){
				var _this = this;
				this.$http({
					method: 'get',
					url: requestApi + 'getWxdata',
					headers: {
						'Content-Type': 'application/x-www-form-urlencoded'
					},
					params: {
						'page': page
					}
				}).then((res) => {
					var list = res.data.data.list;
					var newlist = [];
					var grouplist = [];
				    var allReward = 0;
					for (var key in list){
						var item = list[key];
						var check = item.address.match(/0x[a-zA-Z0-9]{40}/i)[0];
						console.log(check)
						item.address_short = '0x...' + check.substring(38,42)
						if(item.invite_num){
							item.total_reward = item.invite_num*100000 + 400000
						}else{
							item.total_reward = 400000
							item.invite_num = 0
						}
						newlist.push(item)
						allReward = allReward + item.total_reward;
					}
					newlist.sort(function(a,b){
						return b.total_reward - a.total_reward
					})
					var pages = page-1 > -1 ? page : 0 ; 
					pages = pages * 15 ;
					newlist.forEach((item,index)=>{
						item.index = pages + index + 1
					})
					_this.list = newlist
					_this.total_num = res.data.data.total[0].total;
				}).catch(res=>{
					console.log(res)
				})
				
				
			},
			getPage:function(e){
				this.initdata(e-1)
			},
			getsearchaddress:function(e){
				console.log(e)
				if(e.target.value == ''){
					this.search = false;
					this.searchdata = [];
				}
			},
			searchRequest:function(addressstr){
				if(addressstr == '') {
					return
				}
				var _this = this;
				this.$http({
					method: 'get',
					url: requestApi + 'searchAddress',
					headers: {
						'Content-Type': 'application/x-www-form-urlencoded'
					},
					params: {
						'address': addressstr
					}
				}).then((res) => {
					console.log(res)
					if(res.data.data == ''){
						return
					}
					var info = res.data.data.info;
					info.address = '0x...' + info.address.substring(40,44)
					info.total_reward = res.data.data.invite.length*100000 + 400000
					info.invite_num = res.data.data.invite.length
				    _this.searchdata = [info];
				})
			},
		      tableRowClassName({row, rowIndex}) {
		        if (rowIndex % 2 == 0) {
		          return 'warning-row';
		        } else {
		          return 'success-row';
		        }
		        return '';
		      },
			  checkmeta:function(index){
				  
				  if(index == 0){
					  this.meta_index = index;
				  }else{
					  this.sortBygroup()
				  }
			  },
			  sortBygroup:function(){
				  if(this.list2.length > 0){
					  this.meta_index = 1;
					  return
				  }
				  var _this = this;
				  this.$http({
				  	method: 'get',
				  	url: requestApi + 'getGroupdata',
				  	headers: {
				  		'Content-Type': 'application/x-www-form-urlencoded'
				  	},
				  	params: {
				  		'page': 0
				  	}
				  }).then((res) => {
					  var list = res.data.data;
					  list.sort(function(a,b){
						  return b.num - a.num
					  })
					  list.forEach((item,index)=>{
						  item.index = index + 1
					  })
					  _this.list2 = list
					  
					  _this.meta_index = 1;
			      })
			  },
		    },
		
	}
</script>

<style>
	 .el-table .warning-row {
	    background: #fff;
		
	  }
	.el-table{
		font-size:12px;
	}
	  .el-table .success-row {
	    background: #FFF8F9;
	  }
	
	  .el-table td, .el-table th.is-leaf{
		  border: none;
		  color: #9D2435;
	  }
	  .el-table th.is-leaf{
	  	color: #B29B9D;
	  }
	  .active-tab{
		  color: #FF6C80;
		  font-weight: bold;
	  }
	  .el-pagination.is-background .el-pager li{
		  background: #fff;
		  color: #FF6C80;
	  }
	  .el-pagination.is-background .el-pager li:not(.disabled).active{
		  background: #FF6C80;
	  }
</style>
<style scoped="scoped">
	.el-table th{
		background: #fff!important;
	}
	input::-webkit-input-placeholder {
		/* WebKit, Blink, Edge */
		
		color: #ccc;
	}
	input:-moz-placeholder {
		/* Mozilla Firefox 4 to 18 */
		
		color: #ccc;
	}
	input::-moz-placeholder {
		/* Mozilla Firefox 19+ */
		
		color: #ccc;
	}
	input:-ms-input-placeholder {
		/* Internet Explorer 10-11 */
		
		color: #ccc;
	}
	.coop-list{
		    color: #9D2435;
		    font-size: 16px;
		    text-align: left;
		    background: #fff;
		    box-shadow: 0 0 10px rgb(253 167 167 / 40%);
		    border-radius: 15px;
			position: relative;
			top: -80px;
			margin: 0 15px 30px 15px;
	}
	.coop-header{
		color: #8F7074;
		line-height: 50px;
		border-bottom: solid 1px #F0E1E2;
		padding: 0 25px;
		font-size: 14px;
	}
	.coop-content{
		padding: 25px 20px 10px 20px;
		font-size: 14px;
		line-height: 25px;
	}
	.coop-content>div{
		display: flex;
		align-items: center;
	}
	.user-wx{
		display: flex;
		justify-content: center;
		align-items: center;
		width: 100%;
		height: 130px;
		color: #FF6C80;
		margin-top: 20px;
		font-size: 14px;
	}
	.all{
		display: flex;
		justify-content: center;
		align-items: center;
		height: 250px;
	}
	.user-wx>div{
		width: 30%;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: space-between;
		height: 50%;
	}
	.earn-single{
		background: rgba(255, 108, 128, 0.2);
		border-radius: 16px 0 20px 0;
		padding: 5px 20px;
		display: inline-block;
		color: #FF6C80;
		font-size: 14px;
		position: absolute;
		top: 0;
		left: 0;
	
	}
	.big-font{
		font-size: 22px;
		font-weight: bold;
	}
	.underline{
		height: 2px;
		background: #FF6C80;
		width: 100%;
		position: absolute;
		bottom: 0;
	}
</style>
