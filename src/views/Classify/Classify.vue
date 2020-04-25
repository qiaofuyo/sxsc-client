<template>
	<div id="classify">
		<!-- 搜索栏 -->
		<nav-bar class="navbar">
			<template v-slot:center>
				<Search :isSearchMenu='isSearchMenu' />
			</template>
		</nav-bar>
		<!-- 搜索栏蒙版 -->
		<search-menu v-if="isSearch" :isSearchMenu='isSearchMenu' />
		<!-- 主体内容 -->
		<div class="bodyClassify">
			<!-- 左边一级分类 -->
			<left-classify :primary_classify_data='primary_classify_data' @clickLeftList='clickLeftList' :secondary-index='this.secondaryIndex' />
			<!-- 右边二级分类 -->
			<right-classify class="rightClassify" :secondary_classify_data='secondary_classify_data' />
		</div>
	</div>
</template>

<script>
	// 导入组件
	import NavBar from 'components/NavBar/NavBar.vue'
	import Search from './ChildComps/Search.vue'
	import SearchMenu from './ChildComps/SearchMenu.vue'
	import LeftClassify from './ChildComps/LeftClassify.vue'
	import RightClassify from './ChildComps/RightClassify.vue'
	// 导入请求数据的api
	import {
		getPrimaryClassify,
		getSecondaryClassify
	} from 'api/index.js'
	
	export default {
		name: 'Classify',
		components:{
			NavBar,
			Search,
			SearchMenu,
			LeftClassify,
			RightClassify
		},
		computed: {
			homeNavIndex() {  // 首页导航选中第几个
				return this.$route.params.secondaryIndex
			}
		},
		data(){
			return {
				// 是否显示搜索蒙版
				isSearch: false,
				// 主体数据
				primary_classify_data: null,
				secondary_classify_data: null,
				// 一级分类选中第几个
				secondaryIndex: '' || 0
			}
		},
		created() {
			this._initData()
		},
		methods:{
			// 初始化分类数据
			_initData(){
				// 获取一级分类的数据
				getPrimaryClassify().then(res => {
					this.primary_classify_data = res.data
				})
				// 获取二级分类的数据
				getSecondaryClassify(String.fromCharCode(97 + this.secondaryIndex)).then(res => {
					this.secondary_classify_data = res.data[0].cate
				})
			},
			// 获取二级分类的数据 secondary_classify_x
			clickLeftList(index){
				let param = String.fromCharCode(97 + index)
				getSecondaryClassify(param).then(res=>{
					this.secondary_classify_data = res.data[0].cate
				})
			},
			// 改变搜索蒙版状态
			isSearchMenu(flag){
				this.isSearch = flag
			}
		},
		watch: {
			secondaryIndex() {  // secondaryIndex变动时重新获取二级分类的数据
				getSecondaryClassify(String.fromCharCode(97 + this.secondaryIndex)).then(res => {
					this.secondary_classify_data = res.data[0].cate
				})
			},
			homeNavIndex() {
				if(this.homeNavIndex === undefined) return
				this.secondaryIndex = this.homeNavIndex
			}
		},
	}
</script>

<style scoped lang="stylus">
	#classify
		touch-action: none;
		width 100%
		height 92%
		background-color #F5F5F5
		display inline-block
		.bodyClassify
			width 100%
			height calc(100vh - 93px)
			// bottom 8.5%
			overflow hidden
			position absolute
			display flex
			// top 2.75rem
		.navbar
			background-color: white;
			position relative
			z-index 999
</style>
