<template>
  <div class="login">
    <a href="https://github.com/login/oauth/authorize?client_id=dce5a448c5e9cca4d566&redirect_uri=http://localhost:8080/%23/home">授权</a>
    <a href="http://localhost:8080/#/home">home</a>
  </div>
</template>
<script lang="ts" setup>
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

// 获取连接参数
function getQueryString (param: string) {
  var reg = new RegExp('(^|&)' + param + '=([^&]*)(&|$)')
  var r = window.location.search.substr(1).match(reg)
  if (r != null) return unescape(r[2])
  return ''
}

function checkCode () {
  const link = getQueryString('code')
  if (link !== '') {
    router.push({ name: 'Home' })
  }
}

onMounted(() => {
  // checkCode()
})
</script>
