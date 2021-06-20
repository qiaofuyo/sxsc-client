<template>
	<div class="waitForReceiving">
		<!-- 头部 -->
		<nav-bar class="nav-bar">
			<template v-slot:left>
				<div class="titleBack" @click="onClickLeft">
					<img src="../imgs/fanhui.svg" alt="">
				</div>
			</template>
			<template v-slot:center>待收货</template>
			<template v-slot:right>
				<div class="refresh" @click="onClickRight">
					<img src="../imgs/shuaxin.svg" alt="">
				</div>
			</template>
		</nav-bar>
		
		<!-- 主体 -->
		<better-scroll class="scroll">
			<ul class="items">
				<!-- 订单信息 -->
				<li v-for="(item, index) of receivingList[0]" :key="index" v-if="item.order_status!=='已收货'">
					<div class="head">
						<span>订单编号：{{item.order_id}}</span>
						<span class="right" :class="{statusColor:item.order_status==='已发货'}">{{item.order_status}}</span>
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
						<span class="right" @click='statusClick(item._id)' v-show="item.order_status==='已发货'">确认收货</span>
					</div>
				</li>
			</ul>
		</better-scroll>
	</div>
</template>

<script>
	import NavBar from 'components/NavBar/NavBar.vue'
	import BetterScroll from 'components/BetterScroll/BetterScroll.vue'
	
	import { mapGetters, mapActions, mapState } from 'vuex'
	
	export default {
		name: 'waitForReceiving',
		components: {
			NavBar,
			BetterScroll
		},
		computed: {
			...mapState(['userInfo']),
			...mapGetters(['receivingList'])
		},
		methods: {
			...mapActions(['confirmReceipt']),
			// 刷新
			onClickRight(){
				this.$store.dispatch('getUserInfo')  // 自动登陆
			},
			// 返回
			onClickLeft(){
				this.$router.back()
			},
			// 点击确认收货
			statusClick(id){
				this.confirmReceipt({order_id: id, user_id: this.userInfo._id}).then(res=>{
					if(res.status_code !== 200) return this.$toast.show('确认收货失败', 700)
					this.$toast.show('确认收货成功', 800)
				})
			}
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
		.refresh{
			padding-top 0.5rem
			img{
				width 45%
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
				
				span:last-child{
					color orangered;
				}
				
				span.statusColor{
						color #e6a23c;
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
