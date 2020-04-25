<template>
	<div class="searchmenu">
		<!-- 头部 -->
		<div class="search-nav">
			<div class="search-href">
				<img src="../imgs/search.svg" alt="搜索">
				<input type="search" id="mySearch" name="q" placeholder="asd" ref='searchFocus'>
			</div>
			<button class="search-button" @click="isSearchMenu(false)">取消</button>
		</div>
		<!-- 尾部 -->
		<div class="search-content">
			<div class="title">
				<span>——热门搜索——</span>
			</div>
			<ul class="content">
				<li>抽纸</li>
				<li>浴巾可穿</li>
				<li>石榴</li>
				<li>冰箱收纳盒</li>
				<li>富豪卷纸</li>
				<li>毛巾衣服</li>
				<li>菜刀</li>
			</ul>
		</div>
	</div>
</template>

<script>
	export default{
		name:'SearchMenu',
		props: {
			isSearchMenu: Function
		},
		mounted() {
			this.$refs.searchFocus.focus()
		}
	}
</script>

<style scoped lang="stylus">
	.searchmenu
		width 100%
		height 100%
		background-color #FFFFFF
		position fixed
		left 0
		top 0
		z-index 999
		.search-nav
			width 100%
			height 3rem
			border-bottom .01rem solid #e8e9e8;
			background-color white
			display flex
			justify-content center
			align-items center
			.search-href
				background-color #ebebeb;
				width 80%
				height 70%
				border-radius .7rem
				display flex
				align-items center
				margin-right .5rem
				img
					width 7%
					margin-left 1rem
				input
					margin-left .6rem
					font-size 1rem
					border 0
					outline none
					background-color transparent;
			.search-button
				border 0
				outline none
				background-color transparent
		.search-content
			padding .5rem 1.5rem
			.title
				color #AAAAAA
				padding-bottom .3rem
			.content
				color #AAAAAA
				display flex
				flex-direction row
				flex-wrap wrap
				// align-content space-between
				li
					background-color #ededed;
					color #aaaaaa;
					margin 5px 10px
					padding .2rem 1rem
					border-radius 1rem
					font-size .8rem
</style>
