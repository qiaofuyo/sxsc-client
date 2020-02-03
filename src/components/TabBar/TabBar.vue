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
						normal: require('../../../static/img/home_icon.svg'),
						selected: require('../../../static/img/home_icon (2).svg')
					},
					{
						normal: require('../../../static/img/fenlei.svg'),
						selected: require('../../../static/img/fenlei (2).svg')
					},
					{
						normal: require('../../../static/img/gouwuche.svg'),
						selected: require('../../../static/img/gouwuche (2).svg')
					},
					{
						normal: require('../../../static/img/gerenzhongxin.svg'),
						selected: require('../../../static/img/gerenzhongxin (2).svg')
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
		height: 8%;
		width: 100%;
		position: fixed;
		left: 0;
		bottom: 0;
		background-color: #ffffff;

		display: flex;
		justify-content: center;

		// align-items: flex-end;
		.tab-item {
			margin: 15px 15px;
			font-size: 1rem;
			align-self: center;
			text-align: center;
			color: #9f9f9f;

			img {
				width: 40%;
			};

			.on {
				color: #75a342;
			}
		}
	}
</style>
