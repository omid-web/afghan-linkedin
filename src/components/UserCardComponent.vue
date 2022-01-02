<script setup lang="ts">

const props = defineProps<{
  user?: any,
}>();
</script>

<template>
  <div class="md:flex bg-white rounded-lg p-6">
    <img class="h-16 w-16 md:h-24 md:w-24 rounded-full mx-auto md:mx-0 md:mr-6"
     :src="user?.profilePic">
    <div class="text-center md:text-left">
      <h2 class="text-lg">{{ user.displayName }}</h2>
      <div class="text-purple-500">engineer</div>
      <div class="text-gray-600">{{ user?.email }}</div>
    </div>
  </div>
</template>
