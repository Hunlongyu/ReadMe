<template>
  <div class="frame">
    <div class="left">
      <span>ReadMe client</span>
    </div>
    <div class="right">
      <span class="min" @click="onFrame('min')"></span>
      <span class="max" @click="onFrame('max')"></span>
      <span class="close" @click="onFrame('close')"></span>
    </div>
  </div>
</template>
<script>
export default {
  name: 'frame',
  methods: {
    onFrame (type) {
      const {ipcRenderer: ipc} = require('electron')
      ipc.send(type)
    }
  }
}
</script>
<style lang="scss" scoped>
.frame{
  height: 30px;
  background-color: #242b2e;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #ababab;
  font-weight: bold;
  -webkit-user-select: none;
  -webkit-app-region: drag;
  border-bottom: 1px solid #2e3538;
  .left{
    margin-left: 8px;
    background: url(./book.png) no-repeat left center;
    span{
      margin-left: 18px;
      font-size: 14px;
    }
  }
  .right{
    span{
      display: inline-block;
      width: 30px;
      height: 30px;
      background-size: 100% 100%;
      background-repeat: no-repeat;
      -webkit-app-region: no-drag;
      cursor: pointer;
      vertical-align: middle;
      background-size: 15px 15px;
      background-repeat: no-repeat;
      background-position: center center;
      &:hover{
        background-color: #32383a;
      }
    }
    .min{
      background-image: url(./min.png);
    }
    .max{
      background-image: url(./max.png);
    }
    .close{
      background-image: url(./close.png);
    }
  }
}
</style>

