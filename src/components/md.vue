<template>
  <a-row id="md">
    <a-row class="top">top</a-row>
    <a-row class="markdown-body">
      <div v-html="markdown" v-highlight></div>
    </a-row>
  </a-row>
</template>
<script>
import marked from 'marked'
marked.setOptions({
  renderer: new marked.Renderer(),
  gfm: true,
  tables: true,
  breaks: false,
  pedantic: false,
  sanitize: false,
  smartLists: true,
  smartypants: false
})
export default {
  name: 'md',
  data () {
    return {
      markdown: null,
      // url: 'https://raw.githubusercontent.com/vueComponent/ant-design-vue/master/README-zh_CN.md',
      url: 'https://raw.githubusercontent.com/liriliri/eruda/master/README.md'
    }
  },
  methods: {
    getMd () {
      this.$http.get(this.url).then((res) => {
        let md = marked(res.data)
        this.markdown = md
        this.$nextTick(() => {
          this.changePicSize()
          this.changeALink()
        })
      })
    },
    changePicSize () {
      let imgs = document.getElementsByTagName('img')
      for (let i = 0; i < imgs.length; i++) {
        imgs[i].style.maxWidth = '90%'
      }
    },
    changeALink () {
      let a = document.getElementsByTagName('a')
      for (let i = 0; i < a.length; i++) {
        a[i].target = '_blank'
      }
    }
  },
  mounted () {
    this.getMd()
  }
}
</script>
<style lang="scss" scoped>
#md{
  flex: 1;
  overflow-y: scroll;
  width: 100%;
  &::-webkit-scrollbar{
    width: 1px;
    height: 0;
  }
  .markdown-body{
    padding: 20px;
    height: 100%;
    img{
      max-width: 80%;
    }
  }
}
</style>
