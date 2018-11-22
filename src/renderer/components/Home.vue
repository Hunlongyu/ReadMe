<template>
  <div class="main">
    <frame />
    <div class="body">
      <left />
      <middle />
      <right />
    </div>
  </div>
</template>
<script>
import frame from './Frame'
import left from './Left'
import middle from './Middle'
import right from './Right'
export default {
  name: 'readme',
  components: {
    frame,
    left,
    middle,
    right
  }
}
</script>
<style lang="scss" scoped>
.main{
  position: relative;
  height: 100%;
  .body{
    height: 100%;
    display: flex;

  }
}
</style>
