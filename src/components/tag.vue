<template>
  <a-row class="tag">
    <a-row class="top">
      <a-tag v-for="(i, j) in tags" :key="j" :color="activeNum === j ? 'blue' : ''" @click="tagClick(j)">{{i}}</a-tag>
    </a-row>
    <a-row>
      <a-col>该标签共有：{{data.length}} 条数据，一共有：{{dbNum}} 条数据。</a-col>
    </a-row>
    <a-row class="tagTable ant-table" v-show="tableShow">
      <table>
        <thead class="ant-table-thead">
          <tr>
            <th>作者/库</th>
            <th>描述</th>
            <th>选择操作</th>
          </tr>
        </thead>
        <tbody class="ant-table-tbody">
          <tr v-for="(i, j) in data" :key="j">
            <td class="repository"><a :href="i.htmlUrl" target="_blank" rel="noopener noreferrer">{{i.repository}}</a></td>
            <td>{{i.description}}</td>
            <td class="btns">
              <a-button size="small" @click="look(i)">预览</a-button>
              <a-button size="small" @click="modify(i)">修改</a-button>
              <a-button size="small" @click="deleted(i)">删除</a-button>
            </td>
          </tr>
        </tbody>
      </table>
    </a-row>
    <a-modal class="modify" title="修改" :visible="visible" @ok="handleOk" @cancel="handleCancel" >
      <a-form>
        <a-form-item label="作者/库：" :labelCol="{span: 3}" :wrapperCol="{span: 21}">
          <a-input v-model="d.repository"></a-input>
        </a-form-item>
        <a-form-item label="标签：" :labelCol="{span: 3}" :wrapperCol="{span: 21}">
          <a-input v-model="d.tag"></a-input>
        </a-form-item>
        <a-form-item label="官网：" :labelCol="{span: 3}" :wrapperCol="{span: 21}">
          <a-input v-model="d.htmlUrl"></a-input>
        </a-form-item>
        <a-form-item label="MD地址：" :labelCol="{span: 3}" :wrapperCol="{span: 21}">
          <a-input v-model="d.mdUrl"></a-input>
        </a-form-item>
        <a-form-item label="描述：" :labelCol="{span: 3}" :wrapperCol="{span: 21}">
          <a-textarea v-model="d.description" :rows="4"/>
        </a-form-item>
      </a-form>
    </a-modal>
  </a-row>
</template>
<script>
import db from '../database/db'
export default {
  name: 'tag',
  data () {
    return {
      tags: [],
      dbNum: 0,
      activeNum: null,
      data: [],
      tableShow: false,
      d: {},
      visible: false
    }
  },
  methods: {
    getTags () {
      let a = []
      db.md.each(md => {
        let n = a.indexOf(md.tag)
        if (n === -1) {
          a.push(md.tag)
        }
        this.tags = a
      })
    },
    getDBNum () {
      db.md.count(e => {
        this.dbNum = e
      })
    },
    tagClick (n) {
      this.activeNum = n
      this.showTagDB()
    },
    showTagDB (e) {
      let key = this.tags[this.activeNum]
      db.md.where('tag').equals(key).toArray(e => {
        this.data = e
        this.tableShow = true
      })
    },
    look (e) {
      let url = e.mdUrl
      this.$store.dispatch('openMd', url)
    },
    handleOk () {
      db.md.put(this.d).then(() => {
        this.$message.success('修改成功')
      }).catch(() => {
        this.$message.warning('修改失败，请重试')
      })
      this.visible = false
    },
    handleCancel () {
      this.visible = false
      this.$message.info('未修改')
    },
    modify (e) {
      this.d = e
      this.visible = true
    },
    deleted (e) {
      db.md.delete(e.id)
      this.$message.success('删除成功')
      this.$store.commit('CHANGE_REFRESH', true)
    }
  },
  created () {
    this.getTags()
    this.getDBNum()
  }
}
</script>
<style lang="scss" scoped>
.tag{
  padding: 20px;
  width: 100%;
  .ant-tag{
    margin: 0px 10px 8px 0;
    padding: 0 12px;
    height: 26px;
    line-height: 24px;
  }
  .spin{
    text-align: center;
  }
  .tagTable{
    .repository{
      width: 20%;
    }
    .btns{
      width: 210px;
      button{
        cursor: pointer;
        margin-right: 10px;
      }
    }
  }
}
</style>
