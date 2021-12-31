<script setup lang="ts">
import useGuard from '@composables/auth/guards';

// useGuard(true, 'connect');
</script>

<template>
<h1>AUTHENTICATED</h1>
<router-view />
</template>

<script lang="ts">
export default {
  name: 'authenticated-layout',
};
</script>
