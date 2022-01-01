<script setup lang="ts">
import authStore from '@store/auth';

const { photoURL, displayName, email } = authStore.state.user;
</script>

<template>
<div class="md:flex bg-white rounded-lg p-6">
  <img class="h-16 w-16 md:h-24 md:w-24 rounded-full mx-auto md:mx-0 md:mr-6" 
    :src="photoURL">
  <div class="text-center md:text-left">
    <h2 class="text-lg">{{ displayName }}</h2>
    <div class="text-purple-500">Engineer</div>
    <div class="text-gray-600">{{ email }}</div>
  </div>
</div>
</template>

<script lang="ts">
export default {
  name: 'profile-page',
};
</script>

<route lang="yaml">
name: 'profile'
</route>
