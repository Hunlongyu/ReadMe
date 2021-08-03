<template>
  <div class="trending">
    <div class="filter">
      Repositories Developers
      spoken language
      language
      date range
    </div>
    <div class="content"></div>
  </div>
</template>
<script lang="ts" setup>

</script>
<style lang="scss" scoped>
.trending{
  flex: 1;
  display: flex;
  border-top: 1px solid #d9e3e5;
  flex-direction: column;
  .filter{
    height: 60px;
    background-color: #f8f8f8;
    display: flex;
    justify-content: space-around;
    align-items: center;
  }
  .content{
    border-top: 1px solid #d9e3e5;
    flex: 1;
  }
}
</style>
