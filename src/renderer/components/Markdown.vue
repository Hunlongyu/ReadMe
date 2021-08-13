<template>
  <div class="md">
    <div class="md-header">
      <div class="md-header-left">
        <span class="icon-btn" title="Refresh">
          <svg width="24" height="24" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M42 8V24" stroke="#333" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><path d="M6 24L6 40" stroke="#333" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><path d="M6 24C6 33.9411 14.0589 42 24 42C28.8556 42 33.2622 40.0774 36.5 36.9519" stroke="#333" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><path d="M42.0007 24C42.0007 14.0589 33.9418 6 24.0007 6C18.9152 6 14.3223 8.10896 11.0488 11.5" stroke="#333" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
        </span>
        <span class="icon-btn" title="Github">
          <svg width="24" height="24" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="48" height="48" fill="white" fill-opacity="0.01"/><path d="M29.3444 30.4767C31.7481 29.9771 33.9292 29.1109 35.6247 27.8393C38.5202 25.6677 40 22.3137 40 19C40 16.6754 39.1187 14.5051 37.5929 12.6669C36.7427 11.6426 39.2295 4.00001 37.02 5.02931C34.8105 6.05861 31.5708 8.33691 29.8726 7.8341C28.0545 7.29577 26.0733 7.00001 24 7.00001C22.1992 7.00001 20.4679 7.22313 18.8526 7.63452C16.5046 8.23249 14.2591 6.00001 12 5.02931C9.74086 4.05861 10.9736 11.9633 10.3026 12.7946C8.84119 14.6052 8 16.7289 8 19C8 22.3137 9.79086 25.6677 12.6863 27.8393C14.6151 29.2858 17.034 30.2077 19.7401 30.6621" stroke="#333" stroke-width="2" stroke-linecap="round"/><path d="M19.7402 30.662C18.5817 31.9372 18.0024 33.148 18.0024 34.2946C18.0024 35.4411 18.0024 38.3465 18.0024 43.0108" stroke="#333" stroke-width="2" stroke-linecap="round"/><path d="M29.3443 30.4767C30.4421 31.9175 30.991 33.2112 30.991 34.3577C30.991 35.5043 30.991 38.3886 30.991 43.0108" stroke="#333" stroke-width="2" stroke-linecap="round"/><path d="M6 31.2156C6.89887 31.3255 7.56554 31.7388 8 32.4555C8.65169 33.5304 11.0742 37.5181 13.8251 37.5181C15.6591 37.5181 17.0515 37.5181 18.0024 37.5181" stroke="#333" stroke-width="2" stroke-linecap="round"/></svg>
        </span>
        <span class="icon-btn" title="Star">
          <svg width="24" height="24" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="48" height="48" fill="white" fill-opacity="0.01"/><path d="M23.9986 5L17.8856 17.4776L4 19.4911L14.0589 29.3251L11.6544 43L23.9986 36.4192L36.3454 43L33.9586 29.3251L44 19.4911L30.1913 17.4776L23.9986 5Z" fill="none" stroke="#333" stroke-width="2" stroke-linejoin="round"/></svg>
        </span>
      </div>
      <div class="md-header-right">
        <el-dropdown trigger="click">
          <span class="el-dropdown-link md-dropdown-btn">
            Clone<i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item>https://www.baidu.com</el-dropdown-item>
              <el-dropdown-item>ssh://www.baidu.com</el-dropdown-item>
              <el-dropdown-item divided>[加速] - https://www.baidu.com</el-dropdown-item>
              <el-dropdown-item>[加速] - https://www.baidu.com</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
        <el-dropdown trigger="click">
          <span class="el-dropdown-link md-dropdown-btn">
            Export<i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item>PDF</el-dropdown-item>
              <el-dropdown-item>JPG</el-dropdown-item>
              <el-dropdown-item>PNG</el-dropdown-item>
              <el-dropdown-item>Markdown</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </div>
    </div>
    <div class="md-body scroll" v-loading="loading">
      <div class="markdown-wrapper">
        <div class="markdown-body" v-html="source"></div>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import type { SelfStarType } from '@/types'
import { defineExpose, ref, nextTick } from 'vue'
import { getReadMeMd, renderMarkdwon } from '../utils/markdown'
import 'highlight.js/styles/github.css'

const repo = ref<SelfStarType>()
const source = ref<string>()
const loading = ref(false)

async function init (e: SelfStarType) {
  source.value = ''
  loading.value = true
  repo.value = e
  const res = await getReadMeMd(e)
  if (res) {
    const val = await renderMarkdwon(res)
    source.value = val
    nextTick(() => {
      aLinkEvent()
    })
  }
  loading.value = false
}

// 使用外部浏览器打开 MD 里的链接
function aLinkEvent () {
  document.body.addEventListener('click', event => {
    event.preventDefault()
    const dom = event?.target as HTMLLinkElement
    if (dom.tagName === 'A') {
      const href = dom.href
      const reg = /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/
      if (href.match(reg)) {
        window.shell.openExternal(dom.href)
      }
    }
  })
}

export interface mdApi {
  init: typeof init
}

defineExpose({
  init
})

</script>

<style lang="scss" scoped>
@import '../assets/css/primer.css';
.md{
  position: relative;
  height: 100%;
}
.md-header{
  position: absolute;
  height: 50px;
  width: 100%;
  background-color: #fff;
  border-bottom: 1px solid #d9e3e5;
  z-index: 2;
  display: flex;
  justify-content: space-between;
  align-items: center;
  .md-header-left, .md-header-right{
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .md-header-right{
    .md-dropdown-btn{
      margin-right: 20px;
      cursor: pointer;
    }
  }
  .icon-btn{
    display: flex;
    width: 40px;
    height: 40px;
    justify-content: center;
    align-items: center;
    border-radius: 3px;
    margin-left: 12px;
    cursor: pointer;
    &:hover{
      background-color: #f8f8f8;
      border: 1px solid #d9e3e5;
    }
  }
}
.md-body{
  padding-top: 50px;
  width: 100%;
  height: 100%;
  position: relative;
  overflow-y: auto;
  .markdown-wrapper{
    position: absolute;
    width: 100%;
    padding: 20px;
  }
}
</style>
