<template>
  <div class="has-background-black-ter has-text-grey-light h_left">
    <span>
      <!-- <font-awesome-icon icon="window-minimize" /> -->
    </span>
    <span>
      <!-- <font-awesome-icon icon="window-minimize" /> -->
    </span>
    <span>
      <!-- <font-awesome-icon icon="window-minimize" /> -->
    </span>
  </div>
</template>
<script>
export default {
  name: 'left'
}
</script>
<style lang="scss" scoped>
.h_left{
  width: 50px;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  span{
    display: inline-block;
    width: 50px;
    height: 60px;
    cursor: pointer;
    &:hover{
      background-color: #32383a;
    }
  }
}
</style>
