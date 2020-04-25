<!-- 弹窗插件 -->
<template>
	<div class="toast" v-show="isShow">
			{{message}}			
	</div>
</template>

<script>
	export default {
		name:'Toast',
		// props: {
		// 	message: {
		// 		type: String,
		// 		default: ''
		// 	},
		// 	isShow: {
		// 		type: Boolean,
		// 		default: false
		// 	}
		// },
		data(){
			return {
				message: '',
				isShow: false
			}
		},
		methods: {
			// 显示的内容 和 持续的时间
			show(message='奴家不知道嘎做', duration=1500) {
				this.isShow = true
				this.message = message
				
				setTimeout(()=>{
					this.isShow = false
					this.message = ''
				}, duration)
			}
		}
	}
</script>

<style lang="stylus" scoped>
	.toast
		position fixed
		left 50%
		top 50%
		transform translate(-50%, -50%)
		color #ffffff;
		background-color rgba(0,0,0,.5)
		padding 0.5rem 0.625rem
		z-index 999
		text-align center
</style>
