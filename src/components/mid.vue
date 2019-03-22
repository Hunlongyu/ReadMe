<template>
  <a-row id="mid">
    <a-affix :offsetTop="1">
      <a-col class="searchBox">
        <a-input-search placeholder="input search text" class="search" v-model="sTxt" @change="onChange"/>
      </a-col>
    </a-affix>
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
import DB from '../database/db'
export default {
  name: 'mid',
  data () {
    return {
      sTxt: '',
      db: [],
      sdb: []
    }
  },
  methods: {
    showList () {
      DB.md.orderBy('clickNum').reverse().limit(50).toArray(e => {
        this.db = e
      })
    },
    onChange () {
      DB.md.where('repository').startsWithIgnoreCase(this.sTxt).toArray(e => {
        this.sdb = e
      })
    },
    listClick (val) {
      let id = val.id
      let n = val.clickNum + 1
      let url = val.mdUrl
      this.$store.dispatch('openMd', url)
      DB.md.update(id, { clickNum: n }).then((updated) => {
        if (updated) {
          this.showList()
        }
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
  width: 270px;
  min-width: 270px;
  background-color: #1d2325;
  overflow-y: scroll;
  &::-webkit-scrollbar{
    width: 1px;
    height: 0;
  }
  .searchBox{
    text-align: center;
    background-color: #1d2325;
    .search{
      margin: 10px auto;
      width: 240px;
    }
  }
  .list{
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
