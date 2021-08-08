<template>
  <div class="star">
    <div class="tags">
      <div class="cat">
        <el-tree :data="cat.list" />
        <el-tree :data="cat.language" />
        <el-tree :data="cat.tags" />
      </div>
    </div>
    <div class="list"></div>
    <div class="content">
      <markdown />
    </div>
  </div>
</template>
<script lang="ts" setup>
import { getAllSelfStar } from '@/renderer/utils/star'
import { onMounted, reactive, ref } from 'vue'
import { me, star } from '../../plugins/database'
import type { SelfStarType } from '../../../types'
import Markdown from '../../components/Markdown.vue'

const cat = reactive({
  list: [
    {
      label: '分类',
      children: [
        {
          label: 'gaga'
        }
      ]
    }
  ],
  language: [
    {
      label: 'Language',
      children: [
        {
          label: 'JavaScript'
        },
        {
          label: 'CSS'
        }
      ]
    }
  ],
  tags: [
    {
      label: 'Tags',
      children: [
        {
          label: 'Awesome'
        },
        {
          label: 'VPN'
        }
      ]
    }
  ]
})

const all = ref<SelfStarType[]>([])

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
    width: 200px;
  }
  .list{
    width: 280px;
    background-color: #f8f8f8;
    border-left: 1px solid #d9e3e5;
    border-right: 1px solid #d9e3e5;
  }
  .content{
    flex: 1;
  }
}
</style>
