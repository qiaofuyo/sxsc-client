<template>
  <div class="goodsDetail" v-if="hackReset">
		<!-- 顶部 -->
		<goods-detail-nav-bar @titleClick='titleClick' ref='nav' />
		
		<!-- 主体 -->
		<better-scroll class="detailBody" ref='scroll' @scroll='contentScroll'>
			<!-- 商品展示图 -->
			<div class="image_url" ref='image_url' >
				<img v-lazy=goodsInfo.goods_image_url alt="">
			</div>
			<!-- 商品信息 -->
			<div class="textInfo">
				<p class="list-item-title">{{goodsInfo.goods_name}}</p>
				<p class="list-item-subtitle">{{goodsInfo.goods_describe}}</p>
				<div class="price">
					<span class="item-price1">￥{{goodsInfo.goods_price}}</span>
					<span class="item-price2">￥{{goodsInfo.goods_origin_price}}</span>
					<span class="item-sold">已售：{{goodsInfo.goods_sold}}</span>
					<span class="item-inventory">库存：{{goodsInfo.goods_inventory}}</span>
				</div>
			</div>
			<!-- 参数 -->
<!-- 			<div class="parameter">
				<img src="./imgs/xiangqing.jpg" alt="">
			</div> -->
			<!-- 推荐 -->
			<recommend ref='recommend' />
		</better-scroll>

		<!-- 底部 -->
		<bottom-bar @addCart='addToCart' />
		
		<!-- 返回顶部 -->
		<back-top @click.native='backClick' v-show="isBackTop" />
		
		<!-- Toast 已封装为全局插件形式 -->
		<!-- <toast :message='message' :isShow='isShow' /> -->
 </div>
</template>

<script>
	import GoodsDetailNavBar from './ChildComps/GoodsDetailNavBar.vue'
	import Recommend from './ChildComps/Recommend.vue'
	import BottomBar from './ChildComps/BottomBar.vue'
	// import Toast from 'components/Toast/Toast.vue'
	
	import BetterScroll from 'components/BetterScroll/BetterScroll.vue'
	
	// 混入
	import {backTopMixin} from 'common/mixin.js'
	
	import {mapState} from 'vuex'
	
	export default {
		name:'GoodsDetail',
		components: {
			GoodsDetailNavBar,
			Recommend,
			BetterScroll,
			BottomBar,
			// Toast
		},
		mixins: [backTopMixin],
		computed:{
			...mapState(['recommendInfo'])
		},
		watch:{
			recommendInfo(){
				this.hackReset  = false
				this.goodsInfo = this.recommendInfo
				this.$nextTick(() => {  // 下次更新循环结束后更改，以便通过v-if重置组件
					this.hackReset  = true
				})
			}
		},
		data() {
			return {
				// 保存传入的商品数据
				goodsInfo: this.$route.params,
				// 刷新组件
				hackReset: true
				// Toast参数
				// message: '',
				// isShow: false
			}
		},
		methods: {
			// 详情页顶部导航跳转
			titleClick(index) {
				console.log(this.goodsInfo);
				let detailHeight = [-this.$refs.image_url.offsetTop, -this.$refs.recommend.$el.offsetTop]  // 各部分距离顶部的距离
				this.$refs.scroll.scrollTo(0, detailHeight[index])
			},
			// 详情页顶部导航选中
			contentScroll(position){
				let positionY = -position.y
				// 这样写if性能差，在不断更新0、1
				if (positionY < this.$refs.recommend.$el.offsetTop) {
					this.$refs.nav.currentIndex = '0'
				} else {
					this.$refs.nav.currentIndex = '1'
				}
			},
			// 加入购物车
			addToCart(s){
				// 是否登录
				if(!this.$store.state.userInfo._id) {
					this.$toast.show('请先登录', 800)
					this.$router.push('my')
					return
				}
				// 整合购物车所需信息
				let product = {
					goods_id: this.goodsInfo.goods__id,
					goods_name: this.goodsInfo.goods_name,
					goods_image_url: this.goodsInfo.goods_image_url,
					goods_price: this.goodsInfo.goods_price,
					goods_buy_count: 1
				}
				
				if (s=='left') {  // 点击加入购物车
					this.$store.dispatch('addCart', product).then(res => {
						// 显示toast提示
						// 插件封装方式（Toast）
						this.$toast.show(res, 1500)
						
						// 普通封装方式(导入组件)
						// this.isShow = true
						// this.message = res
						// // let that = this  // 将当前this存放到that供setTimeout获取预期的this
						// setTimeout(function() {		// 使用普通函数能打印正确的值，但与预期效果不一致，使用箭头函数是一致的，为什么（已解决, 方法：1使用变量保存预期this；2使用bind；3使用箭头函数）
						// 	this.isShow = false  // 可能是this指向的问题
						// 	this.message = ''
						// 	// console.log(this);  // 就是this指向问题，普通函数this指向调用它的地方所属的对象，此处this指向Window对象于是无法获取到this.isShow
						// }.bind(this), 1500);
						// 
						// setTimeout(() => {  // 箭头函数在定义时默认指向外层的this，它没有自己this
						// 	this.isShow = false
						// this.message = ''
						// 	console.log(this);  // this指向VueCompnent对象
						// }, 1500)
					})
				} else{  // 点击购买
					this.$store.dispatch('addCart', product).then( () => {
						this.$toast.show('数量+1', 800)
					})
					this.$router.replace('cart')
				}
			},
		},
	}
</script>

<style scoped lang="stylus">
.goodsDetail{
	width 100%
	height calc(100vh - 2.75rem)
	background-color #FFFFFF
	position relative
	z-index 9
}
.detailBody
	overflow hidden
	background-color: #ffffff;
	height 93.5%
	padding-bottom 2.75rem
	
	div
		margin-bottom 1rem
		// border-bottom 1px solid #D1D1D1;
	.image_url
		img
			width 100%
			display block
			margin 0 auto
.textInfo{
	margin 0 1rem
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
	padding-left .5rem
}
.item-sold, .item-inventory{
	float: right;
	color: #e25450;
	line-height: 1rem;
	font-size: 1rem;
	padding-top: 0.625rem;
}
.item-sold{
		padding-left: 1rem;
	}
.parameter>img{
	width: 100%;
	display: block;
	margin: 0 auto;
}
</style>