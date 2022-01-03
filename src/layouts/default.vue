<script setup lang="ts">
import useGuard from '@composables/auth/guards';

useGuard(true, 'sign-in');
</script>

<template>
<router-view />
</template>

<script lang="ts">
export default {
  name: 'authenticated-layout',
};
</script>
