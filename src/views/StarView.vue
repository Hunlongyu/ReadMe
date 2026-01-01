<template>
  <div class="flex h-full w-full overflow-hidden bg-background text-foreground">
    <!-- Column 1: Categories -->
    <div class="w-[200px] h-full flex-shrink-0">
      <CategorySidebar
        :categories="categories"
        :selected-category="selectedCategory"
        @select="selectedCategory = $event"
      />
    </div>

    <!-- Column 2: Repo List -->
    <div class="w-80 h-full flex-shrink-0">
      <RepoList
        :repos="filteredRepos"
        :selected-repo-id="selectedRepoId"
        v-model:search-query="searchQuery"
        @select="selectedRepoId = $event"
      />
    </div>

    <!-- Column 3: Detail -->
    <div class="flex-1 h-full min-w-0">
      <RepoDetail
        :repo="selectedRepo"
        @action="handleAction"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import CategorySidebar from '@/components/star/CategorySidebar.vue';
import RepoList from '@/components/star/RepoList.vue';
import RepoDetail from '@/components/star/RepoDetail.vue';
import { repoService, type Repo } from '@/services/repo';

// --- State ---
const repos = ref<Repo[]>([]);
const selectedCategory = ref('All');
const selectedRepoId = ref<number | null>(null);
const searchQuery = ref('');
const isLoading = ref(false);

// --- Fetch Data ---
onMounted(async () => {
  const token = localStorage.getItem('github_token');
  if (!token) return;
  
  try {
    isLoading.value = true;
    repos.value = await repoService.getUserStars(token);
  } catch (e) {
    console.error('Failed to fetch stars:', e);
  } finally {
    isLoading.value = false;
  }
});

// --- Computed ---
const categories = computed(() => {
  const counts: Record<string, number> = { All: repos.value.length };
  
  repos.value.forEach(repo => {
    const lang = repo.language || 'Unknown';
    if (!counts[lang]) {
      counts[lang] = 0;
    }
    counts[lang]++;
  });

  return Object.entries(counts)
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => {
      if (a.name === 'All') return -1;
      if (b.name === 'All') return 1;
      return b.count - a.count;
    });
});

const filteredRepos = computed(() => {
  let result = repos.value;

  // Filter by Category
  if (selectedCategory.value !== 'All') {
    result = result.filter(repo => (repo.language || 'Unknown') === selectedCategory.value);
  }

  // Filter by Search
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase();
    result = result.filter(repo => 
      repo.name.toLowerCase().includes(query) || 
      repo.owner.toLowerCase().includes(query) ||
      repo.description.toLowerCase().includes(query)
    );
  }

  return result;
});

const selectedRepo = computed(() => {
  return repos.value.find(r => r.id === selectedRepoId.value) || null;
});

// --- Handlers ---
function handleAction(action: string) {
  console.log('Action triggered:', action, selectedRepo.value?.name);
  // TODO: Implement actual actions
}
</script>
