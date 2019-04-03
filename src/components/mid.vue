<template>
  <a-row id="mid">
    <a-col class="searchBox">
      <a-input-search placeholder="input search text" class="search" v-model="sTxt" @change="onChange"/>
    </a-col>
    <a-col class="list">
      <a-list size="small" v-if="sTxt === ''">
        <a-list-item v-for="(i, j) in db" :key="j" @click="listClick(i)">{{i.repository}}</a-list-item>
      </a-list>
      <a-list size="small" v-if="sTxt !== ''">
        <a-list-item v-for="(k, l) in sdb" :key="l" @click="listClick(k)">{{k.repository}}</a-list-item>
      </a-list>
    </a-col>
  </a-row>
</template>
<script>
import db from '../database/nedb'
export default {
  name: 'mid',
  data () {
    return {
      sTxt: '',
      db: [],
      sdb: []
    }
  },
  computed: {
    refresh () {
      return this.$store.getters.getRefresh
    }
  },
  watch: {
    refresh (refresh) {
      if (refresh) {
        this.showList()
        this.$store.commit('CHANGE_REFRESH', false)
      }
    }
  },
  methods: {
    showList () {
      db.find({}).sort({ clickNum: -1 }).limit(50).exec((e, d) => {
        this.db = d
      })
    },
    onChange () {
      let reg = new RegExp(this.sTxt)
      db.find({ repository: reg }, (e, d) => {
        this.sdb = d
      })
    },
    listClick (val) {
      val.clickNum += 1
      this.$store.dispatch('openMd', val.mdUrl)
      this.$store.commit('CHANGE_DBID', val._id)
      db.update({ _id: val._id }, { $set: val }, (e, d) => {
        this.showList()
      })
    }
  },
  created () {
    this.showList()
  }
}
</script>
<style lang="scss" scoped>
#mid{
  position: relative;
  width: 270px;
  min-width: 270px;
  background-color: #1d2325;
  overflow-y: scroll;
  &::-webkit-scrollbar{
    width: 1px;
    height: 0;
  }
  .searchBox{
    position: fixed;
    top: 0;
    left: 60px;
    width: 270px;
    z-index: 999;
    text-align: center;
    background-color: #1d2325;
    .search{
      margin: 10px auto;
      width: 240px;
    }
  }
  .list{
    margin-top: 52px;
    user-select: none;
    .ant-list{
      color: #fff;
      text-indent: 15px;
      .ant-list-item{
        cursor: pointer;
        border-color: #383838;
        &:hover{
          background-color: #242b2e;
        }
      }
    }
  }
}
</style>
