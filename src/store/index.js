// vuex的入口js
import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

import start from './state.js'
import getters from './getters.js'
import actions from './actions.js'
import mutations from './mutations.js'

export default new Vuex.Store({  // 创建一个Store
	start,
	getters,
	actions,
	mutations
})