<script setup lang="ts">

const props = defineProps<{
  idea?: any,
}>();
</script>

<template>
<div class="relative grid grid-cols-1 gap-4 p-4 mb-8 border rounded-lg bg-white shadow-lg">
  <div class="relative flex gap-4">
    <img :src="idea?.userPhotoURL" class="relative rounded-full -top-8 -mb-4 bg-white border h-20 w-20" alt="" loading="lazy">
    <div class="">
      <div class="text-gray-700 text-xl">{{idea?.userName}}</div>
      <div class="text-gray-600 text-md">{{idea?.email}}</div>
      <div class="text-gray-400 text-sm">{{idea?.createdAt}}</div>
    </div>
  </div>
  <p class="-mt-4 text-gray-500">
    {{idea?.text}}
  </p>
</div>
</template>
