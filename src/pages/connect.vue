<script setup lang="ts">
import fireStore from '@store/fire';

fireStore.dispatch('getAllLinkedinUsers');

const industry = ref('');
const users = computed(() => fireStore.getters.getAllLinkedinUsers);
const filteredUsers = computed(() => {
  if (!industry.value.length) return users.value;
  // @ts-ignore
  return users.value.filter((user) => user.industry === industry.value);
});

</script>

<template>
<div class="min-h-full flex items-center justify-center px-4 sm:px-6 lg:px-8">
  <div class="max-w-md w-full space-y-8">
    <LinkedinButtonComponent />

    <div>
      <label for="industry">Filter by industry(users are sorted by most recent)</label>
      <select id="industry" v-model="industry" name="industry"
        class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900
        rounded-t-md focus:outline-none focus:ring-green-500 focus:border-green-500 focus:z-10 sm:text-sm">
        <option value="" selected>All</option>
        <IndustryOptionsComponent />
      </select>
    </div>

    <UserCardComponent v-for="u in filteredUsers" :user=u :key=u.email />
  </div>
</div>
</template>

<script lang="ts">
export default {
  name: 'connect-page',
};
</script>

<route lang="yaml">
name: 'connect'
</route>
