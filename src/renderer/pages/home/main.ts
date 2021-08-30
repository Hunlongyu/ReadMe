import { createApp } from 'vue'
import App from './App.vue'
import router from '../../router/home'
import { createI18n } from 'vue-i18n'
import 'modern-normalize'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import messages from '../../plugins/i18n'

const i18n = createI18n({
  locale: 'zh-cn',
  messages
})

createApp(App).use(router).use(ElementPlus).use(i18n).mount('#app')
