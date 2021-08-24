import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import Login from '../pages/login/App.vue'
import Loading from '../pages/login/loading/App.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Login',
    component: Login,
    redirect: '/loading',
    children: [
      {
        path: 'loading',
        component: Loading
      },
      {
        path: 'signin',
        component: () => import('../pages/login/signin/App.vue')
      }
    ]
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
