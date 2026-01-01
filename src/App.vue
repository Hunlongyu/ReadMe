<script setup lang="ts">
import { ref } from "vue";
import Launcher from "@/views/Launcher.vue";
import MainLayout from "@/layouts/MainLayout.vue";
import { getCurrentWindow } from '@tauri-apps/api/window';

const currentView = ref<'launcher' | 'main'>('launcher');

// 根据窗口 label 决定显示哪个视图
// 'main' 是新创建的主窗口的 label
const win = getCurrentWindow();
if (win.label === 'main') {
  currentView.value = 'main';
} else {
  currentView.value = 'launcher';
}
</script>

<template>
  <Transition name="fade" mode="out-in">
    <Launcher v-if="currentView === 'launcher'" />
    <MainLayout v-else />
  </Transition>
</template>

<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
