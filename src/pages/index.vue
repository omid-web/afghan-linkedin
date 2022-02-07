<script setup lang="ts">
import authStore from '@store/auth';
import homeUrl from '/homepage-afghan.jpeg';

const auth = authStore();
const { getUser, getLogged } = storeToRefs(auth);
</script>

<template>
  <main class="flex justify-center gap-x-5 px-4 sm:px-12">
    <div class="flex flex-col md:flex-row gap-5">
      <SidebarComponent :user={...getUser} />
      <FeedComponent :user={...getUser} />
    </div>

    <WidgetsComponent />
  </main>
</template>


<script lang="ts">
export default {
  name: 'home-page',
};
</script>

<route lang="yaml">
name: 'home-page'
</route>
