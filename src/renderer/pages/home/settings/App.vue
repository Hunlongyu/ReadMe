<template>
  <div class="settings">
    <div class="settings-wrapper">
      <div class="soft item">
        <div class="name">README</div>
        <div class="version">v{{pkg.version}}</div>
      </div>
      <div class="theme item">
        <div class="dark" @click="changeTheme('dark')">
          <img src="" alt="">
          <span>{{ $t('settings.dark') }}</span>
        </div>
        <div class="light" @click="changeTheme('light')">
          <img src="" alt="">
          <span>{{ $t('settings.light') }}</span>
        </div>
      </div>
      <div class="language item">
        <el-select size="mini" v-model="lang" @change="changeLanguage">
          <el-option label="简体中文" value="zh-cn"></el-option>
          <el-option label="繁体中文" value="zh-tw"></el-option>
          <el-option label="English" value="en"></el-option>
        </el-select>
      </div>
      <div class="logout item">
        <el-button size="mini" type="danger" plain @click="logoutEvent">{{ $t('settings.logout') }}</el-button>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { useI18n } from 'vue-i18n'
import { onMounted, ref } from 'vue'
import { settings } from '@/renderer/plugins/database'
import bus from '@/renderer/plugins/mitt'
import pkg from '../../../../../package.json'

const { locale } = useI18n()
const lang = ref()

// 切换语言
async function changeLanguage (e: string) {
  locale.value = e
  const s = await settings.get()
  if (!s) return false
  s.language = e
  settings.update(s)
}

// 切换主题
async function changeTheme (theme: string) {
  bus.emit('bus.settings.theme', theme)
}

// 初始化
async function initSettings () {
  const res = await settings.get()
  lang.value = res?.language
}

// 退出登录
async function logoutEvent () {
  window.api.invoke('event.win.logout')
  window.api.on('event.win.logout_replay', () => {
    window.api.removeAllListeners('event.win.logout_replay')
    window.api.invoke('event.win.open', [{ name: 'login' }])
    window.api.invoke('event.win.close', [{ name: 'home' }])
  })
}

onMounted(() => {
  initSettings()
})

</script>
<style lang="scss" scoped>
.settings{
  flex: 1;
  position: relative;
  overflow-y: auto;
  width: 100%;
  .settings-wrapper{
    position: absolute;
    width: 100%;
    height: 100%;
    display: block;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    padding: 20px;
    .item{
      margin-top: 20px;
      color: #606266;
    }
    .soft{
      display: flex;
      justify-content: center;
      flex-direction: column;
      align-items: center;
      .name{
        font-size: 30px;
        font-weight: bold;
      }
      .version{
        font-size: 14px;
      }
    }
    .theme{
      display: flex;
      justify-content: flex-start;
      .dark, .light, .system{
        display: flex;
        width: 100px;
        height: 80px;
        margin-right: 10px;
        flex-direction: column;
        align-items: center;
        img{
          width: 100px;
          height: 60px;
        }
      }
    }
  }
}
</style>
