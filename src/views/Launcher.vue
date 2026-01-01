<script setup lang="ts">
import { Button } from '@/components/ui/button'
import { ref, onMounted } from 'vue'
import { authService } from '@/services/auth'
import { useWindow } from '@/composables/useWindow'

const loading = ref(false)
const countdown = ref(0)
const { createMainWindow, setWindowSize, centerWindow, close } = useWindow()

const openMainWindow = async () => {
  try {
    const mainWindow = await createMainWindow();

    // 监听新窗口创建成功后，关闭当前的 Launcher 窗口
    mainWindow.once('tauri://created', async () => {
      console.log('Main window created');
      setTimeout(async () => {
          await close();
      }, 500);
    });

    mainWindow.once('tauri://error', (e) => {
      console.error('Failed to create main window', e);
      loading.value = false;
    });
  } catch (e) {
      console.error('Failed to open main window', e);
      loading.value = false;
  }
}

const handleLogin = async () => {
  if (countdown.value > 0) return;
  
  loading.value = true
  console.log("Login clicked")
  
  try {
      const token = await authService.login();
      console.log('Token received:', token);
      localStorage.setItem('github_token', token);
      
      await openMainWindow();

  } catch (e) {
      console.error('Login failed', e);
      loading.value = false;
      
      // Start cooldown
      countdown.value = 5;
      const timer = setInterval(() => {
          countdown.value--;
          if (countdown.value <= 0) {
              clearInterval(timer);
          }
      }, 1000);
  }
}

onMounted(async () => {
    // 强制设置 Launcher 尺寸为 400x500
    await setWindowSize(400, 500)
    // 始终居中
    await centerWindow()

    // 检查是否有 token
    const token = localStorage.getItem('github_token');
    if (token) {
        console.log('Token found, auto-login...');
        loading.value = true;
        setTimeout(async () => {
           await openMainWindow();
        }, 100);
    }
})
</script>

<template>
  <div data-tauri-drag-region class="w-screen h-screen flex flex-col items-center justify-center overflow-hidden bg-background/80 backdrop-blur-md border border-border/40 rounded-xl shadow-2xl">
    
    <div class="flex flex-col items-center space-y-8 animate-in fade-in zoom-in duration-500 pointer-events-none select-none">
        <!-- Logo Placeholder -->
        <div class="w-28 h-28 bg-primary/10 rounded-3xl flex items-center justify-center ring-1 ring-border/50 shadow-lg backdrop-blur-sm rotate-3 transition-transform hover:rotate-0 duration-500">
            <svg xmlns="http://www.w3.org/2000/svg" width="56" height="56" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="text-primary drop-shadow-md"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg>
        </div>
        
        <div class="text-center space-y-3">
            <h1 class="text-3xl font-bold tracking-tight text-foreground drop-shadow-sm">ReadMe</h1>
            <p class="text-base font-medium text-muted-foreground/90">Your personal GitHub Reader</p>
        </div>
    </div>

    <div class="mt-12 w-full flex justify-center">
      <Button 
        data-tauri-drag-region="false" 
        @click="handleLogin" 
        :disabled="loading || countdown > 0" 
        size="lg" 
        class="w-full max-w-[260px] h-12 text-base font-medium shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300 rounded-full"
      >
          <svg v-if="!loading && countdown === 0" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="mr-2"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0 3c1.2 1.2 1.2 3.3 1.2 5.5.38 1.84.53 3.73.45 5.61-.1.29-.26.56-.47.78-1.2 1.2-2.7 1.8-4.3 1.7-.3 0-.6.04-.9.1.32 1.05.32 2.2 0 3.25V22"/></svg>
          <span v-if="loading">Connecting...</span>
          <span v-else-if="countdown > 0">Retry in {{ countdown }}s</span>
          <span v-else>Login with GitHub</span>
      </Button>
    </div>
  </div>
</template>
