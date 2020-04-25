<template>
		<div class="leftClassify">
			<better-scroll class="scroll">
				<ul class="leftList">
					<li class="leftListItem"
							v-for="(value, index) in primary_classify_data"
							:key='value.id'
							:class="{selectedItem: currentIndex==index}"
							@click="clickLeftList(index)"
						>
						<span class="textItem">{{value.name}}</span>
					</li>
				</ul>
			</better-scroll>
		</div>
</template>

<script>
	import BetterScroll from 'components/BetterScroll/BetterScroll.vue'
	
	export default {
		name: 'LeftClassify',
		components: {
			BetterScroll
		},
		props:{
			primary_classify_data: Array,
			secondaryIndex: Number
		},
		// computed: {
		// 	currentIndex() {
		// 		return this.secondaryIndex
		// 	}
		// },
		watch:{
			secondaryIndex(){
				this.currentIndex = this.secondaryIndex
			}
		},
		data(){
			return {
				secondary_classify_data: null,
				currentIndex: this.secondaryIndex
			}
		},
		methods: {
			// async clickLeftList(index) {
			// 	// 改变选中
			// 	this.currentIndex = index
			// 	// 获取对应二级分类的数据 secondary_classify_a
			// 	let param = String.fromCharCode(97 + index)
			// 	await getSecondaryClassify(param).then(res=>{
			// 		this.secondary_classify_data = res.data[0].cate
			// 	})
			// }
			clickLeftList(index) {
				// 改变选中
				this.currentIndex = index
				this.$emit('clickLeftList',index)
			}
		},
	}
</script>

<style scoped lang="stylus">
	.leftClassify
		flex 0.3
		// margin-right: 5px;
		overflow scroll
		display flex
		background-color: #F5F5F5;
		.scroll
			overflow hidden
		.leftListItem
			width 100%
			padding 0.75rem 0
			border-bottom solid 0.01rem #e8e9e8
			.textItem
				color #666666
				line-height 1.25rem
				// font-size 1rem
				border-left solid .2rem transparent
				padding 0.2rem 0.6rem
		.selectedItem
			background-color #fff
			.textItem
				border-left-color: #3cb963;
				font-weight: bold;
				color: #333333;
				font-size 1.1
				font-style italic
</style>
