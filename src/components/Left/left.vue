<template>
  <v-layout max-width="50" align-start column fill-height blue-grey darken-4 class="h_left">
    <span>logo icon</span>
    <span>add icon</span>
    <span>tag icon</span>
    <span>set icon</span>
  </v-layout>
</template>
<script>
export default {
  name: 'left'
}
</script>
<style lang="scss" scoped>
.h_left{
  -webkit-app-region: drag;
  -webkit-user-select: none;
  span{
    -webkit-app-region: no-drag;
  }
}
</style>
