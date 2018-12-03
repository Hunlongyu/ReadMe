<template>
  <div class="add">
    <div class="search">
      <input type="text" placeholder="搜索……" v-model.trim="txt">
      <input type="button" value="搜索" @click="search">
    </div>
    <div class="tips">
      <ul>
        <li>1. 模糊搜索：库的名字，如：ReadMe-client。 (注意：中间的空格用 '-' 代替)</li>
        <li>2. 精准搜索：作者名字/库的名字，如：Hunlongyu/ReadMe-client</li>
        <li>3. 搜索结果最多显示前30个，建议精确搜索</li>
      </ul>
    </div>
    <div class="body external-link">
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
    <div class="tag" v-if="tagShow">
      <div class="box">
        <div class="title">保存到</div>
        <div class="save" v-show="saveShow">
          <span>选择分类：</span>
          <select v-model="tag">
            <option v-for="(i, j) in tagsList" :key="j" :value="i">{{i}}</option>
          </select>
          <input type="button" value="新建分类" @click="create">
        </div>
        <div class="create" v-show="createShow">
          <span>新建分类：</span>
          <input type="text" v-model.trim="newTag">
          <input type="button" value="取消创建" @click="reset">
        </div>
        <div class="btns">
          <input type="button" value="确认" @click="tagConfirm">
          <input type="button" value="取消" @click="tagCancel">
        </div>
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
      txt: '',
      repositories: null,
      item: null,
      mdUrl: '',
      tagShow: false,
      tag: '',
      tagsList: [],
      saveShow: true,
      createShow: true,
      newTag: ''
    }
  },
  methods: {
    search () {
      if (this.txt === '') {
        this.$notify({title: '请输入您要搜索的内容~'})
        this.$http.get('https://api.github.com/search/repositories?q=Hunlongyu/ReadMe-client').then(res => {
          this.repositories = res.data.items
        })
      } else {
        let q = this.txt.replace(/\s+/g, '')
        this.$http.get('https://api.github.com/search/repositories?q=' + q).then(res => {
          this.repositories = res.data.items
        })
      }
    },
    add (res) {
      let urlOne = 'https://raw.githubusercontent.com/' + res.full_name + '/' + res.default_branch + '/README.md'
      let urtTwo = 'https://raw.githubusercontent.com/' + res.full_name + '/' + res.default_branch + '/readme.md'
      db.find({repository: res.full_name}, doc => {
        if (doc.length > 0) {
          this.$notify({type: 'warn', title: '已存在，不能重复添加！'})
        } else {
          this.$http.get(urlOne).then(e => {
            this.tagShow = true
            this.item = res
            this.mdUrl = urlOne
          }).catch(() => {
            this.$http.get(urtTwo).then(e => {
              this.tagShow = true
              this.item = res
              this.mdUrl = urtTwo
            }).catch(() => {
              this.$notify({type: 'warn', title: '添加失败！', text: '可能是 readme.md 或 REAMD.md 文件不存在~'})
            })
          })
        }
      })
    },
    create () {
      this.saveShow = false
      this.createShow = true
    },
    reset () {
      this.saveShow = true
      this.createShow = false
    },
    tagConfirm () {
      let d = this.item
      let data = {
        repository: d.full_name,
        description: d.description,
        tag: '',
        htmlUrl: d.html_url,
        mdUrl: this.mdUrl
      }
      if (this.tag !== '' && this.saveShow === true) {
        data.tag = this.tag
        db.add(data, (doc) => {
          this.tagShow = false
          this.$emit('updata', doc)
        })
      } else {
        this.$notify({title: '请选择一个分类~'})
      }

      if (this.newTag !== '' && this.createShow === true) {
        data.tag = this.newTag
        db.add(data, (doc) => {
          this.tagShow = false
          this.$emit('updata', doc)
        })
      } else {
        this.$notify({title: '请填写要新建的一个分类~'})
      }
    },
    tagCancel () {
      this.tagShow = false
    },
    getDBTag () {
      db.find({}, (doc) => {
        if (doc.length <= 0) {
          this.createShow = true
          this.saveShow = false
        } else {
          this.createShow = false
          this.saveShow = true
        }
        let tags = []
        for (let i = 0; i < doc.length; i++) {
          let tag = doc[i].tag
          tags.push(tag)
        }
        this.tagsList = this.uniq(tags)
        if (this.tagsList.length > 0) {
          this.tag = this.tagsList[0]
        }
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
    // db.remove({}, { multi: true })
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
      height: 32px;
      padding: 4px 0;
      text-indent: 8px;
    }
    input[type="button"]{
      width: 10%;
      height: 32px;
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
      border-radius: 2px;
      position: relative;
      .title{
        text-align: center;
        height: 40px;
        line-height: 40px;
        background-color: #808080;
        color: #fff;
        font-size: 18px;
      }
      .save{
        margin-top: 20px;
        font-size: 16px;
        text-align: center;
        select{
          width: 120px;
          font-size: 16px;
        }
        input{
          font-size: 16px;
        }
      }
      .create{
        margin-top: 10px;
        font-size: 16px;
        text-align: center;
        input{
          width: 120px; 
        }
      }
      .btns{
        text-align: center;
        font-size: 16px;
        input{
          margin: 25px 8px;
        }
      }
    }
  }
}
</style>
