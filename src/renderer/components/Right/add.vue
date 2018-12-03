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
    <div class="tag" v-show="tagShow">
      <div class="box">
        <span>请选择标签：</span>
        <select v-model="tag">
          <option v-for="(i, j) in tagsList" :key="j" :value="i">{{i}}</option>
        </select>
        <input type="button" value="确认" @click="confirm">
        <div class="tip" v-show="tipShow">请选择标签</div>
      </div>
    </div>
  </div>
</template>
<script>
import db from '../../service/db.js'
export default {
  name: 'add',
  data () {
    return {
      repositories: null,
      searchText: '',
      clickLi: null,
      clickLink: null,
      bodyShow: false,
      tagShow: false,
      tag: null,
      tagsList: [],
      tipShow: false
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
      let data = res
      let link = 'https://raw.githubusercontent.com/' + res.full_name + '/' + res.default_branch + '/README.md'
      let link2 = 'https://raw.githubusercontent.com/' + res.full_name + '/' + res.default_branch + '/readme.md'
      db.find({repository: res.full_name}, (doc) => {
        if (doc.length > 0) {
          console.log('已存在，请不要重复添加！')
          return false
        } else {
          this.$http.get(link).then(res => {
            this.tagShow = true
            this.clickLi = data
            this.clickLink = link
          }).catch(err => {
            if (err) { console.log('README.md地址错误，或者文件名不对！') }
            this.$http.get(link2).then(res => {
              this.tagShow = true
              this.clickLi = data
              this.clickLink = link2
            }).catch(err => {
              if (err) { console.log('README.md地址错误，或者文件名不对！') }
            })
          })
        }
      })
    },
    confirm () {
      let res = this.clickLi
      let dec = {
        repository: res.full_name,
        tag: '',
        link: this.clickLink
      }
      if (this.tag === '') {
        return (this.tipShow = true)
      } else {
        dec.tag = this.tag
        db.add(dec, (doc) => {
          this.tagShow = false
          this.$emit('updata', doc)
        })
      }
    },
    getDBTag () {
      db.find({}, (doc) => {
        let tags = []
        for (let i = 0; i < doc.length; i++) {
          let tag = doc[i].tag
          tags.push(tag)
        }
        this.tagsList = this.uniq(tags)
      })
    },
    uniq (arr) {
      var temp = []
      var index = []
      var l = arr.length
      for (var i = 0; i < l; i++) {
        for (var j = i + 1; j < l; j++) {
          if (arr[i] === arr[j]) {
            i++
            j = i
          }
        }
        temp.push(arr[i])
        index.push(i)
      }
      return temp
    }
  },
  created () {
    this.getDBTag()
    db.remove('MyO9MZFELebRr48z')
  }
}
</script>
<style lang="scss" scoped>
.add{
  padding: 10px;
  width: 100%;
  overflow: scroll;
  font-size: 20px;
  position: relative;
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
  .tag{
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    .box{
      background-color: #fff;
      width: 400px;
      height: 200px;
      border: 1px solid #808080;
      display: flex;
      justify-content: center;
      align-items: center;
      border-radius: 2px;
    }
  }
}
</style>
