<template>
	<div id="app">
		<!-- 渲染页面 -->
		<!-- <keep-alive exclude="GoodsDetail"> -->
		<keep-alive :include="['Home', 'Classify', 'Cart', 'My']">
			<router-view />
		</keep-alive>
		<!-- 底部导航 -->
		<!-- true不显示，false显示 -->
		<tab-bar v-show='!$route.meta.notShowTabBar' />
	</div>
</template>

<script>
	import TabBar from 'components/TabBar/TabBar.vue'

	export default {
		name: 'App',
		components: {
			TabBar
		},
		mounted(){
			this.$store.dispatch('getUserInfo')  // 自动登陆
		},
	}
</script>

<style>
	@import url("assets/css/base.css");
	/* @import url("../static/css/base.css"); */
</style>
