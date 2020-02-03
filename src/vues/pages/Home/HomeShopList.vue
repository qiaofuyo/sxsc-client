<template>
	<div class="home-shop-list">
		<div class="shop-list">
			<div class="shop-list-item" v-for="(shoplist,index) in homeShopList" :key="index">
				<img :src="shoplist.image_url" alt="">
				<p class="list-item-title">{{shoplist.goods_title}}</p>
				<p class="list-item-subtitle">{{shoplist.goods_subtitle}}</p>
				<span class="item-price1">{{shoplist.goods_price1}}</span>
				<span class="item-price2">{{shoplist.goods_price2}}</span>
				<div class="item-buy">
					<img :src="shoplist.image_buy" alt="">
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import {mapState} from 'vuex'
	export default {
		name: 'HomeShopList',
		computed:{
			...mapState(['homeShopList'])
		}
	}
</script>

<style scoped lang="stylus">		// 已解决：此组件内外边距方面有问题，导致整体页面可以左划
	.home-shop-list{
		background-color: #f5f5f5;
		width: 100%;
		margin-bottom: 100px;
	}
	.shop-list{
		box-sizing: border-box;
		padding-left: 2%;
		padding-top: 10px;
		display: flex;
		flex-wrap: wrap;
	}
	.shop-list-item{ // 单项
		box-sizing: border-box;
		padding-left: 2%;
		margin-right: 2%;
		width: 48%;
		margin-bottom: 10px;
		background-color: #ffffff;
		padding-bottom: 1.5rem;
		position: relative;
		img{
			width: 30%;
		}
	}
	.list-item-title,.list-item-subtitle{
		box-sizing: border-box;
	}
	.list-item-title {
		padding-left: .5rem;
		font-size: 1rem;
		line-height: 1.5rem;
	}
	.list-item-subtitle {
		padding: .5rem 0 1rem .5rem;
		font-size: .9rem;
		color: grey;
		word-break: break-all;  // 允许在单词内换行
		overflow: hidden;  // 裁剪溢出的内容
		text-overflow: ellipsis;  // 用省略号代表被裁剪内容
		white-space: nowrap;  // 文本不换行
	}
	.item-price1 {
		padding-left: .5rem;
		color: #f37078;
		font-size: 1.3rem;
	}
	.item-price2 {
		text-decoration: line-through;
		color: #999;
		font-size: .9rem;
	}
	.item-buy {
		width: 2.5rem;
		height: 2.5rem;
		background-color: #75a342;
		border-radius: 100%;
		position: absolute;
		right: .7rem;
		bottom: .7rem;
		text-align:center;
		img{
			width: 70%;
			height: 100%;
		}
	}
</style>