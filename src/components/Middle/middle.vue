<template>
  <v-layout row wrap justify-center fill-height class="h_middle">
    <v-form>
      <v-text-field solo></v-text-field>
    </v-form>
  </v-layout>
</template>
<script>
export default {
  name: 'middle',
  methods: {
    one () {
      let one = new Promise((resolve, reject) => {
        console.log(1)
        resolve('success')
      })
      return one
    },
    two () {
      let two = new Promise((resolve, reject) => {
        console.log(2)
        resolve()
      })
      return two
    },
    three () {
      let three = new Promise((resolve, reject) => {
        console.log(3)
        resolve()
      })
      return three
    }
  },
  created () {
    // this.one()
    //   .then(data => {
    //     console.log(data)
    //     this.two()
    //   }, data => {
    //     console.log(data)
    //   })
    //   .then(() => {
    //     this.three()
    //   })
  }
}
</script>
<style lang="scss" scoped>
.h_middle{
  background-color: rgb(29,35,37);
}
</style>
