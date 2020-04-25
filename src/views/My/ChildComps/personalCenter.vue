<template>
	<div class="personal-center">
		<!-- 头部 -->
		<nav-bar class="navBar">
			<template v-slot:center>我的</template>
		</nav-bar>
		
		<!-- 个人资料简述 -->
		<!-- 还可以借助router实例方法 router.push() 实现路由导航 -->
		<router-link class="personal" to="/my/personalData" tag="div">
			<div class="realityPersonal">
				<img src="../imgs/touxiang.svg" alt="" class="userPhoto">
				<div class="userText">
					<p class="userName">{{userInfo.user_name}}</p>
					<p class="userPhone">手机号：{{userInfo.user_phone | formatPhone}}</p>
				</div>
			</div>
			<img src="../imgs/jiantouyou.svg" alt="" class="arrows">
		</router-link>

		<!-- 订单 -->
		<div class="indent">
			<div class="item">
				<img src="../imgs/daishouhuo.svg" alt="待收货" @click="clickWaitForReceiving">
				<div>待收货</div>
				<span class="itemLength">{{receivingList[0].length}}</span>
			</div>
			<div class="item">
				<img src="../imgs/daizhifukong.svg" alt="已收货" @click="clickDoneForReceiving">
				<div>已收货</div>
				<span class="itemLength">{{receivingList[1].length}}</span>
			</div>
		</div>
		
		<!-- 退出登录 -->
		<div class="logout" @click="clickLogout">
			退出登录
		</div>
		
		<!-- 匹配到的二级路由 personalData.vue -->
		<router-view class="child-router" />
		
	</div>
</template>

<script>
	import NavBar from 'components/NavBar/NavBar.vue'
	
	import { mapState, mapGetters } from 'vuex'
	
	// 使用 mapActions 辅助函数分发
	// import { mapActions } from 'vuex'
	
	export default {
		name: 'personalCenter',
		components: {
			NavBar
		},
		computed: {
			...mapState(['userInfo']),
			...mapGetters(['receivingList'])
		},
		filters:{
			formatPhone(phone){  // 隐藏中间字段方法：1.substr截取拼接；2.正则替换
				return phone.replace(/^(\d{3})\d{4}(\d{4})$/, '$1****$2')
			}
		},
		methods:{
			// 点击已收货
			clickDoneForReceiving(){
				this.$router.push({name: 'doneForReceiving'})
			},
			// 点击待收货
			clickWaitForReceiving(){
				this.$router.push({name: 'waitForReceiving'})
			},
			
			// 使用 mapActions 辅助函数映射为this.$store.dispatch('logout')
			// ...mapActions(['logout']),
			
			// 退出登录的业务逻辑 => 云端和本地都要清楚用户登录状态
			clickLogout(){
				// 使用 dispatch 分发
				this.$store.dispatch('logout').then(res => {
						this.$toast.show(res, 1000)
						// history
						// this.$router.replace('/my')  // 被提示不允许，但实际上还是实现了 ？
						// this.$router.go(-1)
						this.$router.push({path: 'my'})
				})
				
				// 使用 mapActions 辅助函数分发
				// this.logout().then(res => {
				// 	this.$toast.show(res, 1000)
				// })
				// 替换 history
				// this.$router.replace('/my')
			}
		}
	}
</script>

<style lang="stylus" scoped>
	.personal-center{
		width 100%
		height 100%
		position relative
	}
	// 个人资料简述
	.personal{
		width 100%
		height 100px
		// background-color #eaeaea;
		position relative
		border-bottom 1px solid rgba(100,100,100,0.1)
		.realityPersonal{
			width 94%
			height 60%
			transform translate(3%, 33.3%)
			display flex
			.userPhoto{
				height 100%
			}
			.userText{
				flex 1
				height 80%
				font-size 1.3rem
				transform translateY(12%)
			}
		}
		.arrows{
			position absolute
			right 10px
			bottom 0
			transform translateY(-100%)
		}
	}
	// 订单
	.indent{
		margin 10px 0
		width 100%
		height 80px
		// background-color #ececec;
		border-bottom 1px solid rgba(100,100,100,0.1)
		.item{
			width 60px
			height 50px
			display inline-block
			text-align center
			margin 0 10px
			position relative
			img {
				width 60%
				vertical-align middle
				margin-top 3px
				margin-bottom 2px
			}
			.itemLength{
				font-size 1.2rem
				border-radius 50%
				position absolute
				top -3px
				right -1px
			}
		}
	}
	// 退出登陆
	.logout{
		width 100%
		height 4rem
		line-height 4rem
		text-align center
		background-color #fff;
		border: 1px solid #c8c8c8;
		background-color rgba(200, 200, 200, .2)
		margin-top 30px
	}
	// 匹配到的二级路由
	.child-router{
		position absolute
		top 0
		width 100%
	}
</style>
