<script setup lang="ts">
import useGuard from '@composables/auth/guards';

useGuard(true, 'sign-in');
</script>

<template>
<div className="bg-[#F3F2EF] dark:bg-black dark:text-white h-screen overflow-y-scroll md:space-y-6">
  <NavComponent />
  <router-view />
</div>
</template>

<script lang="ts">
export default {
  name: 'authenticated-layout',
};
</script>
