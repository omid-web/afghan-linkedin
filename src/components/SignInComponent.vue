<script setup lang="ts">
import authStore from '@store/auth';

const auth = authStore();
const props = defineProps({
  title: String,
});
const signin = () => auth.signInWithGoogle();
</script>

<template>
<h2 class="mt-6 text-center text-xl font-extrabold text-gray-900">
  OR
</h2>

<button @click=signin
  class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium
  rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500">
  <span class="absolute left-0 inset-y-0 flex items-center pl-3">
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-10.333 16.667c-2.581 0-4.667-2.087-4.667-4.667s2.086-4.667 4.667-4.667c1.26 0 2.313.46 3.127 1.22l-1.267 1.22c-.347-.333-.954-.72-1.86-.72-1.593 0-2.893 1.32-2.893 2.947s1.3 2.947 2.893 2.947c1.847 0 2.54-1.327 2.647-2.013h-2.647v-1.6h4.406c.041.233.074.467.074.773-.001 2.666-1.787 4.56-4.48 4.56zm11.333-4h-2v2h-1.334v-2h-2v-1.333h2v-2h1.334v2h2v1.333z"/>
    </svg>
  </span>
  {{ title }}
</button>
</template>
