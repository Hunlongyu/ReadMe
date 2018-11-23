<template>
  <div class="main">
    <frame />
    <div class="body">
      <left  @iconClick="leftEvents"/>
      <middle @listClick="middleEvents" />
      <right :is="body[num]" ref="right" />
    </div>
  </div>
</template>
<script>
import frame from './Frame'
import left from './Left'
import middle from './Middle'
import md from './Right/md'
import add from './Right/add'
import search from './Right/search'
import sync from './Right/sync'
import cat from './Right/cat'
import tag from './Right/tag'
import imex from './Right/imex'
import setting from './Right/setting'
export default {
  name: 'readme',
  data () {
    return {
      num: 7,
      body: ['add', 'search', 'sync', 'cat', 'tag', 'imex', 'setting', 'md']
    }
  },
  components: {
    frame,
    left,
    middle,
    md,
    add,
    search,
    sync,
    cat,
    tag,
    imex,
    setting
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
