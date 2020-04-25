<template>
	<div class="cart-list-item" @click="checkClick">
		<!-- <div class="item-selector" :class="{check: isChecked}" @click="checkClick"></div> -->
		<check-button class="item-selector" :is-checked="isChecked" />
		<div class="item-img"><img v-lazy="product.goods_image_url" alt="商品图片"></div>
		<div class="item-info">
			<div class="item-title">{{product.goods_name}}</div>
			<div class="info-bottom">
				<div class="item-price left">￥{{product.goods_price}}</div>
				<div class="item-count right">
					<button @click="updataCount(-1)" :disabled="product.goods_buy_count <= 0">-</button>
					<input type="text" disabled="disabled" :value='product.goods_buy_count'>
					<button @click="updataCount(1)">+</button>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import {mapActions} from 'vuex'
	import CheckButton from 'components/CheckButton/CheckButton.vue'
	export default {
		name: 'CartListItem',
		components: {
			CheckButton
		},
		props: {
			product: Object,  // 由CartList渲染购物车商品时传入，是对store中的state的引用（非拷贝）
		},
		computed: {
			// 是否选中
			isChecked() {
				return this.product.checked  // checked属性是mutations添加到购物车时添加的
			}
		},
		methods: {
			...mapActions(['addCounter']),
			// 改变选中状态
			checkClick() {
				this.product.checked = !this.product.checked
			},
			// 购物车商品增减
			updataCount(isAdd){
				let cartAction = {}
				cartAction.goods_name = this.product.goods_name
				cartAction.isAdd = isAdd
				if(this.product.goods_buy_count + isAdd === 0){
					cartAction.isAdd = 0
				}
				this.addCounter(cartAction)
			},
		},
	}
</script>

<style lang="stylus" scoped>
	.cart-list-item{
		width 100%
		display flex
		padding 0.3125rem
		border-bottom 1px solid #ccc;
	}
	.item-selector{
		width 1.5rem
		height 1.5rem
		// justify-content center
		// align-items center
		border 1px solid #ccd0d3;
		border-radius 50%
		margin auto 0
		display inline-block
	}
	.check{
		background-color #60C680;
	}
	.item-img{
		padding 0.3125rem
		img{
			width 5rem
			height 5rem
			display block
		}
	}
	.item-info{
		flex 1
		font-size 1rem
		color #333333;
		height 80%
		margin auto .5rem
		// position relative
		// overflow hidden
		.item-title{
			width 235px
			overflow hidden
			white-space nowrap
			text-overflow ellipsis
		}
		.info-bottom{
			height 2rem
			line-height 2rem
			margin-top 0.625rem
			// position absolute
			// bottom 0.625rem
			// left 0.625rem
			// right 0.625rem
			.item-price{
				color orangered
			}
			.item-count{
				touch-action: none;  // 在被动事件监听器中防止默认值
				input{
					width 2rem
					height 1.5rem
					line-height 1.5rem
					border 0
					text-align: center;
					margin: 0 .5rem;
					font-size: 1rem;
					background-color: #f5f5f5;
				}
				button{
					border none
					background-color transparent
					outline none
				}
			}
		}
	}
</style>
