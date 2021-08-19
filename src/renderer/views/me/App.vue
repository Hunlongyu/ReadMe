<template>
  <div class="me">
    <div class="info">
      <div class="CircleBadge CircleBadge--medium avatar">
        <img class="CircleBadge-icon" :src="avatar_url" alt="">
      </div>
      <div class="username">{{name}}</div>
      <div class="description">{{description}}</div>
    </div>
    <div class="more">
      <div class="trophy">
        <img :src="`https://github-profile-trophy.vercel.app/?username=${login}&margin-w=28`" alt="">
      </div>
      <div class="stats">
        <img :src="`https://github-readme-stats.vercel.app/api/top-langs/?username=${login}`" alt="">
        <img :src="`https://github-readme-stats.vercel.app/api?username=${login}&show_icons=true&count_private=true&line_height=40`" alt="">
      </div>
    </div>
    <!-- <div class="contributions">
      <p>https://skyline.github.com/api/contributions?username=dend&year=2021</p>
    </div> -->
    <div class="logout">
      <button class="btn" type="button" @click="logoutEvent">Logout</button>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { useRouter } from 'vue-router'
import { onMounted, ref } from 'vue'
import { me } from '@/renderer/plugins/database'

const router = useRouter()
const avatar_url = ref()
const name = ref()
const description = ref()
const login = ref()

// 从数据库获取用户信息
async function getUserInfo () {
  const res = await me.get()
  avatar_url.value = res?.avatar_url
  name.value = res?.name
  description.value = res?.bio
  login.value = res?.login
}

// 退出登录
async function logoutEvent () {
  window.api.invoke('event.win.cookies')
  window.api.on('event.win.cookies_replay', () => {
    window.api.removeAllListeners('event.win.cookies_replay')
    router.push({ name: 'Login' })
  })
}

onMounted(async () => {
  getUserInfo()
})
</script>
<style lang="scss" scoped>
.me{
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  border-top: 1px solid #d9e3e5;
  .info{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-top: 20px;
    width: 100%;
    .username{
      margin-top: 10px;
      font-size: 18px;
    }
    .description{
      margin-top: 8px;
      font-size: 14px;
    }
  }
  .more{
    width: 800px;
    margin-top: 20px;
    .stats{
      width: 100%;
      display: flex;
      justify-content: space-between;
    }
  }
  .logout{
    text-align: center;
    margin-top: 40px;
  }
}
</style>
