// 插件的封装方式
import Toast from './Toast.vue'

const MyPlugin = {}
// 暴露install方法
MyPlugin.install = function(Vue){
	// 1. 创建构造器
	const toastContrustor = Vue.extend(Toast)
	// 2. 创建 Toast 实例
	const toast = new toastContrustor()
	// 3. 把 toast 挂载到元素上, 把元素(toast.$el对应创建的div)添加到 html body 中
	toast.$mount(document.createElement('div'))
	document.body.appendChild(toast.$el)
	//  4. 把 toast 实例添加到原型链上
	Vue.prototype.$toast = toast
}

export default MyPlugin