<template>
	<div id="swiper-container">
		<!-- 图片， 通过服务器请求得到的图片 -->
		<div class="swiper-wrapper">
			<!-- key如果修改则重新渲染img，否则复用img -->
			<div class="swiper-slide" v-for="slide in homeslide_data" :key="slide._id">
				<img v-lazy="slide.image_url" :alt="slide.name" :href="slide.goto">
			</div>
		</div>
		<!-- 分页器 -->
		<div class="swiper-pagination"></div>
	</div>
</template>

<script>
	// 导入swiper样式
	import Swiper from 'swiper'
	import 'swiper/css/swiper.css'
	// 导入vuex拿到 state.js 中的状态
	// import {
	// 	mapState
	// } from 'vuex'

	export default {
		name: 'HomeSwiperContainer',
		props: { // 接受父组件传过来的数据
			homeslide_data: Array
		},
		// computed: {
		// 	// ...对象展开运算符——拿到状态中的轮播图图片数据，以供轮播图组件模版使用（数据服务器请求回来的）
		// 	// 辅助函数 mapState 把一个对象或数组里的值转化成计算属性的写法
		// 	...mapState(['homeSlide'])
		// 	// homeSlide() {
		// 	// 	return this.$store.state.homeSlide
		// 	// }
		// },
		mounted() {
			// 初始化轮播图Swiper
			// new Swiper('.swiper-container', {
			// 	loop: true, // 循环模式选项
			// 	// 切换设置
			// 	autoplay: {
			// 		delay: 3000, // 切换间隔
			// 		stopOnLastSlide: false, // 切换到最后一个后不停止自动切换
			// 		disableOnInteraction: false, // 触碰后不停止切换
			// 	},
			// 	// 如果需要分页器
			// 	pagination: {
			// 		el: '.swiper-pagination'
			// 	}
			// });
		},
		watch: {
			homeslide_data() {
				this.$nextTick(() => {
					new Swiper('#swiper-container', {
						loop: true, // 循环模式选项
						// 切换设置
						autoplay: {
							delay: 3000, // 切换间隔
							stopOnLastSlide: false, // 切换到最后一个后不停止自动切换
							disableOnInteraction: false, // 触碰后不停止切换
						},
						// 如果需要分页器
						pagination: {
							el: '.swiper-pagination'
						}
					});
				})
			}
		}
	}
</script>

<!-- 		// 侦听器	homeSlide，一有变化就进行轮播图组件初始化
		// watch: {
		// 	homeSlide() {
		// 		this.$nextTick(() => {
		// 		})
		// 	}
		// } -->
<style scoped lang="stylus">
	#swiper-container
		padding 0 0 .5rem
		width 95%
		height 12rem
		border-radius 0 0 2rem 2rem
		position relative
		overflow hidden
		margin 0 auto
		img
			width 100%
			height 100%
		.swiper-pagination
			position relative
			bottom 1.2rem
</style>
