<template>
	<div id="home">
		<!-- 头部 => 轮播图 -->
		<div class="head">
			<!-- 选择位置，搜索框 -->
			<!-- 轮播图 -->
			<home-swiper-container :homeslide_data='homeslide_data' />
		</div>
		<!-- 中间导航 -->
		<home-nav :homenav_data='homenav_data' />
		<!-- 商品列表 -->
		<home-shop-list :homeshoplist_data='homeshoplist_data' />
	</div>
</template>

<script>
	// 导入组件
	import HomeSwiperContainer from './HomeSwiperContainer.vue'
	import HomeNav from './HomeNav.vue';
	import HomeShopList from './HomeShopList.vue';
	
	// 导入请求数据的api
	import {
		getHomeSlide,
		getHomeNav,
		getHomeShopList
	} from '../../../api/index.js'

	export default {
		name: 'Home',
		components: {
			HomeSwiperContainer,
			HomeNav,
			HomeShopList
		},
		data() {
			return {
				homeslide_data: [],  // 轮播图组件 数据
				homenav_data: [],  // 中间导航组件 数据
				homeshoplist_data: [],  // 商品列表组件 数据
			}
		},
		created() {
			// 数据初始化
			this._initData();
		},
		methods: {
		// b站拼多多走vuex, 页面首次加载因异步原因组件获取不到数据
		// 分发action——请求首页轮播图
		// this.$store.dispatch('reqHomeSlide')
		// 	// 分发action——请求首页导航
		// 	this.$store.dispatch('reqHomeNav'),
		// 	// 分发action——请求首页商品列表
		// 	this.$store.dispatch('reqHomeShopList')
			// 不走vuex
			async  _initData () {
				const homeslide_data = await getHomeSlide()
				const homenav_data = await getHomeNav()
				const homeshoplist_data = await getHomeShopList()
				if (homeslide_data.message) {
					// 保存 轮播图组件 数据
					this.homeslide_data = homeslide_data.message
					console.log(this.homeslide_data)
				} else {
					console.log('首页轮播图数据没请求到')
				}
				if (homenav_data.message) {
					// 保存 中间导航组件 数据
					this.homenav_data = homenav_data.message
					console.log(this.homenav_data)
				} else {
					console.log('首中间导航数据没请求到')
				}
				if (homeshoplist_data.message) {
					// 保存 商品列表组件 数据
					this.homeshoplist_data = homeshoplist_data.message
					console.log(this.homeshoplist_data)
				} else {
					console.log('首页商品列表数据没请求到')
				}
			}
		}
	}
</script>

<style lang="stylus" scoped>
	#home
		background-color #f5f5f5
		.head
			// margin-top -3rem
			width 100%
			// height 15rem
			background-image url(imgs/backImage.png)
</style>
