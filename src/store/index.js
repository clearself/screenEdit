import Vue from 'vue'
import Vuex from 'vuex'

import referee from "./referee/index";
import socket from "./socket/index";
Vue.use(Vuex)

const store = new Vuex.Store({
	state: {},
	modules: {
		referee,
		socket
	},
	actions: {

	},
	getters: {

	},
	mutations: {

	}
})
export default store