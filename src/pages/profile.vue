<script setup lang="ts">
import authStore from '@/store/auth';
import fireStore from '@/store/fire';

const user = authStore.getters.geUser;

</script>

<template>
<UserCardComponent />
</template>

<script lang="ts">
export default {
  name: 'profile-page',
};
</script>

<route lang="yaml">
name: 'profile'
</route>
