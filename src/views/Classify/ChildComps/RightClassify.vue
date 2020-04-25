<template>
	<div class="rightClassify">
		<!-- 可滑动的标题 -->
		<div class="titleFrame" ref='titleFrame'>
			<ul ref='ulContent'>
				<li class="title"
					v-for="(item, index) in secondary_classify_data"
					:key='item.name'
					:class="{selected: currentTitle===index}"
					@click="titleClick(index)"
					ref = 'subTitle' >
					{{item.name}}
				</li>
			</ul>
		</div>
		<!-- 下拉菜单 -->
		<div class="showMenu" @click="menuClick" v-show="isShowDropMenu">
			<img src="../imgs/jiantouxia.svg" class="downMenu" v-if="menuDown" />
			<img src="../imgs/jiantoushang.svg" class="upMenu" v-else />
		</div>
		<!-- 下拉菜单内容 -->
		<drop-menu
			:menuDown='!menuDown'
			:secondary_classify_data='secondary_classify_data'
			:currentTitle='currentTitle'
			@itemClick='itemClick'
		></drop-menu>
		<!-- 商品内容列表 -->
		<div class="r_list">
			<better-scroll :probe-type='3' class="scroll" ref='scroll'>
				<div v-for="(shop, index) in secondary_classify_data" :key='index' >
					<div class="categoryTitle" ref='good'>
						{{shop.name}}
					</div>
					<ul>
						<li class="list_item"
							v-for="(shopItem, index) in shop.products"
							:key='index'
							@click.stop="goToGoodsDetail(shopItem)"
							>
							<div class="list">
								<div class="listImg">
									<img v-lazy=shopItem.image_url alt="">
								</div>
								<div class="listText">
									<p class="name">{{shopItem.name}}</p>
									<p class="describe">{{shopItem.describe}}</p>
									<p class="price">￥{{shopItem.price}}</p>
									<p class="origin_price">￥{{shopItem.origin_price}}</p>
								</div>							
								<div class="listBuy" @click.stop="addToCart(shopItem)">
									<img src="../imgs/cart.svg" alt="">
								</div>
							</div>
						</li>
					</ul>
				</div>
			</better-scroll>
		</div>
	</div>
</template>

<script>
	// 导入滚动组件
	import BScroll from 'better-scroll'
	import DropMenu from './DropMenu'
	
	import BetterScroll from 'components/BetterScroll/BetterScroll.vue'
	
	export default {
		name: 'RightClassify',
		components: {
			DropMenu,
			BetterScroll
		},
		props: {
			secondary_classify_data: Array
		},
		data() {
			return {
				// 二级分类默认选中第0个
				currentTitle: 0,
				// 是否显示下拉箭头
				isShowDropMenu: true,
				// 下拉箭头方向 及 蒙板显示
				menuDown: true,
				flag: true
			}
		},
		mounted() {
			// 组件滚动初始化
			this.$nextTick(()=>{
				// 可滑动的标题
				this._initTitleScroll()
				// 是否显示下拉箭头
				this._isShowDropMenu()
				// 商品列表
				// this._initProductScroll()
			})
		},
		watch: {
			secondary_classify_data () {
				this.currentTitle = 0;
				this.menuDown = true;
				// 初始化更新滑动组件
				this.$nextTick(() => {
					this._initTitleScroll()
					this._isShowDropMenu()
					// this._initProductScroll()
					// 点击一级分类时二级分类商品列表滚到顶部
					this.$refs.scroll.scrollTo(0, 0, 0)
				});
			}
		},
		methods:{
			// 可滑动的标题 滚动初始化
			_initTitleScroll(){
				let contentWidth = 0  // ul初始宽度
				let el = this.$refs.subTitle
				if (el) {  // 如果li标签存在则计算ul总宽度
					for (let i = 0; i < el.length; i++) {
						contentWidth += el[i].clientWidth
					}
				}
				this.$refs.ulContent.style.width = contentWidth + 'px'  // 设置ul宽度（行内样式）
				if (!this.titleScroll) {
					this.titleScroll = new BScroll(this.$refs.titleFrame,{  // new BScroll
						probeType:3,
						click: true,
						scrollX: true
					})
				} else{
					this.titleScroll.refresh()  // 刷新
				}
			},
			// 商品列表 滚动初始化		 @load='_initProductScroll'
			// _initProductScroll(){
			// 	if (!this.productScroll) {
			// 		this.productScroll = new BScroll(this.$refs.r_list,{
			// 			probeType: 3,
			// 			click: true,
			// 			scrollY: true,
			// 		})
			// 	} else{
			// 		// this.productScroll.refresh()
			// 		// 进入默认商品列表滚到顶部
			// 		// console.log(this.productScroll);
			// 		// console.log(this.$refs.good);
			// 		this.productScroll.scrollToElement(this.$refs.good[1],10,false,true)  // 不跳转？
			// 	}
			// },
			// 是否显示下拉箭头 初始化
			_isShowDropMenu(){
				let titleFramewidth = this.$refs.titleFrame.clientWidth
				let ulContentWidth = this.$refs.ulContent.clientWidth
				this.isShowDropMenu = ulContentWidth > titleFramewidth ? true : false
			},
			// 点击可滑动的标题
			titleClick(index){
				this.flag = true
				// 使蒙板消失
				this.menuDown = true
				// 选中指定标题
				this.currentTitle = index
				// 滑至指定标题
				this.titleScroll.scrollToElement(this.$refs.subTitle[index], 300, true)
				// 商品内容列表同步滚动
				// console.log(this.$refs);
				// console.log(this.$refs.scroll); // <=> this
				// console.log(this.$refs.scroll.scroll); // <=> this.scroll  <=> 这个是原型链上的方法，下面的是写在封装里的方法
				// console.log(this.$refs.scroll.scrollToElement); // <=> this.scroll.scrollToElement
				
				this.$refs.scroll.scrollToElement(this.$refs.good[index])  // 滚到指定的目标元素失败？已解决。原因：此处用的是封装的BetterScroll，但没有写该方法（后已写）。
				
				// this.$refs.scroll.scroll.scrollToElement(this.$refs.good[index],500,false,false)  // 第二种方法：直接调用原型链上的方法
				
				// console.log('偏移：' + -this.$refs.good[index].offsetTop);
				// this.$refs.scroll.scrollTo(0, -this.$refs.good[index].offsetTop)  // 第三种方法：滚到指定的位置
			},
			// 点击下拉箭头
			menuClick(){
				this.menuDown = !this.menuDown
			},
			// 处理点击蒙版里面的标题
			itemClick(index){
				this.currentTitle = index
				this.titleClick(index)
				// 蒙板消失
				this.menuDown = true
			},
			// 进入 商品详情页
			goToGoodsDetail(shopItem){
				// 整合商品信息
				let product = {
					goods_id: shopItem._id || '',
					goods_name: shopItem.name,
					goods_describe: shopItem.describe,
					goods_image_url: shopItem.image_url,
					goods_price: shopItem.price,
					goods_origin_price: shopItem.origin_price,
					goods_sold: shopItem.sold,
					goods_inventory: shopItem.inventory
				}
				// 分发
				this.$router.push({
					name: 'goodsDetail',
					params: product
				})
			},
			// 加入购物车
			addToCart(shopItem){
				// 整合商品信息
				let product = {}
				product.goods_id = shopItem._id,
				product.goods_name = shopItem.name,
				product.goods_image_url = shopItem.image_url,
				product.goods_price = shopItem.price,
				product.goods_buy_count = 1
				// 分发
				this.$store.dispatch('addCart', product).then(res => {
					this.$toast.show(res, 800)
				})
			}
		},
	}
</script>

<style lang="stylus" scoped>
	.rightClassify
		flex 1
		// 可滑动导航
		.titleFrame
			background-color #ffffff;
			position fixed
			// width 77.7%
			width 250px
			height 2.8rem
			overflow hidden
			// overflow scroll
			white-space nowrap
			box-sizing border-box
			z-index 2
			.title
				display inline-block
				width auto
				flex 1
				font-size .9rem
				line-height .8rem
				padding 1rem .5rem
			.selected
				color #3cb963
		// 下拉菜单
		.showMenu
			position absolute
			width 28px
			height 2.8rem
			line-height 2.8rem
			right 5px
			z-index 2
			img
				width 100%
				height 100%
		// 商品内容列表
		.r_list
			position relative
			top 2.8rem
			height 100%
			.scroll
				overflow hidden
			.categoryTitle
				width 100%		// 有白边
				box-sizing border-box
				display inline-block
				padding .75rem
				padding-left 0.5rem
				border-left 3px solid #d9dde1
				background-color #F3F5F7
				font-size 0.8rem
				color #93999f
			ul
				.list_item
					padding-bottom .8rem
					border-bottom 1px solid rgba(7, 17, 27, 0.1)
					.list
						box-sizing border-box
						padding-top .5rem
						padding-left .36rem
						display flex
						position relative
						align-items center
						.listImg
							width 40%
							img
								width 100%
						.listText
							padding 0rem .25rem 0 .5rem
							.name
								font-size 0.9rem
								line-height 1rem
								color black
								margin-top 0.5rem
								margin-bottom 0.5rem
							.describe
								font-size .7rem
								line-height 1rem
								color #93999f
								margin-bottom .8rem
							.price
								display inline
								font-size .9rem
								color red
							.origin_price
								display inline
								font-size .75rem
								color #b2b2b2
								text-decoration line-through
								margin-left .5rem
						.listBuy
							// display inline
							width 2rem
							height 2rem
							background-color #3DB964;
							border-radius 100%
							position absolute
							right 1rem
							bottom -0.3rem
							text-align:center
							img
								width 60%
								height 100%
</style>