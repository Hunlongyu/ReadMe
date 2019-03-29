<template>
  <a-row id="set">
    <a-row class="settings">
      <h1>设置</h1>
      <a-list :split="false">
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
        <a-list-item>官网：<a href="http://" target="_blank" rel="noopener noreferrer">ReadMe</a></a-list-item>
        <a-list-item>作者：<a href="https://github.com/Hunlongyu" target="_blank" rel="noopener noreferrer">Hunlongyu</a></a-list-item>
        <a-list-item>项目地址：<a href="https://github.com/Hunlongyu/ReadMe" target="_blank" rel="noopener noreferrer">https://github.com/Hunlongyu/ReadMe</a></a-list-item>
        <a-list-item>提交问题：<a href="https://github.com/Hunlongyu/ReadMe/issues" target="_blank" rel="noopener noreferrer">https://github.com/Hunlongyu/ReadMe/issues</a></a-list-item>
      </a-list>
    </a-row>
  </a-row>
</template>
<script>
import db from '../database/db'
export default {
  name: 'set',
  computed: {
    name () {
      return this.$store.getters.getName
    },
    version () {
      return this.$store.getters.getVersion
    }
  },
  methods: {
    confirm () {
      db.delete()
      this.$message.success('清除成功！')
      window.location.reload()
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
}
</style>
