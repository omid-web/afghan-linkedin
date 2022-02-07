<script setup lang="ts">
const props = defineProps<{
  user?: any,
}>();
</script>

<template>
<div class="space-y-2 min-w-max max-w-lg">
  <div onclick="location.href='profile';" class="bg-white dark:bg-[#1D2226] rounded-lg overflow-hidden relative flex flex-col items-center text-center border border-gray-300 dark:border-none">
    <!-- <div class="w-1/2 h-14">
      <div class="relative w-1/2 h-full">
        <img src="https://rb.gy/i26zak" alt="">
      </div>
    </div> -->
    <img
      :src=user.photoURL
      class="!h-14 !w-14 !border-2 !absolute !top-4 !cursor-pointer"
    />
    <div class="mt-5 py-4 space-x-0.5">
      <h4 class="hover:underline decoration-purple-700 underline-offset-1 cursor-pointer">
        {{ user.displayName }}
      </h4>
      <p class="text-black/60 dark:text-white/75 text-sm">
        {{ user.email }}
      </p>
    </div>

    <div class="hidden md:inline text-left dark:text-white/75 text-sm">
      <div class="font-medium sidebarButton space-y-0.5">
        <div class="flex justify-between space-x-2">
          <h4>Who viewed your profile</h4>
          <span class="text-blue-500">9</span>
        </div>
        <div class="flex justify-between space-x-2">
          <h4>Views of your post</h4>
          <span class="text-blue-500">999</span>
        </div>
      </div>

      <div class="sidebarButton">
        <h4 class="leading-4 text-xs">
          Access exclusive tools & insights
        </h4>
        <h4 class="dark:text-white font-medium">
          <span class="w-3 h-3 bg-gradient-to-tr from-yellow-700 to-yellow-200 inline-block rounded-sm mr-1" />
          Try Premium for free
        </h4>
      </div>

      <!-- <div class="sidebarButton flex items-center space-x-1.5">
        <BookmarkOutlinedIcon class="!-ml-1" />
        <h4 class="dark:text-white font-medium">My items</h4>
      </div> -->
    </div>
  </div>

  <div class="hidden md:flex bg-white dark:bg-[#1D2226] text-black/70 dark:text-white/75 rounded-lg overflow-hidden flex-col space-y-2 pt-2.5 sticky top-20 border border-gray-300 dark:border-none">
    <p class="sidebarLink">Groups</p>
    <div class="flex items-center justify-between">
      <p class="sidebarLink">Events</p>
      <!-- <AddRoundedIcon class="!h-5" /> -->
    </div>
    <p class="sidebarLink">Followed Hashtags</p>
    <div class="sidebarButton text-center">
      <h4 class="dark:text-white font-medium text-sm">Discover More</h4>
    </div>
  </div>
</div>
</template>
