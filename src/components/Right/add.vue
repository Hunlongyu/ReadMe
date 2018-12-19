<template>
  <v-container grid-list-xs class="add">
    <v-layout row wrap>
      <v-text-field solo :placeholder="$t('search_placeholder')" v-model.trim="value" @keyup.enter="search"></v-text-field>
      <v-btn color="info" class="btn_search" @click="search">{{$t('search')}}</v-btn>
    </v-layout>
    <v-layout column v-if="tableShow">
      <v-data-table :items="list" class="elevation-1" :headers="headers">
        <template slot="items" slot-scope="props">
          <td>{{ props.item.full_name }}</td>
          <td>{{ props.item.description }}</td>
          <td>{{ props.item.stargazers_count }}</td>
          <td>{{ props.item.watchers_count }}</td>
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
      tableShow: false,
      headers: [
        { text: '库名', value: 'calories' },
        { text: 'Fat (g)', value: 'fat' },
        { text: 'Carbs (g)', value: 'carbs' },
        { text: 'Protein (g)', value: 'protein' },
        { text: 'Iron (%)', value: 'iron' }
      ],
      list: null
    }
  },
  methods: {
    search () {
      this.$axios.get('https://api.github.com/search/repositories?q=ReadMe-client').then(res => {
        this.list = res.data.items
        this.tableShow = true
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.add{
  height: calc(100% - 40px);
  overflow: scroll;
  .btn_search{
    height: 48px;
    margin: 0;
  }
}
</style>
