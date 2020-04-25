<template>
	<home-shop-list :homeshoplist_data='recommend_data' />
</template>

<script>
	// 导入请求数据的api
	import {
		getHomeShopList
	} from 'api/index.js'
	
	import HomeShopList from 'views/Home/ChildComps/HomeShopList.vue'
	
	export default {
		name: 'Recommend',
		components: {
			HomeShopList
		},
		data() {
			return {
				recommend_data: []
			}
		},
		mounted() {
			// 获取8件商品数据
			getHomeShopList().then(res => {
				let data = res.data.message
				let obj = {}
				obj[this.$route.params._id] = this.$route.params._id
				// 最多获取8件，如果有重复的则减去，理论上最少1件
				for (let i = 0; i < 9; i++) {
					let index = Math.floor(Math.random()*50)
					for (let j = 0; j < i; j++) {
						if (!obj[data[index]._id]) {
							obj[data[index]._id] = data[index]._id
							this.recommend_data.push(data[index])
						}
					}
				}
			})
		}
	}
</script>

<style scoped lang="stylus">
</style>
