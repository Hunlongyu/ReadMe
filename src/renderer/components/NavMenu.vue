<template>
  <div class="navMenu">
    <div class="avatar nt-box" @click="routerEvent('me')" :title="login">
      <img :src="avatar_url" alt="">
    </div>
    <div class="menu-nav">
      <span :class="['button', 'nt-btn', active === 'star' ? 'active' : '']" @click="routerEvent('star')" title="Star">
        <svg width="20" height="20" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="48" height="48" fill="white" fill-opacity="0.01"/><path d="M23.9986 5L17.8856 17.4776L4 19.4911L14.0589 29.3251L11.6544 43L23.9986 36.4192L36.3454 43L33.9586 29.3251L44 19.4911L30.1913 17.4776L23.9986 5Z" fill="none" stroke="#333" stroke-width="3" stroke-linejoin="round"/></svg>
      </span>
      <span :class="['button', 'nt-btn', active === 'search' ? 'active' : '']" @click="routerEvent('search')" title="Search">
        <svg width="20" height="20" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="48" height="48" fill="white" fill-opacity="0.01"/><path d="M21 38C30.3888 38 38 30.3888 38 21C38 11.6112 30.3888 4 21 4C11.6112 4 4 11.6112 4 21C4 30.3888 11.6112 38 21 38Z" fill="none" stroke="#333" stroke-width="3" stroke-linejoin="round"/><path d="M26.6568 14.3431C25.2091 12.8954 23.2091 12 21 12C18.7909 12 16.7909 12.8954 15.3431 14.3431" stroke="#333" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/><path d="M33.2218 33.2218L41.7071 41.7071" stroke="#333" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/></svg>
      </span>
      <span :class="['button', 'nt-btn', active === 'trending' ? 'active' : '']" @click="routerEvent('trending')" title="Trending">
        <svg width="20" height="20" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="48" height="48" fill="white" fill-opacity="0.01"/><path d="M4 44H44" stroke="#333" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/><path d="M4 26L12 28V38H4V26Z" fill="none" stroke="#333" stroke-width="3" stroke-linejoin="round"/><path d="M20 24L28 20V38H20V24Z" fill="none" stroke="#333" stroke-width="3" stroke-linejoin="round"/><path d="M36 16L44 12V38H36V16Z" fill="none" stroke="#333" stroke-width="3" stroke-linejoin="round"/><path d="M4 18L12 20L44 4H34" stroke="#333" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/></svg>
      </span>
      <span :class="['button', 'nt-btn', active === 'gist' ? 'active' : '']" @click="routerEvent('gist')" title="Gist">
        <svg width="24" height="24" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M16 13L4 25.4322L16 37" stroke="#333" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><path d="M32 13L44 25.4322L32 37" stroke="#333" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><path d="M28 4L21 44" stroke="#333" stroke-width="2" stroke-linecap="round"/></svg>
      </span>
      <span :class="['button', 'nt-btn', active === 'notification' ? 'active' : '']" @click="routerEvent('notification')" title="Notification">
        <svg width="24" height="24" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="48" height="48" fill="white" fill-opacity="0.01"/><path d="M44 16V36H29L24 41L19 36H4V6H34" stroke="#333" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><path d="M23 20H25.0025" stroke="#333" stroke-width="2" stroke-linecap="round"/><path d="M33.0011 20H35" stroke="#333" stroke-width="2" stroke-linecap="round"/><path d="M13.001 20H14.9999" stroke="#333" stroke-width="2" stroke-linecap="round"/><circle cx="43" cy="7" r="3" fill="#333"/></svg>
      </span>
    </div>
    <div class="setting">
      <span :class="['button', 'nt-btn', active === 'settings' ? 'active' : '']" @click="routerEvent('settings')" :title="$t('component.settings')">
        <svg width="20" height="20" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="48" height="48" fill="white" fill-opacity="0.01"/><path d="M18.2838 43.1712C14.9327 42.1735 11.9498 40.3212 9.58787 37.8669C10.469 36.8226 11 35.4733 11 34C11 30.6863 8.31371 28 5 28C4.79955 28 4.60139 28.0098 4.40599 28.029C4.13979 26.7276 4 25.3801 4 24C4 21.9094 4.32077 19.8937 4.91579 17.9994C4.94381 17.9998 4.97188 18 5 18C8.31371 18 11 15.3137 11 12C11 11.0487 10.7786 10.1491 10.3846 9.34999C12.6975 7.19937 15.5205 5.5899 18.6521 4.72302C19.6444 6.66807 21.6667 8.00001 24 8.00001C26.3333 8.00001 28.3556 6.66807 29.3479 4.72302C32.4795 5.5899 35.3025 7.19937 37.6154 9.34999C37.2214 10.1491 37 11.0487 37 12C37 15.3137 39.6863 18 43 18C43.0281 18 43.0562 17.9998 43.0842 17.9994C43.6792 19.8937 44 21.9094 44 24C44 25.3801 43.8602 26.7276 43.594 28.029C43.3986 28.0098 43.2005 28 43 28C39.6863 28 37 30.6863 37 34C37 35.4733 37.531 36.8226 38.4121 37.8669C36.0502 40.3212 33.0673 42.1735 29.7162 43.1712C28.9428 40.7518 26.676 39 24 39C21.324 39 19.0572 40.7518 18.2838 43.1712Z" fill="none" stroke="#333" stroke-width="3" stroke-linejoin="round"/><path d="M24 31C27.866 31 31 27.866 31 24C31 20.134 27.866 17 24 17C20.134 17 17 20.134 17 24C17 27.866 20.134 31 24 31Z" fill="none" stroke="#333" stroke-width="3" stroke-linejoin="round"/></svg>
      </span>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { ref } from '@vue/reactivity'
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { me, settings } from '../plugins/database'
import { getUserInfo } from '../utils/user'
import { getToken } from '../utils/tools'

const router = useRouter()
const active = ref('star')
const avatar_url = ref('')
const login = ref('')

// 检查并获取用户 token
async function checkUserToken () {
  const s = await settings.get()
  if (s?.token === '') {
    window.api.invoke('event.win.open', [{ name: 'login' }])
    window.api.invoke('event.win.close', [{ name: 'home' }])
  } else {
    const info = await me.get()
    if (!info) {
      const token = await getToken()
      if (!token) return false
      const info = await getUserInfo(token)
      me.add(info)
      avatar_url.value = info.avatar_url
      login.value = info.login
    } else {
      const info = await me.get()
      if (!info) return false
      avatar_url.value = info.avatar_url
      login.value = info.login
    }
  }
}

function routerEvent (e: string) {
  active.value = e
  router.push(e)
}

onMounted(() => {
  checkUserToken()
})

</script>
<style lang="scss" scoped>
.navMenu{
  width: 80px;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  -webkit-app-region: drag;
  user-select: none;
  .avatar{
    width: 50px;
    height: 50px;
    margin-top: 20px;
    border-radius: 50%;
    overflow: hidden;
    -webkit-app-region: no-drag;
    img{
      width: 100%;
    }
  }
  .menu-nav{
    flex: 1;
    margin-top: 40px;
    display: flex;
    flex-direction: column;
    span{
      margin-bottom: 30px;
      padding: 0;
      width: 40px;
      height: 40px;
      border-radius: 4px;
      -webkit-app-region: no-drag;
    }
  }
  .setting{
    span{
      margin-bottom: 20px;
      padding: 0;
      width: 40px;
      height: 40px;
      border-radius: 4px;
      -webkit-app-region: no-drag;
    }
  }
}
</style>
