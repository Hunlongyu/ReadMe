<template>
  <div class="middle">
    <div class="search">
      <input type="text" v-model.trim="txt" @input="search(txt)">
    </div>
    <div class="list">
      <ul>
        <li v-for="(item, index) in list" :key="index" @click="getUrl(item.mdUrl)" @click.right="rightClick($event, item.htmlUrl, item._id, item.mdUrl)">{{item.repository}}</li>
      </ul>
    </div>
    <div class="context" ref="context" v-show="ctx.show">
      <ul>
        <li @click="open">打开</li>
        <li @click="home">官网</li>
        <li @click="dele">删除</li>
      </ul>
    </div>
  </div>
</template>
<script>
import { shell } from 'electron'
import db from '../../service/db.js'
export default {
  name: 'middle',
  data () {
    return {
      txt: '',
      list: [],
      ctx: {
        show: false,
        home: '',
        _id: '',
        mdUrl: ''
      }
    }
  },
  methods: {
    search (e) {
      let reg = new RegExp(e)
      if (e !== '') {
        db.find({repository: reg}, (doc) => {
          this.list = doc
        })
      } else {
        db.find({}, (doc) => {
          this.list = doc
        })
      }
    },
    rightClick (e, h, d, m) {
      let context = this.$refs.context.style
      context.left = e.clientX + 'px'
      context.top = e.clientY + 'px'
      this.ctx.show = true
      this.ctx.home = h
      this.ctx._id = d
      this.ctx.mdUrl = m
    },
    home () {
      let url = this.ctx.home
      shell.openExternal(url)
    },
    open () {
      let url = this.ctx.mdUrl
      this.$emit('listClick', url)
    },
    dele () {
      db.remove(this.ctx._id)
      this.$notify({title: '删除成功~'})
      this.updataList()
    },
    getUrl (e) {
      this.$emit('listClick', e)
    },
    updataList (e) {
      db.find({}, (doc) => {
        this.list = doc
      })
    },
    hideCtx () {
      document.body.onclick = () => {
        this.ctx.show = false
      }
    }
  },
  created () {
    this.hideCtx()
    this.updataList()
  }
}
</script>
<style lang="scss" scoped>
.middle{
  background-color: #1d2325;
  width: 270px;
  min-width: 270px;
  height: 100%;
  border-left: 1px solid #2e3538;
  border-right: 1px solid #2e3538;
  .search{
    text-align: center;
    padding: 8px 0 4px 0;
    input{
      width: 90%;
      height: 30px;
      border-radius: 15px;
      outline: none;
      border: 1px solid #2e3538;
      text-indent: 10px;
      background-color: #bebebe;
    }
  }
  .list{
    height: calc(100% - 74px);
    ul{
      margin: 0;
      overflow-y: scroll;
      padding: 0px;
      height: 100%;
      list-style: none;
      color: #bebebe;
      &::-webkit-scrollbar{
        width: 1px;
        height: 0;
      }
      li{
        padding: 10px 20px;
        font-size: 16px;
        cursor: pointer;
        &:hover{
          background-color: #bebebe;
          color: #1d2325;
        }
      }
    }
  }
  .context{
    position: absolute;
    top: 0;
    left: 0;
    background-color: #fff;
    width: 100px;
    z-index: 999;
    border: 1px solid #1d2325;
    li{
      cursor: pointer;
      list-style: none;
      padding: 4px;
      text-align: center;
      border-bottom: 1px solid #bebebe;
      background-color: #fff;
      &:hover{
        background-color: #bebebe;
        color: #333;
      }
      &:last-child{
        border-bottom: none;
      }
    }
  }
}
</style>
