<script setup lang="ts">
import authStore from '@store/auth';
import fireStore from '@/store/fire';


</script>

<template>
<div class="min-h-full flex items-center justify-center px-4 sm:px-6 lg:px-8">
  <ProfileComponent />
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
