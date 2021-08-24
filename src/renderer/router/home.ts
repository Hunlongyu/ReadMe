import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import Home from '../pages/home/main/App.vue'
import Star from '../pages/home/star/App.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    redirect: '/star',
    children: [
      {
        path: 'me',
        component: () => import('../pages/home/me/App.vue')
      },
      {
        path: 'star',
        component: Star
      },
      {
        path: 'search',
        component: () => import('../pages/home/search/App.vue')
      },
      {
        path: 'trending',
        component: () => import('../pages/home/trending/App.vue')
      },
      {
        path: 'settings',
        component: () => import('../pages/home/settings/App.vue')
      }
    ]
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
