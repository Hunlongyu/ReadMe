<template>
  <div class="markdown scroll">
    <div class="markdown-wrapper">
      <div class="markdown-body" v-html="source"></div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import type { SelfStarType } from '@/types'
import { defineExpose, ref } from 'vue'
import Mdit from 'markdown-it'
import axios from 'axios'
import hljs from 'highlight.js'
import 'highlight.js/styles/github.css'
import '../assets/css/primer.css'

const repo = ref<SelfStarType>()
const source = ref<string>()

function init (e: SelfStarType) {
  repo.value = e
  console.log('markdown', repo.value)
  getMd()
}

async function getMd () {
  // const res = await axios.get('https://raw.githubusercontent.com/JanGuillermo/vue3-markdown-it/master/README.md')
  const res = await axios.get('https://raw.githubusercontent.com/markdown-it/markdown-it/master/README.md')
  const md = new Mdit({
    html: true,
    linkify: true,
    typographer: true,
    highlight: (str, lang) => {
      if (lang && hljs.getLanguage(lang)) {
        try {
          return hljs.highlight(str, { language: lang }).value
        } catch (__) {}
      }
      return ''
    }
  })
  source.value = md.render(res.data)
}

export interface mdApi {
  init: typeof init
}

defineExpose({
  init
})

</script>

<style lang="scss" scoped>
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
