<script lang="ts">
import authStore from '@store/auth';

const { logged } = toRefs(authStore.getters);

function logout() {
  authStore.dispatch('logout');
}

watch(logged.value, (value: Boolean) => {
  logged.value = value;
});
</script>

<template>
<nav class="bg-gray-800 mx-auto px-2 lg:px-8 relative flex items-center justify-between h-16">
  <div>
    <router-link to="/" class="text-white px-3 py-2 rounded-md text-sm font-medium">Home</router-link>
    <router-link to="todo" class="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Lists</router-link>
  </div>
  <div class="absolute inset-y-0 right-0 flex items-center pr-2" v-if="!logged">
    <router-link to="sign-in" class="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Sign In</router-link>
    <router-link to="register" class="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Register</router-link>
  </div>
  <div class="absolute inset-y-0 right-0 flex items-center pr-2" v-if="logged">
    <div to="register" class="text-gray-300 px-3 py-2 rounded-md text-sm font-medium">Name: </div>
    <button @click="logout" class="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Logout</button>
  </div>
</nav>
</template>
