<template>
  <div class="search">
    <div class="filter">
      <div class="type">
        <div :class="['item', active === 'repositories' ? 'active' : '']" @click="searchTypeClick('repositories')">
          <span>Repositories</span>
          <span>{{numbers?.repositories || 0}}</span>
        </div>
        <div :class="['item', active === 'code' ? 'active' : '']" @click="searchTypeClick('code')">
          <span>Code</span>
          <span>{{numbers?.code || 0}}</span>
        </div>
        <div :class="['item', active === 'commits' ? 'active' : '']" @click="searchTypeClick('commits')">
          <span>Commits</span>
          <span>{{numbers?.commits || 0}}</span>
        </div>
        <div :class="['item', active === 'issues' ? 'active' : '']" @click="searchTypeClick('issues')">
          <span>Issues</span>
          <span>{{numbers?.issues || 0}}</span>
        </div>
        <div :class="['item', active === 'users' ? 'active' : '']" @click="searchTypeClick('users')">
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
        <el-select v-model="sort" size="small" @change="searchEvent">
          <el-option v-for="i in sortType[active]" :key="i.value" :label="i.label" :value="i.value"></el-option>
        </el-select>
        <el-input v-model="searchTxt" @keypress.enter="searchEvent" size="small">
          <template #append>
            <el-button size="mini" @click="searchEvent" icon="el-icon-search"></el-button>
          </template>
        </el-input>
      </div>
      <div class="content scroll" v-loading="loading">
        <div class="content-wrapper repository" v-if="active === 'repositories'">
          <div class="item" v-for="(i, j) in content.repositories.items" :key="j">
            <div class="title">
              <div class="title-left" @click="repoItemClickEvent(i)">
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
          <div class="item" v-if="content && content.repositories.items.length > 0">
            <el-pagination layout="prev, pager, next" :page-size="100" :current-page="idx" :total="content.repositories.total_count" @current-change="currentChangeEvent"></el-pagination>
          </div>
        </div>
        <div class="content-wrapper code" v-if="active === 'code'">
          <div class="item" v-for="(i, j) in content.code.items" :key="j">
            <div class="title">
              <div class="title-left" @click="codeItemClickEvent(i)">
                <svg class="title-icon" width="20" height="20" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="48" height="48" fill="white" fill-opacity="0.01"/><path d="M10 44C8.89543 44 8 43.1046 8 42V6C8 4.89543 8.89543 4 10 4H38C39.1046 4 40 4.89543 40 6V42C40 43.1046 39.1046 44 38 44H10Z" fill="none" stroke="#333" stroke-width="2" stroke-linejoin="round"/><path fill-rule="evenodd" clip-rule="evenodd" d="M21 22V4H33V22L27 15.7273L21 22Z" fill="none" stroke="#333" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><path d="M10 4H38" stroke="#333" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
                <span class="title-author">{{i.repository.full_name}}</span>
              </div>
            </div>
            <div class="describe">{{i.path}}</div>
            <div class="info">
              <div class="info-left">
                <div class="info-language" v-if="i.language">
                  <span>{{i.language}}</span>
                </div>
              </div>
              <div class="info-right"></div>
            </div>
          </div>
          <div class="item" v-if="content && content.code.items?.length > 0">
            <el-pagination layout="prev, pager, next" :page-size="100" :current-page="idx" :total="content.code.total_count" @current-change="currentChangeEvent"></el-pagination>
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
import { nextTick, reactive, ref } from 'vue'
import type { searchNumberType, searchContentType, SearchRepository, SearchCode, searchSortType } from '../../utils/search'
import { searchRepo, searchCode, searchTypeNum } from '../../utils/search'
import { checkStarRepository, unStarRepository, starRepository } from '@/renderer/utils/star'
import { ElMessage } from 'element-plus'
import Markdown from '../../components/Markdown.vue'
import type { mdApi } from '../../components/Markdown.vue'

const sort = ref('1')
const active = ref('code')
const searchTxt = ref('')

const sortType = reactive<searchSortType>({
  repositories: [{ label: 'Best match', value: '1' }, { label: 'Most stars', value: '2' }, { label: 'Fewest stars', value: '3' }, { label: 'Most forks', value: '4' }, { label: 'Fewest forks', value: '5' }, { label: 'Recently updated', value: '6' }, { label: 'Least recently updated', value: '7' }],
  code: [{ label: 'Best match', value: '1' }, { label: 'Recently indexed', value: '2' }, { label: 'Least recently indexed', value: '3' }],
  commits: [{ label: 'Best match', value: '1' }, { label: 'Recently committed', value: '2' }, { label: 'Least recently indexed', value: '3' }, { label: 'Recently authored', value: '4' }, { label: 'Least recently authored', value: '5' }],
  issues: [{ label: 'Best match', value: '1' }, { label: 'Most commented', value: '2' }, { label: 'Least commented', value: '3' }, { label: 'Newest', value: '4' }, { label: 'Oldest', value: '5' }, { label: 'Recently updated', value: '6' }, { label: 'Least recently updated', value: '7' }],
  users: [{ label: 'Best match', value: '1' }, { label: 'Most followers', value: '2' }, { label: 'Fewest followers', value: '3' }, { label: 'Most recently joined', value: '4' }, { label: 'Least recently joined', value: '5' }, { label: 'Most repositories', value: '6' }, { label: 'Least repositories', value: '7' }]
})

const content = reactive<searchContentType>({
  repositories: { incomplete_results: false, items: [], total_count: 0 },
  code: { incomplete_results: false, items: [], total_count: 0 },
  commits: { incomplete_results: false, items: [], total_count: 0 },
  issues: { incomplete_results: false, items: [], total_count: 0 },
  users: { incomplete_results: false, items: [], total_count: 0 }
})

const numbers = ref<searchNumberType>()
const loading = ref(false)
const idx = ref(1)
const mdShow = ref(false)
const markdown = ref<mdApi>()
const title = ref('')

async function searchTypeClick (type: string) {
  active.value = type
  idx.value = 1
  sort.value = '1'
  await searchEvent()
}

// 搜索事件
async function searchEvent () {
  if (searchTxt.value === '') return false
  loading.value = true
  if (active.value === 'repositories') {
    const res = await searchRepo(sort.value, searchTxt.value, idx.value)
    content.repositories = res
  }
  if (active.value === 'code') {
    const res = await searchCode(sort.value, searchTxt.value, idx.value)
    content.code = res
  }
  loading.value = false
  numbers.value = await searchTypeNum(searchTxt.value)
}

// 选择一个库查看
async function repoItemClickEvent (repo: SearchRepository) {
  mdShow.value = true
  title.value = repo.full_name
  nextTick(() => {
    if (markdown.value) {
      markdown.value.init(repo)
    }
  })
}

// 选择一个代码查看
async function codeItemClickEvent (code: SearchCode) {
  console.log(code)
}

// 切换页面事件
function currentChangeEvent (num: number) {
  idx.value = num
  if (active.value === 'repositories') { content.repositories.items = [] }
  searchEvent()
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
      .active{
        background-color: #ffffff;
        border: 1px solid #d9e3e5;
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
