<!-- 购物车选中按钮 -->
<template>
	<div class="check-button"  :class="{check: isChecked}"></div>
</template>

<script>
	export default {
		name:'CheckButton',
		props: {
			isChecked: {
				type: Boolean,
				default: true
			},
		},
	}
</script>

<style scoped lang="stylus">
	.check-button
		width 1.5rem
		height 1.5rem
		border 1px solid #ccd0d3;
		border-radius 50%
		margin auto 0
		display inline-block
	.check
		background-color #60C680
</style>