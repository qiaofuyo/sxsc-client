<template>
	<div id="home">
		<!-- 头部 -->
		<div class="head">
			<!-- 选择位置，搜索框 -->
			<!-- 轮播图 -->
			<home-swiper-container />
		</div>
		<!-- 中间导航 -->
		<!-- <home-nav /> -->
		<!-- 商品列表 -->
		<!-- <home-shop-list /> -->
	</div>
</template>

<script>
	// 导入组件
	import HomeSwiperContainer from './HomeSwiperContainer.vue'
	// import HomeNav from './HomeNav.vue';
	// import HomeShopList from './HomeShopList.vue';

	export default {
		name: 'Home',
		components: {
			HomeSwiperContainer,
			// HomeNav,
			// HomeShopList
		},
		mounted() {
		// 	// 分发action——请求首页轮播图
			this.$store.dispatch('reqHomeSlide')
		// 	// 分发action——请求首页导航
		// 	this.$store.dispatch('reqHomeNav'),
		// 	// 分发action——请求首页商品列表
		// 	this.$store.dispatch('reqHomeShopList')
		}
	}
</script>

<style scoped lang="stylus">
	#home
		background-color #f5f5f5
		.head
			width 100%
			height 15rem
			background-image url(imgs/backImage.png)
</style>
