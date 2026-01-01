<template>
  <div class="flex flex-col h-full border-r border-border bg-background">
    <!-- Top Search -->
    <div class="p-3 border-b border-border h-[61px] flex items-center" data-tauri-drag-region>
      <div class="relative w-full">
        <Search class="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <input
          type="text"
          placeholder="Search repositories..."
          :value="searchQuery"
          @input="$emit('update:searchQuery', ($event.target as HTMLInputElement).value)"
          class="w-full bg-muted/40 pl-9 pr-4 py-2 text-sm rounded-md border border-input focus:border-ring focus:ring-1 focus:ring-ring outline-none"
          data-tauri-drag-region="false"
        />
      </div>
    </div>

    <!-- Repo List -->
    <div class="flex-1 overflow-y-auto scrollbar-thin">
      <div v-if="repos.length === 0" class="p-8 text-center text-muted-foreground text-sm">
        No repositories found.
      </div>
      <div v-else class="divide-y divide-border">
        <div
          v-for="repo in repos"
          :key="repo.id"
          @click="$emit('select', repo.id)"
          :class="[
            'p-4 cursor-pointer hover:bg-muted/50 transition-colors',
            selectedRepoId === repo.id ? 'bg-muted/80' : ''
          ]"
        >
          <div class="flex items-center justify-between mb-1">
            <h4 class="font-medium text-sm truncate pr-2 text-foreground">
              {{ repo.owner }}/{{ repo.name }}
            </h4>
            <span class="text-xs text-muted-foreground whitespace-nowrap">
              {{ formatDate(repo.updatedAt) }}
            </span>
          </div>
          <p class="text-xs text-muted-foreground line-clamp-2 mb-2 h-8">
            {{ repo.description }}
          </p>
          <div class="flex items-center gap-4 text-xs text-muted-foreground">
            <div class="flex items-center gap-1">
              <StarIcon class="h-3 w-3" />
              <span>{{ formatNumber(repo.stars) }}</span>
            </div>
            <div class="flex items-center gap-1">
              <div class="w-2 h-2 rounded-full" :style="{ backgroundColor: getLanguageColor(repo.language) }"></div>
              <span>{{ repo.language }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps, defineEmits } from 'vue';
import { Search, Star as StarIcon } from 'lucide-vue-next';
import type { Repo } from '@/services/repo';

defineProps<{
  repos: Repo[];
  selectedRepoId: number | null;
  searchQuery: string;
}>();

defineEmits<{
  (e: 'select', id: number): void;
  (e: 'update:searchQuery', query: string): void;
}>();

function formatDate(dateStr: string) {
  const date = new Date(dateStr);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

function formatNumber(num: number) {
  return new Intl.NumberFormat('en-US', { notation: 'compact', compactDisplay: 'short' }).format(num);
}

function getLanguageColor(lang: string) {
  const colors: Record<string, string> = {
    Rust: '#dea584',
    Vue: '#41b883',
    Python: '#3572A5',
    TypeScript: '#3178c6',
    JavaScript: '#f1e05a',
    Go: '#00ADD8',
    // Add more defaults
  };
  return colors[lang] || '#cccccc';
}
</script>
