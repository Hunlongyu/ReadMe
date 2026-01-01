<template>
  <div class="flex flex-col h-full bg-background overflow-hidden relative">
    <div v-if="!repo" class="flex-1 flex items-center justify-center text-muted-foreground">
      Select a repository to view details
    </div>
    <template v-else>
      <!-- Header Toolbar -->
      <div class="flex items-center justify-start p-3 border-b border-border bg-card h-[61px]" data-tauri-drag-region>
        <div class="flex items-center gap-2">
          <Button variant="ghost" size="sm" class="px-2" @click="$emit('action', 'translate')" title="Translate" data-tauri-drag-region="false">
            <Languages class="w-4 h-4 mr-1" />
          </Button>
          <Button variant="ghost" size="sm" class="px-2" @click="$emit('action', 'toggle-star')" title="Star/Unstar" data-tauri-drag-region="false">
             <Star class="w-4 h-4 mr-1 fill-current text-yellow-500" />
          </Button>
          
          <!-- Dropdown Menu for Open -->
          <DropdownMenuRoot>
            <DropdownMenuTrigger as-child>
              <Button variant="ghost" size="sm" title="Open in..." class="px-2" data-tauri-drag-region="false">
                <Code class="w-4 h-4 mr-1" />
                <ChevronDown class="w-3 h-3 opacity-50" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuPortal>
              <DropdownMenuContent
                class="z-50 min-w-[12rem] rounded-md border bg-card p-1 text-foreground shadow-md animate-in fade-in-80 zoom-in-95"
                :style="{ backgroundColor: `hsl(var(--card))`, color: `hsl(var(--foreground))`, borderColor: `hsl(var(--border))` }"
                :side-offset="5"
                align="end"
              >
                <DropdownMenuArrow :width="8" :style="{ fill: `hsl(var(--card))` }" />
                <DropdownMenuItem 
                  @click="handleOpen('github-dev')"
                  class="relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 hover:bg-muted cursor-pointer"
                >
                  <span class="text-blue-500 mr-1">[Online]</span> GitHub Dev
                </DropdownMenuItem>
                <DropdownMenuItem 
                  @click="handleOpen('github1s')"
                  class="relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 hover:bg-muted cursor-pointer"
                >
                  <span class="text-blue-500 mr-1">[Online]</span> GitHub 1s
                </DropdownMenuItem>
                
                <DropdownMenuSeparator class="-mx-1 my-1 h-px bg-muted" />
                
                <DropdownMenuItem 
                  @click="handleOpen('vscode')"
                  class="relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 hover:bg-muted cursor-pointer"
                >
                   <span class="text-green-600 mr-1">[Local]</span> VS Code
                </DropdownMenuItem>
                 <DropdownMenuItem 
                  @click="handleOpen('visual-studio')"
                  class="relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 hover:bg-muted cursor-pointer"
                >
                  <span class="text-green-600 mr-1">[Local]</span> Visual Studio
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenuPortal>
          </DropdownMenuRoot>

          <!-- Dropdown Menu for Clone -->
          <DropdownMenuRoot>
            <DropdownMenuTrigger as-child>
              <Button variant="ghost" size="sm" title="Clone" class="px-2" data-tauri-drag-region="false">
                <Terminal class="w-4 h-4 mr-1" />
                <ChevronDown class="w-3 h-3 opacity-50" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuPortal>
              <DropdownMenuContent
                class="z-50 min-w-[20rem] rounded-md border bg-card p-1 text-foreground shadow-md animate-in fade-in-80 zoom-in-95"
                :style="{ backgroundColor: `hsl(var(--card))`, color: `hsl(var(--foreground))`, borderColor: `hsl(var(--border))` }"
                :side-offset="5"
                align="end"
              >
                <DropdownMenuArrow :width="8" :style="{ fill: `hsl(var(--card))` }" />
                
                <DropdownMenuItem 
                  class="relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground hover:bg-muted cursor-pointer group"
                  @click="copyToClipboard(`https://github.com/${repo.owner}/${repo.name}.git`)"
                >
                  <span class="text-muted-foreground mr-2 w-14">[Github]</span>
                  <span class="truncate flex-1 font-mono text-xs">https://github.com/{{ repo.owner }}/{{ repo.name }}.git</span>
                </DropdownMenuItem>
                
                <DropdownMenuItem 
                  class="relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground hover:bg-muted cursor-pointer group"
                  @click="copyToClipboard(`git@github.com:${repo.owner}/${repo.name}.git`)"
                >
                  <span class="text-muted-foreground mr-2 w-14">[Github]</span>
                  <span class="truncate flex-1 font-mono text-xs">git@github.com:{{ repo.owner }}/{{ repo.name }}.git</span>
                </DropdownMenuItem>

                <DropdownMenuSeparator class="-mx-1 my-1 h-px bg-muted" />

                <DropdownMenuItem 
                  class="relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground hover:bg-muted cursor-pointer group"
                  @click="copyToClipboard(`https://hub.fastgit.org/${repo.owner}/${repo.name}.git`)"
                >
                  <span class="text-muted-foreground mr-2 w-14">[加速]</span>
                  <span class="truncate flex-1 font-mono text-xs">https://hub.fastgit.org/{{ repo.owner }}/{{ repo.name }}.git</span>
                </DropdownMenuItem>

                <DropdownMenuItem 
                  class="relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground hover:bg-muted cursor-pointer group"
                  @click="copyToClipboard(`https://gitclone.com/github.com/${repo.owner}/${repo.name}.git`)"
                >
                  <span class="text-muted-foreground mr-2 w-14">[加速]</span>
                  <span class="truncate flex-1 font-mono text-xs">https://gitclone.com/github.com/{{ repo.owner }}/{{ repo.name }}.git</span>
                </DropdownMenuItem>

                <DropdownMenuItem 
                  class="relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground hover:bg-muted cursor-pointer group"
                  @click="copyToClipboard(`https://github.com.cnpmjs.org/${repo.owner}/${repo.name}.git`)"
                >
                  <span class="text-muted-foreground mr-2 w-14">[加速]</span>
                  <span class="truncate flex-1 font-mono text-xs">https://github.com.cnpmjs.org/{{ repo.owner }}/{{ repo.name }}.git</span>
                </DropdownMenuItem>

                <DropdownMenuSeparator class="-mx-1 my-1 h-px bg-muted" />

                <DropdownMenuItem 
                  class="relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground hover:bg-muted cursor-pointer group"
                  @click="handleOpen('github-desktop')"
                >
                  <span class="text-muted-foreground mr-2 w-14">[软件]</span>
                  <span>Github Desktop</span>
                </DropdownMenuItem>

              </DropdownMenuContent>
            </DropdownMenuPortal>
          </DropdownMenuRoot>

          <!-- Dropdown Menu for Export -->
          <DropdownMenuRoot>
            <DropdownMenuTrigger as-child>
              <Button variant="ghost" size="sm" title="Export" class="px-2" data-tauri-drag-region="false">
                <Share class="w-4 h-4 mr-1" />
                <ChevronDown class="w-3 h-3 opacity-50" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuPortal>
              <DropdownMenuContent
                class="z-50 min-w-[10rem] rounded-md border bg-card p-1 text-foreground shadow-md animate-in fade-in-80 zoom-in-95"
                :style="{ backgroundColor: `hsl(var(--card))`, color: `hsl(var(--foreground))`, borderColor: `hsl(var(--border))` }"
                :side-offset="5"
                align="end"
              >
                <DropdownMenuArrow :width="8" :style="{ fill: `hsl(var(--card))` }" />
                
                <DropdownMenuItem 
                  class="relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground hover:bg-muted cursor-pointer"
                  @click="$emit('action', 'export-html')"
                >
                  HTML
                </DropdownMenuItem>
                
                <DropdownMenuItem 
                  class="relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground hover:bg-muted cursor-pointer"
                  @click="$emit('action', 'export-jpg')"
                >
                  JPG
                </DropdownMenuItem>

                <DropdownMenuItem 
                  class="relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground hover:bg-muted cursor-pointer"
                  @click="$emit('action', 'export-png')"
                >
                  PNG
                </DropdownMenuItem>

                <DropdownMenuItem 
                  class="relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground hover:bg-muted cursor-pointer"
                  @click="$emit('action', 'export-md')"
                >
                  Markdown
                </DropdownMenuItem>

              </DropdownMenuContent>
            </DropdownMenuPortal>
          </DropdownMenuRoot>
        </div>
      </div>

      <!-- Content Area -->
      <div class="flex-1 overflow-y-auto p-8 scrollbar-thin">
        <div class="max-w-4xl mx-auto">
            <div class="mb-6">
                <!-- Identity Section (Moved from Header) -->
                <div class="flex items-center gap-3 mb-4">
                  <div class="w-8 h-8 rounded-full bg-muted flex items-center justify-center overflow-hidden shrink-0">
                    <img v-if="repo.avatarUrl" :src="repo.avatarUrl" class="w-full h-full object-cover" />
                    <span v-else class="text-sm font-bold">{{ repo.owner[0].toUpperCase() }}</span>
                  </div>
                  <h2 class="text-lg font-semibold flex items-center gap-2">
                    <a :href="`https://github.com/${repo.owner}/${repo.name}`" target="_blank" class="hover:underline text-foreground">
                      {{ repo.owner }} / {{ repo.name }}
                    </a>
                  </h2>
                </div>

                <p class="text-lg text-muted-foreground mb-4">{{ repo.description }}</p>
                <div class="flex items-center gap-4 text-sm text-muted-foreground border-b border-border pb-6">
                    <div class="flex items-center gap-1">
                        <Star class="w-4 h-4" /> {{ repo.stars }} Stars
                    </div>
                    <div class="flex items-center gap-1">
                        <GitFork class="w-4 h-4" /> {{ repo.forks || 0 }} Forks
                    </div>
                    <div class="flex items-center gap-1">
                        <Eye class="w-4 h-4" /> {{ repo.watchers || 0 }} Watching
                    </div>
                </div>
            </div>
            
            <div class="max-w-none">
                <div v-if="isLoading" class="flex flex-col items-center justify-center py-20 text-muted-foreground">
                    <Loader2 class="w-8 h-8 animate-spin mb-4" />
                    <p>Loading README...</p>
                </div>

                <div v-else-if="error" class="p-8 border border-red-200 bg-red-50 dark:bg-red-900/10 dark:border-red-900 rounded-lg text-center text-red-600 dark:text-red-400">
                    <p>{{ error }}</p>
                </div>

                <div v-else-if="readmeContent" v-html="readmeContent"></div>

                <div v-else class="p-8 border border-dashed border-border rounded-lg text-center text-muted-foreground bg-muted/20">
                    <FileText class="w-12 h-12 mx-auto mb-4 opacity-50" />
                    <h3 class="text-lg font-medium mb-2">No README</h3>
                    <p>This repository doesn't have a README.md file.</p>
                </div>
            </div>
        </div>
      </div>

      <!-- AI Chat FAB -->
      <div class="absolute bottom-6 right-6 z-10">
        <Button 
          class="rounded-full w-12 h-12 shadow-lg" 
          size="icon" 
          @click="$emit('action', 'ai-chat')"
          title="AI Assistant"
        >
          <Bot class="w-6 h-6" />
        </Button>
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, nextTick } from 'vue'; // Removed defineProps, defineEmits
import { Bot, Languages, Code, Share, Star, GitFork, Eye, FileText, Loader2, ChevronDown, Terminal } from 'lucide-vue-next';
import { Button } from '@/components/ui/button';
import { repoService, type Repo } from '@/services/repo';
import { renderWithGithubAPI } from '@/lib/githubMarkdown';
import {
  DropdownMenuRoot,
  DropdownMenuTrigger,
  DropdownMenuPortal,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuArrow,
} from 'radix-vue';
// import { open } from '@tauri-apps/plugin-shell'; // Or opener

const props = defineProps<{
  repo: Repo | null;
}>();

const emit = defineEmits<{
  (e: 'action', action: string): void;
}>();

const readmeContent = ref('');
const isLoading = ref(false);
const error = ref('');

watch(() => props.repo, async (newRepo) => {
  if (!newRepo) {
    readmeContent.value = '';
    return;
  }
  
  const token = localStorage.getItem('github_token');
  if (!token) return;

  isLoading.value = true;
  error.value = '';
  readmeContent.value = '';

  try {
    const content = await repoService.getReadmeContent(token, newRepo.owner, newRepo.name);
    // Basic image fix
    const baseUrl = `https://raw.githubusercontent.com/${newRepo.owner}/${newRepo.name}/HEAD/`;
    const fixedContent = content.replace(/!\[(.*?)\]\((?!http)(.*?)\)/g, (_match, alt, path) => {
        const cleanPath = path.replace(/^\.?\//, '');
        return `![${alt}](${baseUrl}${cleanPath})`;
    });

    const html = await renderWithGithubAPI(token, fixedContent, newRepo);
    readmeContent.value = `<article class="markdown-body">${html}</article>`;
    await nextTick();
    // @ts-expect-error highlight.js from CDN
    if (window.hljs?.highlightAll) window.hljs.highlightAll();
  } catch (e) {
    console.error('Failed to fetch README:', e);
    error.value = 'Failed to load README.';
  } finally {
    isLoading.value = false;
  }
}, { immediate: true });

function handleOpen(type: string) {
  if (!props.repo) return;
  
  const { owner, name } = props.repo;
  let url = '';

  switch (type) {
    case 'github-dev':
      url = `https://github.dev/${owner}/${name}`;
      break;
    case 'github1s':
      url = `https://github1s.com/${owner}/${name}`;
      break;
    case 'vscode':
      // Requires local path knowledge or using vscode protocol to clone
      // For now, let's just log or try to open a protocol link
      // vscode://vscode.git/clone?url=https://github.com/owner/repo.git
      url = `vscode://vscode.git/clone?url=https://github.com/${owner}/${name}.git`;
      break;
    case 'visual-studio':
       // Visual Studio protocol is less standard for cloning, usually involves opening a solution file.
       // We can emit an action for the backend to handle if needed.
       emit('action', 'open-visual-studio');
       return;
  }

  if (url) {
    window.open(url, '_blank');
  }
}

async function copyToClipboard(text: string) {
  try {
    await navigator.clipboard.writeText(text);
    // TODO: Add toast notification
    console.log('Copied to clipboard:', text);
  } catch (err) {
    console.error('Failed to copy:', err);
  }
}
</script>
