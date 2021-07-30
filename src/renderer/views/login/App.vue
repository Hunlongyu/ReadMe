<template>
  <div class="login">
    <frame />
    <div class="login-wrapper">
      <div class="left"></div>
      <div class="right">
        <div class="box">
          <button class="button">Sign up width Github</button>
          <span class="line"></span>
          <button class="button">Sign up width Github name</button>
        </div>
      </div>
    </div>
    <!-- <a href="https://github.com/login/oauth/authorize?client_id=dce5a448c5e9cca4d566&redirect_uri=http://localhost:8080/#/home">授权</a>
    <a href="http://localhost:8080/#/home">home</a> -->
  </div>
</template>
<script lang="ts" setup>
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'
import Frame from '../../components/Frame.vue'

const router = useRouter()

// 获取连接参数
function getQueryString (param: string) {
  var reg = new RegExp('(^|&)' + param + '=([^&]*)(&|$)')
  var r = window.location.search.substr(1).match(reg)
  if (r != null) return unescape(r[2])
  return ''
}

function checkCode () {
  const link = getQueryString('code')
  if (link !== '') {
    router.push({ name: 'Home' })
  }
}

onMounted(() => {
  // checkCode()
})
</script>
<style lang="scss" scoped>
.login{
  display: flex;
  width: 100%;
  height: 100%;
  flex-direction: column;
  .login-wrapper{
    flex: 1;
    background-color: #f0f0f0;
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
        border-radius: 6px;
        background: #f0f0f0;
        box-shadow: 10px 10px 12px #dadada, -10px -10px 12px #fefefe;
        display: flex;
        justify-content: center;
        align-items: center;
        color: #001f3f;
        flex-direction: column;
      }
      .button{
        padding: 10px 25px;
        border-radius: 6px;
        background: #f0f0f0;
        box-shadow: 10px 10px 12px #dadada, -10px -10px 12px #fefefe;
        display: flex;
        justify-content: center;
        align-items: center;
        cursor: pointer;
        font-size: 16px;
        transition: 0.3s;
        border: none;
        &:hover{
          box-shadow: -6px 6px 12px #dadada, 6px -6px 12px #fefefe;
        }
        &:active{
          box-shadow: -3px 3px 2px #dadada, 3px -3px 2px #fefefe;
        }
      }
      .line{
        margin: 20px 0;
      }
    }
  }
}
</style>
