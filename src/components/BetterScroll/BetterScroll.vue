<!-- 屏幕滚动 -->
<template>
	<div class="wrapper" ref='wrapper'>
		<div class="content">
			<slot></slot>
		</div>
	</div>
</template>

<script>
	import BScroll from 'better-scroll'

	export default {
		name: 'BetterScroll',
		props:{
			probeType:{
				type: Number,
				default: 3
			},
		},
		data() {
			return {
				scroll: null,
			}
		},
		mounted() {
			// 创建BScroll对象
			this.$nextTick(() => {
				this.scroll = new BScroll(this.$refs.wrapper, {
					probeType: this.probeType,
					click: true,
					startX: 0,
					startY: 0,
					// scrollX: true,
				})
				// 监听滚动的位置
				this.scroll.on('scroll',(position)=>{  // 参数positon是内置的
					// console.log(position)
					this.$emit('scroll', position)
				})
			})
		},
		methods: {
			// 滚动到(x, y)
			scrollTo(x, y, time = 500) {
				this.scroll && this.scroll.scrollTo(x, y, time)
			},
			// 滚动到目标元素
			scrollToElement(el, time=500, offsetX=false, offsetY=false){
				// console.log('这是封装的');
				// console.log(this);  // <=> this.$refs.scroll
				// console.log(this.scroll); // <=> this.$refs.scroll.scroll  <=> 这个是原型链上的方法，下面的是写在封装里的方法
				// console.log(this.scroll.scrollToElement);  // <=> this.$refs.scroll.scroll.scrollToElement
				this.scroll && this.scroll.scrollToElement(el, time, offsetX, offsetY)
			},
			// 刷新
      refresh() {
        this.scroll && this.scroll.refresh()
      },
		},
	}
</script>

<style scoped lang="stylus">
	.wrapper
		height 100%
		// height 100vh
</style>
