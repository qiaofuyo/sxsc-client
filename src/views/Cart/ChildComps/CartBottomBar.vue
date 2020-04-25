<template>
	<div class="cart-bottom-bar">
		<check-button
			class="checkButton"
			:is-checked='isSelectAll'
			@click.native='clickCheck'/>
		<div class="checkText">全选</div>
		<div class="total">合计：￥{{totalPrice}}</div>
		<div class="calculate" @click="clickSettlement">结算({{checkLength}})</div>
	</div>
</template>

<script>
	import CheckButton from 'components/CheckButton/CheckButton.vue'
	
	import { mapGetters } from 'vuex'
	
	export default {
		name: 'CartBottomBar',
		components: {
			CheckButton
		},
		computed:{
			...mapGetters(['cartList']),
			// 计算选中商品的价格
			totalPrice(){
				return this.cartList.filter(item => {
					return item.checked		// 返回满足条件的元素，返回值放进数组
				}).reduce((preValue, item) => {		// 累加器（接收初始值， 当前元素）
					return preValue + item.goods_price * item.goods_buy_count
				}, 0).toFixed(2)		// 累加器初始值为0, 保留两位小数
			},
			// 计算选中商品的数量
			checkLength(){
				return this.cartList.filter(item => item.checked).length
			},
			// 是否处于全选状态
			isSelectAll(){
				if(this.cartList.length === 0) return false
				return !(this.cartList.find(item => !item.checked))
			}
		},
		methods: {
			// 点击全选时的动作
			clickCheck() {
				if (this.isSelectAll) {  // 处全选状态时
					this.cartList.forEach(item => item.checked = false)
				} else {  // 处于非全选状态时
					this.cartList.forEach(item => item.checked = true)
				}
			},
			// 点击结算
			clickSettlement(){
				if (!this.cartList.find(item => item.checked)) {
					this.$toast.show('请选择购买的商品')
					return
				}
				// 跳转至订单页
				// 整合即将购买的商品信息——筛选出选中的商品
				let buy = this.cartList.filter(item=>{
					return item.checked
				})
				this.$router.push({
					name: 'settlement',
					params: {buy}
				})
			}
		},
	}
</script>

<style lang="stylus" scoped>
	.cart-bottom-bar
		width 100%
		height 2.75rem
		line-height 2.75rem
		font-size .9rem
		background-color #ededed;
		display flex
		position fixed
		bottom 49px
		.checkButton
			width 1.5rem
			margin-left 1rem
		.checkText
			width 2.25rem
			margin-left 0.5rem
		.total
			flex 1
			margin-left .75rem
		.calculate
			width 7.5rem
			background-color red
			color white
			text-align center
			font-weight bold
			font-size 1rem
</style>
