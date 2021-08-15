<template>
  <div class="search">
    <div class="filter">
      <div class="type">
        <span>Repositories</span>
        <span>Code</span>
        <span>Commits</span>
        <span>Issues</span>
        <span>Discussions</span>
        <span>Users</span>
      </div>
      <div class="advanced">
        <div class="item">
          <span>With this many stars</span>
          <el-input></el-input>
        </div>
        <div class="item">
          <span>With this many forks</span>
          <el-input></el-input>
        </div>
      </div>
      <div class="language">
        <span>javascript</span>
      </div>
    </div>
    <div class="content">{{ $t('search.content') }}</div>
  </div>
</template>
<script lang="ts" setup>

</script>
<style lang="scss" scoped>
.search{
  flex: 1;
  display: flex;
  border-top: 1px solid #d9e3e5;
  .filter{
    width: 200px;
    background-color: #f8f8f8;
    border-right: 1px solid #d9e3e5;
  }
}
</style>
