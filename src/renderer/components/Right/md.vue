<template>
  <div class="client-right">
    <div class="rightContent markdown-body" v-html="markdwon" v-highlight></div>
    <div class="model" v-show="modelShow">
      <div class="content">加载中……</div>
    </div>
  </div>
</template>
<script>
import marked from 'marked'
export default {
  name: 'right',
  data () {
    return {
      markdwon: null,
      url: '',
      modelShow: true
    }
  },
  methods: {
    open (e) {
      this.url = e
      this.getMd()
    },
    getMd () {
      this.$http.get(this.url).then((res) => {
        let md = marked(res.data)
        this.markdwon = md
        this.modelShow = false
      })
    }
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
  .model{
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
</style>
