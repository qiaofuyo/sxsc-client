<template>
	<div class="bottom-nav">
		<!-- 加入购物车 -->
		<div class="addToCart" @click="addToCart('left')">
			加入购物车
		</div>
		<!-- 购买 -->
		<div class="buy" @click="addToCart('right')">
			购买
		</div>
	</div>
</template>

<script>
	export default {
		name: 'BottomBar',
		methods: {
			addToCart(s) {
				this.$emit('addCart', s)
			}
		},
	}
</script>

<style lang="stylus" scoped>
	.bottom-nav
		height 2.75rem
		background-color white
		position relative
		// bottom 2.75rem
		display flex
		z-index 10
		.addToCart, .buy
			flex 1
			margin auto
			text-align center
			font-size 1rem
			font-weight bold
			color #60C680
		.addToCart
			border-right 1px solid #000000
</style>
