import Vue from 'vue'
import Router from 'vue-router'

const Home = () =>
	import('../components/Home')
const Nav = () =>
	import('../components/Nav')
Vue.use(Router)

export default new Router({
	// base: '/',
	mode: 'history',
	routes: [{
		path: '/',
		name: 'Nav',
		component: Nav
	}, ],
})