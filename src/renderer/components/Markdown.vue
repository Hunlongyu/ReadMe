<template>
  <div class="md">
    <div class="md-header" v-show="repo">
      <div class="md-header-left">
        <span class="icon-btn" title="Refresh" @click="refresh">
          <svg width="24" height="24" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M42 8V24" stroke="#333" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><path d="M6 24L6 40" stroke="#333" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><path d="M6 24C6 33.9411 14.0589 42 24 42C28.8556 42 33.2622 40.0774 36.5 36.9519" stroke="#333" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><path d="M42.0007 24C42.0007 14.0589 33.9418 6 24.0007 6C18.9152 6 14.3223 8.10896 11.0488 11.5" stroke="#333" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
        </span>
        <span class="icon-btn" title="Github" @click="githubSite">
          <svg width="24" height="24" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="48" height="48" fill="white" fill-opacity="0.01"/><path d="M29.3444 30.4767C31.7481 29.9771 33.9292 29.1109 35.6247 27.8393C38.5202 25.6677 40 22.3137 40 19C40 16.6754 39.1187 14.5051 37.5929 12.6669C36.7427 11.6426 39.2295 4.00001 37.02 5.02931C34.8105 6.05861 31.5708 8.33691 29.8726 7.8341C28.0545 7.29577 26.0733 7.00001 24 7.00001C22.1992 7.00001 20.4679 7.22313 18.8526 7.63452C16.5046 8.23249 14.2591 6.00001 12 5.02931C9.74086 4.05861 10.9736 11.9633 10.3026 12.7946C8.84119 14.6052 8 16.7289 8 19C8 22.3137 9.79086 25.6677 12.6863 27.8393C14.6151 29.2858 17.034 30.2077 19.7401 30.6621" stroke="#333" stroke-width="2" stroke-linecap="round"/><path d="M19.7402 30.662C18.5817 31.9372 18.0024 33.148 18.0024 34.2946C18.0024 35.4411 18.0024 38.3465 18.0024 43.0108" stroke="#333" stroke-width="2" stroke-linecap="round"/><path d="M29.3443 30.4767C30.4421 31.9175 30.991 33.2112 30.991 34.3577C30.991 35.5043 30.991 38.3886 30.991 43.0108" stroke="#333" stroke-width="2" stroke-linecap="round"/><path d="M6 31.2156C6.89887 31.3255 7.56554 31.7388 8 32.4555C8.65169 33.5304 11.0742 37.5181 13.8251 37.5181C15.6591 37.5181 17.0515 37.5181 18.0024 37.5181" stroke="#333" stroke-width="2" stroke-linecap="round"/></svg>
        </span>
        <span :class="['icon-btn', chartShow ? 'active' : '']" title="StarChart" @click="starChartEvent">
          <svg width="24" height="24" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="48" height="48" fill="white" fill-opacity="0.01"/><path d="M6 6V42H42" stroke="#333" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><path d="M14 34L22 18L32 27L42 6" stroke="#333" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
        </span>
        <span :class="['icon-btn', starred ? 'starred' : '']" title="Star" @click="starClickEvent">
          <svg width="24" height="24" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="48" height="48" fill="white" fill-opacity="0.01"/><path d="M23.9986 5L17.8856 17.4776L4 19.4911L14.0589 29.3251L11.6544 43L23.9986 36.4192L36.3454 43L33.9586 29.3251L44 19.4911L30.1913 17.4776L23.9986 5Z" fill="none" stroke="#333" stroke-width="2" stroke-linejoin="round"/></svg>
        </span>
      </div>
      <div class="md-header-right">
        <el-dropdown trigger="click" @command="gitRepoEdit">
          <span class="el-dropdown-link md-dropdown-btn">
            Edit<i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item command="githubdev">[在线] - GitHub dev</el-dropdown-item>
              <el-dropdown-item command="github1s">[在线] - Github1s</el-dropdown-item>
              <el-dropdown-item command="vscode" divided>[本地] - VS Code</el-dropdown-item>
              <el-dropdown-item command="vs">[本地] - Visual Studio</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
        <el-dropdown trigger="click" @command="gitCloneEvent">
          <span class="el-dropdown-link md-dropdown-btn">
            Clone<i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item :command="repo?.clone_url">[官网] - {{ repo?.clone_url }}</el-dropdown-item>
              <el-dropdown-item :command="repo?.ssh_url">[官网] - {{ repo?.ssh_url }}</el-dropdown-item>
              <el-dropdown-item :command="fastCloneGit('fastgit')" divided>[加速] - {{ fastCloneGit('fastgit') }}</el-dropdown-item>
              <el-dropdown-item :command="fastCloneGit('gitclone')">[加速] - {{ fastCloneGit('gitclone') }}</el-dropdown-item>
              <el-dropdown-item :command="fastCloneGit('cnpmjs')">[加速] - {{ fastCloneGit('cnpmjs') }}</el-dropdown-item>
              <el-dropdown-item command="githubDesktop" divided>[软件] - Github desktop</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
        <el-dropdown trigger="click" @command="exportEvent">
          <span class="el-dropdown-link md-dropdown-btn">
            Export<i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item command="HTML">HTML</el-dropdown-item>
              <el-dropdown-item command="JPG">JPG</el-dropdown-item>
              <el-dropdown-item command="PNG">PNG</el-dropdown-item>
              <el-dropdown-item command="Markdown">Markdown</el-dropdown-item>
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
    <div class="chart-body" v-if="chartShow">
      <start-chart :fullName="repo?.full_name" ></start-chart>
    </div>
  </div>
</template>
<script lang="ts" setup>
import type { Repository } from '@/types'
import { defineExpose, ref, nextTick, onBeforeUnmount } from 'vue'
import { getReadMeMd, renderMarkdwon } from '../utils/markdown'
import { checkStarRepository, unStarRepository, starRepository } from '../utils/star'
import 'highlight.js/styles/github.css'
import copy from 'clipboard-copy'
import html2canvas from 'html2canvas'
import FileSaver from 'file-saver'
import { ElMessage, ElMessageBox } from 'element-plus'
import StartChart from './StartChart.vue'
import { sendIssues_MdNotFound } from '../utils/issues'
import bus from '@/renderer/plugins/mitt'

const repo = ref<Repository>()
const source = ref<string>()
const loading = ref(false)
const starred = ref(false)
const chartShow = ref(false)

// 刷新加载 markdown
async function refresh () {
  if (repo.value) {
    init(repo.value)
  }
}

// 打开 Github 库主页
async function githubSite () {
  if (repo.value?.html_url) {
    window.shell.openExternal(repo.value.html_url)
  }
}

// 打开 star 趋势图表
async function starChartEvent () {
  chartShow.value = !chartShow.value
}

// 检查该仓库是否被当前用户收藏
async function checkStarred () {
  if (repo.value?.full_name) {
    starred.value = await checkStarRepository(repo.value.full_name)
  }
}

// 收藏按钮点击事件
async function starClickEvent () {
  if (!repo.value?.full_name) return false
  if (starred.value) {
    await unStarRepository(repo.value.full_name)
    ElMessage({ message: '取消收藏成功', type: 'success' })
  } else {
    await starRepository(repo.value.full_name)
    ElMessage({ message: '收藏成功', type: 'success' })
  }
  checkStarred()
  bus.emit('bus.star.check', 'refresh')
}

// 编辑仓库代码
function gitRepoEdit (type: string) {
  const url = repo.value?.html_url
  if (type === 'githubdev' && url) {
    const uri = url.replace('github.com', 'github.dev')
    window.shell.openExternal(uri)
    return false
  }
  if (type === 'github1s' && url) {
    const uri = url.replace('github.com', 'github1s.com')
    window.shell.openExternal(uri)
    return false
  }
  if (type === 'vscode' && url) {
    const uri = 'vscode://github.remotehub/open?url=' + url
    window.shell.openExternal(uri)
    return false
  }
  if (type === 'vs' && url) {
    const uri = 'git-client://clone?repo=' + url
    window.shell.openExternal(uri)
    return false
  }
}

// 复制克隆地址到剪贴板
function gitCloneEvent (url: string) {
  if (url === 'githubDesktop') {
    const uri = 'x-github-client://openRepo/' + repo.value?.html_url
    window.shell.openExternal(uri)
  } else {
    try {
      copy(`git clone ${url}`)
      ElMessage({ message: '已复制到剪贴板。', type: 'success' })
    } catch (err) {
      ElMessage({ message: '复制失败，请重试。', type: 'warning' })
    }
  }
}

// 获取其他克隆地址
function fastCloneGit (site: string) {
  if (repo.value?.clone_url) {
    if (site === 'fastgit') {
      return repo.value.clone_url.replace('github.com', 'hub.fastgit.org')
    }
    if (site === 'gitclone') {
      return repo.value.clone_url.replace('github.com', 'gitclone.com/github.com')
    }
    if (site === 'cnpmjs') {
      return repo.value.clone_url.replace('github.com', 'github.com.cnpmjs.org')
    }
  }
  return ''
}

// 导出各种格式
async function exportEvent (type: string) {
  const dom = document.querySelector('.markdown-wrapper') as HTMLElement
  const name = repo.value?.full_name
  if (type === 'HTML') {
    const file = new File([dom.outerHTML], `${name}.html`, { type: 'text/html;charset=utf-8' })
    FileSaver.saveAs(file)
  }
  if (type === 'JPG') {
    html2canvas(dom, { useCORS: true, allowTaint: false }).then(canvas => {
      const jpg = canvas.toDataURL('image/jpg')
      FileSaver.saveAs(jpg, `${name}.jpg`)
    })
  }
  if (type === 'PNG') {
    html2canvas(dom, { useCORS: true, allowTaint: false }).then(canvas => {
      const png = canvas.toDataURL('image/png')
      FileSaver.saveAs(png, `${name}.png`)
    })
  }
  if (type === 'Markdown') {
    if (!repo.value) return false
    const res = await getReadMeMd(repo.value)
    const file = new File([res.content], `${repo.value.full_name} - ${res.name}`, { type: 'text/plain;charset=utf-8' })
    FileSaver.saveAs(file)
  }
}

// md 的点击事件
function mdClickEvent (event: Event) {
  event.preventDefault()
  const dom = event?.target as HTMLLinkElement
  if (dom.tagName === 'SUMMARY') {
    const p = dom.parentNode as HTMLDetailsElement
    p.open = !p.open
  }
  if (dom.tagName === 'A') {
    const href = dom.href
    const reg = /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/
    if (href.match(reg)) {
      window.shell.openExternal(dom.href)
    } else {
      const anchor = href.split('#')[1]
      if (!anchor) return false
      const heading = document.querySelector(`#${anchor}`)
      if (!heading) return false
      heading.scrollIntoView({ behavior: 'smooth', block: 'center' })
    }
  }
}

// 使用外部浏览器打开 MD 里的链接
function addMdEvent () {
  const md = document.querySelector('.markdown-body')
  if (!md) return false
  md.addEventListener('click', mdClickEvent, true)
}

// 清除 md 的监听事件
function clearMdEvent () {
  const md = document.querySelector('.markdown-body')
  if (!md) return false
  md.removeEventListener('click', mdClickEvent, true)
}

// 修复 MD 里相对路径的图片无法显示
function fixImgUrl () {
  const md = document.querySelector('.markdown-body')
  if (!md) return false
  const list = md.querySelectorAll('img')
  if (list.length <= 0) return false
  const fullName = repo.value?.full_name
  const branch = repo.value?.default_branch
  const isDev = process.env.NODE_ENV !== 'production'
  for (const i of list) {
    const img = i as HTMLImageElement
    const url = `https://raw.githubusercontent.com/${fullName}/${branch}/`
    let src = ''
    if (isDev) {
      src = img.src.replace('http://localhost:8080/', url)
    } else {
      src = img.src.replace('app://./', url)
    }
    img.src = src + '?' + Math.random()
  }
}

// 初始化
async function init (e: Repository) {
  loading.value = true
  repo.value = e
  chartShow.value = false
  source.value = ''
  await checkStarred()
  const res = await getReadMeMd(e)
  if (res.name && res.content) {
    const val = await renderMarkdwon(res)
    source.value = val
    nextTick(() => {
      clearMdEvent()
      addMdEvent()
      fixImgUrl()
    })
  } else {
    ElMessageBox.confirm('没有找到 README 文件，是否反馈该仓库，以帮助优化软件。', '提示', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning'
    }).then(() => {
      sendIssues_MdNotFound(e)
      ElMessage({ message: '已提交反馈，将在三个工作日解决，请勿重复提交。', type: 'success' })
    })
  }
  loading.value = false
}

onBeforeUnmount(() => {
  source.value = ''
})

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
  user-select: none;
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
    &.active{
      background-color: #f8f8f8;
      border: 1px solid #d9e3e5;
    }
  }
  .starred{
    svg{
      path{
        fill: #ffbd2a;
      }
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
.chart-body{
  position: absolute;
  top: 50px;
  left: 0;
  height: calc(100% - 50px);
  width: 100%;
  z-index: 100;
}
</style>
