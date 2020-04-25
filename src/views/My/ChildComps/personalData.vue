<template>
	<div class="personalData">
		<!-- 头部 -->
		<personal-data-nav-bar class="top-nav" />
		
		<!-- 主体 -->
		<personal-data-cell v-if="hackCancel" />
		
		<!-- 尾部 -->
		<div class="logout" @click="clickUpdata" v-if="this.compile">修改资料</div>
		<div v-else>
			<div class="logout" @click="sure" >确定</div>
			<div class="logout" @click="cancel" >取消</div>
		</div>
		
		
	</div>
</template>

<script>
	import personalDataNavBar from './personalDataNavBar.vue';
	import personalDataCell from './personalDataCell.vue';
	
	// 事件总线
	import { EventBus } from 'common/EventBus.js'
	
	import { changUserInfo } from 'api/index.js'
	
	export default {
		name: 'personalData',
		components: {
			personalDataNavBar,
			personalDataCell
		},
		data(){
			return {
				compile: true,  // true显示‘修改资料’
				hackCancel: true,  // 要取消编辑的内容时刷新组件
				arguments: {}  // 修改过的信息——通过事件总线sureToModify获取
			}
		},
		methods:{
			// 修改资料
			clickUpdata(){
				// 事件总线——发送事件
				EventBus.$emit('clickCompile', this.compile)
				this.compile = !this.compile
			},
			// 确定修改
			async sure(){
				this.compile = true
				// 拼凑新的用户信息
				let rinse = {...this.$store.state.userInfo}  // 这是深拷贝
				for (let name in this.arguments) {
					rinse[name] = this.arguments[name]
				}
				// 更新服务器————不走vuex
				await changUserInfo(rinse).then(res => {
					let result = res.data
					if (result.status_code === 200) {
						// 更新本地
						this.$store.dispatch('getUserInfo')
						if(Object.keys(this.arguments).length > 0){  // Object.keys()返回键
							this.$toast.show(result.message)
						}
					}else {
						this.$toast.show(result.message)
					}
					// this.arguments = {}  // 放在这里不需要额外增加代码就能解决异步问题
				})
				this.arguments = {}  // 放在这里是存在异步问题的，通过async/await解决
			},
			// 取消修改
			cancel(){
				this.compile = true
				this.hackCancel = false
				// 延迟到下次DOM更新循环结束之后执行
				this.$nextTick(()=>{
					this.hackCancel = true
				})
			}
		},
		mounted(){
			// EventBus.$on('sureToModify', function(name,value){  // 注意普通函数跟箭头函数的 this 取值，这里指向 Vue（_uid: 7）
			// 	console.log(this);
			// 	if(!this.arguments) this.arguments={}
			// 	this.arguments[name]=value  // 因为this指向问题，无法给本组件的数据赋值
			// })
			EventBus.$on('sureToModify', (name, value) => {  // 使用箭头函数 this 指向 VueComponent（_uid: 14）,指向的是本组件
				this.arguments[name]=value
			})
		}
	}
</script>

<style lang="stylus" scoped>
	.personalData{
		background-color #f5f5f5;
		height 100vh
		.top-nav{
			background-color #fff;
			margin-bottom 8px
		}
	}
	.logout{
		width 100%
		height 4rem
		line-height 4rem
		text-align center
		background-color #fff;
		border: 1px solid #c8c8c8;
		background-color rgba(200, 200, 200, .2)
		margin-top 30px
	}

</style>