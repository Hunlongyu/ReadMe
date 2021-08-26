<template>
  <router-view :class="`theme-${theme}`"/>
</template>
<script lang="ts" setup>
import { settings } from '@/renderer/plugins/database'
import { onBeforeUnmount, onMounted, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import bus from '@/renderer/plugins/mitt'

const { locale } = useI18n()
const theme = ref('light')

async function init () {
  const s = await settings.get()
  if (s) {
    locale.value = s.language
    theme.value = s.theme
  }
}

// 切换主题
function changeTheme (e: string) {
  theme.value = e
}

onMounted(() => {
  init()
  bus.on('bus.settings.theme', changeTheme)
})

onBeforeUnmount(() => {
  bus.off('bus.settings.theme', changeTheme)
})

</script>
<style lang="scss">
@import "../../assets/scss/index.scss";
html, body, #app{
  margin: 0;
  padding: 0;
  height: 100%;
  font-family: 'Helvetica Neue', Helvetica, 'PingFang SC', 'Hiragino Sans GB', 'Microsoft YaHei', SimSun, sans-serif;
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
