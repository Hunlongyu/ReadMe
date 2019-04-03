<template>
  <a-row id="left">
    <a-row>
     <a-tooltip v-for="(i, j) in li" :key="j" placement="right" @click="iconClick(i)" :class="i">
       <template slot="title">
         <span>{{title[j]}}</span>
       </template>
     </a-tooltip>
    </a-row>
  </a-row>
</template>
<script>
export default {
  name: 'left',
  data () {
    return {
      li: ['tag', 'add', 'set'],
      title: ['标签', '添加', '设置']
    }
  },
  methods: {
    iconClick (e) {
      this.$store.commit('CHANGE_RIGHT', e)
    }
  }
}
</script>
<style lang="scss" scoped>
#left{
  width: 60px;
  min-width: 60px;
  height: 100%;
  display: flex;
  align-items: center;
  flex-direction: column;
  background-color: #242b2e;
  span{
    display: inline-block;
    width: 60px;
    height: 60px;
    text-align: center;
    line-height: 80px;
    background-size: 30px auto;
    background-position: center center;
    background-repeat: no-repeat;
  }
  .add{
    background-image: url(../assets/img/add_d.svg);
    cursor: pointer;
    &:hover{
      background-color: #30373a;
      background-image: url(../assets/img/add_h.svg);
    }
  }
  .tag{
    background-image: url(../assets/img/tag_d.svg);
    cursor: pointer;
    &:hover{
      background-color: #30373a;
      background-image: url(../assets/img/tag_h.svg);
    }
  }
  .set{
    background-image: url(../assets/img/set_d.svg);
    cursor: pointer;
    &:hover{
      background-color: #30373a;
      background-image: url(../assets/img/set_h.svg);
    }
  }
}
</style>
