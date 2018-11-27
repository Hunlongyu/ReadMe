<template>
  <div class="main">
    <Frame />
    <div class="body">
      <Left  @iconClick="leftEvents"/>
      <Middle @listClick="middleEvents" />
      <Right :is="body[num]" ref="right" />
    </div>
  </div>
</template>
<script>
import db from '../service/db.js'
export default {
  name: 'main-page',
  data () {
    return {
      num: 0,
      body: ['Add', 'Search', 'Sync', 'Cat', 'Tag', 'Imex', 'Setting', 'Md']
    }
  },
  methods: {
    leftEvents (e) {
      this.num = e
    },
    middleEvents (e) {
      this.num = 7
      this.$nextTick(() => {
        this.$refs.right.open(e)
      })
    }
  },
  created () {
    let url = 'https://www.baidu.com'
    db.addMDLink(url, docs => {
      console.log(docs)
    })
  }
}
</script>
<style lang="scss" scoped>
.main{
  position: relative;
  height: 100%;
  .body{
    height: 100%;
    display: flex;

  }
}
</style>
