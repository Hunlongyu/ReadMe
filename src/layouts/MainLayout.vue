<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { getCurrentWindow } from '@tauri-apps/api/window'
import { LogicalSize } from '@tauri-apps/api/dpi'
import { 
  User, 
  Star, 
  Search, 
  TrendingUp, 
  FileCode, 
  Bell, 
  Settings, 
  LogOut,
  Minus,
  Square,
  X
} from 'lucide-vue-next'
import { cn } from '@/lib/utils'

const activeTab = ref('star')

// 控制按钮显隐
const showControls = ref(false)

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

onMounted(async () => {
  const win = getCurrentWindow()
  await win.setResizable(true)
  await win.setMinSize(new LogicalSize(1024, 700))
  await win.setSize(new LogicalSize(1200, 800))
  await win.center()
})

// 窗口控制
const minimize = () => getCurrentWindow().minimize()
const maximize = () => getCurrentWindow().toggleMaximize()
const closeWin   = () => getCurrentWindow().close()

const onResizeStart = async (e: PointerEvent) => {
  const win = getCurrentWindow()
  const start = await win.innerSize()
  const startX = e.clientX
  const startY = e.clientY
  const onMove = async (ev: PointerEvent) => {
    const dx = Math.max(ev.clientX - startX, -start.width + 400)
    const dy = Math.max(ev.clientY - startY, -start.height + 300)
    const w = Math.max(start.width + dx, 800)
    const h = Math.max(start.height + dy, 600)
    await win.setSize(new LogicalSize(w, h))
  }
  const onUp = () => {
    window.removeEventListener('pointermove', onMove)
  }
  window.addEventListener('pointermove', onMove)
  window.addEventListener('pointerup', onUp, { once: true })
}
</script>

<template>
  <div 
    class="h-screen w-full flex bg-background text-foreground overflow-hidden"
  >
    <!-- 顶部标题栏/拖拽区：悬浮时显示背景和按钮 -->
    <div 
      data-tauri-drag-region 
      class="absolute top-0 left-0 right-0 h-9 z-50 flex items-center justify-end px-3 transition-colors duration-200 hover:bg-black/10 group pointer-events-auto"
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
          title="Profile"
        >
          <img src="https://github.com/shadcn.png" alt="User" class="w-full h-full object-cover" />
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
      <div class="h-full w-full flex items-center justify-center text-muted-foreground bg-background/50 backdrop-blur-sm">
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
