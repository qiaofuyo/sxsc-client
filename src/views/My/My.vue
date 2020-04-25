<template>
	<div class="my">
		
		<!-- 登陆/注册页 -->
		<login v-if="!userInfo._id"/>
		
		<!-- 个人中心 -->
		<personal-center v-else />

	</div>
</template>

<script>
	import Login from '../Login/Login.vue'
	import personalCenter from './ChildComps/personalCenter.vue'
	
	import { mapState } from 'vuex'
	
	export default {
		name:'My',
		components: {
			Login,
			personalCenter
		},
		computed: {
			...mapState(['userInfo'])
		},
	}
</script>

<style scoped>
	
</style>
