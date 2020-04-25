<template>
	<!-- 监听click一是为了点击遮罩层位置等价于点击取消，二是为了防止事件冒泡把点击事件传给父组件 -->
	<div class="actiot-sheet" @click.stop="clickShade">
		<div class="options">
			<div v-for="(value, name) in item" :key='name' @click.stop="clickSex(value)">
				{{value}}
			</div>
			<div @click.stop="clickCancel">取消</div>
		</div>
	</div>
</template>

<script>
	export default {
		name: 'ActionSheet',
		data() {
			return {
				item: ['男', '女']
			}
		},
		methods:{
			clickShade(){
				this.$emit('click-right')
			},
			clickSex(value){
				this.$emit('click-right', value)
			},
			clickCancel(){
				this.$emit('click-right')
			}
		}
	}
</script>

<style scoped lang="stylus">
	.actiot-sheet{
		width 100%
		height 100vh
		background-color rgba(0,0,0,.7)
		position absolute
		top 0
		left 0
		// 解决显示弹出层时右侧内容input标签处于最上层问题
		// 已改为注释掉cellItem.vue中input的position:relative;解决
		// z-index 1
	}
	.options{
		width 100%
		// height 24vh
		position absolute
		bottom 0
		background-color #F7F8FA;
		
		display flex
		flex-direction column
		div {
			// flex 1
			width 100%
			height 8vh
			line-height 8vh
			text-align center
			font-size 1.2rem
			background-color #fff;
		}
		div:nth-child(1){
			border-bottom 3px solid #F5F6F8;
		}
		div:nth-child(3){
			margin-top 15px
		}
	}
</style>
