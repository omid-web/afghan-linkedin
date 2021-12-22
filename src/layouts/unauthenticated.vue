<template>
<NavComponent />
<h1>UNAUTHENTICATED</h1>
<router-view />
</template>

<script lang="ts" setup>
import useGuard from '@composables/auth/guards';

useGuard(false, 'home-page');
</script>

<script lang="ts">
export default {
  name: 'unathenticated-layout',
};
</script>
