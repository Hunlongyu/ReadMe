<template>
  <div class="add">
    <div class="search">
      <input type="text" placeholder="搜索……" v-model="searchText">
      <input type="button" value="搜索" @click="search">
    </div>
    <div class="tips">
      <ul>
        <li>1. 模糊搜索：库的名字，如：ReadMe client</li>
        <li>2. 精准搜索：作者名字/库的名字，如：Hunlongyu/ReadMe-client</li>
        <li>3. 搜索结果最多显示前30个，建议精确搜索</li>
      </ul>
    </div>
    <div class="body external-link" v-show="bodyShow">
      <ul>
        <li v-for="(item, index) in repositories" :key="index">
          <div class="title">
            <span class="left">作者/库：<a :href="item.html_url">{{item.full_name}} </a><input type="button" @click="add(item)" value="添加"></span>
            <span class="right">Star: {{item.stargazers_count}} Watch: {{item.watchers_count}}</span>
          </div>
          <div class="desc">描述：{{item.description}}</div>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
export default {
  name: 'add',
  data () {
    return {
      repositories: null,
      searchText: '',
      bodyShow: false
    }
  },
  methods: {
    search () {
      if (this.searchText === '') {
        // alert('请输入要搜索的内容~')
        this.$http.get('https://api.github.com/search/repositories?q=Hunlongyu/ReadMe-client').then(res => {
          this.repositories = res.data.items
          this.bodyShow = true
        })
      } else {
        this.$http.get('https://api.github.com/search/repositories?q=' + this.searchText).then(res => {
          this.repositories = res.data.items
          this.bodyShow = true
        })
      }
    },
    add (res) {
      let link = 'https://raw.githubusercontent.com/' + res.full_name + '/' + res.default_branch + '/README.md'
      console.log(link)
    }
  },
  created () {}
}
</script>
<style lang="scss" scoped>
.add{
  padding: 10px;
  width: 100%;
  overflow: scroll;
  font-size: 20px;
  .search{
    margin: 10px auto;
    text-align: center;
    font-size: 0;
    input[type="text"]{
      width: 80%;
      font-size: 16px;
      padding: 4px 0;
    }
    input[type="button"]{
      width: 10%;
      font-size: 16px;
      padding: 4px 0;

    }
  }
  .tips{
    width: 90%;
    margin: 0 auto;
    ul{
      margin: 0;
      padding: 0;
      list-style: none;
      li{
        font-size: 14px;
        color: #808080;
        overflow: hidden;
      }
    }
  }
  .body{
    width: 90%;
    margin: 10px auto;
    ul{
      margin: 0;
      padding: 0;
      list-style: none;
      li{
        height: 100px;
        border: 1px solid #dedede;
        box-shadow:0 0 4px #cacaca;
        padding: 10px;
        margin: 8px 0;
        .title{
          display: flex;
          justify-content: space-between;
          font-size: 18px;
          input{
            font-size: 14px;
          }
        }
        .desc{
          font-size: 14px;
          height: 42px;
          width: 100%;
          overflow: hidden; 
          text-overflow: ellipsis;
        }
      }
    }
  }
}
</style>
