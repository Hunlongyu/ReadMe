<template>
  <div class="frame">
    <div class="name">ReadMe</div>
    <div class="win">
      <span @click="winEvent('mini')">
        <i class="rm-minus"></i>
      </span>
      <span @click="winEvent('max')">
        <i class="rm-plus"></i>
      </span>
      <span @click="winEvent('close')" class="close">
        <i class="rm-close"></i>
      </span>
    </div>
    <div class="mac">
      <span @click="winEvent('close')" class="close"></span>
      <span @click="winEvent('mini')" class="min"></span>
      <span @click="winEvent('max')" class="max"></span>
    </div>
  </div>
</template>

<script lang="ts" setup>
// 窗口事件
function winEvent (e: string) {
  window.api.invoke(`event.win.${e}`)
}
</script>

<style scoped lang="scss">
.frame{
  height: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  -webkit-app-region: drag;
  position: relative;
  background-color: #ecf6f9;
  border-bottom: 1px solid #d9e3e5;
  .name{
    font-size: 14px;
  }
  .win{
    height: 100%;
    position: absolute;
    right: 0;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    span{
      display: flex;
      width: 60px;
      height: 30px;
      color: #191a1a;
      justify-content: center;
      align-items: center;
      transition: 0.3s;
      -webkit-app-region: no-drag;
      i{
        transform: scale(0.8);
      }
      &:hover{
        color: #000000;
        background-color: #e2ecef;
      }
    }
    .close{
      &:hover{
        background-color: #c42b1c;
        color: #fdfafa;
      }
    }
  }
  .mac{
    position: absolute;
    left: 0;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    span{
      display: flex;
      width: 12px;
      height: 12px;
      border-radius: 100%;
      margin-left: 8px;
      cursor: pointer;
      -webkit-app-region: no-drag;
    }
    .max{
      background-color: #26d043;
    }
    .min{
      background-color: #ffbd2a;
    }
    .close{
      background-color: #ff625c;
    }
  }
}
</style>
