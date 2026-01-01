<template>
  <div class="flex flex-col h-full border-r border-border bg-card">
    <div class="p-3 border-b border-border h-[61px] flex items-center" data-tauri-drag-region>
      <h3 class="font-semibold text-sm text-foreground px-1">Categories</h3>
    </div>
    <div class="flex-1 overflow-y-auto p-2 space-y-1 scrollbar-thin">
      <button
        v-for="cat in categories"
        :key="cat.name"
        @click="$emit('select', cat.name)"
        :class="[
          'w-full flex items-center justify-between px-3 py-2 text-sm rounded-md transition-colors',
          selectedCategory === cat.name
            ? 'bg-secondary text-secondary-foreground font-medium'
            : 'text-muted-foreground hover:bg-muted hover:text-foreground'
        ]"
      >
        <span class="flex items-center gap-2">
          <!-- Optional: Add icons based on language later -->
          {{ cat.name }}
        </span>
        <span class="text-xs bg-muted/50 px-2 py-0.5 rounded-full">
          {{ cat.count }}
        </span>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
 

interface Category {
  name: string;
  count: number;
}

defineProps<{
  categories: Category[];
  selectedCategory: string;
}>();

defineEmits<{
  (e: 'select', category: string): void;
}>();
</script>
