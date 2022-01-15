<script setup lang="ts">
import linkedinStore from '@store/linkedin';

const linkedin = linkedinStore();
const url = window.location.href;
// @ts-ignore
const code = url.indexOf('code') > 1 ? url.match(/(?:\?code)=(\S*)/)[1] : '';
if (code !== '') {
  linkedin.setLinkedin(code);
} else {
  linkedin.getUser();
}
const user = computed(() => linkedin.getUser);
</script>

<template>
<div class="min-h-full flex items-center justify-center px-4 sm:px-6 lg:px-8">
  <div class="max-w-md w-full space-y-8">
    <div v-if=user>
      <h2 class="text-center text-2xl font-extrabold">
        Edit your contact card
      </h2>
      <ProfileComponent />
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
meta:
  layout: 'user'
</route>
