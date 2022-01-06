<script setup lang="ts">
import authStore from '@store/auth';
import homeUrl from '/stock-photo-job-interview.jpeg';

const logged = computed(() => authStore.getters.logged);
// const homeImage = 'src/assets/stock-photo-job-interview.jpeg';
</script>

<template>
<div class="bg-indigo-900 relative overflow-hidden h-screen">
  <img :src=homeUrl class="absolute h-full w-full object-cover"/>
  <div class="inset-0 bg-black opacity-25 absolute">
  </div>
  <div class="container mx-auto px-6 md:px-12 relative z-10 flex items-center py-32 xl:py-40">
    <div class="lg:w-3/5 xl:w-2/5 flex flex-col items-start relative z-10">
      <span class="font-bold text-white">
        By:<a href="https://jemi.so/afghan" target="_blank" class="hover:bg-gray-100 py-3 px-2 element">Afghan Tech Bro</a>
      </span>
      <h1 class="font-bold text-6xl sm:text-7xl text-white leading-tight mt-4">
        A place where Afghans can connect online
      </h1>
      <router-link v-if="!logged" to="register" class="block bg-white hover:bg-gray-100 py-3 px-4 rounded-lg text-lg text-gray-800 font-bold uppercase mt-10">Sign up</router-link>
    </div>
  </div>
</div>
</template>

<style scoped>
.element {
text-shadow:
  -1px -1px 0 #000,
  1px -1px 0 #000,
  -1px 1px 0 #000,
  1px 1px 0 #000;
}
</style>

<script lang="ts">
export default {
  name: 'home-page',
};
</script>

<route lang="yaml">
name: 'home-page'
meta:
  layout: 'unauthenticated'
</route>
