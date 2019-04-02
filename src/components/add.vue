<template>
  <a-row id="add">
    <a-col class="search">
      <a-input-search placeholder="input search text" @search="onSearch" enterButton size="large"/>
    </a-col>
    <a-col v-show="!loading">
      <a-list>
        <a-list-item>搜索结果最多显示前30个，建议精确搜索</a-list-item>
      </a-list>
    </a-col>
    <a-col class="spin" v-show="spinShow">
      <a-spin tip="Loading"></a-spin>
    </a-col>
    <a-col v-show="loading" class="list ant-table">
      <table>
        <thead class="ant-table-thead">
          <tr>
            <th>作者/库</th>
            <th>Star</th>
            <th>Watch</th>
            <th>描述</th>
            <th>选择操作</th>
          </tr>
        </thead>
        <tbody class="ant-table-tbody">
          <tr v-for="(i, j) in data" :key="j">
            <td><a target="_blank" :href="i.html_url">{{i.full_name}}</a></td>
            <td>{{i.stargazers_count}}</td>
            <td>{{i.watchers_count}}</td>
            <td>{{i.description}}</td>
            <td><a-button @click="checkDB(i, j)" :loading="btnLoading === j">{{ btnLoading === j ? '' : '添加'}}</a-button></td>
          </tr>
        </tbody>
      </table>
    </a-col>
    <a-col>
      <a-modal title="请选择标签" :visible="tagShow" @ok="handleOk" @cancel="handleCancel">
        <a-auto-complete :dataSource="tag" style="width: 100%" v-model="selectedItem" :filterOption="filterOption" placeholder="input here" />
      </a-modal>
    </a-col>
  </a-row>
</template>
<script>
import db from '../database/nedb'
export default {
  name: 'add',
  data () {
    return {
      loading: false,
      spinShow: false,
      btnLoading: 100,
      data: [],
      item: null,
      mdUrl: null,
      tagShow: false,
      tag: [],
      selectedItem: ''
    }
  },
  methods: {
    onSearch (val) {
      if (val === '') {
        this.$message.warning('请输入您要搜索的内容')
      } else {
        let q = val.replace(/\s+/g, '')
        this.spinShow = true
        this.$http.get('https://api.github.com/search/repositories?q=' + q).then(res => {
          this.data = res.data.items
          if (this.data.length > 0) {
            this.loading = true
          } else {
            this.loading = false
            this.$message.info('未搜索到相关内容')
          }
          this.spinShow = false
        })
      }
    },
    checkDB (e, j) {
      this.item = e
      this.btnLoading = j
      let fn = this.item.full_name
      db.find({ repository: fn }, (e, d) => {
        if (d.length >= 1) {
          this.btnLoading = 100
          this.$message.warning('已存在，不能重复添加！')
        } else {
          this.checkMd()
        }
      })
    },
    checkMd () {
      let i = 0
      let _this = this
      let fn = this.item.full_name
      let db = this.item.default_branch
      let md = ['README.md', 'readme.md', 'README.MD', 'Readme.md', 'readme.MD', 'ReadMe.md', 'ReadMe.Md', 'ReadMe.MD', 'README.markdown', 'readme.markdown', 'README', 'readme']

      getMd()
      function getMd () {
        let url = 'https://raw.githubusercontent.com/' + fn + '/' + db + '/' + md[i]
        _this.$http.get(url).then(e => {
          if (e.status === 200) {
            _this.mdUrl = url
            _this.tagShow = true
            _this.btnLoading = 100
          }
        }).catch(() => {
          i++
          if (i < md.length) {
            getMd()
          } else {
            _this.$message.error('添加失败，README文件不存在')
            _this.btnLoading = 100
          }
        })
      }
    },
    getDBTag () {
      let tags = []
      db.find({}, (e, d) => {
        for (let i = 0; i < d.length; i++) {
          let m = d[i].tag
          let n = tags.indexOf(m)
          if (n === -1) {
            tags.push(m)
          }
        }
        this.tag = tags
      })
    },
    filterOption (input, option) {
      return option.componentOptions.children[0].text.toUpperCase().indexOf(input.toUpperCase()) >= 0
    },
    handleOk () {
      if (this.selectedItem === '') {
        this.$message.warning('请选择一个标签，或者输入一个新的标签')
      } else {
        this.addDB()
      }
      this.tagShow = false
    },
    handleCancel () {
      this.tagShow = false
    },
    addDB () {
      let e = this.item
      let d = {
        repository: e.full_name,
        description: e.description,
        tag: this.selectedItem,
        htmlUrl: e.html_url,
        mdUrl: this.mdUrl,
        clickNum: 0
      }
      db.insert(d, (e, c) => {
        if (e) {
          this.$message.error('添加失败，请重新尝试')
        } else {
          this.$message.success('添加成功')
          this.$store.commit('CHANGE_REFRESH', true)
        }
      })
    }
  },
  created () {
    this.getDBTag()
  }
}
</script>
<style lang="scss" scoped>
#add{
  flex: 1;
  margin: 10px 20px;
  overflow-y: scroll;
  &::-webkit-scrollbar{
    width: 1px;
    height: 0;
  }
  .list{
    margin-top: 20px;
  }
  .spin{
    margin-top: 20px;
    text-align: center;
  }
}
</style>
