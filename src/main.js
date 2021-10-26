import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import axios from 'axios'
// import {Dialog,Col,MessageBox, Message,Popover, Row, Slider, Loading,Notification } from 'element-ui'
import ELEMENT from 'element-ui'
import 'element-ui/lib/theme-chalk/display.css';
import 'element-ui/lib/theme-chalk/index.css';
import store from './store'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

const Home = () =>
	import(/* webpackChunkName: 'home' */ '@/components/Home');
const Unlock = () =>
	import(/* webpackChunkName: 'unlock' */ '@/components/Unlock');
const Mult = () =>
	import(/* webpackChunkName: 'mult' */ '@/components/Mult');
const Reward = () =>
	import(/* webpackChunkName: 'reward' */ '@/components/Reward');
const Invite = () =>
	import(/* webpackChunkName: 'Invite' */ '@/components/Invite');
const cooperate = () =>
	import(/* webpackChunkName: 'cooperate' */ '@/components/cooperate');
const Wechat = () =>
	import(/* webpackChunkName: 'Wechat' */ '@/components/Wechat');
const CreateContract = () =>
	import(/* webpackChunkName: 'CreateContract' */ '@/components/CreateContract');
const CreateRedpacket = () =>
	import(/* webpackChunkName: 'CreateRedpacket' */ '@/components/CreateRedpacket');

const SetPassword = () =>
	import(/* webpackChunkName: 'SetPassword' */ '@/components/SetPassword');
const MyCash = () =>
	import(/* webpackChunkName: 'MyCash' */ '@/components/MyCash');
	
const Mine = () =>
	import(/* webpackChunkName: 'Mine' */ '@/components/Mine');
const Recharge = () =>
	import(/* webpackChunkName: 'Recharge' */ '@/components/Recharge');


const TokenRecord = () =>
	import(/* webpackChunkName: 'TokenRecord' */ '@/components/TokenRecord');

Vue.use(VueRouter)
Vue.use(ELEMENT)
// Vue.use(Dialog)
// Vue.use(Col)
// Vue.use(Row)
// Vue.use(Slider);
// Vue.use(Popover)
// Vue.use(Loading.directive);
// Vue.prototype.$messge = ELEMENT.Message;
// Vue.prototype.$alert = MessageBox.alert;
// Vue.prototype.$loading = Loading;
// Vue.prototype.$notify = Notification;
const routes = [{
	path: '/',
	redirect: 'Reward'
}, {
	path: '/Home',
	name: 'Home',
	component: Home,
	meta: {
		keepAlive: true,
	}
}, {
	path: '/Unlock',
	name: 'Unlock',
	component: Unlock,
	meta: {
		keepAlive: true,
	}
}, {
	path: '/Mult',
	name: 'Mult',
	component: Mult,
	meta: {
		keepAlive: true,
	}
}, {
	path: '/Reward',
	name: 'Reward',
	component: Reward,
	meta: {
		keepAlive: true,
	}
}, {
	path: '/Invite',
	name: 'Invite',
	component: Invite,
	meta: {
		keepAlive: true,
	}
}, {
	path: '/cooperate',
	name: 'cooperate',
	component: cooperate,
	meta: {
		keepAlive: true,
	}
}, {
	path: '/Wechat',
	name: 'Wechat',
	component: Wechat,
	meta: {
		keepAlive: true,
	}
}, {
	path: '/CreateContract',
	name: 'CreateContract',
	component: CreateContract,
	meta: {
		keepAlive: true,
	}
}, {
	path: '/CreateRedpacket',
	name: 'CreateRedpacket',
	component: CreateRedpacket,
	meta: {
		keepAlive: true,
	}
}, {
	path: '/Mine',
	name: 'Mine',
	component: Mine,
	meta: {
		keepAlive: false,
	}
}, {
	path: '/MyCash',
	name: 'MyCash',
	component: MyCash,
	meta: {
		keepAlive: false,
	}
}, {
	path: '/Recharge',
	name: 'Recharge',
	component: Recharge,
	meta: {
		keepAlive: false,
	}
}, {
	path: '/SetPassword',
	name: 'SetPassword',
	component: SetPassword,
	props:true,
}, {
	path: '/TokenRecord',
	name: 'TokenRecord',
	component: TokenRecord,
	meta: {
		keepAlive: false,
	},
	props:true
}]

Vue.prototype.$http = axios;
const router = new VueRouter({
	routes
})
NProgress.configure({     
    easing: 'ease',  // 动画方式    
    speed: 500,  // 递增进度条的速度    
    showSpinner: false, // 是否显示加载ico    
    trickleSpeed: 200, // 自动递增间隔    
    minimum: 0.3 // 初始化时的最小百分比
})

router.beforeEach((to,from,next)=>{
        NProgress.start()
        next()
    })

router.afterEach((to, from) => {
        NProgress.done()
    })
Vue.config.productionTip = false
console.log(App)
Number.prototype.numberFormat = function(c, d, t){
    var n = this, 
    c = isNaN(c = Math.abs(c)) ? 2 : c, 
    d = d == undefined ? "." : d, 
    t = t == undefined ? "," : t, 
    s = n < 0 ? "-" : "", 
    i = String(parseInt(n = Math.abs(Number(n) || 0).toFixed(c))), 
    j = (j = i.length) > 3 ? j % 3 : 0;
   return s + (j ? i.substr(0, j) + t : "") + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + t) + (c ? d + Math.abs(n - i).toFixed(c).slice(2) : "");
 };
new Vue({
	el: '#app',
	store,
	router,
	render: h => h(App),
	components: {
		App
	},
	template: '<App/>'

}).$mount('#app')



