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
    <a-col v-show="loading" class="list ant-table">
      <table>
        <thead class="ant-table-thead">
          <tr>
            <th>作者/库：</th>
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
            <td><a-button @click="onAdd(i)">添加</a-button></td>
          </tr>
        </tbody>
      </table>
    </a-col>
    <a-col>
      <a-modal title="请选择标签" :visible="tagShow" @ok="handleOk" @cancel="handleCancel">
        <a-auto-complete :dataSource="tag" style="width: 100%" placeholder="input here" />
      </a-modal>
    </a-col>
  </a-row>
</template>
<script>
import db from '../database/db'
export default {
  name: 'add',
  data () {
    return {
      loading: false,
      data: [],
      tagShow: true,
      tag: ['default', 'js', 'pwa'],
      selectedItems: []
    }
  },
  methods: {
    onSearch (val) {
      val = 'readme'
      if (val === '') {
        this.$message.info('请输入您要搜索的内容')
      } else {
        let q = val.replace(/\s+/g, '')
        this.$http.get('https://api.github.com/search/repositories?q=' + q).then(res => {
          this.data = res.data.items
          this.loading = true
        })
      }
    },
    onAdd (e) {
      let fn = e.full_name
      let dfb = e.default_branch
      let urlOne = 'https://raw.githubusercontent.com/' + fn + '/' + dfb + '/README.md'
      let urlTwo = 'https://raw.githubusercontent.com/' + fn + '/' + dfb + '/readme.md'

      db.md.where('repository').equals(fn).toArray((e) => {
        if (e.length >= 1) {
          this.$message.warning('已存在，不能重复添加！')
        } else {
          this.$http.get(urlOne).then(() => {
            this.AddTag()
          }).catch(() => {
            this.$http.get(urlTwo).then(() => {
              this.AddTag()
            }).catch(() => {
              this.$message.error('添加失败！可能是 readme.md 或 REAMD.md 文件不存在~')
            })
          })
        }
      })
    },
    AddTag () {
      this.tagShow = true
    },
    getDBTag () {
      let a = []
      db.md.each(md => {
        console.log(md.tag)
        a = a.concat(md.tag)
        console.log(a)
      })
    },
    handleOk () {},
    handleCancel () {},
    addDB (e, url) {
      let d = {
        repository: e.full_name,
        description: e.description,
        tag: ['js', 'pwa'],
        htmlUrl: e.html_url,
        mdUrl: url
      }
      db.md.add(d).then((id) => {
        console.log(id)
      }).catch((err) => {
        console.log(err)
      })
      // if (this.tag !== '' && this.saveShow === true) {
      //   data.tag = this.tag
      //   db.add(data, (doc) => {
      //     this.tagShow = false
      //     this.$emit('updata', doc)
      //   })
      // }
    }
  },
  created () {
    // this.addDB()
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
}
</style>
