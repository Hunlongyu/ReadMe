<template>
  <div class="middle">
    <ul>
      <li v-for="(item, index) in list" :key="index" @click="getUrl(item.link)">{{item.name}}</li>
    </ul>
  </div>
</template>
<script>
import db from '@/service/DB'
export default {
  name: 'middle',
  data () {
    return {
      Author: {
        name: 'hunlongyu',
        sex: 'male',
        email: 'hunlongyu@gmail.com'
      },
      Link: {
        ReadMeLink: [
          {name: 'Highlight.js', author: 'highlight', cat: 'highlight', link: 'https://raw.githubusercontent.com/highlightjs/highlight.js/master/README.md'},
          {name: 'hexo-client', author: 'gaoyoubo', cat: 'highlight', link: 'https://raw.githubusercontent.com/gaoyoubo/hexo-client/master/README.md'},
          {name: 'marked', author: 'chjj', cat: 'highlight', link: 'https://raw.githubusercontent.com/chjj/marked/master/README.md'}
        ]
      },
      list: ''
    }
  },
  methods: {
    getUrl (e) {
      this.$emit('listClick', e)
      console.log('middle', e)
    }
  },
  created () {
    // db.set('Link', this.Link)
    db.get('Link').then(res => {
      this.list = res.ReadMeLink
    })
  }
}
</script>
<style lang="scss" scoped>
.middle{
  background-color: #1d2325;
  width: 270px;
  min-width: 270px;
  height: 100%;
  border-left: 1px solid #2e3538;
  border-right: 1px solid #2e3538;
  ul{
    margin: 0;
    padding: 0px;
    list-style: none;
    color: #bebebe;
    li{
      padding: 10px 20px;
      font-size: 16px;
      cursor: pointer;
      &:hover{
        background-color: #bebebe;
        color: #1d2325;
      }
    }
  }
}
</style>
