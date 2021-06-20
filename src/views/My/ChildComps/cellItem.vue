<template>
	<div class="cellItem" @click="clickItem">
		<!-- 主体 -->
		<div class="cell-title">{{leftTitle}}</div>
		<input type="text" disabled='disabled' class="cell-content" v-model.lazy="rightInfo">
		<img src="../imgs/jiantouyou.svg" class="cell-arrows" v-show='isShowArrows' />
		
		<!-- 弹出层组件外套div并监听click事件是为了阻止事件冒泡（已改为在弹出层的各组件中使用.stop），不使用 .stop 修饰符会冒泡触发祖辈元素的 @click="clickItem"；另，原声阻止事件冒泡采用 $event.cancelBubble=true  -->
		<!-- 修改个人资料弹出层 -->
		<!-- <div @click.stop=""> -->
			<!-- 修改昵称 -->
			<field v-show="isShowField" :right-content='rightContent' @click-right='clickRight' />
			<!-- 修改性别 -->
			<action-sheet v-show="isShowActionSheet" @click-right='clickRight' />
			<!-- 修改生日 -->
			<calendar v-show="isShowCalendar" @click-right='clickRight' />
		<!-- </div> -->
	</div>
</template>
					<!-- :class="{selectedItem: currentIndex==index}" -->
<script>
	import field from './UiComponents/Field.vue'
	import actionSheet from './UiComponents/ActionSheet.vue'
	import calendar from './UiComponents/Calendar.vue'
	
	// 事件总线
	import {EventBus} from 'common/EventBus.js'
	
	export default {
		name: 'cellItem',
		components:{
			field,
			actionSheet,
			calendar
		},
		data() {
			return {
				rightInfo: this.rightContent,  // 保存父组件传入的右侧内容
				name: '',  // 所点击行的英文标题
				
				isShowField: false,  // 修改昵称弹出层
				isShowActionSheet: false  ,// 修改性别弹出层
				isShowCalendar: false  ,// 修改生日弹出层
			}
		},
		props:{
			title: Array,  // 左侧标题集合
			leftTitle: {type:String, default:'--'},  // 每行的左标题
			rightContent: {type:String, default:'未填写'},  // 右内容
			// isShowArrows: {type:Boolean, default:true},  // 显示箭头
			
			nameTitle: String,  // 要编辑行的左标题，跟store中键对应
			isCompile: Boolean  // 能否编辑
		},
		computed:{
			// 是否显示右侧箭头
			isShowArrows(){
				if(!this.isCompile) return false
				// (this.leftTitle===this.title[1] || this.leftTitle===this.title[3] || this.leftTitle===this.title[4]) ? true : false  // 不知道为什么用三目会报错，说是返回的值有问题 ？
				if (this.leftTitle===this.title[0] || this.leftTitle===this.title[2] || this.leftTitle===this.title[3]) return true
				return false
			}
		},
		methods:{
			// 允许修改的话显示修改界面，否则弹出提示
			clickItem(){
				if(!this.isCompile) return this.$toast.show('处于只读状态', 800)
				switch (this.leftTitle){
					case this.title[0]:
						this.name = this.nameTitle
						this.isShowField = true
						break;
					case this.title[2]:
						this.name = this.nameTitle
						this.isShowActionSheet = true
						break;
					case this.title[3]:
						this.name = this.nameTitle
						this.isShowCalendar = true
						break;
					default:
						this.$toast.show('该信息不能修改', 800)
						break;
				}
			},
			// 填写资料
			clickRight(value){
				this.rightInfo = value || this.rightInfo
				this.isShowField = false
				this.isShowActionSheet = false
				this.isShowCalendar = false
				// 暂存填写的资料
				EventBus.$emit('sureToModify', this.name, value)
			},
		},
	}
</script>

<style lang="stylus" scoped>
	.cellItem{
		background-color #ffffff;
		display: flex;
		width: 100%;
		font-size: 16px;
		line-height: 27px;
		overflow: hidden;
		color: #323233;
		box-sizing: border-box;
		padding: 10px 16px;
		border-top 1px solid #f5f5f5;
		.cell-title{
			flex 1
			height: 2rem;
			line-height: 2rem;
			color: #323233;
		}
		.cell-content{
			flex 1
			// 解决显示弹出层时右侧内容input标签处于最上层问题
			// 已改为注释掉cellItem.vue中input的position:relative;解决
			// position: relative;
			
			line-height: 2rem;
			text-align: right;
			overflow: hidden;
			vertical-align: middle;
			color: #969799;
			
			// border none
			border 0  // 去除未选中状态边框
			outline none // 去除选中状态边框
			background-color rgba(0, 0, 0, 0);// 透明背景
		}
		.cell-arrows{
			width 7%
			margin-left 5px
		}
	}
</style>
