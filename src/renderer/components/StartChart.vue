<template>
  <div class="chart">
    <div class="chart-wrapper">
      <img :src="chartUrl" alt="">
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, defineProps, onMounted, onBeforeUnmount } from 'vue'

const chartUrl = ref()

const props = defineProps({
  fullName: String
})

onMounted(() => {
  chartUrl.value = `https://starchart.cc/${props.fullName}.svg`
})

onBeforeUnmount(() => {
  chartUrl.value = ''
})
</script>
<style lang="scss" scoped>
.chart{
  background-color: #fff;
  height: 100%;
  .chart-wrapper{
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    img{
      width: 80%;
      height: auto;
    }
  }
}
</style>
