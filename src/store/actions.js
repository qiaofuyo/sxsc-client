// action 通过 store.dispatch 方法触发, 来自components的点击事件(请求数据)
import {
	getHomeSlide,
	getHomeNav,
	getHomeShopList
} from '../api'
import {
	HOME_SLIDE,
	HOME_NAV,
	HOME_SHOP_LIST
} from "./mutation-type.js"

export default {
	// 提交数据到mutations
	// 因为 mutation 必须同步执行, action 不受此约束！
	// 所以可以在 action 内部执行异步操作
	// 即在把 reqHomeSlide 通过 async 设置成异步

	// 1. 请求首页轮播图
	async reqHomeSlide({
		commit
	}) {
		// 在这里必须通过 await 做等待,等待数据请求回来
		const result = await getHomeSlide() // 自调用getHomeSlide获取数据
		// 提交到mutation的同名函数 HOME_SLIDE 中, homeSlide指向请求到的数据result, mutation不能直接接收result
		// console.log(result)
		commit(HOME_SLIDE, {
			homeSlide: result.message.data
		})
	},
	// 2. 请求首页导航
	async reqHomeNav({
		commit
	}) {
		const result = await getHomeNav()
		commit(HOME_NAV, {
			homeNav: result.message.data
		})
	},
	// 3. 请求首页商品列表
	async reqHomeShopList({
		commit
	}) {
		const result = await getHomeShopList()
		commit(HOME_SHOP_LIST, {
			homeShopList: result.message.goods_list
		})
	}
}
