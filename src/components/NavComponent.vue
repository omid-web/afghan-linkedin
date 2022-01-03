<script setup lang="ts">
import authStore from '@store/auth';
import { Disclosure, DisclosureButton, DisclosurePanel, Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/vue';
import { MenuIcon, XIcon } from '@heroicons/vue/outline';

const navigation = [
  { name: 'Home', href: '/', current: false },
  { name: 'Chat', href: 'chat', current: false },
  { name: 'Connect', href: 'connect', current: false },
  { name: 'Ideas', href: 'ideas', current: false },
];
const item = { name: 'Home', href: '/', current: false };

const logged = computed(() => authStore.getters.logged);
// @ts-ignore
const photoURL = computed(() => authStore.state.user.photoURL);

function logout() {
  authStore.dispatch('logout');
}
</script>

<!-- This example requires Tailwind CSS v2.0+ -->
<template>
  <Disclosure as="nav" class="bg-gray-800" v-slot="{ open }">
    <div class="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
      <div class="relative flex items-center justify-between h-16">
        <div v-if="logged" class="absolute inset-y-0 left-0 flex items-center sm:hidden">
          <!-- Mobile menu button-->
          <DisclosureButton class="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
            <span class="sr-only">Open main menu</span>
            <MenuIcon v-if="!open" class="block h-6 w-6" aria-hidden="true" />
            <XIcon v-else class="block h-6 w-6" aria-hidden="true" />
          </DisclosureButton>
        </div>
        <div class="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
          <div class="flex-shrink-0 flex items-center">
            <img class="block h-8 w-auto" src="http://purecatamphetamine.github.io/country-flag-icons/3x2/AF.svg" alt="Workflow" />
          </div>
          <div v-if="logged" class="hidden sm:block sm:ml-6">
            <div class="flex space-x-4">
              <a v-for="item in navigation" :key="item.name" :href="item.href" 
                :class="[item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white', 'px-3 py-2 rounded-md text-sm font-medium']" 
                :aria-current="item.current ? 'page' : undefined">{{ item.name }}</a>
            </div>
          </div>
          <div v-if="!logged" class="hidden sm:block sm:ml-6">
            <div class="flex space-x-4">
              <a :key="item.name" :href="item.href" 
                :class="[item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white', 'px-3 py-2 rounded-md text-sm font-medium']" 
                :aria-current="item.current ? 'page' : undefined">{{ item.name }}</a>
            </div>
          </div>
        </div>

        <div v-if="!logged" class="sm:hidden absolute inset-y-0 left-0 flex items-center pr-2">
          <router-link to="/" class="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Home</router-link>
        </div>

        <div v-if="!logged" class="absolute inset-y-0 right-0 flex items-center pr-2">
          <router-link to="sign-in" class="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Sign In</router-link>
        </div>

        <div v-if="logged" class="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
          <!-- Profile dropdown -->
          <Menu as="div" class="ml-3 relative">
            <div>
              <MenuButton class="bg-gray-800 flex text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
                <span class="sr-only">Open user menu</span>
                <img class="h-8 w-8 rounded-full" :src="photoURL" />
              </MenuButton>
            </div>
            <transition enter-active-class="transition ease-out duration-100" enter-from-class="transform opacity-0 scale-95" enter-to-class="transform opacity-100 scale-100" 
              leave-active-class="transition ease-in duration-75" leave-from-class="transform opacity-100 scale-100" leave-to-class="transform opacity-0 scale-95">
              <MenuItems class="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                <MenuItem v-slot="{ active }">
                  <a href="profile" :class="[active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700']">Your Profile</a>
                </MenuItem>
                <MenuItem v-slot="{ active }">
                  <a @click="logout" href="/" :class="[active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700']">Sign out</a>
                </MenuItem>
              </MenuItems>
            </transition>
          </Menu>
        </div>
      </div>
    </div>

    <DisclosurePanel class="sm:hidden">
      <div class="px-2 pt-2 pb-3 space-y-1">
        <DisclosureButton v-for="item in navigation" :key="item.name" as="a" :href="item.href" 
          :class="[item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white', 'block px-3 py-2 rounded-md text-base font-medium']" 
          :aria-current="item.current ? 'page' : undefined">{{ item.name }}</DisclosureButton>
      </div>
    </DisclosurePanel>
  </Disclosure>
</template>

<style scoped>
nav {
  @apply fixed;
  @apply w-full;
  @apply shadow-lg;
  @apply top-0;

  z-index: 20;
}
</style>
