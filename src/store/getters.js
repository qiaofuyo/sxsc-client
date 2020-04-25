export default {
	// 购物车商品件数
	cartLength(state) {
		if(state.userInfo._id) return state.userInfo.user_cart_info.length
		return 0
	},
	// 购物车未支付商品列表
	cartList(state){
		// 商品列表存在返回商品列表，不存在返回空数组
		return state.userInfo.user_cart_info || []
	},
	
	// 订单列表
	receivingList(state){
		let undone = []  // 待收货
		let done = []  // 已收货
		state.userInfo.user_orders.forEach(item=>{
			if(item.order_status!=='已收货'){
				undone.push(item)
			} else {
				done.push(item)
			}
		})
		return [undone, done]
	}
}