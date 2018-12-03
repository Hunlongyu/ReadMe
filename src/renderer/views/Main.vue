<template>
  <div class="main">
    <Frame />
    <div class="body">
      <Left  @iconClick="leftEvents"/>
      <Middle @listClick="middleEvents" ref="middle"/>
      <Right :is="right" ref="right" @updata="rightEvents"/>
    </div>
  </div>
</template>
<script>
export default {
  name: 'main-page',
  data () {
    return {
      right: 'Md'
    }
  },
  methods: {
    leftEvents (e) {
      this.right = e
    },
    middleEvents (e) {
      this.right = 'Md'
      this.$nextTick(() => {
        this.$refs.right.open(e)
      })
    },
    rightEvents (e) {
      this.$refs.middle.updataList(e)
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
