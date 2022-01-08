<script setup lang="ts">
import authStore from '@store/auth';
import fireStore from '@store/fire';

fireStore.dispatch('getMessages');

const bottom = ref(null);
const message = ref('');
const messages = computed(() => fireStore.getters.getMessages);
const logged = ref(authStore.getters.logged);
const user = ref(authStore.getters.getUser);

const sendMessage = () => {
  fireStore.dispatch('sendMessage', message.value);
  message.value = '';
};

watch(messages, () => {
  nextTick(() => {
    // @ts-ignore
    bottom.value?.scrollIntoView({ behavior: 'smooth' });
  });
}, { deep: true });
</script>

<template>
<div class="container-sm mt-20">
  <div class="mx-5">
    <MessageComponent
      v-for="{ text, userPhotoURL, userName, userId } in messages"
      :key="text"
      :name="userName"
      :photo-url="userPhotoURL"
      :sender="userId === user?.uid"
    >
      {{ text }}
    </MessageComponent>
  </div>
</div>

<div ref="bottom" class="mt-20" />

<div class="bottom">
  <div class="container-sm">
    <form v-if="logged" @submit.prevent=sendMessage>
      <input v-model="message" placeholder="Message" required />
      <button type="submit">
        <svg
          class="icon-send hover:bg-green-500"
          aria-hidden="true"
          focusable="false"
          role="img"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 512 512"
        >
          <path
            fill="currentColor"
            d="M476 3.2L12.5 270.6c-18.1 10.4-15.8 35.6 2.2 43.2L121 358.4l287.3-253.2c5.5-4.9 13.3 2.6 8.6 8.3L176 407v80.5c0 23.6 28.5 32.9 42.5 15.8L282 426l124.6 52.2c14.2 6 30.4-2.9 33-18.2l72-432C515 7.8 493.3-6.8 476 3.2z"
          />
        </svg>
      </button>
    </form>
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
  @apply text-green-700;
  @apply w-12;
  @apply h-12;
  @apply py-2;
  @apply mr-2;
}

::-webkit-scrollbar {
  width: 5px;
}

::-webkit-scrollbar-track {
  @apply bg-gray-600;
  @apply shadow-lg;
}

::-webkit-scrollbar-thumb {
  @apply bg-gray-300;
  @apply rounded-full;
}

::-webkit-scrollbar-thumb:hover {
  @apply bg-gray-200;
}
</style>

<script lang="ts">
export default {
  name: 'chat-page',
};
</script>

<route lang="yaml">
name: 'chat'
meta:
  layout: 'user'
</route>
