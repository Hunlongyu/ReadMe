import Vue from 'vue'
import axios from 'axios'
import Register from './components/register'

import App from './App'
import router from './router'
import 'highlight.js/styles/github.css'
import hljs from 'highlight.js'
import './helper/extenal_link.js'
import Notifications from 'vue-notification'
Vue.use(Notifications)

import Notifications from 'vue-notification'
Vue.use(Notifications)

Register.registerComponents()

if (!process.env.IS_WEB) Vue.use(require('vue-electron'))
Vue.http = Vue.prototype.$http = axios
Vue.config.productionTip = false

Vue.directive('highlight', function (el) {
  let blocks = el.querySelectorAll('pre code')
  blocks.forEach((block) => {
    hljs.highlightBlock(block)
  })
})

/* eslint-disable no-new */
new Vue({
  components: { App },
  router,
  template: '<App/>'
}).$mount('#app')
