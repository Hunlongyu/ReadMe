<template>
  <div class="search">
    <div class="filter">
      <div class="type">
        <div class="item">
          <span>Repositories</span>
          <span>{{numbers?.repositories || 0}}</span>
        </div>
        <div class="item">
          <span>Code</span>
          <span>{{numbers?.code || 0}}</span>
        </div>
        <div class="item">
          <span>Commits</span>
          <span>{{numbers?.commits || 0}}</span>
        </div>
        <div class="item">
          <span>Issues</span>
          <span>{{numbers?.issues || 0}}</span>
        </div>
        <div class="item">
          <span>Users</span>
          <span>{{numbers?.users || 0}}</span>
        </div>
      </div>
      <div class="advanced">
        <div class="item">
          <span>With this many stars</span>
          <el-input size="mini"></el-input>
        </div>
        <div class="item">
          <span>With this many forks</span>
          <el-input size="mini"></el-input>
        </div>
      </div>
      <div class="language">
        <span>javascript</span>
      </div>
    </div>
    <div class="search-box">
      <div class="search-header">
        <el-select v-model="searchType" placeholder="请选择" size="small" @change="searchEvent">
          <el-option label="Best match" value="1"></el-option>
          <el-option label="Most stars" value="2"></el-option>
          <el-option label="Fewest stars" value="3"></el-option>
          <el-option label="Most forks" value="4"></el-option>
          <el-option label="Fewest forks" value="5"></el-option>
          <el-option label="Recently updated" value="6"></el-option>
          <el-option label="Least recently updated" value="7"></el-option>
        </el-select>
        <el-input v-model="searchTxt" @keypress.enter="searchEvent" size="small">
          <template #append>
            <el-button size="mini" @click="searchEvent" icon="el-icon-search"></el-button>
          </template>
        </el-input>
      </div>
      <div class="content scroll" v-loading="loading">
        <div class="content-wrapper">
          <div class="item" v-for="(i, j) in content?.items" :key="j">
            <div class="title">
              <div class="title-left" @click="itemClickEvent(i)">
                <svg class="title-icon" width="20" height="20" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="48" height="48" fill="white" fill-opacity="0.01"/><path d="M10 44C8.89543 44 8 43.1046 8 42V6C8 4.89543 8.89543 4 10 4H38C39.1046 4 40 4.89543 40 6V42C40 43.1046 39.1046 44 38 44H10Z" fill="none" stroke="#333" stroke-width="2" stroke-linejoin="round"/><path fill-rule="evenodd" clip-rule="evenodd" d="M21 22V4H33V22L27 15.7273L21 22Z" fill="none" stroke="#333" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><path d="M10 4H38" stroke="#333" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
                <span class="title-author">{{i.full_name}}</span>
              </div>
              <div class="title-right">
                <el-button size="mini" @click="starRepositoryEvent(i)">
                  <svg width="16" height="16" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="48" height="48" fill="white" fill-opacity="0.01"/><path d="M23.9986 5L17.8856 17.4776L4 19.4911L14.0589 29.3251L11.6544 43L23.9986 36.4192L36.3454 43L33.9586 29.3251L44 19.4911L30.1913 17.4776L23.9986 5Z" fill="none" stroke="#333" stroke-width="2" stroke-linejoin="round"/></svg>
                  <span class="mini-name">star</span>
                </el-button>
              </div>
            </div>
            <div class="describe">{{i.description}}</div>
            <div class="info">
              <div class="info-left">
                <div class="info-language" v-if="i.language">
                  <span>{{i.language}}</span>
                </div>
                <div class="info-star">
                  <svg width="16" height="16" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="48" height="48" fill="white" fill-opacity="0.01"/><path d="M23.9986 5L17.8856 17.4776L4 19.4911L14.0589 29.3251L11.6544 43L23.9986 36.4192L36.3454 43L33.9586 29.3251L44 19.4911L30.1913 17.4776L23.9986 5Z" fill="none" stroke="#333" stroke-width="2" stroke-linejoin="round"/></svg>
                  <span>{{i.stargazers_count}}</span>
                </div>
                <div class="info-fork">
                  <svg width="16" height="16" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg"><g><rect width="48" height="48" fill="white" fill-opacity="0.01" stroke-linejoin="round" stroke-width="2" stroke="none" fill-rule="evenodd"/><g transform="translate(7.000000, 4.000000)"><circle fill="none" fill-rule="nonzero" cx="30" cy="4" r="4" stroke-linejoin="round" stroke-width="2" stroke="#333"/><circle fill="none" fill-rule="nonzero" cx="4" cy="4" r="4" stroke-linejoin="round" stroke-width="2" stroke="#333"/><circle fill="none" fill-rule="nonzero" cx="17" cy="36" r="4" stroke-linejoin="round" stroke-width="2" stroke="#333"/><path d="M4,8 L4,11 C4,18 17,21 17,28 L17,32 L17,28 C17,21 30,18 30,11 L30,8" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" stroke="#333" fill="none" fill-rule="evenodd"/></g></g></svg>
                  <span>{{i.forks_count}}</span>
                </div>
              </div>
              <div class="info-right"></div>
            </div>
          </div>
          <div class="item" v-if="content && content.items?.length > 0">
            <el-pagination layout="prev, pager, next" :page-size="100" :current-page="idx" :total="content?.total_count" @current-change="currentChangeEvent"></el-pagination>
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
import { ref } from 'vue'
import type { SearchRepository } from '@/types'
import type { SearchRepositoryType, searchNumberType } from '../../utils/search'
import { searchRepo, searchTypeNum } from '../../utils/search'
import { checkStarRepository, unStarRepository, starRepository } from '@/renderer/utils/star'
import { ElMessage } from 'element-plus'
import Markdown from '../../components/Markdown.vue'
import type { mdApi } from '../../components/Markdown.vue'

const searchType = ref('1')
const searchTxt = ref('')
const content = ref<SearchRepositoryType>()
const numbers = ref<searchNumberType>()
const loading = ref(false)
const idx = ref(1)
const mdShow = ref(false)
const markdown = ref<mdApi>()
const title = ref('')

// 搜索事件
async function searchEvent () {
  loading.value = true
  if (searchTxt.value === '') return false
  const res = await searchRepo(searchType.value, searchTxt.value, idx.value)
  if (res) {
    content.value = res
  }
  loading.value = false
  numbers.value = await searchTypeNum(searchTxt.value)
}

// 选择一个库查看
async function itemClickEvent (repo: SearchRepository) {
  mdShow.value = true
  title.value = repo.full_name
  if (markdown.value) {
    markdown.value.init(repo)
  }
}

// 切换页面事件
function currentChangeEvent (num: number) {
  idx.value = num
  if (content.value) {
    content.value.items = []
    searchEvent()
  }
}

// 点击收藏按钮事件
async function starRepositoryEvent (repo: SearchRepository) {
  const check = await checkStarRepository(repo.full_name)
  if (check) {
    await unStarRepository(repo.full_name)
    ElMessage({ message: '取消收藏成功', type: 'success' })
  } else {
    await starRepository(repo.full_name)
    ElMessage({ message: '收藏成功', type: 'success' })
  }
}
</script>
<style lang="scss" scoped>
.search{
  flex: 1;
  display: flex;
  border-top: 1px solid #d9e3e5;
  .filter{
    width: 200px;
    background-color: #f8f8f8;
    border-right: 1px solid #d9e3e5;
    display: flex;
    flex-direction: column;
    padding: 10px;
    .filter-box{
      margin-bottom: 40px;
    }
    .type, .language{
      display: flex;
      flex-direction: column;
      margin-bottom: 40px;
      .item{
        display: flex;
        justify-content: space-between;
        cursor: pointer;
        align-items: center;
        box-sizing: border-box;
        font-size: 12px;
        height: 30px;
        span{
          display: flex;
          justify-content: flex-start;
          align-items: center;
          border-radius: 3px;
          padding-left: 12px;
          padding-right: 12px;
        }
        &:hover{
          background-color: #ffffff;
          border: 1px solid #d9e3e5;
        }
      }
    }
    .advanced{
      margin-bottom: 40px;
    }
  }
  .search-box{
    width: 100%;
    display: flex;
    flex-direction: column;
    .search-header{
      height: 60px;
      background-color: #f8f8f8;
      display: flex;
      justify-content: flex-start;
      align-items: center;
      padding: 0 20px;
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
            display: -webkit-box;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 3;
            overflow: hidden;
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
}
</style>
