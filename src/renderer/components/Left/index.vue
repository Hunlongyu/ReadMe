<template>
  <div class="left">
    <span v-for="(i, j) in li" :key="j" @click="icon(i)" :title="name[j]"></span>
  </div>
</template>
<script>
export default {
  name: 'left',
  data () {
    return {
      li: ['Tag', 'Add', 'Setting'],
      name: ['标签', '添加', '设置']
    }
  },
  methods: {
    icon (e) {
      this.$emit('iconClick', e)
    }
  }
}
</script>
<style lang="scss" scoped>
.left{
  background-color: #242b2e;
  width: 50px;
  min-width: 50px;
  height: 100%;
  display: flex;
  align-items: center;
  flex-direction: column;
  span{
    display: inline-block;
    width: 50px;
    height: 60px;
    margin-bottom: 0px;
    cursor: pointer;
    background-size: 20px 20px;
    background-repeat: no-repeat;
    background-position: center center;
    &:hover{
      background-color: #32383a;
    }
  }
  span:nth-child(1){
    background-image: url(./label.png);
  }
  span:nth-child(2){
    background-image: url(./add.png);
  }
  span:nth-child(3){
    background-image: url(./setting.png);
  }
}
</style>
