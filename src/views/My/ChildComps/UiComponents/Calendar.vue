<template>
	<div class="calendar" @click.stop="clickShade">
		<div class="options" @click.stop="">
			<input type="date" v-model="value">
		</div>
	</div>
</template>

<script>
	export default {
		name: 'Calendar',
		data() {
			return {
				value: ''
			}
		},
		methods: {
			clickShade(){
				this.$emit('click-right', this.value)
			}
		}
	}
</script>

<style scoped lang="stylus">
	.calendar{
		width 100%
		height 100vh
		background-color rgba(0,0,0,.7)
		position absolute
		top 0
		left 0
		.options{
			width 100%
			height 8vh
			position absolute
			top 0
			background-color #F7F8FA;
			input[type='date']{
				width 100%
				height 100%
			}
		}
	}
</style>
