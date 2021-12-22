<template>
<NavComponent />
<h1>todos</h1>
<router-view />
</template>

<script lang="ts" setup>
import useGuard from '@composables/auth/guards';

useGuard(true, 'sign-in');
</script>

<script lang="ts">
export default {
  name: 'todos-layout',
};
</script>
