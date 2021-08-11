<template>
  <div class="markdown scroll" v-loading="loading">
    <div class="markdown-wrapper">
      <div class="markdown-body" v-html="source"></div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import type { SelfStarType } from '@/types'
import { defineExpose, ref } from 'vue'
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
  }
  loading.value = false
}

const dom = document.querySelector('.markdown')
if (dom) {
  dom.addEventListener('click', (e) => {
    console.log(e)
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
