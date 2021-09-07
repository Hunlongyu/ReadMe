<template>
  <div class="code">
    <div class="code-body">
      <div class="code-header">
        <div class="code-header-left">
          <span class="icon-btn" :title="t('component.github')" @click="goGithub">
            <svg width="24" height="24" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="48" height="48" fill="white" fill-opacity="0.01"/><path d="M29.3444 30.4767C31.7481 29.9771 33.9292 29.1109 35.6247 27.8393C38.5202 25.6677 40 22.3137 40 19C40 16.6754 39.1187 14.5051 37.5929 12.6669C36.7427 11.6426 39.2295 4.00001 37.02 5.02931C34.8105 6.05861 31.5708 8.33691 29.8726 7.8341C28.0545 7.29577 26.0733 7.00001 24 7.00001C22.1992 7.00001 20.4679 7.22313 18.8526 7.63452C16.5046 8.23249 14.2591 6.00001 12 5.02931C9.74086 4.05861 10.9736 11.9633 10.3026 12.7946C8.84119 14.6052 8 16.7289 8 19C8 22.3137 9.79086 25.6677 12.6863 27.8393C14.6151 29.2858 17.034 30.2077 19.7401 30.6621" stroke="#333" stroke-width="2" stroke-linecap="round"/><path d="M19.7402 30.662C18.5817 31.9372 18.0024 33.148 18.0024 34.2946C18.0024 35.4411 18.0024 38.3465 18.0024 43.0108" stroke="#333" stroke-width="2" stroke-linecap="round"/><path d="M29.3443 30.4767C30.4421 31.9175 30.991 33.2112 30.991 34.3577C30.991 35.5043 30.991 38.3886 30.991 43.0108" stroke="#333" stroke-width="2" stroke-linecap="round"/><path d="M6 31.2156C6.89887 31.3255 7.56554 31.7388 8 32.4555C8.65169 33.5304 11.0742 37.5181 13.8251 37.5181C15.6591 37.5181 17.0515 37.5181 18.0024 37.5181" stroke="#333" stroke-width="2" stroke-linecap="round"/></svg>
          </span>
          <span class="icon-btn" :title="t('component.copy_code')" @click="copyCode">
            <svg width="24" height="24" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M13 38H41V16H30V4H13V38Z" fill="none" stroke="#333" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><path d="M30 4L41 16" stroke="#333" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><path d="M7 20V44H28" stroke="#333" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><path d="M19 20H23" stroke="#333" stroke-width="2" stroke-linecap="round"/><path d="M19 28H31" stroke="#333" stroke-width="2" stroke-linecap="round"/></svg>
          </span>
          <span class="icon-btn" :title="t('component.export_image')" @click="exportImage">
            <svg width="24" height="24" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M39 6H9C7.34315 6 6 7.34315 6 9V39C6 40.6569 7.34315 42 9 42H39C40.6569 42 42 40.6569 42 39V9C42 7.34315 40.6569 6 39 6Z" stroke="#333" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><path d="M18 23C20.7614 23 23 20.7614 23 18C23 15.2386 20.7614 13 18 13C15.2386 13 13 15.2386 13 18C13 20.7614 15.2386 23 18 23Z" fill="none" stroke="#333" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><path d="M42 36L31 26L21 35L14 29L6 35" stroke="#333" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
          </span>
          <span class="icon-btn" :title="t('component.save_file')" @click="saveFile">
            <svg width="24" height="24" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M10 44H38C39.1046 44 40 43.1046 40 42V14L31 4H10C8.89543 4 8 4.89543 8 6V42C8 43.1046 8.89543 44 10 44Z" stroke="#333" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><path d="M27 24L32 29L27 34" stroke="#333" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><path d="M21 24L16 29L21 34" stroke="#333" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><path d="M30 4V14H40" stroke="#333" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
          </span>
        </div>
        <div class="code-header-right">
          <el-input v-model="searchTxt" size="mini" @change="searchTextChange" @keydown.enter="searchContentKey('next')">
            <template #suffix>
              {{current}} / {{total}}
            </template>
          </el-input>
          <el-button-group>
            <el-button size="mini" @click="changeFilterCase" :plain="fcase" :type="fcase ? 'primary': 'default'" :title="t('component.match_case')">
              <svg width="10" height="10" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M4 8H32" stroke="#333" stroke-width="2" stroke-linecap="round"/><path d="M28 21H44" stroke="#333" stroke-width="2" stroke-linecap="round"/><path d="M18 42L18 8" stroke="#333" stroke-width="2" stroke-linecap="round"/><path d="M36 42L36 21" stroke="#333" stroke-width="2" stroke-linecap="round"/></svg>
            </el-button>
            <el-button icon="el-icon-top" size="mini" @click="searchContentKey('preview')"></el-button>
            <el-button icon="el-icon-bottom" size="mini" @click="searchContentKey('next')"></el-button>
          </el-button-group>
        </div>
      </div>
      <div class="code-content scroll" v-loading="loading">
        <div class="code-wrapper">
          <hljsVuePlugin.component :code="code" />
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { ref, defineExpose, nextTick, onBeforeUnmount } from 'vue'
import hljsVuePlugin from '@highlightjs/vue-plugin'
import type { SearchCode } from '../utils/search'
import { getCodeContent } from '../utils/search'
import copy from 'clipboard-copy'
import { ElMessage } from 'element-plus'
import html2canvas from 'html2canvas'
import FileSaver from 'file-saver'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
const repo = ref<SearchCode>()
const loading = ref(false)
const code = ref('')
const searchTxt = ref('')
const current = ref(1)
const total = ref(1)
const fcase = ref(false)

// 初始化
async function init (e: SearchCode, txt: string) {
  repo.value = e
  searchTxt.value = txt
  loading.value = true
  code.value = ''
  current.value = 0
  getSearchCodeContent(e)
}

// 获取搜索内容
async function getSearchCodeContent (repo: SearchCode) {
  const res = await getCodeContent(repo.git_url)
  window.api.invoke('event.tools.base64', [{ content: res }])
  window.api.on('event.tools.base64_replay', (e, args) => {
    code.value = args
    loading.value = false
    nextTick(() => {
      searchContentKey('preview')
    })
  })
}

// 进入 github
function goGithub () {
  if (repo.value) {
    window.shell.openExternal(repo.value.html_url)
  }
}

// 复制代码到剪贴板
function copyCode () {
  if (code.value) {
    try {
      copy(code.value)
      ElMessage({ message: t('component.copy_success'), type: 'success' })
    } catch (err) {
      ElMessage({ message: t('component.copy_failed'), type: 'warning' })
    }
  }
}

// 代码转图片保存
function exportImage () {
  const dom = document.querySelector('.hljs') as HTMLElement
  html2canvas(dom, { useCORS: true, allowTaint: false }).then(canvas => {
    const png = canvas.toDataURL('image/png')
    FileSaver.saveAs(png, `${repo.value?.name}.png`)
  })
}

// 保存文件
function saveFile () {
  if (!repo.value) return false
  const file = new File([code.value], repo.value?.name, { type: 'text/plain;charset=utf-8' })
  FileSaver.saveAs(file)
}

// 改变搜索关键字
function searchTextChange () {
  current.value = 1
  total.value = 1
  searchContentKey('preview')
}

function changeFilterCase () {
  fcase.value = !fcase.value
  searchTextChange()
}

// 搜索关键字位置
function searchContentKey (type: string) {
  if (type === 'preview') {
    if (current.value <= 1) {
      current.value = 1
    } else {
      current.value--
    }
  } else {
    if (current.value >= total.value) {
      current.value = total.value
    } else {
      current.value++
    }
  }
  const matchList = []

  const dom = document.querySelector('.code-wrapper')
  if (!dom) return false
  const arr = dom.querySelectorAll('span')
  if (!arr.length) return false

  for (let i = 0; i < arr.length; i++) {
    const txt = arr[i].innerHTML
    let reg = new RegExp(searchTxt.value, 'i')
    if (fcase.value) {
      reg = new RegExp(searchTxt.value)
    } else {
      reg = new RegExp(searchTxt.value, 'i')
    }
    if (reg.test(txt)) {
      matchList.push(arr[i])
    }
  }

  if (!matchList) return false
  total.value = matchList.length
  const bgc = document.querySelector('.code-bgc')
  if (bgc) bgc.classList.remove('code-bgc')
  const m = matchList[current.value - 1]
  if (!m) return false
  m.classList.add('code-bgc')
  m.scrollIntoView({ behavior: 'smooth', block: 'center', inline: 'center' })
}

onBeforeUnmount(() => {
  current.value = 0
  total.value = 1
})

export interface codeApi {
  init: typeof init
}

defineExpose({
  init
})

</script>
<style lang="scss" scoped>
.code{
  height: 100%;
  position: relative;
  .code-body{
    height: 100%;
    display: flex;
    flex-direction: column;
    .code-header{
      margin-top: 30px;
      height: 50px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      .code-header-left, .code-header-right{
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
      }
      .code-header-right{
        margin-right: 20px;
        :deep .el-button-group{
          margin-left: 4px;
          display: flex;
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
      }
    }
    .code-content{
      flex: 1;
      position: relative;
      overflow-y: auto;
      .code-wrapper{
        position: absolute;
        width: 100%;
        padding: 0;
        :deep .code-bgc{
          background-color: red;
        }
      }
    }
  }
}
</style>
