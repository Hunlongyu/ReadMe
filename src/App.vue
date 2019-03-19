<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png">
    <div>
      <a-button type="primary">Primary</a-button>
      <a-button>Default</a-button>
      <a-button type="dashed">Dashed</a-button>
      <a-button type="danger">Danger</a-button>
    </div>
    <HelloWorld msg="Welcome to Your Vue.js App"/>
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'

export default {
  name: 'app',
  components: {
    HelloWorld
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
