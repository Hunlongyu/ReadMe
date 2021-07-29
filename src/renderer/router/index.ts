import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
// import Home from '../views/home/App.vue'
import Login from '../views/login/App.vue'

const routes: Array<RouteRecordRaw> = [
  // {
  //   path: '/',
  //   name: 'Home',
  //   component: Home
  // },
  // {
  //   path: '/login',
  //   name: 'Login',
  //   component: () => import('../views/login/App.vue')
  // }
  {
    path: '/',
    name: 'Login',
    component: Login
  },
  {
    path: '/home',
    name: 'Home',
    component: () => import('../views/home/App.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
