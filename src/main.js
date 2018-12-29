import Vue from 'vue'
import App from './App.vue'
import router from './router/router'
import store from './store/store'
import Register from './components/register'
import axios from 'axios'
import Element from 'element-ui'
import './plugins/element-variables.scss'
import './helper/extenal_link.js'
Vue.prototype.$axios = axios
Vue.use(Element)
Register.registerComponents()
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
