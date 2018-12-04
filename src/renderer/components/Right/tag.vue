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
      table: []
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
        console.log(doc)
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
      console.log(d)
    },
    dele (d) {
      db.remove(d)
      this.$notify({title: '删除成功~'})
      this.getTagList()
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
      margin: 4px 4px;
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
    }
    th{
      height: 30px;
      font-weight: bold;
      border: 1px solid #bababa;
    }
    td{
      height: 30px;
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
      width: 100px;
      text-align: center;
      span{
        cursor: pointer;
      }
    }
  }
}
</style>
