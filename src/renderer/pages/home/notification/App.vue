<template>
  <div class="notification" v-loading="loading">
    <div class="filter">
      <div class="fr-item">
        <span>All: </span>
        <el-select v-model="all" size="mini" @change="filterChangeEvent">
          <el-option label="True" :value="true"></el-option>
          <el-option label="False" :value="false"></el-option>
        </el-select>
      </div>
      <div class="fr-item">
        <span>Participating: </span>
        <el-select v-model="participating" size="mini" @change="filterChangeEvent">
          <el-option label="True" :value="true"></el-option>
          <el-option label="False" :value="false"></el-option>
        </el-select>
      </div>
    </div>
    <div class="content scroll">
      <div class="content-wrapper">
        <div class="item" v-for="(i, j) in content" :key="j">
          <div class="title">
            <div class="title-left" @click="itemClickEvent(i)">
              <svg class="title-icon" width="20" height="20" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="48" height="48" fill="white" fill-opacity="0.01"/><path d="M10 44C8.89543 44 8 43.1046 8 42V6C8 4.89543 8.89543 4 10 4H38C39.1046 4 40 4.89543 40 6V42C40 43.1046 39.1046 44 38 44H10Z" fill="none" stroke="#333" stroke-width="2" stroke-linejoin="round"/><path fill-rule="evenodd" clip-rule="evenodd" d="M21 22V4H33V22L27 15.7273L21 22Z" fill="none" stroke="#333" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><path d="M10 4H38" stroke="#333" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
              <span class="title-author">{{i.repository.full_name}}</span>
            </div>
            <div class="title-right">
              <el-button size="mini" @click="readItem(i)">
                <svg width="16" height="16" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="48" height="48" fill="white" fill-opacity="0.01"/><path d="M24 44C29.5228 44 34.5228 41.7614 38.1421 38.1421C41.7614 34.5228 44 29.5228 44 24C44 18.4772 41.7614 13.4772 38.1421 9.85786C34.5228 6.23858 29.5228 4 24 4C18.4772 4 13.4772 6.23858 9.85786 9.85786C6.23858 13.4772 4 18.4772 4 24C4 29.5228 6.23858 34.5228 9.85786 38.1421C13.4772 41.7614 18.4772 44 24 44Z" fill="none" stroke="#333" stroke-width="2" stroke-linejoin="round"/><path d="M16 24L22 30L34 18" stroke="#333" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
                <span class="mini-name">read</span>
              </el-button>
            </div>
          </div>
          <div class="describe">{{i.subject.title}}</div>
          <div class="info">
            <div class="info-left">
              <div class="info-language">
                <span>{{formatTime(i.updated_at)}}</span>
              </div>
            </div>
          </div>
        </div>
        <div class="item">
          <el-button-group>
            <el-button icon="el-icon-arrow-left" size="mini" :disabled="page === 1" @click="changePagesEvent('preview')"></el-button>
            <el-button icon="el-icon-arrow-right" size="mini" :disabled="content.length < 50" @click="changePagesEvent('next')"></el-button>
          </el-button-group>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { onMounted, ref } from 'vue'
import { getNotifications, readNofification, getNotificationContent } from '../../../utils/notifications'
import type { Thread } from '@/types'
import { ElMessage } from 'element-plus'

const content = ref<Thread[]>([])
const loading = ref(false)
const page = ref(1)
const all = ref(false)
const participating = ref(false)

// 过滤条件
function filterChangeEvent () {
  getNotificationsList(all.value, participating.value)
}

// 列表点击事件
async function itemClickEvent (e: Thread) {
  console.log('lala', e)
  const id = Number(e.id)
  const res = await getNotificationContent(id)
  console.log(res, ' res ')
}

// 标记已读
async function readItem (e: Thread) {
  const id = Number(e.id)
  await readNofification(id)
  ElMessage({ message: 'Done!', type: 'success' })
  getNotificationsList(all.value, participating.value)
}

// 获取列表
async function getNotificationsList (all: boolean, participating: boolean) {
  loading.value = true
  content.value = await getNotifications(all, page.value, participating)
  loading.value = false
}

// 格式化时间
function formatTime (time: string) {
  return time.replace('T', ' ').replace('Z', '')
}

function changePagesEvent (e: string) {
  if (e === 'preview') {
    page.value--
  } else {
    page.value++
  }
  getNotificationsList(all.value, participating.value)
}

onMounted(() => {
  getNotificationsList(all.value, participating.value)
})
</script>
<style lang="scss" scoped>
.notification{
  flex: 1;
  display: flex;
  border-top: 1px solid #d9e3e5;
  flex-direction: column;
  .filter{
    height: 60px;
    background-color: #f8f8f8;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    padding: 0 20px;
    .fr-item{
      font-size: 14px;
      margin-right: 16px;
      :deep .el-select{
        width: 120px;
      }
    }
  }
  .content{
    border-top: 1px solid #d9e3e5;
    flex: 1;
    position: relative;
    overflow-y: auto;
    .content-wrapper{
      position: absolute;
      padding: 0 20px;
      width: 100%;
      .item{
        border-bottom: 1px solid #cdcdcd;
        padding: 20px 0;
        &::last-child{
          border: none;
        }
        .title{
          height: 24px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          font-size: 18px;
          margin-bottom: 6px;
          :deep .el-button--mini{
            padding: 2px 10px;
            min-height: 26px;
            span{
              height: 16px;
              display: flex;
              align-items: center;
              justify-content: center;
              svg{
                margin-right: 4px;
              }
            }
          }
          .title-left{
            display: flex;
            cursor: pointer;
            &:hover{
              color: #409eff;
            }
          }
          .title-icon{
            margin-right: 8px;
            vertical-align: middle;
          }
          .title-split{
            margin: 0 4px;
          }
        }
        .describe{
          font-size: 14px;
          color: #666;
        }
        .info{
          display: flex;
          justify-content: space-between;
          align-items: center;
          font-size: 14px;
          margin-top: 10px;
          color: #666;
          .info-left{
            display: flex;
            .info-language, .info-star, .info-fork{
              margin-right: 20px;
              display: flex;
              svg{
                margin-right: 3px;
              }
            }
          }
          .info-right{
            .info-octiconStar{
              display: flex;
              svg{
                margin-right: 3px;
              }
            }
          }
        }
      }
    }
  }
}
</style>
