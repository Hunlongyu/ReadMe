<template>
  <div class="me">
    <div class="info">
      <p>avatar</p>
      <p>name</p>
      <p>describe</p>
    </div>
    <div class="more">
      <div>
        <img src="https://github-profile-trophy.vercel.app/?username=Hunlongyu&margin-w=28" alt="">
      </div>
      <div>
        <img src="https://github-readme-stats.vercel.app/api/top-langs/?username=Hunlongyu" alt="">
        <img src="https://github-readme-stats.vercel.app/api?username=Hunlongyu&show_icons=true&count_private=true&line_height=40" alt="">
      </div>
    </div>
    <div class="contributions">
      <p>contributions</p>
      <p>https://skyline.github.com/api/contributions?username=dend&year=2021</p>
    </div>
    <div class="logout">
      <button class="button nt-btn" @click="logoutEvent">logout</button>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { useRouter } from 'vue-router'

const router = useRouter()

function logoutEvent () {
  router.push('login')
}
</script>
<style lang="scss" scoped>
.me{
  flex: 1;
  display: flex;
  flex-direction: column;
  border-top: 1px solid #d9e3e5;
  text-align: center;
  .logout{
    text-align: center;
    .button{
      padding: 10px 25px;
    }
  }
}
</style>
