import Vue from 'vue'
import App from './App.vue'
import router from './router/router'
import store from './store/store'
import Register from './components/register'
// import '../node_modules/bulma/bulma.sass'
// import { library } from '@fortawesome/fontawesome-svg-core'
// import { faAtlas, faWindowMinimize, faWindowRestore, faWindowClose } from '@fortawesome/free-solid-svg-icons'
// import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
// library.add(faAtlas, faWindowMinimize, faWindowRestore, faWindowClose)
// Vue.component('font-awesome-icon', FontAwesomeIcon)
Register.registerComponents()
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
