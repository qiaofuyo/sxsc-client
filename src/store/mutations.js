// mutation 必须是同步函数, 同步有利于 devtools 调试
import {
	GET_USER_INFO,
	RESET_USER_INFO,
	RESET_CART_INFO
	
	// ADD_COUNTER,
	// ADD_TO_CART,
	// UPTETE_CART
} from "./mutation-type.js"

export default {
	// 获取用户信息
	[GET_USER_INFO](state, userInfo){
		// 分离购物车信息
		let v_cart_info = [...userInfo.user_cart_info]  // 拷贝购物车信息
		userInfo.user_cart_info = []  // 赋空，用以存放未支付商品
		userInfo.receiving_goods = []  // 存放已支付但尚未收货的商品
		v_cart_info.forEach( item => {
			if( item.goods_is_pay ) {
				userInfo.receiving_goods.push(item)  // 支付过的商品移到 receiving_goods 中
				return
			}
			item['checked'] = true  // 未支付的商品添加 '选中' 键值对
			userInfo.user_cart_info.push(item)
		})
		
		// 提交
		state.userInfo = userInfo
	},
	
	// 清空用户信息
	[RESET_USER_INFO](state){
		state.userInfo = {}
	},

	// 清空未支付商品信息
	[RESET_CART_INFO](state){
		state.userInfo.user_cart_info = []
	}
	
	// 添加到购物车——版本1：没有调用api，数据不同步至服务端
	// addCart(state, payload) {  // state是store中的state；payload是载荷，即action传来的数据
	// 	// payload新添加的商品
	// 	let oldProduct = null
	// 	for (let item of state.cartList) {
	// 		if (item._id === payload._id) {
	// 			oldProduct = item
	// 		}
	// 	}
	// 	if (oldProduct) {
	// 		oldProduct.count += 1	// 指向已有的商品对象计数count
	// 	} else {
	// 		payload.count = 1
	// 		state.cartList.push(payload)
	// 	}
	// 	// console.log(state.cartList);
	// }
	// 添加到购物车——版本2：没有调用api，数据不同步至服务端
// 	[ADD_COUNTER](state, payload){  // payload是action传来的
// 		payload.goods_buy_count++
// 	},
// 	[ADD_TO_CART](state, payload){
// 		// 默认选中
// 		payload.checked = true
// 		// 添加到购物车列表中
// 		state.cartList.push(payload)
// 	},
// }
	// 添加到购物车——版本3：已整合为获取用户信息
}