<template>
  <div class="star">
    <div class="tags scroll">
      <div class="cat">
        <el-tree :data="list" :default-expanded-keys="[1, 2]" node-key="id" @node-click="nodeClickEvent"/>
      </div>
    </div>
    <div class="list scroll">
      <div class="list-wrapper">
        <div class="item" v-for="(i, j) in all" :key="j" @click="itemClickEvent(i)">
          <div class="item-name">{{i.full_name}}</div>
          <div class="item-description">{{i.description || '--'}}</div>
          <div class="item-info">
            <div class="item-language">{{i.language || '--'}}</div>
            <div class="item-star">
              <svg width="16" height="16" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="48" height="48" fill="white" fill-opacity="0.01"/><path d="M23.9986 5L17.8856 17.4776L4 19.4911L14.0589 29.3251L11.6544 43L23.9986 36.4192L36.3454 43L33.9586 29.3251L44 19.4911L30.1913 17.4776L23.9986 5Z" fill="none" stroke="#333" stroke-width="2" stroke-linejoin="round"/></svg>
              <span>{{i.stargazers_count || '--'}}</span>
            </div>
            <div class="item-fork">
              <svg width="16" height="16" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg"><g><rect width="48" height="48" fill="white" fill-opacity="0.01" stroke-linejoin="round" stroke-width="2" stroke="none" fill-rule="evenodd"/><g transform="translate(7.000000, 4.000000)"><circle fill="none" fill-rule="nonzero" cx="30" cy="4" r="4" stroke-linejoin="round" stroke-width="2" stroke="#333"/><circle fill="none" fill-rule="nonzero" cx="4" cy="4" r="4" stroke-linejoin="round" stroke-width="2" stroke="#333"/><circle fill="none" fill-rule="nonzero" cx="17" cy="36" r="4" stroke-linejoin="round" stroke-width="2" stroke="#333"/><path d="M4,8 L4,11 C4,18 17,21 17,28 L17,32 L17,28 C17,21 30,18 30,11 L30,8" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" stroke="#333" fill="none" fill-rule="evenodd"/></g></g></svg>
              <span>{{i.forks_count || '--'}}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="content">
      <Markdown ref="markdown" />
    </div>
  </div>
</template>
<script lang="ts" setup>
import { getAllSelfStar, getStarLanguageList, listType } from '@/renderer/utils/star'
import { onMounted, ref } from 'vue'
import { me, star } from '../../plugins/database'
import type { SelfStarType } from '../../../types'
import type { TreeNodeType } from '../../../types/modules'
import Markdown from '../../components/Markdown.vue'
import type { mdApi } from '../../components/Markdown.vue'

const list = ref<listType[]>(
  [
    {
      id: 1,
      label: 'All',
      children: []
    },
    {
      id: 2,
      label: 'Language',
      children: []
    }
  ]
)

const all = ref<SelfStarType[]>([])

const repo = ref<SelfStarType | null>(null)

const markdown = ref<mdApi>()

function itemClickEvent (e: SelfStarType) {
  repo.value = e
  if (markdown.value) {
    markdown.value.init(e)
  }
}

// 列表树点击事件
async function nodeClickEvent (data: TreeNodeType) {
  if (data.label === 'All') {
    await initAddStarList()
    return false
  }
  if (data.label) {
    await getListByLanguage(data.label)
    return false
  }
}

// 通过编程语言筛选列表树
async function getListByLanguage (lang: string) {
  const res = await star.where('language', lang)
  all.value = res
}

// 获取所有 star
async function getSelfStarList () {
  const res = await me.get()
  if (res && res.login) {
    all.value = await getAllSelfStar()
    const arr = [...all.value]
    const arrs = JSON.stringify(arr)
    const arrj = JSON.parse(arrs)
    star.bulkAdd(arrj)
  }
}

// 初始化列表树
async function initAddStarList () {
  const res = await star.all()
  if (!res.length) {
    await getSelfStarList()
  } else {
    all.value = res
  }
}

async function initLanguageList () {
  const ls = await getStarLanguageList()
  if (ls) {
    list.value[1].children = ls
  }
}

onMounted(async () => {
  await initAddStarList()
  await initLanguageList()
})
</script>
<style lang="scss" scoped>
.star{
  flex: 1;
  display: flex;
  border-top: 1px solid #d9e3e5;
  .tags{
    height: 100%;
    overflow-y: auto;
    position: relative;
    width: 200px;
    .cat{
      position: absolute;
      width: 100%;
    }
  }
  .list{
    height: 100%;
    width: 280px;
    overflow-y: auto;
    position: relative;
    background-color: #f8f8f8;
    border-left: 1px solid #d9e3e5;
    border-right: 1px solid #d9e3e5;
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
  }
}
</style>
