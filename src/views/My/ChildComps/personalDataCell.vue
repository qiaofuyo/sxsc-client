<!-- 
	思路1：分开遍历 => v-for原来有三个参数
	思路2：leftTitle定义成键值对，键名跟userInfo键名相对应
-->
<template>
	<div class="personalDataCell">
		<div v-for="(value, name, index) in info" :key='name'>
			<!-- {{ index }}. {{ name }}: {{ value }} -->
			<cell-item
				:name-title='name'
				:title="leftTitle"
				:left-title="leftTitle[index]"
				:right-content="value"
				:isCompile='compile' />
		</div>
	</div>
</template>

<script>
	import cellItem from './cellItem.vue'
	
	// 事件总线
	import {EventBus} from 'common/EventBus.js'
	
	export default {
		name: 'personalDataCell',
		components: {
			cellItem
		},
		data() {
			return {
				leftTitle: ['昵称','手机号','性别','生日'],
				// rightContent: ['', 'xg', '女', '2011-7-23', '19999999999'],
				// isShowArrows: {type:Boolean, default:true},
				compile: false  // false不能编辑个人资料
			}
		},
		computed: {
			// 清洗用户信息
			info(){
				let rinse = this.$store.state.userInfo  // 赋值运算符不会拷贝一个对象，它只分配一个引用
				for (let value in rinse) {  // 将所有 null 替换为 undefined， 以供 cellItem组件 的props设置默认值
					if (rinse[value] === null) {
						rinse[value] = undefined
					}
				}
				let result = {  // 拷贝用户信息
					// user_photo: rinse.user_photo,
					user_name: rinse.user_name,
					user_phone: rinse.user_phone,
					user_gender: rinse.user_gender,
					user_birthdate: rinse.user_birthdate
				}
				return result
			},
		},
		mounted() {
			// 事件总线——接收事件
			EventBus.$on('clickCompile', (value) => {
				this.compile = value
			})
		}
	}
</script>

<style lang="stylus" scoped>

</style>
