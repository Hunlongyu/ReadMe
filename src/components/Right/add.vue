<template>
  <v-container grid-list-xs class="add">
    <v-layout row wrap>
      <v-text-field solo :placeholder="$t('search_placeholder')" v-model.trim="value" @keyup.enter="search"></v-text-field>
      <v-btn color="info" class="btn_search" @click="search">{{$t('search')}}</v-btn>
    </v-layout>
    <v-layout row wrap ref="list" class="list">
      <v-data-table
        :headers="headers"
        :items="lists"
        class="theader"
        v-if="lists.length > 0"
        hide-actions
      >
        <template slot="items" slot-scope="props">
          <td>{{ props.item.full_name }}</td>
          <td overflow-hidden>{{ props.item.description }}</td>
          <td>{{ props.item.stargazers_count }} / {{ props.item.watchers_count }}</td>
          <td><v-btn color="success">添加</v-btn></td>
        </template>
      </v-data-table>
    </v-layout>
  </v-container>
</template>
<script>
export default {
  name: 'add',
  data () {
    return {
      value: '',
      tableShow: true,
      lists: [],
      clientHeight: 0,
      headers: [
        {
          text: 'zuozhe/ku',
          align: 'left',
          sortable: false,
          value: 'name'
        },
        { text: 'description', sortable: false, value: 'desc' },
        { text: 'star / watch', sortable: false, value: 'star' },
        { text: 'caozuo', align: 'center', sortable: false, value: 'caozuo' }
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
    onResize () {
      this.clientHeight = window.innerHeight
      this.$refs.list.style.height = this.clientHeight - 180 + 'px'
      window.onresize = () => {
        this.clientHeight = `${document.documentElement.clientHeight}`
        this.$refs.list.style.height = this.clientHeight - 180 + 'px'
      }
    }
  },
  mounted () {
    this.onResize()
    this.search()
  }
}
</script>
<style lang="scss" scoped>
.add{
  height: calc(100% - 40px);
  .btn_search{
    height: 48px;
    margin: 0;
  }
  .list{
    overflow-y: scroll;
    .liTwo{
      text-overflow: ellipsis;
    }
  }
}
</style>
