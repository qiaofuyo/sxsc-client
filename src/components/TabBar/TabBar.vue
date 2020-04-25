<!-- 底部菜单 -->
<template>
	<div class="bottom-tabbar">
		<div class="tab-item" @click="switchTo('/home')">
			<img :src="'/home'===$route.path?tabBarImgArr[0].selected:tabBarImgArr[0].normal" alt="首页">
			<div :class="{on:$route.path.includes('/home')}">首页</div>
		</div>
		<div class="tab-item" @click="switchTo('/classify')">
			<img :src="'/classify'===$route.path?tabBarImgArr[1].selected:tabBarImgArr[1].normal" alt="分类">
			<div :class="{on:$route.path.includes('/classify')}">分类</div>
		</div>
		<div class="tab-item" @click="switchTo('/cart')">
			<img :src="'/cart'===$route.path?tabBarImgArr[2].selected:tabBarImgArr[2].normal" alt="购物车">
			<div :class="{on:$route.path.includes('/cart')}">购物车</div>
		</div>
		<div class="tab-item" @click="switchTo('/my')">
			<img :src="'/my'===$route.path?tabBarImgArr[3].selected:tabBarImgArr[3].normal" alt="我的">
			<div :class="{on:$route.path.includes('/my')}">我的</div>
		</div>
	</div>
</template>

<script>
	export default {
		name: 'TabBar',
		data() {
			return {
				// 底部导航栏两种状态选中 数组
				tabBarImgArr: [{
						normal: require('./imgs/home_icon.svg'),
						selected: require('./imgs/home_icon (2).svg')
					},
					{
						normal: require('./imgs/fenlei.svg'),
						selected: require('./imgs/fenlei (2).svg')
					},
					{
						normal: require('./imgs/gouwuche.svg'),
						selected: require('./imgs/gouwuche (2).svg')
					},
					{
						normal: require('./imgs/gerenzhongxin.svg'),
						selected: require('./imgs/gerenzhongxin (2).svg')
					}
				]
			}
		},
		methods: {
			// 一级路由相互跳转
			switchTo(path) {
				// console.log(this.$route)		// 当前路由信息
				// console.log(this.$router)		// 全局路由信息
				this.$router.replace(path)
			}
		}
	}
</script>

<style scoped lang="stylus">
	.bottom-tabbar {
		display flex
		background-color #f6f6f6;
		
		position fixed
		left 0
		right 0
		bottom 0
		
		box-shadow 0 -1px 1px rgba(100,100,100,.2);
	}
	
	.tab-item {
		flex 1
		text-align center
		height 49px
		font-size 14px
	}
	
	.tab-item>img {
		width 24px
		height 24px
		margin-top 3px
		margin-bottom 2px
		vertical-align middle
	}
	
	.on {
		color: #3DB964;
	}
</style>
