import Vue from 'vue'
import Router from 'vue-router'

// 一级路由
import Home from '../vues/pages/Home/Home.vue';
import Classify from '../vues/pages/Classify/Classify.vue';
import Cart from '../vues/pages/Cart/Cart.vue';
import My from '../vues/pages/My/My.vue';

// 二级路由
// import ClassifyA from '../vues/pages/Classify/Children/ClassifyA.vue';
// import ClassifyB from '../vues/pages/Classify/Children/ClassifyB.vue';
// import ClassifyC from '../vues/pages/Classify/Children/ClassifyC.vue';

Vue.use(Router)

export default new Router({
	// 一级路由
	routes: [{
			path: '/',
			redirect: '/home'
		},
		{
			path: '/home',
			name: 'Home',
			component: Home
		},
		{
			path: '/classify',
			name: 'Classify',
			component: Classify,
			// children:[
			// 	// 二级路由
			// 	{path:'/classify',redirect:'/classify/classifya'},
			// 	{path:'classifya',component: ClassifyA},
			// 	{path:'classifyb',component: ClassifyB},
			// 	{path:'classifyc',component: ClassifyC}
			// ]
		},
		{
			path: '/cart',
			name: 'Cart',
			component: Cart
		},
		{
			path: '/my',
			name: 'My',
			component: My
		}
	]
})
