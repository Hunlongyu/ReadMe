<template>
  <div class="login">
    <frame />
    <div class="login-wrapper nt-bg">
      <div class="left"></div>
      <div class="right">
        <div class="box nt-box">
          <button class="button nt-btn" @click="authLogin">{{ $t('login.sign') }}</button>
          <span class="line nt-line" data-title=""></span>
          <p>{{ $t('login.describe1') }}</p>
          <p>{{ $t('login.describe2') }}</p>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import Frame from '../../components/Frame.vue'

function authLogin () {
  window.location.href = 'https://github.com/login/oauth/authorize?client_id=dce5a448c5e9cca4d566&scope=repo%20gist%20notifications&redirect_uri=http://localhost:8080/'
}
</script>
<style lang="scss" scoped>
.login{
  display: flex;
  width: 100%;
  height: 100%;
  flex-direction: column;
  .login-wrapper{
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
