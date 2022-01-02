<script setup lang="ts">
import authStore from '@store/auth';

const jobTitle = '';
const industry = '';

const updateProfile = () => {};

// @ts-ignore
const { photoURL, displayName, email } = authStore.state.user;
</script>

<template>
<div class="min-h-full flex items-center justify-center py-6 px-4 sm:px-6 lg:px-8">
  <div class="max-w-md w-full space-y-8">
    <div>
      <h2 class="text-center text-2xl font-extrabold">
        Edit your contact card
      </h2>
    </div>

    <form class="mt-8 space-y-6" @submit.prevent="updateProfile">
      <div class="rounded-md shadow-sm space-y-4">
        <div>
          <label for="full-name">Full name</label>
          <input id="full-name" v-model="displayName" type="displayName" autocomplete="displayName" required 
            class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 
            rounded-t-md focus:outline-none focus:ring-green-500 focus:border-green-500 focus:z-10 sm:text-sm">
        </div>
        <div>
          <label for="email-address">Email address</label>
          <input id="email-address" v-model="email" type="email" autocomplete="email" required 
            class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 
            rounded-t-md focus:outline-none focus:ring-green-500 focus:border-green-500 focus:z-10 sm:text-sm">
        </div>
        <div>
          <label for="jobTitle">Job Title</label>
          <input id="jobTitle" v-model="jobTitle" type="text" required 
            class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 
            rounded-t-md focus:outline-none focus:ring-green-500 focus:border-green-500 focus:z-10 sm:text-sm">
        </div>
        <div>
          <label for="industry">Industry</label>
          <select id="industry" v-model="industry" name="industry"
            class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 
            rounded-t-md focus:outline-none focus:ring-green-500 focus:border-green-500 focus:z-10 sm:text-sm"
          >
            <IndustryOptionsComponent />
          </select>
        </div>
      </div>

      <div>
        <button type="submit" 
          class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium 
          rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500">
          Update Profile
        </button>
      </div>
    </form>
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
