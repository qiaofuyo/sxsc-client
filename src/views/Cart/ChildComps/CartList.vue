<template>
	<div class="cartlist">
		<better-scroll class="con" ref='scroll'>
			<cart-list-item v-for="(item, index) of cartList" :key='index' :product='item' />
		</better-scroll>
	</div>
</template>

<script>
	import BetterScroll from 'components/BetterScroll/BetterScroll.vue'
	import CartListItem from './CartListItem.vue'

	import { mapGetters } from 'vuex'

	export default {
		name: 'CartList',
		components: {
			BetterScroll,
			CartListItem
		},
		computed:{
			...mapGetters(['cartList'])
		},
		activated() {
			// 进入组件刷新滚动组件
			this.$refs.scroll.refresh()
		}
	}
</script>

<style lang="stylus" scoped>
	.con
		width 100%
		height calc(100vh - 49px - 89px)  // 视口-TabBar-BottomBar
		overflow hidden
		// background-color rgba(53, 161, 0, .2);
		background-color white
</style>
