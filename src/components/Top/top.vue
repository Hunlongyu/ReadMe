<template>
  <v-layout row wrap justify-end align-center grey lighten-3 class="h_top">
    <span class="min" @click="onFrame('min')"></span>
    <span class="max" @click="onFrame('max')"></span>
    <span class="close" @click="onFrame('close')"></span>
  </v-layout>
</template>
<script>
export default {
  name: 'top',
  methods: {
    onFrame (type) {
      const { ipcRenderer: ipc } = require('electron')
      ipc.send(type)
    }
  }
}
</script>
<style lang="scss" scoped>
.h_top{
  -webkit-app-region: drag;
  -webkit-user-select: none;
  height: 40px;
  border-bottom: 1px solid #bebebe;
  span{
    -webkit-app-region: no-drag;
    display: inline-block;
    height: 40px;
    width: 50px;
    background-size: 20px auto;
    background-position: center center;
    background-repeat: no-repeat;
    cursor: pointer;
  }
  .min{
    background-image: url(../../assets/image/min.svg);
    &:hover{
      background-color: #d4d4d4;
      background-image: url(../../assets/image/min_h.svg);
    }
  }
  .max{
    background-image: url(../../assets/image/max.svg);
    &:hover{
      background-color: #d4d4d4;
      background-image: url(../../assets/image/max_h.svg);
    }
  }
  .close{
    background-image: url(../../assets/image/close.svg);
    &:hover{
      background-color: #d4d4d4;
      background-image: url(../../assets/image/close_h.svg);
    }
  }
}
</style>
