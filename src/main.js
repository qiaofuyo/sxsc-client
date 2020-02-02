import Vue from 'vue'
import App from './App'
// 引入路由
import router from './router'

Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
