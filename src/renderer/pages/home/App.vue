<template>
  <router-view class="theme-light"/>
</template>
<script lang="ts" setup>
import { settings } from '@/renderer/plugins/database'
import { onMounted } from 'vue'
import { useI18n } from 'vue-i18n'

const { locale } = useI18n()

async function init () {
  const s = await settings.get()
  if (s) {
    locale.value = s.language
  }
}

onMounted(() => {
  init()
})
</script>
<style lang="scss">
@import "../../assets/scss/index.scss";
html, body, #app{
  margin: 0;
  padding: 0;
  height: 100%;
  font-family: 'Helvetica Neue', Helvetica, 'PingFang SC', 'Hiragino Sans GB', 'Microsoft YaHei', sans-serif;
  font-weight: 400;
  -webkit-font-smoothing: antialiased;
  -webkit-tap-highlight-color: transparent;
}
#app {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
}
</style>
