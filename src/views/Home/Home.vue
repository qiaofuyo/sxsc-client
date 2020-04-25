<template>
	<div id="home">
		<better-scroll class="content1" ref='scroll' :probe-type='3' @scroll='contentScroll'>

			<!-- 头部 -->
			<div class="head">
				<!-- 地理位置，搜索框 -->
				<nav-bar>
					<template v-slot:left>地图</template>
					<template v-slot:center>搜索栏</template>
					<template v-slot:right>扫一扫</template>
				</nav-bar>
				<!-- 轮播图 -->
				<home-swiper-container :homeslide_data='homeslide_data' />
			</div>

			<!-- 中间导航 -->
			<home-nav :homenav_data='homenav_data' />

			<!-- 商品列表 -->
			<home-shop-list :homeshoplist_data='homeshoplist_data' />

		</better-scroll>

		<!-- 返回顶部 -->
		<back-top @click.native='backClick' v-show="isBackTop" />
	</div>
</template>

<script>
	// 导入组件
	import HomeSwiperContainer from './ChildComps/HomeSwiperContainer.vue'
	import HomeNav from './ChildComps/HomeNav.vue'
	import HomeShopList from './ChildComps/HomeShopList.vue'

	import NavBar from 'components/NavBar/NavBar.vue'
	import BetterScroll from 'components/BetterScroll/BetterScroll.vue'
	// import BackTop from 'components/BackTop/BackTop.vue'

	// 导入混入--返回顶部
	import {
		backTopMixin
	} from 'common/mixin.js'

	// 导入请求数据的api
	import {
		getHomeSlide,
		getHomeNav,
		getHomeShopList
	} from 'api/index.js'

	export default {
		name: 'Home',
		components: {
			NavBar,
			HomeSwiperContainer,
			HomeNav,
			HomeShopList,
			BetterScroll,
			// BackTop
		},
		mixins: [backTopMixin],
		data() {
			return {
				homeslide_data: null, // 轮播图 数据
				homenav_data: null, // 中间导航 数据
				homeshoplist_data: null, // 商品列表 数据
				// // 放入mixin
				// isBackTop: false  // 不显示BackTop
			}
		},
		created() {
			this._initData()
		},
		// 进入组件时滚动至
		activated() {
			if (this.$refs.scroll.scroll !== null) {
				this.$refs.scroll.scrollTo(0, this.saveY, 0) // 失效，有时跳转回来会滚到顶部
				// 进入组件刷新滚动，避免再次进入时无法滚动
				this.$refs.scroll.scroll.refresh()
			}
		},
		// 离开组件时记录滚动位置
		deactivated() {
			this.saveY = this.$refs.scroll.scroll.y
		},
		methods: {
			// 网络请求
			_initData() {
				// 获取轮播图数据
				getHomeSlide().then(res => {
					this.homeslide_data = res.data.message
				})
				// 获取中间导航数据
				getHomeNav().then(res => {
					this.homenav_data = res.data.message
				})
				// 获取商品列表数据
				getHomeShopList().then(res => {
					this.homeshoplist_data = res.data.message
				})
			},
			// 事件监听——迁移至mixin
			// // 返回顶部
			// backClick(){
			// 	this.$refs.scroll.scrollTo(0, 0)
			// },
			// // 是否显示返回顶部按钮
			// contentScroll(position){
			// 	if (position.y < -500) {
			// 		this.isBackTop = true
			// 	} else{
			// 		this.isBackTop = false
			// 	}
			// }
		}
	}
</script>

<style lang="stylus" scoped>
	#home{
		background-color #f5f5f5;
		height 92vh;
	}
	.head{ // 纵向滚动的内容要有高度
		width 100%;
		background-image url(imgs/backImage.png)
	}
	// .content1
	// 	// height calc(92%)
	// 	height 100%
</style>
