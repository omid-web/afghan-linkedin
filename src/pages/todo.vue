<script setup lang="ts">
import store from '@store/index';
import authStore from '@/store/auth';

const user = authStore.getters.geUser;
const count = ref(store.state.count);

function increment() {
  store.commit('increment');
}

function decrement() {
  store.commit('decrement');
}
</script>

<template>
<div class="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
  <div class="max-w-md w-full space-y-8">
    <div class="mt-6 text-center text-3xl font-extrabold text-gray-900">
      <h1>todo {{ user?.displayName }}</h1>
      <p>
        <button @click="decrement">-</button>
        {{count}}
        <button @click="increment">+</button>
      </p>
    </div>
  </div>
</div>
</template>

<route lang="yaml">
name: 'todo'
meta:
  layout: 'todos'
</route>
