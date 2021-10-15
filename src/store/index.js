import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex);

const store = new Vuex.Store({
	state: {
		walletAddress: '',
		lang:0,
	},
	mutations: {
		"SET_ADDRESS": function(state, address) {
			state.walletAddress = address;
		},"SET_LANG": function(state, lang) {
			state.lang = lang;
		}
	},
	getters: {

	},
	actions: {}
});

export default store
