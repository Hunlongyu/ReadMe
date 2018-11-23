<template>
  <div class="add">
    <ul>
      <li v-for="(item, index) in list" :key="index" v-html="$options.filters.ooo(item)"></li>
    </ul>
  </div>
</template>
<script>
export default {
  name: 'add',
  data () {
    return {
      list: null
    }
  },
  filters: {
    ooo (item) {
      let obj = ''
      for (let key in item) {
        obj += `<span>${key}:</span><b>${item[key]}</b><br />`
      }
      return obj
    }
  },
  methods: {},
  created () {
    this.$http.get('https://api.github.com/search/repositories?q=Hunlongyu/ReadMe-client').then(res => {
      console.log(res.data.items)
      this.list = res.data.items
    })
  }
}
</script>
<style lang="scss" scoped>
.add{
  padding: 10px;
  width: 100%;
  overflow: scroll;
  font-size: 20px;
}
</style>
