<template>
  <div class="middle">
    <div class="search">
      <input type="text" v-model.trim="txt" @input="search(txt)">
    </div>
    <div class="list">
      <ul>
        <li v-for="(item, index) in list" :key="index" @click="getUrl(item.mdUrl)" @click.right="rightClick($event, item._id)">{{item.repository}}</li>
      </ul>
    </div>
    <div class="context" ref="context" v-show="ctxShow">
      <ul>
        <li>官网</li>
        <li>修改</li>
        <li>删除</li>
      </ul>
    </div>
  </div>
</template>
<script>
import db from '../../service/db.js'
export default {
  name: 'middle',
  data () {
    return {
      txt: '',
      list: [],
      ctxShow: false
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
    rightClick (e, d) {
      let context = this.$refs.context.style
      context.left = e.clientX + 'px'
      context.top = e.clientY + 'px'
      this.ctxShow = true
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
      document.body.click = () => {
        this.ctxShow = false
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
    height: 100%;
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
    li{
      cursor: pointer;
      border-bottom: 1px solid #bebebe;
    }
  }
}
</style>
