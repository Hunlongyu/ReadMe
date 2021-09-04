<template>
  <div class="signin theme-light">
    <div class="signin-wrapper nt-bg">
      <div class="left"></div>
      <div class="right">
        <div class="box nt-box">
          <button class="button nt-btn" @click="authLogin">{{ $t('signin.sign') }}</button>
          <span class="line nt-line" data-title=""></span>
          <p>{{ $t('signin.describe1') }}</p>
          <p>{{ $t('signin.describe2') }}</p>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
function authLogin () {
  const isDev = process.env.NODE_ENV !== 'production'
  if (isDev) {
    window.location.href = `https://github.com/login/oauth/authorize?response_type=code&state=${new Date().getTime()}&client_id=${process.env.VUE_APP_clientId}&scope=repo%20gist%20notifications&redirect_uri=http://localhost:8080/login#/loading`
  } else {
    window.location.href = `https://github.com/login/oauth/authorize?response_type=code&state=${new Date().getTime()}&client_id=${process.env.CLIENT_ID}&scope=repo%20gist%20notifications&redirect_uri=app://./login.html#/loading`
  }
}
</script>
<style lang="scss">
html,body,#app{
  margin: 0;
  padding: 0;
  height: 100%;
}

.signin{
  display: flex;
  width: 100%;
  height: 100%;
  flex-direction: column;
  .signin-wrapper{
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
