<script setup lang="ts">
import authStore from '@/store/auth';

const user = authStore.getters.geUser;
</script>

<template>
<div class="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
  <div class="max-w-md w-full space-y-8">
    <div class="mt-6 text-center text-3xl font-extrabold text-gray-900">
      <h1>todo {{ user?.displayName }}</h1>
      <CountComponent />
    </div>
  </div>
</div>
</template>

<script lang="ts">
export default {
  name: 'todo-page',
};
</script>

<route lang="yaml">
name: 'todo'
meta:
  layout: 'todos'
</route>
