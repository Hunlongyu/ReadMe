<template>
  <div class="chart">
    <div class="chart-wrapper" v-loading="imgLoading">
      <img :src="chartUrl" @load="imgLoadEvent" alt="">
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, defineProps, onMounted, onBeforeUnmount } from 'vue'

const chartUrl = ref()
const imgLoading = ref(true)

const props = defineProps({
  fullName: String
})

function imgLoadEvent () {
  imgLoading.value = false
}

onMounted(() => {
  chartUrl.value = `https://starchart.cc/${props.fullName}.svg`
})

onBeforeUnmount(() => {
  chartUrl.value = ''
})
</script>
<style lang="scss" scoped>
.chart{
  height: 100%;
  .chart-wrapper{
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    img{
      width: 90%;
      height: auto;
    }
  }
}
</style>
