<template>
  <div class="markdown scroll" v-loading="loading">
    <div class="markdown-wrapper">
      <div class="markdown-body" v-html="source"></div>
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
.markdown{
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
