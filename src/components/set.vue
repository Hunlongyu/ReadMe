<template>
  <a-row id="set">
    <a-row class="settings">
      <h1>设置</h1>
      <a-list :split="false">
        <a-list-item><a-button @click="exportEvent">导出数据</a-button></a-list-item>
        <a-list-item class="impItem">
          <a-upload :fileList="fileList" :beforeUpload="beforeUpload" accept=".json">
            <a-button>导入数据</a-button>
          </a-upload>
        </a-list-item>
        <a-list-item>
          <a-popconfirm placement="bottomLeft" okText="Yes" cancelText="No" @confirm="confirm">
            <template slot="title">
                <p>该操作会删除所有数据，请慎重考虑！！！</p>
            </template>
            <a-button type="danger">清除数据</a-button>
          </a-popconfirm>
        </a-list-item>
      </a-list>
    </a-row>
    <a-row class="info">
      <h1>关于</h1>
      <a-list :split="false">
        <a-list-item>软件：{{ name }} PWA</a-list-item>
        <a-list-item>版本：v{{ version }}</a-list-item>
        <a-list-item>官网：<a href="https://hunlongyu.github.io/readme_home/index.html" target="_blank" rel="noopener noreferrer">ReadMe</a></a-list-item>
        <a-list-item>作者：<a href="https://github.com/Hunlongyu" target="_blank" rel="noopener noreferrer">Hunlongyu</a></a-list-item>
        <a-list-item>项目地址：<a href="https://github.com/Hunlongyu/ReadMe" target="_blank" rel="noopener noreferrer">https://github.com/Hunlongyu/ReadMe</a></a-list-item>
        <a-list-item>提交问题：<a href="https://github.com/Hunlongyu/ReadMe/issues" target="_blank" rel="noopener noreferrer">https://github.com/Hunlongyu/ReadMe/issues</a></a-list-item>
        <a-list-item>更新日志：<a href="https://github.com/Hunlongyu/ReadMe/releases" target="_blank" rel="noopener noreferrer">https://github.com/Hunlongyu/ReadMe/releases</a></a-list-item>
      </a-list>
    </a-row>
  </a-row>
</template>
<script>
import db from '../database/nedb'
import FileSaver from 'filesaver.js'
export default {
  name: 'set',
  data () {
    return {
      fileList: []
    }
  },
  computed: {
    name () {
      return this.$store.getters.getName
    },
    version () {
      return this.$store.getters.getVersion
    }
  },
  methods: {
    exportEvent () {
      db.find({}, (e, d) => {
        let blob = new Blob([JSON.stringify(d)], { type: '' })
        FileSaver.saveAs(blob, 'data.json')
      })
    },
    beforeUpload (file) {
      const reader = new FileReader()
      reader.readAsText(file)
      reader.onload = (f) => {
        let d = JSON.parse(f.target.result)
        db.insert(d, (e, f) => {
          if (e === null) {
            this.$message.success('导入成功，共导入 ' + f.length + ' 条数据！')
            this.$store.commit('CHANGE_REFRESH', true)
          } else {
            this.$message.warning('导入失败，请重试！或者去提交BUG')
          }
        })
      }
      return false
    },
    oo () {},
    confirm () {
      db.remove({}, { multi: true }, (e, n) => {
        if (e === null) {
          this.$message.success('清除成功！')
          this.$store.commit('CHANGE_REFRESH', true)
        } else {
          this.$message.warning('清除失败，请重试！')
        }
      })
    }
  }
}
</script>
<style lang="scss" scoped>
#set{
  padding: 20px;
  .info{
    margin-top: 20px;
  }
  .impItem{
    cursor: pointer;
  }
  .ant-list-item{
    position: relative;
    #impInput{
      position: absolute;
      z-index: 999;
      opacity: 0;
      // border: 1px solid #000;
      width: 88px;
      height: 32px;
      cursor: pointer;
    }
    #impBtn{
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
}
</style>
