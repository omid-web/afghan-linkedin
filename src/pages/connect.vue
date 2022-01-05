<script setup lang="ts">
import fireStore from '@store/fire';
import authStore from '@store/auth';

const {
  LINKEDIN_CLIENT_ID,
  LINKEDIN_REDIRECT_URI,
} = import.meta.env;

fireStore.dispatch('getAllLinkedin');

const users = computed(() => fireStore.getters.getLinkedinUsers);
const user = computed(() => authStore.getters.getUser);
const logged = computed(() => authStore.getters.logged);

function connectLinkedin() {
  window.open(`https://www.linkedin.com/oauth/v2/authorization?response_type=code&client_id=${LINKEDIN_CLIENT_ID?.toString()}&redirect_uri=${LINKEDIN_REDIRECT_URI?.toString()}&scope=r_liteprofile%20r_emailaddress%20w_member_social`, '_self');
}
</script>

<template>
<div class="min-h-full flex items-center justify-center px-4 sm:px-6 lg:px-8">
  <div class="max-w-md w-full space-y-8">
    <div v-if="logged">
      <button @click="connectLinkedin"
        class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium
        rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500">
        <span class="absolute left-0 inset-y-0 flex items-center pl-3">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
            <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
          </svg>
        </span>
        Import your Linkedin info
      </button>
    </div>

    <UserCardComponent v-for="u in users" :user="u" :key="u.createdAt" />
  </div>
</div>
</template>

<script lang="ts">
export default {
  name: 'connect-page',
};
</script>

<route lang="yaml">
name: 'connect'
</route>
