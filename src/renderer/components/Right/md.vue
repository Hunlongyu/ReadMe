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
  padding: 20px 30px 30px 30px;
  overflow: scroll;
  &::-webkit-scrollbar{
    width: 4px;
    height: 4px;
  }
  &::-webkit-scrollbar-thumb {/*滚动条里面小方块*/
      border-radius: 2px;
      box-shadow: inset 0 0 2px rgba(0,0,0,0.2);
      background: rgba(0,0,0,0.6);
  }
  &::-webkit-scrollbar-track {/*滚动条里面轨道*/
      box-shadow: inset 0 0 2px rgba(0,0,0,0.2);
      border-radius: 0;
      background: rgba(0,0,0,0.4);
  }
  .rightContent >>> img{
    max-width: 80%;
  }
  .rightContent a{
    pointer-events: none;
  }
  .model{
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
</style>
