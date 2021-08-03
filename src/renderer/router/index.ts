import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import Home from '../views/home/App.vue'
import Star from '../views/star/App.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    redirect: '/star',
    children: [
      {
        path: 'me',
        component: () => import('../views/me/App.vue')
      },
      {
        path: '/star',
        component: Star
      },
      {
        path: 'search',
        component: () => import('../views/search/App.vue')
      },
      {
        path: 'trending',
        component: () => import('../views/trending/App.vue')
      },
      {
        path: 'settings',
        component: () => import('../views/settings/App.vue')
      }
    ]
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/login/App.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
