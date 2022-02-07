<script setup lang="ts">
import authStore from '@store/auth';
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/vue';
import { ChevronDownIcon } from '@heroicons/vue/solid';
import logoUrl from '/AF.svg';
import photoURL from '/user.png';

const auth = authStore();
const { getLogged, user } = toRefs(auth);
const logout = () => auth.logout();
let getPhotoUrl = photoURL;
watch(user, () => {
  if (user.value && user.value.photoURL) {
    getPhotoUrl = user.value.photoURL;
  }
}, {
  immediate: true,
});
</script>

<!-- This example requires Tailwind CSS v2.0+ -->
<template>
<header class="sticky top-0 z-40 bg-white dark:bg-[#1D2226] flex items-center justify-around py-1.5 px-3 focus-within:shadow-lg">
  <a href="/" class="flex items-center space-x-2 w-full max-w-xs">
    <img class="w-12 h-12" src="https://rb.gy/dpmd9s" alt="home">
  </a>
  <!-- <div className="flex items-center space-x-1 dark:md:bg-gray-700 py-2.5 px-4 rounded w-full">
    <i class="fas fa-search"></i>
    <input
      type="text"
      placeholder="Search"
      className="hidden md:inline-flex bg-transparent text-sm focus:outline-none placeholder-black/70 dark:placeholder-white/75 flex-grow"
    />
  </div> -->

  <div class="flex items-center space-x-6">
    <a href="professionals" class="cursor-pointer flex flex-col justify-center items-center text-gray-500 hover:text-gray-700">
      <i class="fas fa-users fa-lg" ></i>
      <h4 class="text-sm ">Professionals</h4>
    </a>
    <a href="directory" class="cursor-pointer flex flex-col justify-center items-center text-gray-500 hover:text-gray-700">
      <i class="fas fa-briefcase fa-lg"></i>
      <h4 class="text-sm">Businesses</h4>
    </a>

    <Menu v-if="getLogged" as="div" class="relative inline-block text-left">
      <div>
        <MenuButton>
          <span class="sr-only">Open user menu</span>
          <img class="h-8 w-8 rounded-full" :src=getPhotoUrl />
          <ChevronDownIcon class="-mr-1 ml-2 h-5 w-5" aria-hidden="true" />
        </MenuButton>
      </div>

      <transition enter-active-class="transition ease-out duration-100" enter-from-class="transform opacity-0 scale-95" enter-to-class="transform opacity-100 scale-100" leave-active-class="transition ease-in duration-75" leave-from-class="transform opacity-100 scale-100" leave-to-class="transform opacity-0 scale-95">
        <MenuItems class="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div class="py-1">
            <MenuItem v-slot="{ active }">
              <a href="profile" :class="[active ? 'bg-gray-100 text-gray-900' : 'text-gray-700', 'block px-4 py-2 text-sm']">My Profile</a>
            </MenuItem>
            <MenuItem v-slot="{ active }">
              <a href="business" :class="[active ? 'bg-gray-100 text-gray-900' : 'text-gray-700', 'block px-4 py-2 text-sm']">My Business</a>
            </MenuItem>
            <MenuItem v-slot="{ active }">
              <a @click="logout" href="/" :class="[active ? 'bg-gray-100 text-gray-900' : 'text-gray-700', 'block px-4 py-2 text-sm']">Sign Out</a>
            </MenuItem>
          </div>
        </MenuItems>
      </transition>
    </Menu>
  </div>
</header>
</template>

<style scoped>
nav {
  @apply fixed;
  @apply w-full;
  @apply shadow-lg;
  @apply top-0;

  z-index: 10;
}
</style>
