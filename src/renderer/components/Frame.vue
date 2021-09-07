<template>
  <div class="frame">
    <div class="win" v-if="os === 'win32'">
      <span @click="winEvent('mini')">
        <svg width="20" height="20" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="48" height="48" fill="white" fill-opacity="0.01"/><path d="M10.5 24L38.5 24" stroke="#333" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
      </span>
      <span @click="winEvent('max')">
        <svg width="20" height="20" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="48" height="48" fill="white" fill-opacity="0.01"/><path d="M24.0607 10L24.024 38" stroke="#333" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><path d="M10 24L38 24" stroke="#333" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
      </span>
      <span @click="winEvent('close')" class="close">
        <svg width="20" height="20" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="48" height="48" fill="white" fill-opacity="0.01"/><path d="M14 14L34 34" stroke="#333" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><path d="M14 34L34 14" stroke="#333" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
      </span>
    </div>
    <div class="mac" v-if="os !== 'win32'">
      <span @click="winEvent('close')" class="close"></span>
      <span @click="winEvent('mini')" class="min"></span>
      <span @click="winEvent('max')" class="max"></span>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue'
import { settings } from '../plugins/database'

const os = ref()

// 窗口事件
function winEvent (e: string) {
  window.api.invoke(`event.win.${e}`, [{ name: 'home' }])
}

async function checkOS () {
  const s = await settings.get()
  if (s?.os === '') {
    window.api.invoke('event.win.os')
    window.api.on('event.win.os_replay', (e, args) => {
      s.os = args
      os.value = args
      settings.update(s)
      window.api.removeAllListeners('event.win.os_replay')
    })
  } else {
    os.value = s?.os
  }
}

onMounted(() => {
  checkOS()
})
</script>

<style scoped lang="scss">
.frame{
  height: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  -webkit-app-region: drag;
  position: relative;
  .win{
    height: 30px;
    position: absolute;
    right: 0;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    span{
      display: flex;
      width: 60px;
      height: 30px;
      justify-content: center;
      align-items: center;
      transition: 0.3s;
      -webkit-app-region: no-drag;
    }
  }
  .mac{
    position: absolute;
    left: 0;
    display: flex;
    justify-content: space-around;
    align-items: center;
    width: 80px;
    padding: 0 10px;
    span{
      display: flex;
      width: 12px;
      height: 12px;
      border-radius: 100%;
      cursor: pointer;
      -webkit-app-region: no-drag;
    }
    .max{
      background-color: #26d043;
    }
    .min{
      background-color: #ffbd2a;
    }
    .close{
      background-color: #ff625c;
    }
  }
}
</style>
