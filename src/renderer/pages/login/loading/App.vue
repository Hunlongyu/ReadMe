<template>
  <div class="loading theme-light">
    <div class="loading-wrapper nt-bg">
      <div class="sk-cube-grid">
        <div class="sk-cube sk-cube1"></div>
        <div class="sk-cube sk-cube2"></div>
        <div class="sk-cube sk-cube3"></div>
        <div class="sk-cube sk-cube4"></div>
        <div class="sk-cube sk-cube5"></div>
        <div class="sk-cube sk-cube6"></div>
        <div class="sk-cube sk-cube7"></div>
        <div class="sk-cube sk-cube8"></div>
        <div class="sk-cube sk-cube9"></div>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { settings, me } from '@/renderer/plugins/database'
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { getUrlParams } from '@/renderer/utils/tools'
import { getUserToken, getUserInfo } from '@/renderer/utils/user'

const router = useRouter()

async function checkHasCode () {
  const code = getUrlParams('code')
  if (code) {
    const token = await getUserToken(code)
    const s = await settings.get()
    if (!s) return false
    s.token = token
    const info = await getUserInfo(token)
    s.userId = info.id
    settings.update(s)
    me.add(info)
    window.api.invoke('event.win.open', [{ name: 'home' }])
    window.api.invoke('event.win.close', [{ name: 'login' }])
  } else {
    router.push({ path: 'signin' })
  }
}

onMounted(() => {
  checkHasCode()
})

</script>
<style lang="scss">
html,body,#app{
  margin: 0;
  padding: 0;
  height: 100%;
}

.loading{
  display: flex;
  width: 100%;
  height: 100%;
  flex-direction: column;
  .loading-wrapper{
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .sk-cube-grid {
    width: 40px;
    height: 40px;
    margin: 100px auto;
  }

  .sk-cube-grid .sk-cube {
    width: 33%;
    height: 33%;
    background-color: #333;
    float: left;
    -webkit-animation: sk-cubeGridScaleDelay 1.3s infinite ease-in-out;
            animation: sk-cubeGridScaleDelay 1.3s infinite ease-in-out;
  }
  .sk-cube-grid .sk-cube1 {
    -webkit-animation-delay: 0.2s;
            animation-delay: 0.2s; }
  .sk-cube-grid .sk-cube2 {
    -webkit-animation-delay: 0.3s;
            animation-delay: 0.3s; }
  .sk-cube-grid .sk-cube3 {
    -webkit-animation-delay: 0.4s;
            animation-delay: 0.4s; }
  .sk-cube-grid .sk-cube4 {
    -webkit-animation-delay: 0.1s;
            animation-delay: 0.1s; }
  .sk-cube-grid .sk-cube5 {
    -webkit-animation-delay: 0.2s;
            animation-delay: 0.2s; }
  .sk-cube-grid .sk-cube6 {
    -webkit-animation-delay: 0.3s;
            animation-delay: 0.3s; }
  .sk-cube-grid .sk-cube7 {
    -webkit-animation-delay: 0s;
            animation-delay: 0s; }
  .sk-cube-grid .sk-cube8 {
    -webkit-animation-delay: 0.1s;
            animation-delay: 0.1s; }
  .sk-cube-grid .sk-cube9 {
    -webkit-animation-delay: 0.2s;
            animation-delay: 0.2s; }

  @-webkit-keyframes sk-cubeGridScaleDelay {
    0%, 70%, 100% {
      -webkit-transform: scale3D(1, 1, 1);
              transform: scale3D(1, 1, 1);
    } 35% {
      -webkit-transform: scale3D(0, 0, 1);
              transform: scale3D(0, 0, 1);
    }
  }

  @keyframes sk-cubeGridScaleDelay {
    0%, 70%, 100% {
      -webkit-transform: scale3D(1, 1, 1);
              transform: scale3D(1, 1, 1);
    } 35% {
      -webkit-transform: scale3D(0, 0, 1);
              transform: scale3D(0, 0, 1);
    }
  }
}
</style>
