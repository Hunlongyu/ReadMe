<template>
  <a-row id="add">
    <a-col>
      <a-input-search placeholder="input search text" @search="onSearch" enterButton size="large"/>
    </a-col>
    <a-col>
      <a-table :columns="columns" :dataSource="data" :loading="loading">
        <template slot="footer">
          搜索结果最多显示前30个，建议精确搜索
        </template>
      </a-table>
    </a-col>
  </a-row>
</template>
<script>
// import db from '../database/db'
export default {
  name: 'add',
  data () {
    return {
      loading: false,
      data: [
        {
          key: '1',
          repository: 'Hunlongyu/ReadMe-Client',
          star: 1,
          watch: 0,
          description: 'PWA'
        }
      ],
      columns: [
        {
          dataIndex: 'repository',
          title: '作者/库：',
          width: '20%'
        },
        {
          dataIndex: 'star',
          title: 'Star',
          sorter: true,
          width: '10%'
        },
        {
          dataIndex: 'watch',
          title: 'Watch',
          sorter: true,
          width: '10%'
        },
        {
          dataIndex: 'description',
          title: '描述'
        }
      ]
    }
  },
  methods: {
    onSearch (val) {
      console.log(val)
    }
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
}
</style>
