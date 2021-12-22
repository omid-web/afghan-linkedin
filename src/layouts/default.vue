<script setup lang="ts">
import useGuard from '@composables/auth/guards';

useGuard(false, 'todo');
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
