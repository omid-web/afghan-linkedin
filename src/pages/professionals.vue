<script setup lang="ts">
import authStore from '@store/auth';
import profileStore from '@/store/profile';

const industry = ref('');

const auth = authStore();
const { logged } = storeToRefs(auth);

const store = profileStore();
store.setProfiles();
const { profiles } = storeToRefs(store);
const filteredProfiles = computed(() => {
  if (!industry.value.length) return profiles.value;
  // @ts-ignore
  return profiles.value.filter((user) => user.industry === industry.value);
});

</script>

<template>
<div class="min-h-full flex items-center justify-center px-4 pb-8 sm:px-6 lg:px-8">
  <div class="max-w-md w-full space-y-8">
    <div>
      <h2 class="text-center text-2xl font-extrabold">
        Collaborate & Follow
      </h2>

      <a href='profile' v-if=logged
        class="group relative w-full flex justify-center py-2 px-4 mt-2 border border-transparent text-sm font-medium
        rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500">
        Add/edit your professional card
      </a>
    </div>

    <div>
      <label for="industry">Filter by industry(users are sorted by most recently added)</label>
      <select id="industry" v-model="industry" name="industry"
        class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900
        rounded-t-md focus:outline-none focus:ring-green-500 focus:border-green-500 focus:z-10 sm:text-sm">
        <option value="" selected>All</option>
        <IndustryOptionsComponent />
      </select>
    </div>

    <ProfileCardComponent v-for="p in filteredProfiles" :profile=p :key=p.email />
  </div>
</div>
</template>

<script lang="ts">
export default {
  name: 'professionals-page',
};
</script>

<route lang="yaml">
name: 'professionals'
</route>
