import Vue from 'vue'
import App from './App.vue'
import router from './router/router'
import store from './store/store'
import Register from './components/register'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
import 'material-design-icons-iconfont/dist/material-design-icons.css'
Vue.use(Vuetify, {
  iconfont: 'mdi',
  icons: {
    'logo': 'class'
  }
})
Register.registerComponents()
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
