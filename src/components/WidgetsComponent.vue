<script setup lang="ts">
import { format } from 'timeago.js';
import homeStore from '@/store/home';
import linkedinAd from '/linkedin-ad.jpeg';

const store = homeStore();
store.setArticles();
const { getArticles } = storeToRefs(store);
</script>

<template>
<div class="hidden xl:inline space-y-2">
  <div class="bg-white dark:bg-[#1D2226] py-2.5 rounded-lg space-y-2 w-11/12 overflow-hidden border border-gray-300 dark:border-none">
    <div class="flex items-center justify-between font-bold px-2.5">
      <h4>LinkedIn News</h4>
      <i class="fas fa-info-circle"></i>
    </div>

    <div class="space-y-1">
      <div v-for="article in getArticles" :key="article.url"
        class="flex space-x-2 items-center cursor-pointer hover:bg-black/10 dark:hover:bg-black/20 px-2.5 py-1">
        <i class="fas fa-circle"></i>
        <div>
          <h5 class="max-w-xs font-medium text-sm truncate pr-10">
            {{ article.title }}
          </h5>
          <div class="text-xs mt-0.5 dark:text-white/75 opacity-80">
            {{ format(article.publishedAt) }}
          </div>
        </div>
      </div>
    </div>
  </div>

  <div class="bg-white dark:bg-[#1D2226] w-11/12 h-64 px-2.5 rounded-lg sticky top-20 border border-gray-300 dark:border-none">
    <div class="relative w-full h-full">
      <img :src="linkedinAd" alt="">
    </div>
  </div>
</div>
</template>
