<template>
  <div id="app">
    <Left />
    <Mid />
    <!-- <Right :is="right" /> -->
    <span>{{log}}</span>
  </div>
</template>

<script>
export default {
  name: 'app',
  computed: {
    log () {
      return this.$store.state.oneLog
    }
  }
}
</script>

<style lang="scss">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
