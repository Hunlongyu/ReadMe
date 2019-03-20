<template>
  <div id="app">
    <Left />
    <Mid />
    <Right :is="getRight" />
    <a-button @click="changeRight">change right</a-button>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'app',
  computed: {
    ...mapGetters([
      'getRight'
    ])
  },
  methods: {
    changeRight () {
      this.$store.commit('CHANGE_RIGHT', 'md')
    }
  }
}
</script>

<style lang="scss">
#app{
  display: flex;
  height: 100%;
}
</style>
