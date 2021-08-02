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
    <div class="content"></div>
  </div>
</template>
<script lang="ts" setup>
import { reactive } from '@vue/reactivity'
import { ElTree } from 'element-plus'
import 'element-plus/lib/theme-chalk/index.css'
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
