<template>
	<nav-bar>
		<template v-slot:left>
			<div class="titleBack" @click="onClickLeft">
				<img src="../imgs/fanhui.svg" alt="">
			</div>
		</template>
		<template v-slot:center>
			<div
			v-for="(item, index) in titles"
			:key='index' 
			:class="{active: currentIndex==index}"
			@click="titleClick(index)"
			class="titleItem">
				{{item}}
			</div>
		</template>
	</nav-bar>
</template>

<script>
	import NavBar from 'components/NavBar/NavBar.vue'
	
	export default {
		name: 'GoodsDetailNavBar',
		components: {
			NavBar
		},
		data() {
			return {
				titles: ['商品', '推荐'],
				// titles: ['商品', '参数', '评论', '推荐'],
				currentIndex: 0
			}
		},
		methods:{
			// 返回
			onClickLeft(){
				this.$router.back()
			},
			// 选中指定标题
			titleClick(index){
				this.currentIndex = index
				// 滚动到推荐
				this.$emit('titleClick', index)
			},
		}
	}
</script>

<style lang="stylus" scoped>
	.titleBack
		padding-top 0.1875rem
		img
			width 60%
			display block
			margin 0 auto
	.center
		.titleItem
			display: inline;
			padding: 0 .6rem;
		.active
			color #3CB963
</style>
