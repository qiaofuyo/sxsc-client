<template>
	<div id="cart">
		<!-- 头部 -->
		<nav-bar class="nav-bar">
			<template v-slot:center>购物车({{cartLength}})</template>
			<template v-slot:right><div @click='clickEmpty'>清空</div></template>
		</nav-bar>
		
		<!-- 购买商品列表 -->
		<cart-list v-if="userInfo._id && cartLength>0" />
		<div v-else class="empty-cart">
			<img src="./imgs/empty.png" alt="空购物车">
			<div class="title">购物车空空滴〜</div>
		</div>
		
		<!-- 底部汇总 -->
		<cart-bottom-bar v-if="userInfo._id"/>
		
		<!-- 返回顶部 -->
		<!-- <back-top @click.native='backClick' v-show="isBackTop" /> -->
	</div>
</template>

<script>
	import NavBar from 'components/NavBar/NavBar.vue'
	import CartList from './ChildComps/CartList.vue'
	import CartBottomBar from './ChildComps/CartBottomBar.vue'
	
	// 导入混入
	// import {backTopMixin} from 'common/mixin.js'
	// 导入辅助函数
	import { mapGetters, mapState, mapActions } from 'vuex'
	
	export default {
		name: 'Cart',
		// mixins: [backTopMixin],
		components:{
			NavBar,
			CartList,
			CartBottomBar
		},
		computed: {
			...mapGetters(['cartLength']),
			...mapState(['userInfo'])
		},
		methods: {
			...mapActions(['emptyCart']),
			clickEmpty() {
				this.emptyCart().then(res=>{
					this.$toast.show(res)
				})
			}
		},
	}
</script>

<style scoped lang="stylus">
	#cart
		background-color #f5f5f5;
		height 100vh
		// height 92vh
		.nav-bar
			background-color white
			font-size 1.2rem
		// 空购物车
		.empty-cart{
      display: flex;
      flex-direction: column;
      justify-content: center;
			margin-top 50px
      img {
        padding-top: 2rem;
        width: 50%;
        height: 8rem;
        margin: 0 auto;
      }
      .title {
        text-align: center;
        padding: 0.5rem;
      }
		}
</style>
