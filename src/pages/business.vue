<script setup lang="ts">
import businessStore from '@store/business';

const store = businessStore();
store.getBusiness();
const business = computed(() => store.business);
</script>

<template>
<div class="min-h-full flex items-center justify-center px-4 sm:px-6 lg:px-8">
  <div class="max-w-md w-full space-y-8">
    <div>
      <h2 class="text-center text-2xl font-extrabold">
        Edit your business listing
      </h2>
      <BusinessComponent v-if=business />
      <BusinessCardComponent :business=business class="mb-6"/>
    </div>
  </div>
</div>
</template>

<script lang="ts">
export default {
  name: 'business-page',
};
</script>

<route lang="yaml">
name: 'business'
meta:
  layout: 'user'
</route>
