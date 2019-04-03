import Vue from 'vue'
import App from './App.vue'
import store from './store/index'
import './registerServiceWorker'
import Register from './components/register'
import axios from 'axios'
import hljs from 'highlight.js'

import 'github-markdown-css'
import 'highlight.js/styles/github.css'

import { Button, Row, Col, Tooltip, Input, List, Popconfirm, Table, notification, message, Modal, AutoComplete, Spin, Form, Tag } from 'ant-design-vue'
Vue.use(Button)
Vue.use(Row)
Vue.use(Col)
Vue.use(Tooltip)
Vue.use(Input)
Vue.use(List)
Vue.use(Popconfirm)
Vue.use(Table)
Vue.use(Modal)
Vue.use(AutoComplete)
Vue.use(Spin)
Vue.use(Form)
Vue.use(Tag)
Vue.prototype.$message = message
Vue.prototype.$notification = notification

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
