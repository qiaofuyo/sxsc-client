<template>
	<div class="searchmenu">
		<!-- 头部 -->
<!-- 		<div class="search-nav">
			<div class="search-href">
				<img src="../imgs/search.svg" alt="搜索">
				<input type="search" id="mySearch" name="q" placeholder="抽纸" ref='searchFocus'>
			</div>
			<button class="search-button" @click="isSearchMenu(false)">取消</button>
		</div> -->
		<nav-bar class="search-nav">
			<template v-slot:left>
				<div class="titleBack" @click="isSearchMenu(false)">
					<img src="../imgs/fanhui.svg" alt="">
				</div>
			</template>
			<template v-slot:center>
				<div class="search-href">
					<img src="../imgs/search.svg" alt="搜索">
					<input type="search" id="mySearch" name="q" placeholder="鸡蛋" v-model="goods" ref='searchFocus'>
				</div>
			</template>
			<template v-slot:right>
				<button class="search-button" @click="searchClick">搜索</button>
			</template>
		</nav-bar>
		<!-- 尾部 -->
		<div class="search-content" v-if="shopList.length===0">
			<div class="title">
				<span>——热门搜索——</span>
			</div>
			<ul class="content">
				<li @click='liClick($event)'>豆腐</li>
				<li @click='liClick($event)'>毛豆</li>
				<li @click='liClick($event)'>午餐肉罐头</li>
				<li @click='liClick($event)'>酒</li>
				<li @click='liClick($event)'>大米</li>
				<li @click='liClick($event)'>鲜牛奶</li>
				<li @click='liClick($event)'>鸭锁骨</li>
			</ul>
		</div>
		<!-- 商品列表 -->
		<better-scroll class="content1" ref='scroll' :probe-type='3' @scroll='contentScroll'>
			<home-shop-list :homeshoplist_data='shopList' />
		</better-scroll>
		<!-- 返回顶部 -->
		<back-top @click.native='backClick' v-show="isBackTop && shopList.length!==0" />
	</div>
</template>

<script>
	import NavBar from 'components/NavBar/NavBar.vue'
	import HomeShopList from '../../Home/ChildComps/HomeShopList.vue'
	
	import BetterScroll from 'components/BetterScroll/BetterScroll.vue'
	
	// 导入混入--返回顶部
	import {backTopMixin} from 'common/mixin.js'
	
	export default{
		name:'SearchMenu',
		components: {
			NavBar,
			HomeShopList,
			BetterScroll
		},
		mixins: [backTopMixin],
		props: {
			isSearchMenu: Function
		},
		data() {
			return {
				goods: '',  // 要搜索的商品名称
				shopList: []  // 模糊搜索到的商品
			}
		},
		mounted() {
			this.$refs.searchFocus.focus()
		},
		methods: {
			// 搜索商品
			searchClick() {
				let a = this.goods === '' ? this.$refs.searchFocus.placeholder : this.goods
				this.$store.dispatch('searchGoods', a).then(res => {
					if(res.length === 0) this.$toast.show('没有此商品', 1000)
					this.shopList = res
				})
			},
			// 热门搜索
			liClick(e) {
				this.goods = e.target.innerHTML
				this.searchClick()
			}
		},
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
			
			position fixed
			top 0
			z-index 1
			.titleBack {
				padding-top 0.1875rem;
			
				img {
					width 60%;
					display block;
					margin 0 auto;
				}
			}
			.search-href
				background-color #ebebeb;
				width 67%
				height 70%
				border-radius .7rem
				display flex
				align-items center
				margin-right .5rem
				
				position absolute
				margin-top 0.45rem
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
			position absolute
			top 3rem
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
	.content1 {
		height calc(100vh - 3rem)
		position absolute
		top 3rem
		margin-bottom 3rem
	}
</style>
