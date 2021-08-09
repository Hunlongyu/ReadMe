<template>
  <div class="star">
    <div class="tags scroll">
      <div class="cat">
        <el-tree :data="list" :default-expanded-keys="[1, 2, 3]" node-key="id" @node-click="nodeClickEvent"/>
      </div>
    </div>
    <div class="list">
      <div class="list-wrapper">
        <div class="item">
          <div class="item-name">markdedjs / marked</div>
          <div class="item-description">a markdown parser and compiler.built for speed</div>
          <div class="item-info">
            <div class="item-language">JavaScript</div>
            <div class="item-star">25515</div>
            <div class="item-fork">3057</div>
          </div>
        </div>
      </div>
    </div>
    <div class="content">
      <markdown />
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

function nodeClickEvent (data: TreeNodeType) {
  console.log('=== data ===', data)
}

async function getSelfStarList () {
  const res = await me.get()
  if (res && res.login) {
    const list = await getAllSelfStar()
    console.log('=== list ===', list)
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
    width: 280px;
    background-color: #f8f8f8;
    border-left: 1px solid #d9e3e5;
    border-right: 1px solid #d9e3e5;
    .item{
      border: 1px solid #000;
      display: flex;
      flex-direction: column;
      padding: 6px;
      .item-name{
        font-size: 16px;
        font-size: #333;
      }
      .item-description{
        margin: 6px 0 4px;
        font-size: 14px;
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
