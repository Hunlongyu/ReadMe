<template>
  <div class="trending">
    <div class="filter">
      <div class="fr-item">
        <span>Spoken Language: </span>
        <el-select v-model="spokenLanguage.value" size="mini" @change="trendingChangeEvent">
          <el-option
            v-for="item in spokenLanguage.list"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </div>
      <div class="fr-item">
        <span>Language: </span>
        <el-select v-model="language.value" size="mini" @change="trendingChangeEvent">
          <el-option
            v-for="(item, index) in language.list.language"
            :key="index"
            :label="item"
            :value="item">
          </el-option>
        </el-select>
      </div>
      <div class="fr-item">
        <span>Date Range: </span>
        <el-select v-model="date.value" size="mini" @change="trendingChangeEvent">
          <el-option
            v-for="item in date.list"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </div>
    </div>
    <div class="content scroll" v-loading="loading">
      <div class="content-wrapper">
        <div class="item" v-for="(i, j) in content" :key="j">
          <div class="title">
            <div class="title-left" @click="itemClickEvent(i)">
              <svg class="title-icon" width="20" height="20" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="48" height="48" fill="white" fill-opacity="0.01"/><path d="M10 44C8.89543 44 8 43.1046 8 42V6C8 4.89543 8.89543 4 10 4H38C39.1046 4 40 4.89543 40 6V42C40 43.1046 39.1046 44 38 44H10Z" fill="none" stroke="#333" stroke-width="2" stroke-linejoin="round"/><path fill-rule="evenodd" clip-rule="evenodd" d="M21 22V4H33V22L27 15.7273L21 22Z" fill="none" stroke="#333" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><path d="M10 4H38" stroke="#333" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
              <span class="title-author">{{i.fullName}}</span>
            </div>
            <div class="title-right">
              <el-button size="mini" @click="starRepositoryEvent(i)">
                <svg width="16" height="16" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="48" height="48" fill="white" fill-opacity="0.01"/><path d="M23.9986 5L17.8856 17.4776L4 19.4911L14.0589 29.3251L11.6544 43L23.9986 36.4192L36.3454 43L33.9586 29.3251L44 19.4911L30.1913 17.4776L23.9986 5Z" fill="none" stroke="#333" stroke-width="2" stroke-linejoin="round"/></svg>
                <span class="mini-name">star</span>
              </el-button>
            </div>
          </div>
          <div class="describe">{{i.describe}}</div>
          <div class="info">
            <div class="info-left">
              <div class="info-language" v-if="i.language">
                <span>{{i.language}}</span>
              </div>
              <div class="info-star">
                <svg width="16" height="16" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="48" height="48" fill="white" fill-opacity="0.01"/><path d="M23.9986 5L17.8856 17.4776L4 19.4911L14.0589 29.3251L11.6544 43L23.9986 36.4192L36.3454 43L33.9586 29.3251L44 19.4911L30.1913 17.4776L23.9986 5Z" fill="none" stroke="#333" stroke-width="2" stroke-linejoin="round"/></svg>
                <span>{{i.star}}</span>
              </div>
              <div class="info-fork">
                <svg width="16" height="16" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg"><g><rect width="48" height="48" fill="white" fill-opacity="0.01" stroke-linejoin="round" stroke-width="2" stroke="none" fill-rule="evenodd"/><g transform="translate(7.000000, 4.000000)"><circle fill="none" fill-rule="nonzero" cx="30" cy="4" r="4" stroke-linejoin="round" stroke-width="2" stroke="#333"/><circle fill="none" fill-rule="nonzero" cx="4" cy="4" r="4" stroke-linejoin="round" stroke-width="2" stroke="#333"/><circle fill="none" fill-rule="nonzero" cx="17" cy="36" r="4" stroke-linejoin="round" stroke-width="2" stroke="#333"/><path d="M4,8 L4,11 C4,18 17,21 17,28 L17,32 L17,28 C17,21 30,18 30,11 L30,8" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" stroke="#333" fill="none" fill-rule="evenodd"/></g></g></svg>
                <span>{{i.fork}}</span>
              </div>
            </div>
            <div class="info-right">
              <div class="info-octiconStar">
                <svg width="16" height="16" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="48" height="48" fill="white" fill-opacity="0.01"/><path d="M23.9986 5L17.8856 17.4776L4 19.4911L14.0589 29.3251L11.6544 43L23.9986 36.4192L36.3454 43L33.9586 29.3251L44 19.4911L30.1913 17.4776L23.9986 5Z" fill="none" stroke="#333" stroke-width="2" stroke-linejoin="round"/></svg>
                <span>{{i.octiconStar}}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <el-drawer v-model="mdShow" direction="rtl" size="70%" :title="title">
      <Markdown ref="markdown"/>
    </el-drawer>
  </div>
</template>
<script lang="ts" setup>
import { nextTick, onMounted, reactive, ref } from 'vue'
import languageList from './language.json'
import { getTrending, getRepository } from '../../utils/trending'
import { checkStarRepository, starRepository, unStarRepository } from '../../utils/star'
import type { Repository, trendingRepoType } from '@/types'
import Markdown from '../../components/Markdown.vue'
import type { mdApi } from '../../components/Markdown.vue'
import { ElMessage } from 'element-plus'

const spokenLanguage = reactive({
  value: 'English',
  list: [
    { label: 'Chinese', value: 'zh' },
    { label: 'English', value: 'en' },
    { label: 'Japanese', value: 'ja' }
  ]
})
const language = reactive({
  value: 'javascript',
  list: languageList
})
const date = reactive({
  value: 'daily',
  list: [
    { label: 'Today', value: 'daily' },
    { label: 'This week', value: 'weekly' },
    { label: 'This month', value: 'monthly' }
  ]
})

const content = ref<trendingRepoType[]>([])
const loading = ref(false)
const mdShow = ref(false)
const markdown = ref<mdApi>()
const title = ref('')

// 切换说话语言
async function trendingChangeEvent () {
  loading.value = true
  content.value = await getTrending(spokenLanguage.value, language.value, date.value)
  loading.value = false
}

// 选择一个库查看
async function itemClickEvent (repo: trendingRepoType) {
  const res = await getRepository(repo.author, repo.repo)
  mdShow.value = true
  title.value = repo.fullName
  nextTick(() => {
    if (markdown.value) {
      markdown.value.init(res as Repository)
    }
  })
}

// 点击收藏事件
async function starRepositoryEvent (e: trendingRepoType) {
  const result = await checkStarRepository(e.fullName)
  if (result) {
    await unStarRepository(e.fullName)
    ElMessage({ message: '取消收藏成功', type: 'success' })
  } else {
    await starRepository(e.fullName)
    ElMessage({ message: '收藏成功', type: 'success' })
  }
}

onMounted(() => {
  trendingChangeEvent()
})
</script>
<style lang="scss" scoped>
.trending{
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
