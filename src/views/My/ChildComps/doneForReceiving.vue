<template>
	<div class="waitForReceiving">
		<!-- 头部 -->
		<nav-bar class="nav-bar">
			<template v-slot:left>
				<div class="titleBack" @click="onClickLeft">
					<img src="../imgs/fanhui.svg" alt="">
				</div>
			</template>
			<template v-slot:center>已收货</template>
		</nav-bar>
		
		<!-- 主体 -->
		<better-scroll class="scroll">
			<ul class="items">
				<!-- 订单信息 -->
				<li v-for="(item, index) of receivingList[1]" :key="index" v-if="item.order_status==='已收货'">
					<div class="head">
						<span>订单编号：{{item.order_id}}</span>
						<span class="right status-color">{{item.order_status}}</span>
					</div>
					<!-- 订单中的商品 -->
					<div class="body" v-for="(i, index) of item.already_bought_goods" :key='index'>
						<img class="item-img" v-lazy='i.goods_image_url' alt="">
						<div class="item-info">
							<div class="item-title">{{i.goods_name}}</div>
							<div class="info-bottom">
								<div class="item-price left">￥{{i.goods_price}}</div>
								<div class="item-count right">x{{i.goods_buy_count}}</div>
							</div>
						</div>
					</div>
					<div class="tail">
						<span>实付款：{{item.order_amount}}</span>
					</div>
				</li>
			</ul>
		</better-scroll>
	</div>
</template>

<script>
	import NavBar from 'components/NavBar/NavBar.vue'
	import BetterScroll from 'components/BetterScroll/BetterScroll.vue'
	
	import { mapGetters } from 'vuex'
	
	export default {
		name: 'doneForReceiving',
		components: {
			NavBar,
			BetterScroll
		},
		computed: {
			...mapGetters(['receivingList'])
		},
		methods: {
			// 返回
			onClickLeft(){
				this.$router.back()
			},
		},
	}
</script>

<style lang="stylus" scoped>
	.waitForReceiving{
		width 100%
		height 100vh
		background-color #f5f5f5;
	}
	// 头部
	.nav-bar{
		background-color #ffffff;
		.titleBack{
			padding-top 0.1875rem
			img{
				width 60%
				display block
				margin 0 auto					
			}
		}
	}
	// 主体
	.scroll{
		height calc( 100vh - 44px)
		overflow hidden
	}
	.items{
		li{
			background-color #fff;
			border-radius 20px;
			margin 10px;
			padding 10px;
			
			.head{
				display inline-block
				margin-bottom 10px
				margin-top 5px
				width 100%
				font-size .9rem
				
				.status-color{
					color #71ca8d;
				}
			}

			.body {
				margin 10px 10px;
				// border-bottom 1px solid #d4d4d4;
			
				display flex;
				
				.item-img {
					width 20%;
					height 20%;
				}
			
				.item-info {
					flex 1;
					color #333333;
					
					margin auto .5rem;
					margin-bottom 0;
			
					.item-title {
						// width 270px;
						width 100%
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
			
			.tail {
				display inline-block
				width 100%
				margin-top 10px
				
				span:nth-child(2){
					border 1px solid orangered;
					font-size .8rem
					padding 3px 10px
					border-radius 30px
					color orangered;
				}
			}
		}
	}
</style>
