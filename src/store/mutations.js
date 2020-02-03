// action 的 commit() 触发,更新state.js
// mutation 必须是同步函数, 同步有利于 devtools 调试
import {
	HOME_SLIDE,
	HOME_NAV,
	HOME_SHOP_LIST
} from './mutation-type.js'
export default {
	// 提交mutation, 更改state
	[HOME_SLIDE](state, { homeSlide	}) { // 第二个参数来自action.js的提交
		state.homeSlide = homeSlide
	},
	[HOME_NAV](state, { homeNav	}) {
		state.homeNav = homeNav
	},
	[HOME_SHOP_LIST](state, { homeShopList	}) {
		state.homeShopList = homeShopList
	}
}
