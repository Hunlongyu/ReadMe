<template>
  <div class="redirect theme-light">
    <div class="redirect-wrapper nt-bg">
      <div class="left">redirect</div>
      <div class="right">redirect</div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { onMounted } from 'vue'

onMounted(() => {
  console.log(window.location.href, 'win link')
})

</script>
<style lang="scss">
html,body,#app{
  margin: 0;
  padding: 0;
  height: 100%;
}

.redirect{
  display: flex;
  width: 100%;
  height: 100%;
  flex-direction: column;
  .redirect-wrapper{
    flex: 1;
    position: relative;
    display: flex;
    .left{
      width: 50%;
      height: 100%;
    }
    .right{
      width: 50%;
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      .box{
        width: 320px;
        height: 480px;
        p{
          font-size: 12px;
        }
      }
      .button{
        padding: 10px 25px;
      }
      .line{
        width: 80%;
        margin: 40px auto 26px;
      }
    }
  }
}
</style>
