import Vue from 'vue'
import axios from 'axios'
import store from './store/store'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import App from './App.vue'
import Register from './components/register'
Vue.prototype.$axios = axios
Register.registerComponents()
Vue.config.productionTip = false
Vue.use(ElementUI)
new Vue({
  store,
  render: h => h(App)
}).$mount('#app')
