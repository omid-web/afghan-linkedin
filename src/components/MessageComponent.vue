<script setup lang="ts">
const props = defineProps({
  name: { type: String, default: '' },
  photoUrl: { type: String, default: '' },
  sender: { type: Boolean, default: false },
});
</script>

<template>
  <div class="message">
    <span v-if="!sender">{{ name }}</span>
    <div class="flex" :class="sender ? 'flex-row-reverse' : ''">
      <img class="mt-1 avatar" :src="photoUrl" />
      <div class="text w-3/4" :class="sender ? 'bg-green-800' : 'bg-gray-700'">
        <slot />
      </div>
    </div>
  </div>
</template>

<style scoped>
.avatar {
  @apply h-8;
  @apply w-8;
  @apply rounded-full;
}

.container-sm {
  @apply container;
  @apply max-w-xl;
}

.message {
  @apply my-2;
  @apply w-full;
}

.message span {
  @apply ml-11;
  @apply text-xs;
  @apply text-gray-500;
}

.message .text {
  @apply mx-2;
  @apply p-2;
  @apply rounded-lg;
  @apply text-white;
}

.bottom {
  @apply fixed;
  @apply bottom-0;
  @apply bg-gray-900;
  @apply shadow-lg;
  @apply w-full;
}

.bottom form {
  @apply w-full;
  @apply flex;
  @apply justify-between;
}

.bottom form input {
  @apply flex-grow;
  @apply m-2;
  @apply py-2;
  @apply px-4;
  @apply mr-1;
  @apply rounded;
  @apply border-none;
  @apply bg-gray-700;
  @apply text-white;
}

.icon-send {
  @apply text-gray-500;
  @apply w-12;
  @apply h-12;
  @apply py-2;
  @apply mr-2;
}
</style>
