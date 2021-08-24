<template>
  <div class="home">
    <frame />
    <div class="home-wrapper">
      <nav-menu />
      <router-view v-slot="{ Component }">
        <keep-alive>
          <component :is="Component" />
        </keep-alive>
      </router-view>
    </div>
  </div>
</template>
<script lang="ts" setup>
import Frame from '../../../components/Frame.vue'
import NavMenu from '../../../components/NavMenu.vue'
</script>
<style lang="scss" scoped>
.home{
  display: flex;
  width: 100%;
  height: 100%;
  flex-direction: column;
  .home-wrapper{
    height: 100%;
    display: flex;
    background-color: #fff;
  }
}
</style>
