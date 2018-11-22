<template>
  <div class="right">
    <div class="markdown-body" v-html="markdwon" v-highlight></div>
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
  props: [
    // 'url'
  ],
  methods: {
    getMd () {
      // this.url = 'https://raw.githubusercontent.com/gaoyoubo/hexo-client/master/README.md'
      // this.url = 'https://raw.githubusercontent.com/chjj/marked/master/README.md'
      this.url = 'https://raw.githubusercontent.com/highlightjs/highlight.js/master/README.md'
      this.$http.get(this.url)
        .then((res) => {
          let md = marked(res.data)
          this.markdwon = md
        })
    }
  },
  created () {
    this.getMd()
  }
}
</script>
<style lang="scss" scoped>
@import 'primer/index.scss';
.right{
  flex: 1;
  padding: 0px 30px 30px 30px;
  overflow: scroll;
  .markdown-body{
    img{
      max-width: 60% !important;
      width: 60% !important;
    }
  }
}
</style>
