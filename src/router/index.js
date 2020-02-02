import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

// 一级路由
import Cart from '../vues/pages/Cart/Cart.vue';

export default new Router({
	// 一级路由
	routes: [{
			path: '/',
			redirect: '/cart'
		}, {
			path: '/cart',
			name: 'Cart',
			component: Cart
		}
	]
})
