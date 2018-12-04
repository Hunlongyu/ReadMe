<template>
  <div class="main">
    <Frame />
    <div class="body">
      <Left  @iconClick="leftEvents"/>
      <Middle @listClick="middleEvents" ref="middle"/>
      <Right :is="right" ref="right" @updata="rightEvents" @listClick="openMd"/>
    </div>
  </div>
</template>
<script>
export default {
  name: 'main-page',
  data () {
    return {
      right: 'Add'
    }
  },
  methods: {
    leftEvents (e) {
      this.right = e
    },
    middleEvents (e) {
      console.log('main', e)
      this.right = 'Md'
      this.$nextTick(() => {
        this.$refs.right.open(e)
      })
    },
    rightEvents (e) {
      this.$refs.middle.updataList(e)
    },
    openMd (e) {
      this.right = 'Md'
      this.$nextTick(() => {
        this.$refs.right.open(e)
      })
    }
  },
  created () {}
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
