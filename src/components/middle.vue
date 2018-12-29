<template>
  <el-row type="flex" class="h_middle">

  </el-row>
</template>
<script>
// import db from '../../plugins/db.js'
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
    // db.log()
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
  height: 100%;
  background-color: rgb(29,35,37);
}
</style>
