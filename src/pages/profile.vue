<script setup lang="ts">
import fireStore from '@/store/fire';

const url = window.location.href;
// @ts-ignore
const code = url.indexOf('code') > 1 ? url.match(/(?:\?code)=(\S*)/)[1] : '';
if (code !== '') {
  fireStore.dispatch('setLinkedin', code);
} else {
  fireStore.dispatch('getLinkedin');
}

const user = computed(() => fireStore.getters.getLinkedinUser);

</script>

<template>
<div class="min-h-full flex items-center justify-center px-4 sm:px-6 lg:px-8">
  <div class="max-w-md w-full space-y-8">
    <div v-if=user>
      <h2 class="text-center text-2xl font-extrabold">
        Edit your contact card
      </h2>
      <ProfileComponent :user=user />
      <UserCardComponent :user=user class="mb-6"/>
    </div>

    <div v-else>
      <LinkedinButtonComponent />
    </div>
  </div>
</div>
</template>

<script lang="ts">
export default {
  name: 'profile-page',
};
</script>

<route lang="yaml">
name: 'profile'
</route>
