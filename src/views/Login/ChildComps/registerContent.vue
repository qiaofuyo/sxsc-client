<template>
	<div class="register-content">
		<form action="" autocomplete="on">
			<ul>
				<li><input type="text" maxlength="10" placeholder="用户名" v-model='name'></li>
				<li><input type="tel" maxlength="11" placeholder="手机号" autocomplete="off" v-model='phone'></li>
				<li v-if="pwdMode"><input type="password" maxlength="6" placeholder="密码" autocomplete="new-password" v-model='pwd'></li>
				<li v-else><input type="text" maxlength="6" placeholder="密码" autocomplete="new-password" v-model='pwd'></li>
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
			</ul>
		</form>
		<div class="go" :class="{meetGo: meet}" @click.prevent="register">注 册</div>
	</div>
</template>

<script>
	import { registerVerify } from '../../../api/index.js'
	
	export default {
		name:'registerContent',
		data() {
			return {
				name: '', // 用户名
				phone: '',  //手机号码
				pwd: '', // 密码
				
				pwdMode: true,  // 显示密码——密文
				isShowPwd: true,  // 显示密码眼睛
			}
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
			// 能否注册
			meet(){
				return this.meetFun()
			}
		},
		methods:{
			// 密码显示方式
			dealPwdMode(flag) {
				this.pwdMode = flag
			},
			// 能否注册
			meetFun(){
				if (!this.name || !this.phoneRight || !this.pwd) {
					return false
				}
				return true
			},
			// 注册
			async register(){
				// 前端校验
				// 验证码检验
				if (!this.name) {
					this.$toast.show('请输入用户名')
					return
				}
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

				// 后端校验
				let result = await registerVerify(this.name, this.phone, this.pwd)
				// console.log(result);
				if (result.data.status_code === 0) {
					this.$toast.show(result.data.message)
					return
				} else if (result.data.status_code === 1) {
					this.$toast.show(result.data.message)
					return
				} else if (result.data.status_code === 2) {
					this.$toast.show(result.data.message)
					return
				} else{
					this.$toast.show('注册成功')
					this.$emit('registerSucceed', true, this.phone, this.pwd)
				}
			}
		},
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
				// -webkit-tap-highlight-color: rgba(255, 255, 255, 0);
				width: 273px;
				height: 50px;
				color: #000;
				outline:none;
				border: none;
				background: 0 0;
				padding-left: 15px;
				font-size: 16px;
				-webkit-appearance: none;
			}
		}
		
		.telInput{
			position absolute
			right 1rem
			top 3.8rem
		}
		
		.pwdInput{
			position absolute
			right 1rem
			bottom .5rem
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
