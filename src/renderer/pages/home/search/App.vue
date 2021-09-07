<template>
  <div class="search">
    <div class="filter">
      <div class="type">
        <div :class="['item', typeActive === 'repositories' ? 'active' : '']" @click="searchTypeClick('repositories')">
          <span>Repositories</span>
          <span>{{numbers?.repositories || 0}}</span>
        </div>
        <div :class="['item', typeActive === 'code' ? 'active' : '']" @click="searchTypeClick('code')">
          <span>Code</span>
          <span>{{numbers?.code || 0}}</span>
        </div>
        <div :class="['item', typeActive === 'issues' ? 'active' : '']" @click="searchTypeClick('issues')">
          <span>Issues</span>
          <span>{{numbers?.issues || 0}}</span>
        </div>
        <div :class="['item', typeActive === 'users' ? 'active' : '']" @click="searchTypeClick('users')">
          <span>Users</span>
          <span>{{numbers?.users || 0}}</span>
        </div>
      </div>
      <el-divider v-show="lngList"></el-divider>
      <div class="language">
        <div v-for="(i, j) in lngList" :key="j" :class="['item', lngActive === i.label ? 'active' : '']" @click="searchLngClick(i)">
          <span>{{i.label}}</span>
          <span>{{i.value || 0}}</span>
        </div>
      </div>
    </div>
    <div class="search-box">
      <div class="search-header">
        <el-select v-model="sort" size="small" @change="searchEvent">
          <el-option v-for="i in sortType[typeActive]" :key="i.value" :label="i.label" :value="i.value"></el-option>
        </el-select>
        <el-input v-model="searchTxt" @keypress.enter="searchEvent" size="small">
          <template #append>
            <el-button size="mini" @click="searchEvent" icon="el-icon-search"></el-button>
          </template>
        </el-input>
      </div>
      <div class="content scroll" v-loading="loading">
        <div class="content-wrapper repository" v-if="typeActive === 'repositories'">
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
          <div class="item" v-if="content && content.repositories.total_count > 100">
            <el-pagination layout="prev, pager, next" :page-size="100" :current-page="idx" :total="content.repositories.total_count" @current-change="currentChangeEvent"></el-pagination>
          </div>
        </div>
        <div class="content-wrapper code" v-if="typeActive === 'code'">
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
          <div class="item" v-if="content && content.code.total_count > 100">
            <el-pagination layout="prev, pager, next" :page-size="100" :current-page="idx" :total="content.code.total_count" @current-change="currentChangeEvent"></el-pagination>
          </div>
        </div>
        <div class="content-wrapper issues" v-if="typeActive === 'issues'">
          <div class="item" v-for="(i, j) in content.issues.items" :key="j">
            <div class="title">
              <div class="title-left" @click="issuesItemClickEvent(i)">
                <svg class="title-icon" width="20" height="20" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="48" height="48" fill="white" fill-opacity="0.01"/><path d="M10 44C8.89543 44 8 43.1046 8 42V6C8 4.89543 8.89543 4 10 4H38C39.1046 4 40 4.89543 40 6V42C40 43.1046 39.1046 44 38 44H10Z" fill="none" stroke="#333" stroke-width="2" stroke-linejoin="round"/><path fill-rule="evenodd" clip-rule="evenodd" d="M21 22V4H33V22L27 15.7273L21 22Z" fill="none" stroke="#333" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><path d="M10 4H38" stroke="#333" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
                <span class="title-author">{{i.title}}</span>
              </div>
            </div>
            <div class="describe" v-html="convertTxtToMd(i.body || '')"></div>
            <div class="info">
              <div class="info-left">
                <div class="info-language">
                  <span>{{i.updated_at}}</span>
                </div>
              </div>
              <div class="info-right">
                <span>{{i.html_url}}</span>
              </div>
            </div>
          </div>
          <div class="item" v-if="content && content.code.total_count > 100">
            <el-pagination layout="prev, pager, next" :page-size="100" :current-page="idx" :total="content.code.total_count" @current-change="currentChangeEvent"></el-pagination>
          </div>
        </div>
        <div class="content-wrapper users" v-if="typeActive === 'users'">
          <div class="item" v-for="(i, j) in content.users.items" :key="j">
            <div class="title">
              <div class="title-left" @click="usersItemClickEvent(i)">
                <img class="avatar avatar-6 mr-2" alt="jonrohan" :src="i.avatar_url" />
                <span class="title-author">{{i.login}}</span>
              </div>
              <div class="title-right">
                <el-button size="mini">
                  <span class="mini-name">follow</span>
                </el-button>
              </div>
            </div>
          </div>
          <div class="item" v-if="content && content.users.total_count > 100">
            <el-pagination layout="prev, pager, next" :page-size="100" :current-page="idx" :total="content.users.total_count" @current-change="currentChangeEvent"></el-pagination>
          </div>
        </div>
      </div>
    </div>
    <el-drawer v-model="mdShow" direction="rtl" size="75%" :title="title">
      <Markdown ref="markdown"/>
    </el-drawer>
    <el-drawer v-model="codeShow" direction="rtl" size="75%" :withHeader="false">
      <Code ref="code" />
    </el-drawer>
    <el-drawer v-model="userShow" direction="rtl" size="75%" :withHeader="false">
      <User ref="user" />
    </el-drawer>
  </div>
</template>
<script lang="ts" setup>
import { nextTick, reactive, ref } from 'vue'
import type {
  labelValueType,
  SearchRepository,
  SearchCode,
  SearchIssues,
  SearchUsers,
  searchNumberType,
  searchContentType,
  searchSortType,
  SearchRepositoryType,
  SearchCodeType,
  SearchIssuesType,
  SearchUsersType
} from '../../../utils/search'
import {
  getSearchRepoLanguage,
  allSearchEvent,
  searchTypeNum
} from '../../../utils/search'
import { checkStarRepository, unStarRepository, starRepository } from '@/renderer/utils/star'
import { convertTxtToMd } from '@/renderer/utils/issues'
import { ElMessage } from 'element-plus'
import Markdown from '../../../components/Markdown.vue'
import Code from '../../../components/Code.vue'
import User from '../../../components/User.vue'
import type { mdApi } from '../../../components/Markdown.vue'
import type { codeApi } from '../../../components/Code.vue'
import type { userApi } from '../../../components/User.vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
const sort = ref('1')
const typeActive = ref('repositories')
const searchTxt = ref('')
const oldSearchTxt = ref('')
const lngActive = ref('')
const lngList = ref<labelValueType[]>()

const sortType = reactive<searchSortType>({
  repositories: [{ label: 'Best match', value: '1' }, { label: 'Most stars', value: '2' }, { label: 'Fewest stars', value: '3' }, { label: 'Most forks', value: '4' }, { label: 'Fewest forks', value: '5' }, { label: 'Recently updated', value: '6' }, { label: 'Least recently updated', value: '7' }],
  code: [{ label: 'Best match', value: '1' }, { label: 'Recently indexed', value: '2' }, { label: 'Least recently indexed', value: '3' }],
  issues: [{ label: 'Best match', value: '1' }, { label: 'Most commented', value: '2' }, { label: 'Least commented', value: '3' }, { label: 'Newest', value: '4' }, { label: 'Oldest', value: '5' }, { label: 'Recently updated', value: '6' }, { label: 'Least recently updated', value: '7' }],
  users: [{ label: 'Best match', value: '1' }, { label: 'Most followers', value: '2' }, { label: 'Fewest followers', value: '3' }, { label: 'Most recently joined', value: '4' }, { label: 'Least recently joined', value: '5' }, { label: 'Most repositories', value: '6' }, { label: 'Least repositories', value: '7' }]
})

const content = reactive<searchContentType>({
  repositories: { incomplete_results: false, items: [], total_count: 0 },
  code: { incomplete_results: false, items: [], total_count: 0 },
  issues: { incomplete_results: false, items: [], total_count: 0 },
  users: { incomplete_results: false, items: [], total_count: 0 }
})

const numbers = ref<searchNumberType>()
const loading = ref(false)
const idx = ref(1)
const mdShow = ref(false)
const markdown = ref<mdApi>()
const title = ref('')

const codeShow = ref(false)
const code = ref<codeApi>()

const userShow = ref(false)
const user = ref<userApi>()

async function searchTypeClick (type: string) {
  lngActive.value = ''
  typeActive.value = type
  idx.value = 1
  sort.value = '1'
  await searchEvent()
}

async function searchLngClick (s: labelValueType) {
  lngActive.value = s.label
  searchEvent()
}

// 搜索事件
async function searchEvent () {
  if (searchTxt.value === '') return false

  loading.value = true
  let q = ''
  if (lngActive.value !== '') {
    q = `${searchTxt.value + ' language:' + lngActive.value}`
  } else {
    q = searchTxt.value
  }

  try {
    const res = await allSearchEvent(typeActive.value, sort.value, q, idx.value)
    if (typeActive.value === 'repositories') { content.repositories = res as SearchRepositoryType }
    if (typeActive.value === 'code') { content.code = res as SearchCodeType }
    if (typeActive.value === 'issues') { content.issues = res as SearchIssuesType }
    if (typeActive.value === 'users') { content.users = res as SearchUsersType }
    lngList.value = await getSearchRepoLanguage(searchTxt.value)
    loading.value = false
  } catch (err) {
    loading.value = false
    ElMessage({ message: t('search.short_time'), type: 'warning' })
  }

  if (oldSearchTxt.value === '') {
    oldSearchTxt.value = searchTxt.value
    numbers.value = await searchTypeNum(searchTxt.value)
  } else {
    if (searchTxt.value !== oldSearchTxt.value) {
      oldSearchTxt.value = searchTxt.value
      numbers.value = await searchTypeNum(searchTxt.value)
    }
  }
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
async function codeItemClickEvent (e: SearchCode) {
  codeShow.value = true
  nextTick(() => {
    if (code.value) {
      code.value.init(e, searchTxt.value)
    }
  })
}

// 选择一条反馈查看
function issuesItemClickEvent (e: SearchIssues) {
  window.shell.openExternal(e.html_url)
}

async function usersItemClickEvent (e: SearchUsers) {
  userShow.value = true
  nextTick(() => {
    if (user.value) {
      user.value.init('api', e)
    }
  })
}

// 切换页面事件
function currentChangeEvent (num: number) {
  idx.value = num
  if (typeActive.value === 'repositories') { content.repositories.items = [] }
  searchEvent()
}

// 点击收藏按钮事件
async function starRepositoryEvent (repo: SearchRepository) {
  const check = await checkStarRepository(repo.full_name)
  if (check) {
    await unStarRepository(repo.full_name)
    ElMessage({ message: t('star.star_success'), type: 'success' })
  } else {
    await starRepository(repo.full_name)
    ElMessage({ message: t('star.unstar_success'), type: 'success' })
  }
}
</script>
<style lang="scss" scoped>
.search{
  flex: 1;
  display: flex;
  .filter{
    width: 300px;
    display: flex;
    flex-direction: column;
    padding: 10px;
    .filter-box{
      margin-bottom: 40px;
    }
    .type, .language{
      display: flex;
      flex-direction: column;
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
      }
    }
  }
  .search-box{
    width: 100%;
    display: flex;
    flex-direction: column;
    .search-header{
      height: 60px;
      display: flex;
      justify-content: flex-start;
      align-items: center;
      padding: 0 20px;
    }
    .content{
      flex: 1;
      position: relative;
      overflow-y: auto;
      .content-wrapper{
        position: absolute;
        padding: 0 20px;
        width: 100%;
        .item{
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
              justify-content: center;
              align-items: center;
              cursor: pointer;
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
      .issues{
        .describe{
          pointer-events: none;
          :deep img{
            display: none !important;
          }
        }
      }
    }
  }
}
</style>
