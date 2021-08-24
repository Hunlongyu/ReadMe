<template>
  <div class="settings">
    <div class="soft">
      <div class="logo">logo</div>
      <div class="name">ReadMe</div>
      <div class="version">v2.0.1</div>
    </div>
    <div class="theme">
      <div class="dark">{{ $t('settings.dark') }}</div>
      <div class="light">{{ $t('settings.light') }}</div>
      <div class="system">{{ $t('settings.dark') }}</div>
    </div>
    <div class="language">
      <div @click="changeLanguage('zh-cn')">zh-cn</div>
      <div @click="changeLanguage('zh-tw')">zh-tw</div>
      <div @click="changeLanguage('en')">en</div>
      <button class="button nt-btn" @click="logoutEvent">logout</button>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'
import axios from 'axios'

const router = useRouter()
const { locale } = useI18n()

function changeLanguage (e: string) {
  locale.value = e
}

function logoutEvent () {
  axios({
    method: 'delete',
    url: 'https://api.github.com/applications/dce5a448c5e9cca4d566/token',
    auth: {
      username: `${process.env.VUE_APP_clientId}`,
      password: `${process.env.VUE_APP_clientSecret}`
    },
    data: {
      access_token: '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'
    }
  }).then(() => {
    router.push('login')
    console.log('then')
  }).catch(() => {
    router.push('login')
    console.log('error')
  })
}

</script>
<style lang="scss" scoped>
.settings{
  flex: 1;
  display: flex;
  flex-direction: column;
  border-top: 1px solid #d9e3e5;
}
</style>
