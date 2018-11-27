<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
import 'modern-normalize/modern-normalize.css'

export default {
  name: 'readme'
}
</script>
<style lang="scss">
html,
#app,
body {
  height: 100%;
  width: 100%;
  padding: 0;
  margin: 0;
}
body {
  overflow: hidden;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>

