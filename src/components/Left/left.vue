<template>
  <v-layout align-start column fill-height class="h_left">
    <span slot="activator" class="logo"></span>
    <v-tooltip right>
      <span slot="activator" class="add" @click="icon('add')"></span>
      <span>{{$t('add')}}</span>
    </v-tooltip>
    <v-tooltip right>
      <span slot="activator" class="tag" @click="icon('tag')"></span>
      <span>{{$t('tag')}}</span>
    </v-tooltip>
    <v-tooltip right>
      <span slot="activator" class="set" @click="icon('set')"></span>
      <span>{{$t('set')}}</span>
    </v-tooltip>
  </v-layout>
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
