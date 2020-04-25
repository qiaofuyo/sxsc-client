<template>
	<div class="home-shop-list">
		<div class="shop-list">
			<div class="shop-list-item" 
				v-for="shoplist in homeshoplist_data" :key="shoplist._id" 
				@click="goToGoodsDetail(shoplist)" >
				<!-- 普通方式 -->
				<!-- <img :src="shoplist.image_url" :alt="shoplist.name"> -->
				<!-- 图片懒加载方式 -->
				<img v-lazy="shoplist.image_url" :alt="shoplist.name">
				<p class="list-item-title">{{shoplist.name}}</p>
				<div v-if="isShow">
					<p class="list-item-subtitle">{{shoplist.describe}}</p>
					<div class="price">
						<span class="item-price1">￥{{shoplist.price}}</span>
						<span class="item-price2">￥{{shoplist.origin_price}}</span>
					</div>
					<div class="item-buy" @click.stop="addToCart(shoplist)">
						<img src="../imgs/cart.svg" alt="">
					</div>
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
			homeshoplist_data: Array,
		},
		data() {
			return {
				isShow: true
			}
		},
		computed:{
			// ...mapState(['homeShopList'])
		},
		// 详情页中不显示某部分
		mounted() {
			if (this.$route.name == 'goodsDetail') {
				this.isShow = false
			}
		},
		methods:{
			// 图片加载完刷新
			imageLoad(){
				console.log('-----');
			},
			// 进入 商品详情页
			goToGoodsDetail(shopItem){
				// 整合商品信息
				let product = {
					goods_id: shopItem._id,
					goods_name: shopItem.name,
					goods_describe: shopItem.describe,
					goods_image_url: shopItem.image_url,
					goods_price: shopItem.price,
					goods_origin_price: shopItem.origin_price,
					goods_sold: shopItem.sold,
					goods_inventory: shopItem.inventory
				}
				
				// 判断如何进行分发
				if (this.$route.name == 'goodsDetail') {  // 点击推荐商品
					this.$store.state.recommendInfo = product
				} else{  // 点击非推荐商品
					this.$router.push({
						name: 'goodsDetail',
						// 传递数据组成详情页
						params: product
					})
				}
			},
			// 加入购物车
			addToCart(shopItem){
				let product = {}
				product.goods_id = shopItem._id,
				product.goods_name = shopItem.name,
				product.goods_image_url = shopItem.image_url,
				product.goods_price = shopItem.price,
				product.goods_buy_count = 1
				this.$store.dispatch('addCart', product).then(res => {
					this.$toast.show(res, 1500)
				})
			}
		},
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
		width: 90%;
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
		background-color: #3DB964;
		border-radius: 100%;
		position: absolute;
		right: .4rem;
		bottom: .6rem;
		text-align:center;
		img{
			width: 60%;
			height: 100%;
		}
	}
</style>