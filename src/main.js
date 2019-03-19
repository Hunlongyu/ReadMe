import Vue from 'vue'
import App from './App.vue'
import store from './store/index'
import './registerServiceWorker'
import Register from './components/register'
import { Button } from 'ant-design-vue'
Vue.component(Button.name, Button)
Register.registerComponents()
Vue.config.productionTip = false

new Vue({
  store,
  render: h => h(App)
}).$mount('#app')
