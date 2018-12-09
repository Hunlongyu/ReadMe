<template>
  <div class="h_home">
    <Top/>
    <div class="level h_body">
      <Left/>
      <Middle/>
      <Right :is="right"/>
    </div>
  </div>
</template>

<script>
export default {
  name: 'home',
  data () {
    return {
      right: 'Add'
    }
  }
}
</script>
<style lang="scss" scoped>
.h_home{
  position: relative;
  height: 100%;
  .h_body{
    height: calc(100% - 30px);
    width: 100%;
    display: flex;
  }
}
</style>
