<template>
  <v-layout row wrap justify-end align-center grey lighten-3 class="h_top">
    <span @click="onFrame('min')">min</span>
    <span @click="onFrame('max')">max</span>
    <span @click="onFrame('close')">close</span>
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
  height: 50px;
  span{
    -webkit-app-region: no-drag;
  }
}
</style>
