<template>
  <div class="tag">
    <div class="list" v-if="list.length > 0">
      <span v-for="(i, j) in list" :key="j" :class="activeNum === j? 'active' : ''" @click="selectList(j)">{{i}}</span>
    </div>
    <div class="table external-link">
      <table>
        <thead>
          <tr>
            <th>库名</th>
            <th>描述</th>
            <th>操作</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(i, j) in table" :key="j">
            <td><a :href="table[j].htmlUrl">{{table[j].repository}}</a></td>
            <td>{{table[j].description}}</td>
            <td><span @click="open(table[j].mdUrl)">查看</span><span @click="modi(table[j]._id)">修改</span><span @click="dele(table[j]._id)">删除</span></td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="modify" v-show="mod.show">
      <div class="box">
        <table>
          <tbody>
            <tr>
              <td class="label">作者/库：</td>
              <td><input type="text" v-model="mod.repository" disabled></td>
            </tr>
            <tr>
              <td class="label">分类：</td>
              <td><input type="text" v-model="mod.tag"></td>
            </tr>
            <tr>
              <td class="label">Github地址：</td>
              <td><input type="text" v-model="mod.htmlUrl" disabled></td>
            </tr>
            <tr>
              <td class="label">md地址：</td>
              <td><input type="text" v-model="mod.mdUrl" disabled></td>
            </tr>
            <tr>
              <td class="label">具体描述：</td>
              <td><textarea rows="5" v-model="mod.desc"></textarea></td>
            </tr>
          </tbody>
        </table>
        <div class="btns">
          <input type="button" value="确定" @click="modConfirm()">
          <input type="button" value="取消" @click="modCancel">
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import db from '../../service/db.js'
export default {
  name: 'tag',
  data () {
    return {
      list: [],
      activeNum: 0,
      table: [],
      mod: {
        show: false,
        repository: '',
        tag: '',
        htmlUrl: '',
        mdUrl: '',
        desc: '',
        _id: ''
      }
    }
  },
  methods: {
    selectList (e) {
      this.activeNum = e
      this.showDB()
    },
    getTagList () {
      db.find({}, (doc) => {
        let tags = []
        for (let i = 0; i < doc.length; i++) {
          let tag = doc[i].tag
          tags.push(tag)
        }
        this.list = this.uniq(tags)
        this.showDB()
      })
    },
    showDB () {
      db.find({tag: this.list[this.activeNum]}, doc => {
        this.table = doc
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
    },
    open (d) {
      this.$emit('listClick', d)
    },
    modi (d) {
      this.mod.show = true
      this.mod._id = d
      db.find({_id: d}, doc => {
        this.mod.repository = doc[0].repository
        this.mod.tag = doc[0].tag
        this.mod.htmlUrl = doc[0].htmlUrl
        this.mod.mdUrl = doc[0].mdUrl
        this.mod.desc = doc[0].description
      })
    },
    dele (d) {
      db.remove(d)
      this.$notify({title: '删除成功~'})
      this.getTagList()
      this.$emit('updata', '')
    },
    modConfirm () {
      let _id = this.mod._id
      db.update(_id, {tag: this.mod.tag, description: this.mod.desc})
      this.mod.show = false
      this.$notify({title: '修改成功~'})
      this.getTagList()
    },
    modCancel () {
      this.mod.show = false
    }
  },
  created () {
    this.getTagList()
  }
}
</script>
<style lang="scss" scoped>
.tag{
  padding: 10px;
  width: 100%;
  overflow: scroll;
  position: relative;
  &::-webkit-scrollbar{
    width: 4px;
    height: 4px;
  }
  &::-webkit-scrollbar-thumb {
      border-radius: 2px;
      box-shadow: inset 0 0 2px rgba(0,0,0,0.2);
      background: rgba(0,0,0,0.6);
  }
  &::-webkit-scrollbar-track {
      box-shadow: inset 0 0 2px rgba(0,0,0,0.2);
      border-radius: 0;
      background: rgba(0,0,0,0.4);
  }
  .list{
    span{
      display: inline-block;
      padding: 4px 20px;
      border-radius: 4px;
      border: 1px solid #2196f3;
      color: #2196f3;
      cursor: pointer;
      margin: 4px 8px 0 0;
      &.active{
        background-color: #2196f3;
        color: #fff;
      }
    }
  }
  .table{
    margin-top: 10px;
    table{
      width: 100%;
      color: #34495e;
      th{
        height: 38px;
        font-weight: bold;
        border: 1px solid #bababa;
      }
      td{
        height: 38px;
        border: 1px solid #ebebeb;
      }
      td:nth-child(1){
        width: 200px;
        padding-left: 4px;
      }
      td:nth-child(2) {
        width: calc(100% - 200px);
        padding-left: 4px;
      }
      td:nth-child(3){
        width: 160px;
        text-align: center;
        span{
          cursor: pointer;
          padding: 2px 6px;
          margin: 0 4px;
          border: 1px solid #bababa;
          border-radius: 2px;
          &:hover{
            background-color: #dbdbdb;
          }
        }
      }
    }
  }
  .modify{
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    background-color: #fff;
    opacity: 0.8;
    display: flex;
    justify-content: center;
    align-items: center;
    .box{
      opacity: 1;
      border: 1px solid #333;
      padding: 20px 60px;
      border-radius: 2px;
      box-shadow: 0 0 5px #34495e;
      tr{
        margin: 5px 0;
      }
      td{
        margin: 10px 0;
        &.label{
          text-align: right;
          color: #222;
          width: 100px;
        }
        input{
          width: 340px
        }
        textarea{
          width: 340px
        }
      }
      .btns{
        margin-top: 10px;
        text-align: center;
      }
    }
  }
}
</style>
