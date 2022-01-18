<script setup lang="ts">
import authStore from '@store/auth';
import businessStore from '@store/business';

const industry = ref('');

const auth = authStore();
const { logged } = storeToRefs(auth);

const store = businessStore();
store.setBusinesses();
const { businesses } = storeToRefs(store);
const filteredBusinesses = computed(() => {
  if (!industry.value.length) return businesses.value;
  // @ts-ignore
  return businesses.value.filter((business) => business.industry === industry.value);
});
</script>

<template>
<div class="min-h-full flex items-center justify-center px-4 pb-8 sm:px-6 lg:px-8">
  <div class="max-w-md w-full">
    <div class="sticky top-16 z-20 bg-gray-700 pb-10">
      <h2 class="text-center text-2xl font-extrabold">
        Support & Follow
      </h2>
      <label for="industry">Filter by industry(businesses are sorted alphabetically)</label>
      <select id="industry" v-model=industry name="industry"
        class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900
        rounded-t-md focus:outline-none focus:ring-green-500 focus:border-green-500 focus:z-10 sm:text-sm">
        <option value="" selected>All</option>
        <IndustryOptionsComponent />
      </select>
    </div>

    <div class="relative overflow-auto space-y-8 mb-12">
      <businessCardComponent v-for="b in filteredBusinesses" :business=b :key=b.email />
    </div>
  </div>
  <div class="fixed right-4 bottom-4">
    <a v-if="logged" href="business"
      class="flex justify-center items-center p-0 w-16 h-16 bg-green-600 rounded-full hover:bg-green-700 active:shadow-lg mouse shadow transition ease-in duration-200 focus:outline-none">
      <svg viewBox="0 0 20 20" enable-background="new 0 0 20 20" class="w-6 h-6 inline-block">
        <path fill="#FFFFFF" d="M16,10c0,0.553-0.048,1-0.601,1H11v4.399C11,15.951,10.553,16,10,16c-0.553,0-1-0.049-1-0.601V11H4.601
          C4.049,11,4,10.553,4,10c0-0.553,0.049-1,0.601-1H9V4.601C9,4.048,9.447,4,10,4c0.553,0,1,0.048,1,0.601V9h4.399
          C15.952,9,16,9.447,16,10z" />
      </svg>
    </a>
  </div>
</div>
</template>

<script lang="ts">
export default {
  name: 'directory-page',
};
</script>

<route lang="yaml">
name: 'directory'
</route>
