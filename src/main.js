import Vue from 'vue'
import App from './App.vue'
import store from './store/index'
import './registerServiceWorker'
import Register from './components/register'
import { Button, Row, Col, Tooltip } from 'ant-design-vue'
Vue.component(Button.name, Button)
Vue.component(Row.name, Row)
Vue.component(Col.name, Col)
Vue.component(Tooltip.name, Tooltip)
Register.registerComponents()
Vue.config.productionTip = false

new Vue({
  store,
  render: h => h(App)
}).$mount('#app')
