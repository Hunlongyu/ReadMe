<template>
  <el-col class="h_left">
    <span class="logo"></span>
    <el-tooltip content="add" placement="left" effect="dark" class="add"><span @click="icon('add')"></span></el-tooltip>
    <el-tooltip content="tag" placement="left" effect="dark" class="tag"><span @click="icon('tag')"></span></el-tooltip>
    <el-tooltip content="set" placement="left" effect="dark" class="set"><span @click="icon('set')"></span></el-tooltip>
  </el-col>
</template>
<script>
export default {
  name: 'left',
  methods: {
    icon (res) {
      this.$store.commit('changeView', res)
    }
  }
}
</script>
<style lang="scss" scoped>
.h_left{
  -webkit-app-region: drag;
  -webkit-user-select: none;
  background-color: rgb(36,43,46);
  height: 100%;
  span{
    display: inline-block;
    width: 60px;
    height: 60px;
    text-align: center;
    line-height: 80px;
    background-size: 30px auto;
    background-position: center center;
    background-repeat: no-repeat;
  }
  .logo{
    background-image: url(../../assets/image/logo.svg);
  }
  .add{
    -webkit-app-region: no-drag;
    background-image: url(../../assets/image/add_d.svg);
    cursor: pointer;
    &:hover{
      background-color: #30373a;
      background-image: url(../../assets/image/add_h.svg);
    }
  }
  .tag{
    -webkit-app-region: no-drag;
    background-image: url(../../assets/image/tag_d.svg);
    cursor: pointer;
    &:hover{
      background-color: #30373a;
      background-image: url(../../assets/image/tag_h.svg);
    }
  }
  .set{
    -webkit-app-region: no-drag;
    background-image: url(../../assets/image/set_d.svg);
    cursor: pointer;
    &:hover{
      background-color: #30373a;
      background-image: url(../../assets/image/set_h.svg);
    }
  }
}
</style>
