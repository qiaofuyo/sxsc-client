<template>
	<div class="field" @click.stop="clickShade">
		<!-- 防止点击输入框时事件冒泡，从而导致遮罩层消失 -->
		<div class="options" @click.stop="">
			<!-- autofocus 自动对焦失败？？ -->
			<input type="text" autofocus='autofocus' maxlength="8" v-model.trim="value">
		</div>
	</div>
</template>

<script>
	export default {
		name: 'Field',
		data() {
			return {
				value: this.rightContent
			}
		},
		props:{
			rightContent: String
		},
		methods:{
			clickShade(){
				this.$emit('click-right', this.value)
			},
		}
	}
</script>

<style scoped lang="stylus">
	.field{
		width 100%
		height 100vh
		background-color rgba(0, 0, 0, .7)
		position absolute
		top 0
		left 0
		// 解决显示弹出层时右侧内容input标签处于最上层问题
		// 已改为注释掉cellItem.vue中input的position:relative;解决
		// z-index 1
		
		.options{
			width 80%
			position relative
			top 30%
			margin 0 auto
			input[type='text']{
				width 100%
				height 2.5rem
				
				font-size 1.5rem
				text-align center
				
				border 0
				outline none
				background-color transparent
				border-bottom 2px solid #ffffff;
			}
		}
	}
</style>
