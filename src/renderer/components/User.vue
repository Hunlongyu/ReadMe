<template>
<div class="user">
    <div class="user-body">
      <div class="user-header">
        <div class="user-header-left">
          <span class="icon-btn" title="Github" @click="goGithub">
            <svg width="24" height="24" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="48" height="48" fill="white" fill-opacity="0.01"/><path d="M29.3444 30.4767C31.7481 29.9771 33.9292 29.1109 35.6247 27.8393C38.5202 25.6677 40 22.3137 40 19C40 16.6754 39.1187 14.5051 37.5929 12.6669C36.7427 11.6426 39.2295 4.00001 37.02 5.02931C34.8105 6.05861 31.5708 8.33691 29.8726 7.8341C28.0545 7.29577 26.0733 7.00001 24 7.00001C22.1992 7.00001 20.4679 7.22313 18.8526 7.63452C16.5046 8.23249 14.2591 6.00001 12 5.02931C9.74086 4.05861 10.9736 11.9633 10.3026 12.7946C8.84119 14.6052 8 16.7289 8 19C8 22.3137 9.79086 25.6677 12.6863 27.8393C14.6151 29.2858 17.034 30.2077 19.7401 30.6621" stroke="#333" stroke-width="2" stroke-linecap="round"/><path d="M19.7402 30.662C18.5817 31.9372 18.0024 33.148 18.0024 34.2946C18.0024 35.4411 18.0024 38.3465 18.0024 43.0108" stroke="#333" stroke-width="2" stroke-linecap="round"/><path d="M29.3443 30.4767C30.4421 31.9175 30.991 33.2112 30.991 34.3577C30.991 35.5043 30.991 38.3886 30.991 43.0108" stroke="#333" stroke-width="2" stroke-linecap="round"/><path d="M6 31.2156C6.89887 31.3255 7.56554 31.7388 8 32.4555C8.65169 33.5304 11.0742 37.5181 13.8251 37.5181C15.6591 37.5181 17.0515 37.5181 18.0024 37.5181" stroke="#333" stroke-width="2" stroke-linecap="round"/></svg>
          </span>
          <span class="icon-btn" title="Export image!" @click="exportImage">
            <svg width="24" height="24" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M39 6H9C7.34315 6 6 7.34315 6 9V39C6 40.6569 7.34315 42 9 42H39C40.6569 42 42 40.6569 42 39V9C42 7.34315 40.6569 6 39 6Z" stroke="#333" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><path d="M18 23C20.7614 23 23 20.7614 23 18C23 15.2386 20.7614 13 18 13C15.2386 13 13 15.2386 13 18C13 20.7614 15.2386 23 18 23Z" fill="none" stroke="#333" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><path d="M42 36L31 26L21 35L14 29L6 35" stroke="#333" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
          </span>
        </div>
      </div>
      <div class="user-content scroll" v-loading="loading">
        <div class="user-wrapper">
          <div class="info">
            <div class="CircleBadge CircleBadge--medium avatar">
              <img class="CircleBadge-icon" :src="user?.avatar_url" alt="">
            </div>
            <div class="username">{{user?.login}}</div>
            <div class="description">{{user?.bio}}</div>
          </div>
          <div class="more">
            <div class="trophy">
              <img :src="`https://github-profile-trophy.vercel.app/?username=${user?.login}&margin-w=28`" alt="">
            </div>
            <div class="stats">
              <img class="stats-left" :src="`https://github-readme-stats.vercel.app/api/top-langs/?username=${user?.login}`" alt="">
              <img class="stats-right" :src="`https://github-readme-stats.vercel.app/api?username=${user?.login}&show_icons=true&count_private=true&line_height=40`" alt="">
            </div>
            <div class="contributions">
              <img :src="`http://ghchart.rshah.org/${user?.login}`" :alt="`${user?.login}`" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { ref, defineExpose } from 'vue'
import type { SearchUsers } from '@/renderer/utils/search'
import type { PublicUser } from '@/types'
import html2canvas from 'html2canvas'
import FileSaver from 'file-saver'

const user = ref<SearchUsers | PublicUser>()
const loading = ref(false)

// 初始化
async function init (form: string, u: SearchUsers | PublicUser) {
  if (form === 'db') {
    const info = u as PublicUser
    user.value = info
  } else {
    const info = u as SearchUsers
    user.value = info
  }
}

// 进入 GitHub 个人主页
function goGithub () {
  if (user.value) {
    window.shell.openExternal(user.value?.html_url)
  }
}

// 导出图片
function exportImage () {
  const dom = document.querySelector('.user-wrapper') as HTMLElement
  html2canvas(dom, { useCORS: true, allowTaint: false }).then(canvas => {
    const png = canvas.toDataURL('image/png')
    FileSaver.saveAs(png, `${user.value?.login}.png`)
  })
}

export interface userApi {
  init: typeof init
}

defineExpose({
  init
})
</script>
<style lang="scss" scoped>
.user{
  height: 100%;
  position: relative;
  .user-body{
    height: 100%;
    display: flex;
    flex-direction: column;
    .user-header{
      margin-top: 30px;
      height: 50px;
      border-bottom: 1px solid #d9e3e5;
      border-top: 1px solid #d9e3e5;
      display: flex;
      justify-content: space-between;
      align-items: center;
      .user-header-left, .user-header-right{
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
      }
      .user-header-right{
        margin-right: 20px;
        :deep .el-button-group{
          margin-left: 4px;
          display: flex;
        }
      }
      .icon-btn{
        display: flex;
        width: 40px;
        height: 40px;
        justify-content: center;
        align-items: center;
        border-radius: 3px;
        margin-left: 12px;
        cursor: pointer;
        &:hover{
          background-color: #f8f8f8;
          border: 1px solid #d9e3e5;
        }
        &.active{
          background-color: #f8f8f8;
          border: 1px solid #d9e3e5;
        }
      }
    }
    .user-content{
      flex: 1;
      position: relative;
      overflow-y: auto;
      .user-wrapper{
        position: absolute;
        width: 100%;
        padding: 0;
        .info{
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          width: 90%;
          margin: 20px auto;
          max-width: 800px;
          .username{
            margin-top: 10px;
            font-size: 18px;
          }
          .description{
            margin-top: 8px;
            font-size: 14px;
          }
        }
        .more{
          width: 90%;
          max-width: 800px;
          margin: 20px auto;
          .trophy{
            img{
              width: 100%;
            }
          }
          .stats{
            width: 100%;
            display: flex;
            justify-content: space-between;
            .stats-left{
              width: 37%;
            }
            .stats-right{
              width: 61%;
            }
          }
          .contributions{
            margin-top: 20px;
            img{
              width: 100%;
              height: auto
            }
          }
        }
      }
    }
  }
}
</style>
