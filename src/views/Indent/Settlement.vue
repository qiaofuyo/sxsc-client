<!-- 填写订单，代支付 -->
<template>
	<div class="settlement">

		<!-- 头部 -->
		<nav-bar class="nav-bar">
			<template v-slot:left>
				<div class="titleBack" @click="onClickLeft">
					<img src="./imgs/fanhui.svg" alt="">
				</div>
			</template>
			<template v-slot:center>确认订单</template>
		</nav-bar>

		<!-- 收货地址 -->
		<div class="shipping-address" v-if="!userInfo.user_receiving[0]" @click='addAddress'>
			<img src="./imgs/tianjia.svg" alt="" class="via">
			<div>选择收获地址</div>
		</div>
		<div class="shipping-address" v-else @click='addAddress'>
			<img src="./imgs/lianxiren.svg" alt="" class="via">
			<div class="address-info">
				<div class="info">
					<span class="name">{{userInfo.user_receiving[0].receiving_name}}</span>
					<span class="phone">{{userInfo.user_receiving[0].receiving_phone}}</span>
				</div>
				<div class="address">{{userInfo.user_receiving[0].receiving_address}}</div>
			</div>
			<img src="./imgs/jiantouyou.svg" alt="" class="arrows">
		</div>
		<router-view class="child-router" />

		<!-- 商品清单 -->
		<better-scroll class="scroll">
			<div class="merch-bill">
				<div class="commodity-item" v-for="(item, index) of goodsInfo" :key='index'>
					<img class="item-img" v-lazy='item.goods_image_url' alt="">
					<div class="item-info">
						<div class="item-title">{{item.goods_name}}</div>
						<div class="info-bottom">
							<div class="item-price left">￥{{item.goods_price}}</div>
							<div class="item-count right">x{{item.goods_buy_count}}</div>
						</div>
					</div>
				</div>
			</div>
		</better-scroll>

		<!-- 提交订单 -->
		<div class="submit-order">
			<div class="total">实付：￥{{totalPrice}}</div>
			<div class="calculate" @click="clickCommit">提交订单</div>
		</div>

	</div>
</template>

<script>
	import NavBar from 'components/NavBar/NavBar.vue'
	import BetterScroll from 'components/BetterScroll/BetterScroll.vue'

	import {
		mapActions,
		mapState
	} from 'vuex'

	export default {
		name: 'Settlement',
		components: {
			NavBar,
			BetterScroll
		},
		data() {
			return {
				// 准备结算的商品
				goodsInfo: this.$route.params.buy
			} 
		},
		computed: {
			...mapState(['userInfo']),
			// 实付
			totalPrice() {
				let price = 0
				for (let item of this.goodsInfo) {
					price += item.goods_price * item.goods_buy_count
				}
				return price.toFixed(2)
			}
		},
		methods: {
			...mapActions(['submitOrder']),
			// 返回
			onClickLeft() {
				this.$router.back()
			},
			// 添加地址
			addAddress() {
				this.$router.push({
					name: 'addAddress'
				})
			},
			// 提交订单
			clickCommit() {
				if (!this.userInfo.user_receiving[0]) return this.$toast.show('请选择收获地址')
				// 同步至服务端
				// let data = [this.userInfo._id]
				// this.goodsInfo.forEach(item => {  // 获取结算商品的_id
				// 	data.push(item._id)
				// })
				// console.log(data);
				// // 发给后端的 data 的格式：data[0] 必须是用户_id，
				// this.submitOrder(data).then(res => {
				// 	this.$toast.show(res)
				// })
				// 重构购物车，增加订单表
				let timestamp = new Date() // 时间戳
				function dateFormat(timestamp) { // 时间戳转日期格式
					let Y = timestamp.getFullYear() + '-';
					let M = (timestamp.getMonth() + 1 < 10 ? '0' + (timestamp.getMonth() + 1) : timestamp.getMonth() + 1) + '-';
					let D = timestamp.getDate() + ' ';
					let h = timestamp.getHours() + ':';
					let m = timestamp.getMinutes() + ':';
					let s = timestamp.getSeconds();
					return Y + M + D + h + m + s;
				}

				let order = {}  // 订单信息
				order.order_id = timestamp.getTime().toString() // 订单编号
				order.already_bought_goods = this.goodsInfo // 已购商品
				order.order_amount = '￥' + this.totalPrice // 订单金额
				order.order_status = '待发货' // 订单状态  1待发货 2待收货 3已收货
				order.order_time = dateFormat(timestamp) // 下单时间
				order.order_buyer = this.userInfo.user_receiving[0].receiving_name // 买家
				order.order_contact = this.userInfo.user_receiving[0].receiving_phone // 联系方式
				order.order_address = this.userInfo.user_receiving[0].receiving_address // 地址
				let data = {
					_id: this.userInfo._id,  // 用户id
					order: order  // 订单信息
				}

				this.submitOrder(data).then(res => {
					this.$toast.show(res)
				})

				this.$router.replace('cart')
			}
		},
	}
</script>

<style scoped lang="stylus">
	// 头部
	.nav-bar {
		background-color #fff;

		.titleBack {
			padding-top 0.1875rem;

			img {
				width 60%;
				display block;
				margin 0 auto;
			}
		}
	}

	// 收获地址
	.shipping-address {
		width 100%;
		align-items center;
		padding 16px;
		border-bottom 1px solid #b9b9b9;

		display flex;

		.via {
			// flex 1
			margin-right 10px;
		}

		.address-info {
			flex 1;

			.info>.name {
				margin-right 20px;
				font-size 1.2rem;
			}

			.info>.phone {
				color #a5a5a5;
				font-size .9rem;
			}

			.address {
				word-wrap break-word;
				word-break break-all;
			}
		}

		.arrows {
			// flex 1
			height 50%;
			margin auto 0;
			margin-left 5px;
		}
	}

	// 匹配到的二级路由
	.child-router {
		position absolute;
		top 0;
		width 100%;
		z-index 2;
	}

	// 商品清单
	.scroll {
		height calc(100vh - 44px - 79px - 48px);
		overflow hidden;
	}

	.merch-bill {
		width 100%;
		margin-top 30px;

		.commodity-item {
			margin 10px 10px;
			border-bottom 1px solid #d4d4d4;

			display flex;

			img {
				width 20%;
			}

			.item-info {
				flex 1;
				color #333333;

				margin auto .5rem;
				margin-bottom 0;

				.item-title {
					width 270px;
					overflow hidden;
					white-space nowrap;
					text-overflow ellipsis;
				}

				.info-bottom {
					height 2rem;
					line-height 2rem;
					margin-top 0.625rem;

					.item-price {
						color orangered;
					}

					.item-count {
						margin-right 10px;
					}
				}
			}
		}
	}

	// 提交订单
	.submit-order {
		width 100%;
		height 3rem;
		line-height 3rem;
		background-color #ededed;

		display flex;
		position fixed;
		bottom 0;

		.calculate {
			width 7.5rem;
			background-color red;
			color white;
			text-align center;
			font-weight bold;
			font-size 1rem;
			position absolute;
			right 0;
		}
	}
</style>
