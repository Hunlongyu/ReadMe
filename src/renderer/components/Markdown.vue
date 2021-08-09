<template>
  <div class="markdown">
    <div class="markdown-wrapper">
      markdown
    </div>
  </div>
</template>
<script lang="ts" setup>
console.log('markdown')
</script>

<style lang="scss" scoped>
.markdown{
  width: 100%;
  height: 100%;
  position: relative;
  overflow-y: auto;
  .markdown-wrapper{
    position: absolute;
    width: 100%;
  }
}
</style>
