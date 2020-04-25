<template>
	<div class="login-content">
		<form action="">
			<ul>
				<li><input type="tel" maxlength="11" placeholder="手机号" v-model='phone'></li>
				<li v-if="pwdMode"><input  type="password" maxlength="6" placeholder="密码" v-model='pwd'></li>
				<li v-else><input type="text" maxlength="6" placeholder="密码" v-model='pwd'></li>
				<li><input type="text" maxlength="4" placeholder="验证码" v-model='captcha'></li>
				<!-- 手机号对错 -->
				<div class="telInput" v-show="isShowTel">
					<img src="../imgs/对.svg" alt="" v-if="phoneRight">
					<img src="../imgs/错.svg" alt="" v-else>
				</div>
				<!-- 密码眼睛 -->
				<div class="pwdInput" v-show="isShowPwd">
					<img src="../imgs/yanjing_bi.svg" alt="" v-if="pwdMode" @click='dealPwdMode(false)'>
					<img src="../imgs/yanjing_kai.svg" alt="" v-else @click='dealPwdMode(true)'>
				</div>
				<!-- 图形验证码 -->
				<img
					src=""
					alt="验证码" class="verificationInput"
					ref='captcha'
					@click="getCaptcha"
					>
			</ul>
		</form>
		<div href="javascript:void(0);" class="go" :class="{meetGo: meet}" @click.prevent="login"> 登 录 </div>
	</div>
</template>

<script>
	// 线上线下基路径
	import {PATH} from '../../../common/OTO.js'

	// import { loginVerify } from 'api/index.js'
	
	import { mapActions } from 'vuex'
	
	export default {
		name:'loginContent',
		data() {
			return {
				phone: this.registerPhone,
				pwd: '',  // 密码
				captcha: '',  // 验证码
				
				pwdMode: true,  // 显示密码——密文
				isShowPwd: true,  // 显示密码眼睛
				
				// userInfo: '',  // 登陆成功后获取到的用户信息
			}
		},
		props:{
			registerPhone:{  //手机号码
				type: String,
				default: ''
			}
		},
		mounted() {  // 添加 时间戳 是为了根据时间去请求接口，这样产生的验证码就不一样
			this.$refs.captcha.src = PATH + '/api/captcha?time=' + Date.now()
		},
		computed: {
			// 手机号输入框非空时显示图标
			isShowTel(){
				if (this.phone) return true
				return false
			},
			// 验证手机号是否合理
			phoneRight() {
				return /^1[3-9]\d{9}$/.test(this.phone)
			},
			// 能否登录
			meet(){
				return this.meetFun()
			}
		},
		methods:{
			...mapActions(['syncUserInfo']),
			// 获取图形验证码
			getCaptcha(){  // 添加 ?time=Date.now() 时间戳是为了根据时间去请求接口，这样产生的验证码就不一样
				this.$refs.captcha.src = PATH + '/api/captcha?time=' + Date.now()
			},
			// 密码显示方式
			dealPwdMode(flag) {
				this.pwdMode = flag
			},
			// 能否登录
			meetFun(){
				if (!this.phoneRight || !this.pwd || !this.captcha) {
					return false
				}
				return true
			},
			// 登陆
			async login(){
				// 前端检验
				// 手机号检验
				if (!this.phone) {
					this.$toast.show('请输入手机号')
					return
				} else if(!this.phoneRight){
					this.$toast.show('请输入正确的手机号')
					return
				}
				// 密码检验
				if (!this.pwd) {
					this.$toast.show('请输入密码')
					return
				} else if(this.pwd.length !== 6){
					this.$toast.show('请输入6位数密码')
					return
				}
				// 验证码检验
				if (!this.captcha) {
					this.$toast.show('请输入验证码')
					return
				} else if(this.captcha.length !== 4){
					this.$toast.show('请输入4位验证码')
					return
				}
				
				// 后端验证码校验——不进行分发，直接
				this.syncUserInfo([this.phone, this.pwd, this.captcha]).then(res=>{
					if(res.status_code === 200) return this.$toast.show('登陆成功', 700)
					this.$toast.show(res.message, 800)
				})
			}
		}
	}
</script>

<style lang="stylus" scoped>
	ul {
		font-size: 16px;
		padding: 0;
		margin: 0;
		list-style: none;
		text-decoration: none;
		background: #fff;
		// height: 150px;
		border-radius: 4px;
		position relative
	
		li {
			font-size: 16px;
			padding: 0;
			margin: 0;
			list-style: none;
			text-decoration: none;
			position: relative;
			border-bottom: 1px solid #eaeaea;
	
			input {
				padding: 0;
				margin: 0;
				list-style: none;
				text-decoration: none;
				width: 273px;
				height: 50px;
				color: #000;
				outline:none;
				border: none;
				background: 0 0;
				padding-left: 15px;
				font-size: 16px;
				
				/* 解决浏览器自动填充时input的默认样式问题 */
				box-shadow: inset 0 0 0 1000px #ffffff!important;
			}
		}
		
		li:last-child{
			// border-bottom none
		}
		
		.telInput{
			position absolute
			right 1rem
			top .5rem
		}
		
		.pwdInput{
			position absolute
			right 1rem
			bottom 3.5rem
		}
		
		.verificationInput{
			position absolute
			right 0rem
			bottom 0rem
			display inline
			height 50px
		}
	}
	
	.go {
		padding: 0;
		margin: 0;
		list-style: none;
		text-decoration: none;
		text-align: center;
		width: 290px;
		height: 45px;
		line-height: 45px;
		background: #afafaf;
		border: none;
		border-radius: 4px;
		color: #fff;
		font-size: 16px;
		margin-top: 15px;
		display: block;
	}
	
	.meetGo{
		background: #146fdf;
	}
</style>
