<template>
  <div class="search">
    <div class="filter">{{ $t('search.filter') }}</div>
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
