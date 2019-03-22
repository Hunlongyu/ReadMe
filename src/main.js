import Vue from 'vue'
import App from './App.vue'
import store from './store/index'
import './registerServiceWorker'
import Register from './components/register'
import axios from 'axios'
import hljs from 'highlight.js'

import 'github-markdown-css'
import 'highlight.js/styles/github.css'

import { Button, Row, Col, Tooltip, Input, List, Affix, Table } from 'ant-design-vue'
Vue.use(Button)
Vue.use(Row)
Vue.use(Col)
Vue.use(Tooltip)
Vue.use(Input)
Vue.use(List)
Vue.use(Affix)
Vue.use(Table)

Vue.http = Vue.prototype.$http = axios
Register.registerComponents()
Vue.config.productionTip = false

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
