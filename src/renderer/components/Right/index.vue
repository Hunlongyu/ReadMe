<template>
  <div class="client-right">
    <div class="rightContent markdown-body" v-html="markdwon" v-highlight></div>
  </div>
</template>
<script>
import marked from 'marked'
export default {
  name: 'right',
  data () {
    return {
      markdwon: null,
      url: ''
    }
  },
  methods: {
    open (e) {
      console.log('right', e)
      this.url = e
      this.getMd()
    },
    getMd () {
      // this.url = 'https://raw.githubusercontent.com/gaoyoubo/hexo-client/master/README.md'
      // this.url = 'https://raw.githubusercontent.com/chjj/marked/master/README.md'
      // this.url = 'https://raw.githubusercontent.com/highlightjs/highlight.js/master/README.md'
      this.$http.get(this.url)
        .then((res) => {
          let md = marked(res.data)
          this.markdwon = md
        })
    }
  },
  created () {
    // this.getMd()
  }
}
</script>
<style lang="scss">
@import 'primer/index.scss';
.client-right{
  flex: 1;
  padding: 0px 30px 30px 30px;
  overflow: scroll;
  .rightContent >>> img{
    max-width: 80%;
  }
  // .rightContent{
  //   img{
  //     max-width: 80%;
  //   }
  // }
}
</style>
