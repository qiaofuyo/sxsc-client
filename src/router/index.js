import Vue from "vue"
import Router from "vue-router"
Vue.use(Router)

/**
 * 退出登录进行路由跳转时报错："Navigating to current location ("/my") is not allowed"
 * 原因：在路由跳转的时候同一个路由多次添加是不被允许的
 * 解决方案：1.切换回3.0版本；2.重写路由的push方法
 * */
// 重写路由的 push 方法
const VueRouterPush = Router.prototype.push
Router.prototype.push = function push(to) {
	return VueRouterPush.call(this, to).catch(err => err)
}

// 首页
// import Home from '../views/Home/Home.vue'  // 这种方式会先一次性加载所有路由组件，性能差
const Home = () => import('../views/Home/Home.vue') // 路由懒加载，动态导入，按需加载（js中只有函数会在触发的时候执行）
// 分类
const Classify = () => import('../views/Classify/Classify.vue')
// 购物车
const Cart = () => import('../views/Cart/Cart.vue')
// 我的
const My = () => import('../views/My/My.vue')


// 商品详情页
const GoodsDetail = () => import('../views/GoodsDetail/GoodsDetail.vue')
// 登陆/注册页
const Login = () => import('../views/Login/Login.vue')
// 订单页
const Settlement = () => import('../views/Indent/Settlement.vue')


// 二级路由
// 我的———个人资料页
const personalData = () => import('../views/My/ChildComps/personalData.vue')
// 我的———代收货页
const waitForReceiving = () => import('../views/My/ChildComps/waitForReceiving.vue')
// 我的———已收货页
const doneForReceiving = () => import('../views/My/ChildComps/doneForReceiving.vue')
// 订单———添加地址页
const addAddress = () => import('../views/Indent/ChildComps/addAddress.vue')


export default new Router({
	mode: 'history', // 去掉地址栏的#
	routes: [
		// 根路由重定向
		{
			path: '/',
			redirect: '/home' // 重定向
		},
		// 首页
		{
			path: '/home', // 路由路径
			name: 'home', // 路由名称，命名路由
			component: Home // 路径或名称匹配时调用的组件
		},
		// 分类
		{
			path: '/classify',
			name: 'classify',
			component: Classify
		},
		// 购物车
		{
			path: '/cart',
			name: 'cart',
			component: Cart
		},
		// 我的
		{
			path: '/my',
			name: 'my',
			component: My,
			children: [
				// 个人资料
				{
					path: 'personalData', // 等价于 /my/personalData
					name: 'personalData',
					component: personalData,
					meta: {
						notShowTabBar: true
					} // 不显示底部导航
				},
				// 待收货
				{
					path: 'waitForReceiving',
					name: 'waitForReceiving',
					component: waitForReceiving,
					meta: {
						notShowTabBar: true
					}
				},
				// 已收货
				{
					path: 'doneForReceiving',
					name: 'doneForReceiving',
					component: doneForReceiving,
					meta: {
						notShowTabBar: true
					}
				}
			]
		},
		// 商品详情页
		{
			path: '/goodsDetail',
			name: 'goodsDetail',
			component: GoodsDetail,
			meta: { // 路由元信息，保存必要数据
				notShowTabBar: true, // 不显示底部导航
				// notRetain: true,  // 离开后不保留该组件
			}
		},
		// 登陆/注册页
		{
			path: '/login',
			name: 'login',
			component: Login
		},
		// 订单页/代支付页
		{
			path: '/settlement',
			name: 'settlement',
			component: Settlement,
			meta: {
				notShowTabBar: true
			}, // 不显示底部导航
			children: [
				// 添加地址
				{
					path: 'addaddress',
					name: 'addAddress',
					component: addAddress,
					meta: {
						notShowTabBar: true
					} // 不显示底部导航
				}
			]
		},
	],
})
