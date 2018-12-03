<template>
  <div class="middle">
    <ul>
      <li v-for="(item, index) in list" :key="index" @click="getUrl(item.link)">{{item.repository}}</li>
    </ul>
  </div>
</template>
<script>
import db from '../../service/db.js'
export default {
  name: 'middle',
  data () {
    return {
      list: []
    }
  },
  methods: {
    getUrl (e) {
      this.$emit('listClick', e)
    },
    updataList (e) {
      console.log(e)
      db.find({}, (doc) => {
        this.list = doc
      })
    }
  },
  created () {
    this.updataList()
  }
}
</script>
<style lang="scss" scoped>
.middle{
  background-color: #1d2325;
  width: 270px;
  min-width: 270px;
  height: 100%;
  border-left: 1px solid #2e3538;
  border-right: 1px solid #2e3538;
  ul{
    margin: 0;
    padding: 0px;
    list-style: none;
    color: #bebebe;
    li{
      padding: 10px 20px;
      font-size: 16px;
      cursor: pointer;
      &:hover{
        background-color: #bebebe;
        color: #1d2325;
      }
    }
  }
}
</style>
