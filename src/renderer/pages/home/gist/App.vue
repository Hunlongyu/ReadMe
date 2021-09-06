<template>
  <div class="gist">
    <div class="list">
      <div class="list-body scroll">
        <div class="list-wrapper">
          <div class="item" v-for="(i, j) in all" :key="j" @click="itemClickEvent(i)">
            <div class="item-name">{{showFirstFile(i)}}</div>
            <div class="item-description">{{i.description || '--'}}</div>
            <div class="item-info">
              <div>{{formatTime(i.created_at)}}</div>
              <div>{{formatTime(i.updated_at)}}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="content scroll">
      <div class="content-wrapper">
        <el-collapse accordion @change="collapseEvent" v-if="files">
          <el-collapse-item v-for="(i, j) in files" :key="j" :name="JSON.stringify(i)">
            <template #title>
              <span class="filename">
                {{i.filename}}
              </span>
              <span v-if="i.language">
                Language: {{i.language}}
              </span>
              <span v-if="i.size">
                Size: {{i.size}}B
              </span>
            </template>
            <div v-if="i.language" v-loading="!fileContent">
              <hljsVuePlugin.component :code="fileContent" />
            </div>
            <div v-if="!i.language">
              {{fileContent}}
            </div>
          </el-collapse-item>
        </el-collapse>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { onMounted, ref } from 'vue'
import { getSelfGist, getGistContent } from '@/renderer/utils/gist'
import type { BaseGist } from '@/types'
import hljsVuePlugin from '@highlightjs/vue-plugin'

const all = ref<BaseGist[]>()
const files = ref()
const fileContent = ref()

// 实时获取 gist 列表
async function getGistList () {
  all.value = await getSelfGist()
}

// 显示该 gist files 下的第一个文件
function showFirstFile (item: BaseGist) {
  const files = item.files
  for (const i in files) {
    return i
  }
}

// 格式化时间
function formatTime (time: string) {
  return time.replace('T', ' ').replace('Z', '')
}

// 点击单个 gist 事件
async function itemClickEvent (item: BaseGist) {
  files.value = null
  fileContent.value = ''
  files.value = item.files
}

// 展开关闭事件
async function collapseEvent (item: string) {
  const file = JSON.parse(item)
  fileContent.value = ''
  if (file.language) {
    const res = await getGistContent(file.raw_url)
    fileContent.value = res
  } else {
    fileContent.value = file.raw_url
  }
}

onMounted(() => {
  getGistList()
})
</script>
<style lang="scss" scoped>
.gist{
  flex: 1;
  display: flex;
  border-top: 1px solid #d9e3e5;
  .list{
    height: 100%;
    width: 280px;
    position: relative;
    background-color: #f8f8f8;
    border-right: 1px solid #d9e3e5;
    .list-body{
      position: absolute;
      height: 100%;
      overflow-y: auto;
      position: relative;
    }
    .list-wrapper{
      width: 100%;
      position: absolute;
    }
    .item{
      border-bottom: 1px solid #d9e3e5;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      padding: 6px;
      height: 90px;
      cursor: pointer;
      .item-name{
        font-size: 16px;
        font-size: #333;
      }
      .item-description{
        margin: 6px 0 4px;
        font-size: 14px;
        height: 34px;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
        overflow: hidden;
        color: #666;
      }
      .item-info{
        display: flex;
        font-size: 13px;
        justify-content: space-between;
        .item-language, .item-star, .item-fork{
          display: flex;
          svg{
            margin-right: 3px;
          }
        }
      }
    }
  }
  .content{
    flex: 1;
    position: relative;
    overflow-y: auto;
    .content-wrapper{
      position: absolute;
      padding: 10px 20px;
      width: 100%;
      .el-collapse-item__header{
        .filename{
          font-size: 14px;
        }
        span{
          margin-right: 30px;
          font-size: 12px;
        }
      }
    }
  }
}
</style>
