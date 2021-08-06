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
import axios from 'axios'

const router = useRouter()

// const token = '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'
const token = ref('')
const login = 'Hunlongyu'

// 获取连接参数
function getQueryString (param: string) {
  var reg = new RegExp('(^|&)' + param + '=([^&]*)(&|$)')
  var r = window.location.search.substr(1).match(reg)
  if (r != null) return unescape(r[2])
  return ''
}

// 获取用户 token
async function getUserToken () {
  const code = getQueryString('code')
  console.log('=== code ===', code)
  const res = await axios.post('https://github.com/login/oauth/access_token', { code, client_id: process.env.VUE_APP_clientId, client_secret: process.env.VUE_APP_clientSecret }, { headers: { Accept: 'application/vnd.github.v3.star+json' } })
  console.log('=== getUserToken res ===', res.data)
  token.value = res.data.access_token
  console.log('=== token ===', token)
}

// 获取用户信息， 使用 token
async function getUserInfo () {
  const res = await axios.get('https://api.github.com/user', { headers: { Accept: 'application/vnd.github.v3.star+json', Authorization: `token ${token.value}` } })
  console.log('=== getUserInfo res ===', res)
  return res.data
}

// 获取用户信息，不使用 token。
// 区别是：
// 使用 token 可以获取到 email
// 授权后，可以直接 star unstar
async function getUserInfoNoToken (name: string) {
  const res = await axios.get(`https://api.github.com/users/${name}`, { headers: { Accept: 'application/vnd.github.v3.star+json' } })
  console.log('=== getUserInfoNoToken res ===', res)
  return res.data
}

function checkUserToken () {
  const token = ''
  if (token === '') {
    router.push({ name: 'Login' })
  }
}

onMounted(async () => {
  // checkUserToken()
  await getUserToken()
  await getUserInfo()
  // getUserInfoNoToken('HanFuYan')
  // const list = await getUserStar()
  // console.log('=== list ===', list)
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
