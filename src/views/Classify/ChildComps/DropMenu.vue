<template>
	<div class="dropmenu" v-if="menuDown">
			<ul>
				<li class="titleItem"
					v-for="(item, index) in secondary_classify_data" :key='item.name'
					:class="{selected:currentTitle===index}"
					@click="itemClick(index)"
					>
					{{item.name}}
				</li>
			</ul>
	</div>
</template>

<script>
	export default {
		name: 'DropMenu',
		props: {
			menuDown: Boolean,
			secondary_classify_data: Array,
			currentTitle: Number
		},
		methods:{
			itemClick(index){
				this.$emit('itemClick', index)
			}
		}
	}
</script>

<style scoped="scoped" lang="stylus">
	.dropmenu
		position fixed
		top 5.8rem
		width 100%
		height 100%
		background-color rgba(255, 255, 255, 0.6)
		z-index 2
		ul
			padding: 0.5rem
			display flex
			flex-wrap wrap
			background-color white
			border-bottom 1px solid rgba(7,17,27,0.1)
			.titleItem
				width 4rem
				height 2rem
				line-height 1.8rem
				font-size .65rem
				border 1px solid grey
				border-radius 1rem
				color rgba(0,0,0,0.7)
				margin-right 2rem
				margin-top 0.4rem
				text-align center
			.selected
				background-color rgba(60, 185, 99, 0.1)
				color #3cb963
				border 1px solid #3cb963
</style>