<script setup lang="ts">
import useGuard from '@composables/auth/guards';
import authStore from '@store/auth';

const auth = authStore();
useGuard(false, 'home-page');
const signIn = () => auth.signInWithGoogle();
</script>

<template>
<div class="space-y-10 relative">
  <header class="flex justify-around items-center py-4">
    <a href="/" class="relative w-36 h-10">
      <img src="https://rb.gy/vtbzlp" />
    </a>
    <div class="flex items-center sm:divide-x divide-gray-300">
      <div class="hidden sm:flex space-x-8 pr-4">
        <a href="professionals" class="cursor-pointer flex flex-col justify-center items-center text-gray-500 hover:text-gray-700">
          <i class="fas fa-users fa-lg" ></i>
          <h4 class="text-sm ">Professionals</h4>
        </a>
        <a href="directory" class="cursor-pointer flex flex-col justify-center items-center text-gray-500 hover:text-gray-700">
          <i class="fas fa-briefcase fa-lg"></i>
          <h4 class="text-sm">Businesses</h4>
        </a>
      </div>
      <button @click="signIn" class="text-blue-700 font-semibold rounded-full border border-blue-700 px-5 py-1.5 transition-all hover:border-2">
        Sign In
      </button>
    </div>
  </header>

  <section class="flex flex-col xl:flex-row items-center max-w-screen-lg mx-auto">
    <div class="space-y-6 xl:space-y-10">
      <h1 class="text-3xl md:text-5xl text-amber-800/80 max-w-xl !leading-snug pl-4 xl:pl-0">
        Welcome to your Afghan professional community
      </h1>
      <div class="space-y-4">
        <a href="professionals" class="intent">
          <h2 class="text-xl">Find a person you know</h2>
          <i class="fas fa-chevron-right text-gray-700"></i>
        </a>
        <a href="directory" class="intent">
          <h2 class="text-xl">Support an Afghan owned business</h2>
          <i class="fas fa-chevron-right text-gray-700"></i>
        </a>
      </div>
    </div>
    <div class="relative xl:absolute w-80 h-80 xl:w-[650px] xl:h-[650px] top-20 right-5">
      <img src="https://rb.gy/vkzpzt" alt="POC working">
    </div>
  </section>

  <section class="xl:flex-row items-center max-w-screen-lg mx-auto">
    <h5>Problems</h5>
    <p>
      Newly arriving Afghans have either limited or no: <br>
      - English language <br>
      - Support network <br>
      - Skills required for a suitable job <br>
      - Lack of funds and/or job <br>
      - Visibility of their business <br>
    </p>

    <h5>Solutions</h5>
    <p>
      Here are some ways this site presently and in the future can assist: <br>
      - Connect individuals with a similar professional background <br>
      - Help people find and support Afghan owned businesses <br>
    </p>

    <h5>Future Features</h5>
    <p>
      If theres enough interest, i.e. a couple thousand people signup, some possible features: <br>
      - Add share button on the professional/business cards <br>
      - Add a funding feature to the professional/business cards, where people can donate, and in turn they can provide services to the community <br>
      - Add a job board, where businesses can post jobs and professionals can apply to said jobs <br>
      - Add events page, where businesses and professionals can host networking events <br>
    </p>

    <h5>Monetization</h5>
    <p>
      Possible ways site can become self-sustaining in long-term (as its currently only maintained voluntarily by 1 person): <br>
      - Add advertisment top and side banners <br>
      - Establish affliate links from the professionals and businesses that register themselves on this site, like amazon links <br>
      - Take a tiny commission from the planned donate feature, like indiegogo <br>
    </p>

    <h6 class="mb-4">Made by <a href="https://jemi.so/afghan" target="_blank">Afghan Tech Bro!</a></h6>
  </section>
</div>
</template>

<script lang="ts">
export default {
  name: 'unauthenticated-layout',
};
</script>
