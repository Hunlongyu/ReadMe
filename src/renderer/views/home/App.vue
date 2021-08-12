<template>
  <div class="home">
    <frame />
    <div class="home-wrapper">
      <nav-menu />
      <router-view v-slot="{ Component }">
        <keep-alive>
          <component :is="Component" />
        </keep-alive>
      </router-view>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import Frame from '../../components/Frame.vue'
import NavMenu from '../../components/NavMenu.vue'
import { me } from '../../plugins/database'
import type { UserType } from '../../../types'
import { getUserToken, getUserInfo } from '../../utils/user'
import { getUrlParams } from '../../utils/tools'

const router = useRouter()
const token = ref('')
const store = ref<UserType>()

// 检查并获取用户 token
async function checkUserToken () {
  const meInfo = await me.get()
  if (!meInfo || !meInfo.token) {
    const code = getUrlParams('code')
    if (!code) {
      router.push({ name: 'Login' })
    } else {
      const res = await getUserToken()
      if (res) {
        token.value = res
        const result = await getUserInfo(res)
        store.value = result
        store.value.token = res
        me.update(store.value)
        router.go(0)
      }
    }
  } else {
    store.value = meInfo
    token.value = meInfo.token
  }
}

onMounted(async () => {
  await checkUserToken()
})
</script>
<style lang="scss" scoped>
.home{
  display: flex;
  width: 100%;
  height: 100%;
  flex-direction: column;
  .home-wrapper{
    height: 100%;
    display: flex;
    background-color: #fff;
  }
}
</style>
