<template>
	<nav-bar>
		
		<template v-slot:left >
			<div class="back" @click="onClickLeft">
				<img src="../imgs/fanhui.svg" alt="">
			</div>
		</template>
		
		<template v-slot:center>
			个人资料
		</template>
		
	</nav-bar>
</template>

<script>
	import NavBar from 'components/NavBar/NavBar.vue'
	
	export default {
		name: 'personalDataNavBar',
		components: {
			NavBar
		},
		methods:{
			// 返回
			onClickLeft(){
				this.$router.back()
			},
		}
	}
</script>

<style lang="stylus" scoped>
	.back
		padding-top 0.1875rem
		img
			width 60%
			display block
			margin 0 auto
</style>
