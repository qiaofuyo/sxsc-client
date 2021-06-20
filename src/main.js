import Vue from 'vue'
import App from './App.vue'
import router from './router/index.js'
import store from './store/index.js'

// 图片懒加载
import VueLazyload from 'vue-lazyload'
Vue.use(VueLazyload,{
	// loading: require('../static/img/placeholder.png')
	loading: require('assets/img/placeholder.png')
})

// 解决移动端300ms延迟
import FastClick from 'fastclick'
FastClick.attach(document.body)

// 导入自定义插件Toast
import toast from 'components/Toast/index.js'
// 安装toast插件
Vue.use(toast)

// 设置为 false 以阻止 vue 在启动时生成生产提示。
Vue.config.productionTip = false

new Vue({
	// components: { App },
	// template: '<App> <App/>',
  render: h => h(App),  // <=> 上面两行
	router,
	store,
}).$mount('#app')
