<template>
  <div class="column has-background-black-ter has-text-grey-light h_top">
    <div class="level">
      <div class="level-left">
        <span class="icon">
          <font-awesome-icon icon="atlas" />
        </span>
        <span>&nbsp;ReadMe client</span>
      </div>
      <div class="level-right has-text-centered">
        <span @click="onFrame('min')">
          <font-awesome-icon icon="window-minimize" />
        </span>
        <span @click="onFrame('max')">
          <font-awesome-icon icon="window-restore" />
        </span>
        <span @click="onFrame('close')">
          <font-awesome-icon icon="window-close" />
        </span>
      </div>
    </div>
  </div>
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
  .level{
    height: 30px;
    .level-left{
      margin-left: 5px;
    }
    .level-right{
      span{
        -webkit-app-region: no-drag;
        height: 30px;
        width: 34px;
        cursor: pointer;
        &:hover{
          background-color: hsl(0, 0%, 48%);
          color: hsl(0, 0%, 14%);
        }
        svg{
          height: 14px;
          width: 14px;
        }
      }
    }
  }
}
</style>
