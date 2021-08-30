<template>
  <div class="code">
    <el-drawer v-model="treeShow" :direction="direction">
      <span>Hi, there!</span>
    </el-drawer>
    <div class="code-body">
      <div class="code-header"></div>
      <div class="code-content scroll">
        <div class="code-wrapper">
          <hljsVuePlugin.component :code="code" />
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { ref, defineExpose } from 'vue'
import hljsVuePlugin from '@highlightjs/vue-plugin'
import type { SearchCode } from '../utils/search'
import { getCodeContent } from '../utils/search'

const repo = ref<SearchCode>()
const treeShow = ref(false)
const direction = ref('rtl')
const code = ref('')

async function init (e: SearchCode) {
  repo.value = e
  getSearchCodeContent()
}

async function getSearchCodeContent () {
  if (repo.value) {
    const res = await getCodeContent(repo.value.git_url)
    code.value = res
  }
}

export interface codeApi {
  init: typeof init
}

defineExpose({
  init
})

</script>
<style lang="scss">
.code{
  height: 100%;
  position: relative;
  .code-body{
    height: 100%;
    display: flex;
    flex-direction: column;
    .code-header{
      height: 50px;
      border-bottom: 1px solid #d9e3e5;
      border-top: 1px solid #d9e3e5;
    }
    .code-content{
      flex: 1;
      position: relative;
      overflow-y: auto;
      .code-wrapper{
        position: absolute;
        width: 100%;
        padding: 0;
      }
    }
  }
}
</style>
