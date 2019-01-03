<template>
  <div>set</div>
</template>
<script>
// import db from '../datastore/db'
// import db from '../datastore/init'
import db from '../datastore/test'
export default {
  name: 'set',
  created () {
    db.log()
    // db.log()
    // let link = {
    //   repository: 'gkajs/gka',
    //   tag: 'jss',
    //   link: 'https://raw.githubusercontent.com/gkajs/gka/master/readme.md'
    // }

    // // db.add(link)
    // db.add({ _id: '3' })
    // db.add({ _id: '4' })
    // db.add({ _id: '6' })
    // db.getAll()
    // console.log(db.getAll())
    // this.$db.add(link, (doc) => {
    //   console.log(doc)
    // })
  }
}
</script>
