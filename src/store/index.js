// vuex入口
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

import state from './state.js'	// 可以不导入state,下面默认注册不需挂载
import actions from './actions.js'
import mutations from './mutations.js'
import getters from './getters.js'

export default new Vuex.Store({  // 创建一个Vuex Store实例
	state,
	actions,
	mutations,
	getters
})