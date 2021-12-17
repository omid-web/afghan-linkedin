<script setup lang="ts">
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup
import authStore from '@/store/auth';

authStore.dispatch('init');
</script>

<script lang="ts">
export default {
  name: 'app-base',
};
</script>

<template>
<router-view />
</template>
