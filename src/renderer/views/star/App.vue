<template>
  <div class="star">
    <div class="tags scroll">
      <div class="cat">
        <el-tree :data="list" :default-expanded-keys="[1, 2, 3]" node-key="id" @node-click="nodeClickEvent"/>
      </div>
    </div>
    <div class="list scroll">
      <div class="list-wrapper">
        <div class="item" v-for="(i, j) in all" :key="j" @click="itemClickEvent(i)">
          <div class="item-name">{{i.full_name}}</div>
          <div class="item-description">{{i.description || '--'}}</div>
          <div class="item-info">
            <div class="item-language">{{i.language || '--'}}</div>
            <div class="item-star">{{i.stargazers_count || '--'}}</div>
            <div class="item-fork">{{i.forks_count || '--'}}</div>
          </div>
        </div>
      </div>
    </div>
    <div class="content">
      <markdown ref="markdown" />
    </div>
  </div>
</template>
<script lang="ts" setup>
import { getAllSelfStar } from '@/renderer/utils/star'
import { onMounted, ref } from 'vue'
import { me, star } from '../../plugins/database'
import type { SelfStarType } from '../../../types'
import type { TreeNodeType } from '../../../types/modules'
import Markdown from '../../components/Markdown.vue'
import type { mdApi } from '../../components/Markdown.vue'

const list = ref(
  [
    {
      id: 1,
      label: '分类',
      children: [
        {
          id: 4,
          label: 'all'
        }
      ]
    },
    {
      id: 2,
      label: 'Language',
      children: [
        {
          id: 5,
          label: 'JavaScript'
        },
        {
          id: 6,
          label: 'CSS'
        }
      ]
    },
    {
      id: 3,
      label: 'Tags',
      children: [
        {
          id: 7,
          label: 'Awesome'
        },
        {
          id: 8,
          label: 'VPN'
        }
      ]
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

function nodeClickEvent (data: TreeNodeType) {
  console.log('=== data ===', data)
}

async function getSelfStarList () {
  const res = await me.get()
  if (res && res.login) {
    all.value = await getAllSelfStar()
  }
}

async function initAddStarList () {
  const res = await star.all()
  if (!res.length) {
    await getSelfStarList()
  } else {
    all.value = res
  }
}

onMounted(async () => {
  await initAddStarList()
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
      }
    }
  }
  .content{
    flex: 1;
  }
}
</style>
