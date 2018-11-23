<template>
  <div class="left">
    <span v-for="(item, index) in list" :key="index" @click="iconClick(index)"></span>
  </div>
</template>
<script>
export default {
  name: 'left',
  data () {
    return {
      list: 7
    }
  },
  methods: {
    iconClick (e) {
      console.log(e)
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
  padding-top: 20px;
  span{
    display: inline-block;
    width: 20px;
    height: 20px;
    margin-bottom: 20px;
    background-repeat: no-repeat;
    background-size: 100%;
    cursor: pointer;
  }
  span:nth-child(1){
    background-image: url(./add.png);
  }
  span:nth-child(2){
    background-image: url(./search.png);
  }
  span:nth-child(3){
    background-image: url(./sync.png);
  }
  span:nth-child(4){
    background-image: url(./cat.png);
  }
  span:nth-child(5){
    background-image: url(./label.png);
  }
  span:nth-child(6){
    background-image: url(./imex.png);
  }
  span:nth-child(7){
    background-image: url(./setting.png);
  }
}
</style>
