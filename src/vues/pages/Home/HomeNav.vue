<template>
	<div class="home-nav">
		<!-- 滚动区域 -->
		<div class="home-nav-content">
			<div class="nav-content-inner">
				<a href="" class="inner-item" v-for="(nav,index) in homeNav" :key="index">
					<img :src="nav.iconurl" alt="" />
					<span>{{nav.icontitle}}</span>
				</a>
			</div>
		</div>
		<!-- 进度条区域 -->
		<div class="home-nav-bottom">
			<div class="home-nav-bottom-inner" :style="innerBarStyle"></div>
		</div>
	</div>
</template>

<script>
	import {mapState} from 'vuex'
	export default {
		name: 'HomeNav',
		data() {
			return {
				// 浏览器长度
				screenW: window.innerWidth || document.documentElement.clientHeight || document.body.clientHeight,
				// 滚动内容的长度
				scrollW:540,
				// 滚动条背景的长度
				bgBarW:300,
				// 滚动条的长度
				barW:0,
				
				// 起点
				startX:0,
				// 记录移动距离
				barMoveWidth:0,
				// 记录结束点
				endFlag:0
			}
		},
		mounted(){
			this.getBottomBarWidth(),
			this.bindEvent()
		},
		methods:{
			// 获取滚动条长度
			getBottomBarWidth(){
				this.barW=this.bgBarW*(this.screenW/this.scrollW)
			},
			// 移动端事件监听
			bindEvent(){
				this.$el.addEventListener('touchstart',this.bandleTouchStart,false)
				this.$el.addEventListener('touchmove',this.bandleTouchMove,false)
				this.$el.addEventListener('touchend',this.bandleTouchEnd,false)
			},
			// 开始触摸
			bandleTouchStart(e){
				// console.log(e)
				// 获取第一个触点
				let touch=e.touches[0]
				// 获取起始点
				this.startX=Number(touch.pageX)
			},
			// 开始移动
			bandleTouchMove(e){
				let touch=e.touches[0]
				// 求出移动的距离
				let moveWidth=Number(touch.pageX)-this.startX
				// 求出滚动条移动的距离
				this.barMoveWidth=-((this.bgBarW/this.scrollW)*moveWidth-this.endFlag)
				// 边界值处理
				if(this.barMoveWidth<=0){ // 左边
					this.barMoveWidth=0
				} else if(this.barMoveWidth>=this.bgBarW-this.barW){ // 右边
					this.barMoveWidth=this.bgBarW-this.barW
				}
			},
			// 触摸结束
			bandleTouchEnd(){
				this.endFlag=this.barMoveWidth
			}
		},
		computed: {
			...mapState(['homeNav']),
			
			innerBarStyle() {
				return {
					width:`${this.barW}px` ,// 获取长度
					left:`${this.barMoveWidth}px` // 滚动条位置
					}
			}
		},
	}
</script>

<style scoped lang="stylus">
	// 首页nav样式
	.home-nav {
		width: 100%;
		height: 185px;
		position: relative;
		background-color: #ffffff;
		padding-bottom: 10px;
		
		// 滚动区域样式 
		.home-nav-content {
			width: 100%;
			overflow-x: scroll;
			overflow-y: scroll;
			.nav-content-inner {
				width: 144%;
				display: flex;
				flex-wrap: wrap;
				.inner-item{
					width: 90px;
					font-size: 1rem;
					color: #666;
					display: flex;
					flex-direction: column; // 主轴方向
					justify-content: center; // 主轴上的对齐方式-垂直居中
					align-items: center; // 交叉轴上如何对齐-水平居中
					text-align: center; // 文本水平居中
					margin-bottom: 10px;
					img{
						width: 70%;
						margin-bottom: 5px;
					}
				}
			}
		}
		.home-nav-content::-webkit-scrollbar{ // 去除默认滚动条效果
			display: none;
		}
		
		// 进度条区域样式
		.home-nav-bottom{
			width: 300px;
			height: 4px;
			background-color: #CCCCCC;
			position: absolute;
			left: 50%;
			margin-left: -150px;
			// bottom: 8px;
			.home-nav-bottom-inner{
				position: absolute;
				// width: 0px;
				// left: 0;
				height: 100%;
				background-color: #75a342;
			}
		}
	}
	
</style>
