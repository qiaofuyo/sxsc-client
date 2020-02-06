<template>
	<div class="home-shop-list">
		<div class="shop-list">
			<div class="shop-list-item" v-for="shoplist in homeshoplist_data" :key="shoplist._id">
				<img :src="shoplist.image_url" :alt="shoplist.name">
				<p class="list-item-title">{{shoplist.name}}</p>
				<p class="list-item-subtitle">{{shoplist.describe}}</p>
				<div class="price">
					<span class="item-price1">{{shoplist.price}}</span>
					<span class="item-price2">{{shoplist.origin_price}}</span>
				</div>
				<div class="item-buy">
					<img src="./imgs/cart.svg" alt="">
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	// import {mapState} from 'vuex'
	
	export default {
		name: 'HomeShopList',
		props:{
			homeshoplist_data: Array
		},
		computed:{
			// ...mapState(['homeShopList'])
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
		padding-bottom: .5rem;
		position: relative;
		img{
			width: 100%;
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
	.price{
		padding-left: .5rem;
	}
	.item-price1 {
		color: #f37078;
		font-size: 1.3rem;
	}
	.item-price2 {
		text-decoration: line-through;
		color: #999;
		font-size: .9rem;
	}
	.item-buy {
		width: 2rem;
		height: 2rem;
		background-color: #75a342;
		border-radius: 100%;
		position: absolute;
		right: .6rem;
		bottom: .6rem;
		text-align:center;
		img{
			width: 60%;
			height: 100%;
		}
	}
</style>