<script setup lang="ts">
import useGuard from '@composables/auth/guards';

useGuard(true, 'sign-in');
</script>

<template>
<h1 class="py-14">example</h1>
<router-view />
</template>

<script lang="ts">
export default {
  name: 'example-layout',
};
</script>
