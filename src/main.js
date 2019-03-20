import Vue from 'vue'
import App from './App.vue'
import store from './store/index'
import './registerServiceWorker'
import Register from './components/register'
import axios from 'axios'
import hljs from 'highlight.js'

import Antd from 'ant-design-vue'
import 'ant-design-vue/dist/antd.css'
import 'github-markdown-css'
import 'highlight.js/styles/github.css'

// import { Button, Row, Col, Tooltip, Input } from 'ant-design-vue'
// Vue.component(Button.name, Button)
// Vue.component(Row.name, Row)
// Vue.component(Col.name, Col)
// Vue.component(Tooltip.name, Tooltip)
// Vue.component(Input)

Vue.http = Vue.prototype.$http = axios
Register.registerComponents()
Vue.config.productionTip = false
Vue.use(Antd)

Vue.directive('highlight', function (el) {
  let blocks = el.querySelectorAll('pre code')
  blocks.forEach((block) => {
    hljs.highlightBlock(block)
  })
})

new Vue({
  store,
  render: h => h(App)
}).$mount('#app')
