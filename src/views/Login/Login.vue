<template>
	<div class="login">
		<!-- logo -->
		<div class="logo"></div>
		
		<!-- 表单 -->
		<div class="login-form">
			<!-- 表单导航 -->
			<div class="login-form-tab">
				<div class="tab" :class="{current: loginMode}" @click='clickLoginMode(true)'>
					登陆
				</div>
				<div class="tab" :class="{current: !loginMode}" @click='clickLoginMode(false)'>
					注册
				</div>
			</div>
			
			<!-- 表单内容 -->
			<div class="content" :is='model'
				@registerSucceed='clickLoginMode'
				:registerPhone='registerPhone'></div>
		</div>
		
	</div>
</template>

<script>
	import loginContent from './ChildComps/loginContent.vue'
	import registerContent from './ChildComps/registerContent.vue'
	
	export default {
		name: 'Login',
		components:{
			loginContent,
			registerContent
		},
		data() {
			return {
				loginMode: true,  // 表单导航 true选择登陆，false选择注册
				arr: ['loginContent', 'registerContent'],  // 存放登陆、注册组件名
				model: 'loginContent',  // 展示 登陆 or 注册
				
				registerPhone: '',  // 注册后获得电话
			}
		},
		methods: {
			// 点击表单导航
			clickLoginMode(flag, phone){
				this.loginMode = flag
				if (flag===true) {
					this.model = this.arr[0]
				} else{
					this.model = this.arr[1]
				}
				this.registerPhone = phone
			},
		},
	}
</script>

<style lang="stylus" scoped>
	.login {
		height calc(100vh - 49px);
		background-color #eeeeee;
		font-size: 16px;
		padding: 0;
		list-style: none;
		text-decoration: none;
		margin: 0 auto;
		padding-top: 40px;
	}
	
	.logo {
		font-size: 16px;
		padding: 0;
		list-style: none;
		text-decoration: none;
		width: 244px;
		height: 100px;
		margin: 0 auto 45px;
		background-size: 244px 100px;
		background-image: url('./imgs/a.png');
	}
	
	.login-form {
		font-size: 16px;
		padding: 0;
		list-style: none;
		text-decoration: none;
		margin: 0 auto;
		width: 290px;
		height: 200px;
		display: block;
		background-color #d8d8d8;
	}
	
	.login-form-tab {
		display flex
		padding-bottom: 3px;
		width 100%
		position relative
		.tab{
			height 44px
			line-height 44px
			text-align center
			flex 1
		}
		.current{
			border-bottom 3px solid #3DB964;
		}
	}
</style>