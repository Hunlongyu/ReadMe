<template>
  <el-col class="h_add">
    <el-input v-model.trim="value" placeholder="search" @keyup.enter="search">
      <el-button slot="append" icon="el-icon-search" @click="search"></el-button>
    </el-input>
    <el-table class="h_table" :data="lists" border style="width: 100%" :default-sort = "{prop: 'date', order: 'descending'}" v-show="tableShow">
      <el-table-column prop="full_name" label="作者/库名" width="200"></el-table-column>
      <el-table-column prop="description" label="描述"></el-table-column>
      <el-table-column prop="stargazers_count" label="star" sortable width="80" align="center"></el-table-column>
      <el-table-column label="编辑" width="145" align="center">
        <template slot-scope="scope">
          <el-button size="mini" @click="hmtlUrl(scope.row.html_url)">网站</el-button>
          <el-button size="mini" @click="addTag(scope.row)">添加</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="h_tag" v-show="tagShow">
      <el-card class="h_card">
        <div slot="header">
          <span>请选择标签</span>
        </div>
        <el-select
          v-model.trim="tag"
          filterable
          allow-create
          placeholder="请选择标签">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
        <el-row type="flex" justify="end" style="margin-top: 20px">
          <el-button @click="cancel">取消</el-button>
          <el-button type="primary" @click="save">确定</el-button>
        </el-row>
      </el-card>
    </div>
  </el-col>
</template>
<script>
import { shell } from 'electron'
// import db from '../../plugins/db.js'
export default {
  name: 'add',
  data () {
    return {
      value: '',
      tableShow: false,
      lists: [
        {
          html_url: '',
          full_name: '',
          description: '',
          stargazers_count: 0
        }
      ],
      tagShow: false,
      options: [
        {
          value: 'default',
          label: 'default'
        },
        {
          value: 'js',
          label: 'js'
        }
      ],
      tag: 'default',
      link: {
        full_name: '',
        description: '',
        htmlUrl: '',
        mdUrl: '',
        tag: ''
      }
    }
  },
  methods: {
    search () {
      this.$axios.get('https://api.github.com/search/repositories?q=ReadMe-client').then(res => {
        this.lists = res.data.items
        this.tableShow = true
      })
    },
    hmtlUrl (url) {
      shell.openExternal(url)
    },
    addTag (res) {
      // let urlOne = 'https://raw.githubusercontent.com/' + res.full_name + '/' + res.default_branch + '/README.md'
      // let urtTwo = 'https://raw.githubusercontent.com/' + res.full_name + '/' + res.default_branch + '/readme.md'
      // db.find({ full_name: res.full_name }, doc => {
      //   if (doc.length > 0) {
      //     this.$notify.error({
      //       title: '添加失败！',
      //       message: '该库已经存在，请勿重复添加！'
      //     })
      //   } else {
      //     this.$axios.get(urlOne).then(e => {
      //       this.tagShow = true
      //       this.link.full_name = res.full_name
      //       this.link.description = res.description
      //       this.link.htmlUrl = res.html_url
      //       this.link.mdUrl = urlOne
      //     }).catch(() => {
      //       this.$axios.get(urtTwo).then(e => {
      //         this.tagShow = true
      //         this.link.full_name = res.full_name
      //         this.link.description = res.description
      //         this.link.htmlUrl = res.html_url
      //         this.link.mdUrl = urtTwo
      //       }).catch(() => {
      //         this.$notify.error({ title: '添加失败！', text: 'readme.md 或 REAMD.md 文件不存在~' })
      //       })
      //     })
      //   }
      // })
    },
    cancel () {
      this.tagShow = false
    },
    save () {
      // if (this.tag !== '') {
      //   this.link.tag = this.tag
      //   db.add(this.link, (doc) => {
      //     console.log(doc)
      //     this.tagShow = false
      //   })
      // } else {
      //   this.$notify.error({
      //     title: '添加失败！',
      //     message: '标签不能为空！请填写后重试！',
      //     type: 'warning'
      //   })
      // }
    }
  },
  mounted () {
    // db.log()
    // db.find({_id: 'iEd7kocEST9UMwwG'}, (doc) => { console.log(doc) })
    // db.test()
  }
}
</script>
<style lang="scss" scoped>
.h_add{
  padding: 20px;
  position: relative;
  .h_table{
    margin-top: 20px;
  }
  .h_tag{
    position: fixed;
    z-index: 999;
    top: 40px;
    left: 330px;
    width: calc(100% - 330px);
    height: calc(100% - 40px);
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: rgba(7, 17, 27, 0.7);
  }
}
</style>
