<template>
  <v-container fluid pa-0 ma-0>
    <v-layout row fill-height>
      <div class="h_left">
        <Left/>
      </div>
      <div class="h_middle">
        <Middle/>
      </div>
      <div class="h_right">
        <Top/>
        <Right :is="right"/>
      </div>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  name: 'home',
  computed: {
    right () {
      return this.$store.state.view
    }
  }
}
</script>
<style lang="scss">
.h_left{
  width: 60px;
}
.h_middle{
  width: 280px;
}
.h_right{
  flex: 1;
  // overflow-y: hidden;
  border: 1px solid #bebebe;
}
</style>
