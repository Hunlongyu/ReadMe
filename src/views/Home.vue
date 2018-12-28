<template>
  <el-container class="main">
    <el-aside width="60px">
      <Left />
    </el-aside>
    <el-aside width="270px">
      <Middle />
    </el-aside>
    <el-container>
      <el-header height="40px">
        <Top />
      </el-header>
      <el-main class="h_right">
        <Right :is="right"/>
      </el-main>
    </el-container>
  </el-container>
</template>
<script>
export default {
  name: 'home',
  computed: {
    right () {
      return this.$store.state.view
    }
  }
}
</script>
<style lang="scss">
.main{
  height: 100%;
  .el-header{
    padding: 0;
  }
  .h_right{
    margin: 0;
    padding: 0;
  }
}
</style>
