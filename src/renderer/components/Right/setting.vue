<template>
  <div class="setting">
    <div class="info external-link">
      <p class="title">关于</p>
      <p><span>版本：</span><span>v0.2.0</span></p>
      <p><span>作者：</span><span>Hunlongyu</span></p>
      <p><span>邮箱：</span><span>hunlongyu@gmail.com</span></p>
      <p><span>项目地址：</span><span><a href="https://github.com/Hunlongyu/ReadMe-client">https://github.com/Hunlongyu/ReadMe-client</a></span></p>
      <p></p>
    </div>
  </div>
</template>
<script>
export default {
  name: 'setting'
}
</script>
<style lang="scss" scoped>
.setting{
  padding: 10px;
  width: 100%;
  overflow: scroll;
  position: relative;
  &::-webkit-scrollbar{
    width: 4px;
    height: 4px;
  }
  &::-webkit-scrollbar-thumb {
      border-radius: 2px;
      box-shadow: inset 0 0 2px rgba(0,0,0,0.2);
      background: rgba(0,0,0,0.6);
  }
  &::-webkit-scrollbar-track {
      box-shadow: inset 0 0 2px rgba(0,0,0,0.2);
      border-radius: 0;
      background: rgba(0,0,0,0.4);
  }
  p{
    &.title{
      font-size: 20px;
      border-bottom: 1px solid #bebebe;
    }
    span{
      display: inline-block;
    }
    span:nth-child(1){
      width: 100px;
    }
  }
}
</style>
