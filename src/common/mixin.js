// 返回顶部

import BackTop from 'components/BackTop/BackTop.vue'

export const backTopMixin ={
	components: {
		BackTop
	},
	data(){
		return {
			isBackTop: true  // 默认不显示BackTop
		}
	},
	methods:{
		// 返回顶部
		backClick(){
			this.$refs.scroll.scrollTo(0, 0)
		},
		// 是否显示返回顶部按钮
		contentScroll(position){
			// console.log(position.y);
			if (position.y < -500) {
				this.isBackTop = true
			} else{
				this.isBackTop = false
			}
		}
	}
}