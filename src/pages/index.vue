<script setup lang="ts">
import fireStore from '@store/fire';

fireStore.dispatch('getAllLinkedin');
const users = computed(() => fireStore.getters.getLinkedinUsers);
</script>

<template>
<div class="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
  <div class="max-w-md w-full space-y-8">
    <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900">
      HOME
    </h2>
    <UserCardComponent v-for="u in users" :user="u" :key="u.timestamp" />
  </div>
</div>
</template>

<script lang="ts">
export default {
  name: 'home-page',
};
</script>

<route lang="yaml">
name: 'home-page'
</route>
