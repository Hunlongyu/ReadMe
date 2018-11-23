<template>
  <div class="main">
    <frame />
    <div class="body">
      <left />
      <middle @listClick="homeEvents" />
      <right ref="right"/>
    </div>
  </div>
</template>
<script>
import frame from './Frame'
import left from './Left'
import middle from './Middle'
import right from './Right'
export default {
  name: 'readme',
  components: {
    frame,
    left,
    middle,
    right
  },
  methods: {
    homeEvents (e) {
      console.log('home', e)
      this.$refs.right.open(e)
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
