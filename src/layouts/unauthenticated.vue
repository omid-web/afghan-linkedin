<script setup lang="ts">
import useGuard from '@composables/auth/guards';

// useGuard(false, 'home-page');
</script>

<template>
<h1>UNAUTHENTICATED</h1>
<router-view />
</template>

<script lang="ts">
export default {
  name: 'unathenticated-layout',
};
</script>
