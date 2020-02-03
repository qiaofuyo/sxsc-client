<template>
	<div class="home">
		<!-- 1.轮播图 -->
		<home-swiper-container />
		<!-- 2.中间导航 -->
		<home-nav />
		<!-- 3.商品列表 -->
		<home-shop-list />
	</div>
</template>

<script>
	// 导入组件
	import HomeSwiperContainer from './HomeSwiperContainer.vue'
	import HomeNav from './HomeNav.vue';
	import HomeShopList from './HomeShopList.vue';

	export default {
		name: 'Home',
		components: {
			HomeSwiperContainer,
			HomeNav,
			HomeShopList
		},
		mounted() {
			// 分发action——请求首页轮播图
			this.$store.dispatch('reqHomeSlide')
			// 分发action——请求首页导航
			this.$store.dispatch('reqHomeNav'),
			// 分发action——请求首页商品列表
			this.$store.dispatch('reqHomeShopList')
		}
	}
</script>

<style scoped>

</style>
