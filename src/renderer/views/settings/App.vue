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
    </div>
  </div>
</template>
<script lang="ts" setup>
import { useI18n } from 'vue-i18n'

const { locale } = useI18n()
function changeLanguage (e: string) {
  locale.value = e
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
