<script setup lang="ts">
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup
// Use Auth
import useAuth from '@composables/auth';

useAuth();
</script>

<template>
<NavComponent />
<router-view class="mt-20"/>
</template>

<script lang="ts">
export default {
  name: 'app-base',
};
</script>
