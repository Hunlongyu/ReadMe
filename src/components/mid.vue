<template>
  <!-- <div class="mid">mid</div> -->
  <a-row id="mid">
    <a-affix :offsetTop="1">
      <a-col class="searchBox">
        <a-input-search placeholder="input search text" @search="onSearch" class="search" />
      </a-col>
    </a-affix>
    <a-col class="list">
      <a-list size="small">
        <a-list-item v-for="(i, j) in db" :key="j" @click="listClick(j)">{{i}}</a-list-item>
      </a-list>
    </a-col>
  </a-row>
</template>
<script>
export default {
  name: 'mid',
  data () {
    return {
      db: [
        'ladk',
        'adfklasdf',
        'asdfa'
      ]
    }
  },
  methods: {
    onSearch (val) {
      console.log(val)
    },
    listClick (val) {
      console.log(val)
      let url = 'https://raw.githubusercontent.com/vueComponent/ant-design-vue/master/README-zh_CN.md'
      this.$store.commit('CHANGE_MDURL', url)
    }
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
