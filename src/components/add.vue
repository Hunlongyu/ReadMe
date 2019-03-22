<template>
  <div class="add">add</div>
</template>
<script>
import db from '../database/db'
export default {
  name: 'add',
  created () {
    // db.md.put({
    //   repository: 'longyu',
    //   tag: 'js',
    //   url: 'https://raw.githubusercontent.com/Hunlongyu/ReadMe-client/dev/README.md'
    // })

    // db.md.delete(16);
    db.md.where('repository').startsWithIgnoreCase('hun').toArray(e => {
      console.log(e)
    })
    // db.md.get(24).then(e => {
    //   console.log(e.tag)
    // })
    // db.md.limit(10).each(e => {
    //   console.log(e.id)
    // })

    // db.md.orderBy(':id').limit(10).each(e => {
    //   console.log(e.tag)
    // })
  }
}
</script>
