<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { 
  User, 
  Star, 
  Search, 
  TrendingUp, 
  FileCode, 
  Bell, 
  Settings, 
  Minus,
  Square,
  X,
  LogOut
} from 'lucide-vue-next'
import { cn } from '@/lib/utils'
import { authService } from '@/services/auth'
import { useWindow } from '@/composables/useWindow'
import { Button } from '@/components/ui/button'
import StarView from '@/views/StarView.vue'

const activeTab = ref('star')
const avatarUrl = ref('https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y')
const username = ref('')

const { minimize, maximize, close: closeWin, setWindowSize, centerWindow, startResize: onResizeStart, createLauncherWindow } = useWindow()

const navItems = [
  { id: 'profile', icon: User, label: 'Profile' },
  { id: 'star', icon: Star, label: 'Stars' },
  { id: 'search', icon: Search, label: 'Search' },
  { id: 'trending', icon: TrendingUp, label: 'Trending' },
  { id: 'gist', icon: FileCode, label: 'Gist' },
  { id: 'notification', icon: Bell, label: 'Notifications' },
]

const bottomItems = [
  { id: 'settings', icon: Settings, label: 'Settings' },
]

const fetchUserProfile = async () => {
  const token = localStorage.getItem('github_token')
  console.log('Fetching profile. Token exists?', !!token);
  
  if (token) {
    try {
      const user = await authService.getCurrentUser(token);
      console.log('User data received:', user.login);
      username.value = user.login;
      avatarUrl.value = user.avatar_url;
    } catch (e) {
      console.error('Failed to fetch user profile:', e)
    }
  }
}

const handleLogout = async () => {
    // 1. Remove token
    localStorage.removeItem('github_token');
    
    // 2. Open Launcher
    try {
        await createLauncherWindow();
        
        // 3. Close current window
        setTimeout(async () => {
            await closeWin();
        }, 500);
    } catch (e) {
        console.error('Failed to switch to launcher:', e);
    }
}

onMounted(async () => {
  await setWindowSize(1200, 800)
  await centerWindow()
  await fetchUserProfile()
})
</script>

<template>
  <div 
    class="h-screen w-full flex bg-background text-foreground overflow-hidden"
  >
    <!-- 顶部标题栏：固定右上角，仅三按钮宽度，悬浮显示 -->
    <div 
      data-tauri-drag-region 
      class="absolute top-0 right-0 h-9 w-[128px] z-50 flex items-center justify-end px-2 transition-colors duration-200 hover:bg-black/10 group rounded-bl-md pointer-events-auto"
    >
      <!-- 控制按钮组：仅当悬浮在标题栏区域时显示 -->
      <div 
        class="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-auto"
      >
        <button 
          @click="minimize" 
          class="w-8 h-7 rounded-sm hover:bg-accent text-foreground/70 hover:text-foreground flex items-center justify-center transition-all duration-150"
          title="最小化"
        >
          <Minus :size="16" />
        </button>
        <button 
          @click="maximize" 
          class="w-8 h-7 rounded-sm hover:bg-accent text-foreground/70 hover:text-foreground flex items-center justify-center transition-all duration-150"
          title="最大化"
        >
          <Square :size="14" />
        </button>
        <button 
          @click="closeWin" 
          class="w-8 h-7 rounded-sm hover:bg-red-500 hover:text-white text-foreground/70 flex items-center justify-center transition-all duration-150"
          title="关闭"
        >
          <X :size="16" />
        </button>
      </div>
    </div>

    <!-- Global Navigation (Sidebar) -->
    <aside data-tauri-drag-region class="w-16 h-full border-r border-border flex flex-col items-center py-4 bg-muted/30 pt-10">
      <!-- Top: Profile (Replaces Logo) -->
      <nav class="flex-1 flex flex-col gap-4 w-full px-2">
        <!-- Profile Item (First) -->
        <button
          @click="activeTab = 'profile'"
          :class="cn(
            'w-full aspect-square flex items-center justify-center rounded-full overflow-hidden transition-all duration-200 group relative ring-2 ring-transparent hover:ring-primary/20',
            activeTab === 'profile' ? 'ring-primary' : ''
          )"
          :title="username || 'Profile'"
        >
          <img :src="avatarUrl" alt="User" class="w-full h-full object-cover" />
        </button>

        <button
          v-for="item in navItems.filter(i => i.id !== 'profile')"
          :key="item.id"
          @click="activeTab = item.id"
          :class="cn(
            'w-full aspect-square flex items-center justify-center rounded-md transition-all duration-200 group relative',
            activeTab === item.id 
              ? 'bg-primary text-primary-foreground shadow-sm' 
              : 'text-muted-foreground hover:bg-accent hover:text-foreground'
          )"
          :title="item.label"
        >
          <component :is="item.icon" :size="20" />
          <!-- Tooltip indicator for active state -->
          <div v-if="activeTab === item.id" class="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 -ml-3 bg-primary rounded-r-full" />
        </button>
      </nav>

      <!-- Bottom: Settings & User -->
      <div class="mt-auto flex flex-col gap-4 w-full px-2">
         <button
          v-for="item in bottomItems"
          :key="item.id"
          @click="activeTab = item.id"
          :class="cn(
            'w-full aspect-square flex items-center justify-center rounded-md transition-all duration-200',
            activeTab === item.id 
              ? 'bg-primary text-primary-foreground shadow-sm' 
              : 'text-muted-foreground hover:bg-accent hover:text-foreground'
          )"
          :title="item.label"
        >
          <component :is="item.icon" :size="20" />
        </button>
      </div>
    </aside>

    <!-- Main Content Area -->
    <main class="flex-1 h-full overflow-hidden relative">
      <div v-if="activeTab === 'settings'" class="h-full w-full flex flex-col items-center justify-center bg-background/50 backdrop-blur-sm p-8">
          <div class="max-w-md w-full space-y-8 animate-in fade-in zoom-in duration-300">
              <div class="text-center">
                  <h2 class="text-2xl font-bold tracking-tight">Settings</h2>
                  <p class="text-muted-foreground mt-2">Manage your account and preferences</p>
              </div>
              
              <div class="bg-card border rounded-lg p-6 space-y-6 shadow-sm">
                  <div class="flex items-center justify-between">
                      <div class="space-y-0.5">
                          <h3 class="text-base font-medium">Account</h3>
                          <p class="text-sm text-muted-foreground">Signed in as {{ username }}</p>
                      </div>
                      <div class="h-10 w-10 rounded-full overflow-hidden bg-muted">
                           <img :src="avatarUrl" alt="User" class="w-full h-full object-cover" />
                      </div>
                  </div>
                  
                  <div class="pt-4 border-t">
                      <Button 
                          variant="destructive" 
                          class="w-full justify-start" 
                          @click="handleLogout"
                      >
                          <LogOut class="mr-2 h-4 w-4" />
                          Switch Account (Log out)
                      </Button>
                  </div>
              </div>
          </div>
      </div>

      <div v-else-if="activeTab === 'star'" class="h-full w-full animate-in fade-in zoom-in duration-300">
        <StarView />
      </div>

      <div v-else class="h-full w-full flex items-center justify-center text-muted-foreground bg-background/50 backdrop-blur-sm">
        <div class="text-center animate-in fade-in zoom-in duration-300">
          <component 
            :is="navItems.find(i => i.id === activeTab)?.icon || Settings" 
            :size="48" 
            class="mx-auto mb-4 opacity-20" 
          />
          <h2 class="text-xl font-medium">Module: {{ activeTab }}</h2>
          <p class="text-sm opacity-60">Content coming soon...</p>
        </div>
      </div>
      <div
        class="absolute bottom-2 right-2 w-4 h-4 rounded-sm bg-transparent cursor-se-resize"
        @pointerdown.prevent="onResizeStart"
        data-tauri-drag-region="false"
      />
    </main>
  </div>
</template>
