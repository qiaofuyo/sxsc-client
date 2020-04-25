import {
	loginVerify,
	getUserInfo,
	logout,
	
	addShopCart,
	addShopCounter,
	settlement,
	emptyCart,
	
	confirmReceipt
} from '../api/index.js'

import {
	GET_USER_INFO,
	RESET_USER_INFO,
	RESET_CART_INFO
	
	// ADD_COUNTER,
	// ADD_TO_CART,
	// UPTETE_CART
} from "./mutation-type.js"

export default {
	// 手动获取用户信息
	async syncUserInfo({ commit }, data) {
		const result = await loginVerify(data)
		if (result.data.status_code === 200) {
			commit(GET_USER_INFO, result.data.message) // 第二个参数代表要传递的数据，可以不要大括号
			return result.data
		}
		return result.data
	},

	// 自动获取用户信息
	async getUserInfo({ commit }) {
		const result = await getUserInfo()
		if (result.data.status_code === 2) {
			commit(GET_USER_INFO, result.data.message)
		}
	},

	// 退出登录
	async logout({ commit }) {
		const result = await logout()
		if (result.data.status_code === 200) {
			commit(RESET_USER_INFO)
		}
		return result.data.message
	},

// 添加到购物车——没有调用api，数据不同步至服务端
// 	addCart(context, payload) {
// 		// return new Promise((resolve, reject) => {
// 		return new Promise((resolve) => { // async返回一个Promise对象，但这里不需要进行异步操作，为了返回结果所以要new Promise
// 			// console.log(context)  // context内置参数
// 			// payload新添加的商品，由组件传进来的
// 			let oldProduct = null
// 			for (let item of context.state.cartList) {
// 				// bug：有的商品没 _id ?
// 				if (item.goods_id === payload.goods_id) { // 如果新添加的商品已存在购物车中
// 					oldProduct = item
// 				}
// 			}
// 			if (oldProduct) { // 数量+1
// 				// oldProduct.count += 1	// oldProduct指向已有的商品对象计数count
// 				context.commit(ADD_COUNTER, oldProduct)
// 				resolve('当前商品数量+1')
// 			} else { // 添加新的商品
// 				payload.goods_buy_count = 1
// 				// state.cartList.push(payload)
// 				context.commit(ADD_TO_CART, payload)
// 				resolve('添加了新的商品')
// 			}
// 		})
// 	},
// }

	// 添加到购物车——重构，数据同步至服务端
	async addCart({commit, state}, products) {
		products.user_id = state.userInfo._id
		const result = await addShopCart(products)
		if (result.data.status_code === 3 || result.data.status_code === 5) {
			commit(GET_USER_INFO, result.data.updateResults) // 第二个参数代表要传递的数据，可以不要大括号
			return result.data.message
		}
		return result.data.message
	},
	
	// 购物车未支付商品增减
	async addCounter({commit, state}, products){
		products.user_id = state.userInfo._id
		const result = await addShopCounter(products)
		if (result.data.status_code === 1 || result.data.status_code === 3) {
			commit(GET_USER_INFO, result.data.updateResults)
		}
	},
	
	// 提交订单
	async submitOrder({commit}, products) {
		const result = await settlement(products)
		if(result.data.status_code === 1){
			commit(GET_USER_INFO, result.data.message)
			return '支付成功'
		}
		return '支付失败'
	},
	
	// 清空购物车
	async emptyCart({commit, state}){
		let data = {  // 字面量创建对象
			'_id': state.userInfo._id,
			'receiving_goods': state.userInfo.receiving_goods || []
		}
		const result = await emptyCart(data)
		if(result.data.status_code === 1){
			commit(RESET_CART_INFO)
			return '清空购物车成功'
		}
	},
	
	// 确认收货
	async confirmReceipt({commit}, data) {
		const result = await confirmReceipt(data)
		if (result.data.status_code === 200) {
			commit(GET_USER_INFO, result.data.message)
			return result.data
		}
		return result.data
	}
}