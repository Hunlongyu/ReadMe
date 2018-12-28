<template>
  <el-col class="h_add">
    <el-input v-model.trim="value" placeholder="search" @keyup.enter="search">
      <el-button slot="append" icon="el-icon-search" @click="search"></el-button>
    </el-input>
    <el-table class="h_table" :data="lists" border style="width: 100%" :default-sort = "{prop: 'date', order: 'descending'}" v-show="tableShow">
      <el-table-column prop="full_name" label="作者/库名" width="200"></el-table-column>
      <el-table-column prop="description" label="描述"></el-table-column>
      <el-table-column prop="stargazers_count" label="star" sortable width="80"></el-table-column>
      <el-table-column label="编辑" width="145">
        <template slot-scope="scope">
          <el-button size="mini" @click="hmtlUrl(scope.row.html_url)">网站</el-button>
          <el-button size="mini" @click="handleEdit(scope.row)">添加</el-button>
        </template>
      </el-table-column>
    </el-table>
  </el-col>
</template>
<script>
import { shell } from 'electron'
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
      ]
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
    handleEdit (li) {
      console.log(li)
    }
  },
  mounted () {
    // this.search()
  }
}
</script>
<style lang="scss" scoped>
.h_add{
  .h_table{
    margin-top: 20px;
  }
}
</style>
