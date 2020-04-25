<template>
	<div class="search">
		<a class="search-href" @click.prevent='isSearchMenu(true)' >
			<img src="../imgs/search.svg" alt="搜索">
			<span>输入商品名称</span>
		</a>
	</div>
</template>

<script>
	export default {
		name:'Search',
		props: {
			isSearchMenu: Function
		}
	}
</script>

<style scoped="scoped" lang="stylus">
	.search
		width 100%
		height 43px
		// border-bottom .01rem solid #e8e9e8;
		background-color white
		display flex
		justify-content center
		align-items center
		.search-href
			background-color #ebebeb;
			width 90%
			height 70%
			border-radius .7rem
			display flex
			justify-content center
			align-items center
			img
				width 7%
			span
				padding-left .5rem
				font-size .9rem
				// font-weight lighter
				color #aaaaaa;
</style>
