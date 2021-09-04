<template>
  <div class="me">
    <User ref="user" />
  </div>
</template>
<script lang="ts" setup>
import { onMounted, ref } from 'vue'
import User from '@/renderer/components/User.vue'
import { me } from '@/renderer/plugins/database'
import type { userApi } from '../../../components/User.vue'

const user = ref<userApi>()

// 从数据库获取用户信息
async function getUserInfo () {
  const res = await me.get()
  if (res && user.value) {
    user.value.init('db', res)
  }
}

onMounted(async () => {
  getUserInfo()
})
</script>
<style lang="scss" scoped>
.me{
  flex: 1;
  position: relative;
  overflow-y: auto;
  width: 100%;
  .me-wrapper{
    position: absolute;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
  }
  .info{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-top: 20px;
    width: 100%;
    .username{
      margin-top: 10px;
      font-size: 18px;
    }
    .description{
      margin-top: 8px;
      font-size: 14px;
    }
  }
  .more{
    width: 800px;
    margin-top: 20px;
    .stats{
      width: 100%;
      display: flex;
      justify-content: space-between;
    }
    .contributions{
      margin-top: 20px;
      img{
        width: 100%;
        height: auto
      }
    }
  }
  .logout{
    text-align: center;
    margin-top: 40px;
    margin-bottom: 40px;
  }
}
</style>
