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
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'
import Frame from '../../components/Frame.vue'
import NavMenu from '../../components/NavMenu.vue'
import axios from 'axios'

const router = useRouter()

const token = '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'
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
  const res = await axios.post('https://github.com/login/oauth/access_token', { code, client_id: 'dce5a448c5e9cca4d566', client_secret: '960c95f7ced49a42d10ac6469a4320eb804fa948' }, { headers: { Accept: 'application/vnd.github.v3.star+json' } })
  console.log('=== getUserToken res ===', res.data)
  const token = res.data.access_token
  console.log('=== token ===', token)
}

// 获取用户信息， 使用 token
async function getUserInfo () {
  const res = await axios.get('https://api.github.com/user', { headers: { Accept: 'application/vnd.github.v3.star+json', Authorization: `token ${token}` } })
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

// 获取用户所有 star
async function getUserStar () {
  let starIndex = 1
  const starList: any = []
  async function getStar (num: number) {
    const res = await axios.get(`https://api.github.com/users/${login}/starred`, { params: { per_page: 100, page: num }, headers: { Accept: 'application/vnd.github.v3.star+json' } })
    if (res.data.length > 0) {
      starIndex++
      starList.push(...res.data)
      getStar(starIndex)
    } else {
      return starList
    }
  }
  getStar(starIndex)
  return starList
}

function checkUserToken () {
  const token = ''
  if (token === '') {
    router.push({ name: 'Login' })
  }
}

onMounted(async () => {
  // checkUserToken()
  // await getUserToken()
  // getUserInfo()
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
