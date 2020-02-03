import Vue from 'vue'
import App from './App'
// 引入路由
import router from './router'
// 引入状态管理vuex的store
import store from './store'

// // 引入移动端导航栏组件
// import LyTab from 'ly-tab';
// // 显式安装-申明全局范围使用它
// Vue.use(LyTab);

Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
	store,
  components: { App },
  template: '<App/>'
})
