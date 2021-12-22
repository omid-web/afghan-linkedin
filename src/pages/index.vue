<script setup lang="ts">
import store from '@store/index';

const msg = computed(() => store.state.msg);
</script>

<template>
<div class="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
  <div class="max-w-md w-full space-y-8">
    <div class="mt-6 text-center text-3xl font-extrabold text-gray-900">
      <h1>{{msg}}</h1>
      <CountComponent />
    </div>
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
