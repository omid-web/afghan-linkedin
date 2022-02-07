<script setup lang="ts">
import { Timestamp } from 'firebase/firestore';
import profileStore from '@store/profile';

const store = profileStore();
const { profile } = storeToRefs(store);

const updateProfile = () => {
  store.updateProfile(profile.value);
};
</script>

<template>
<form class="pb-8 space-y-6" @submit.prevent=updateProfile>
  <div class="rounded-md shadow-sm space-y-3">
    <div>
      <label for="full-name">Full name</label>
      <input id="full-name" v-model="profile.displayName" type="text" required
        class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900
        rounded-t-md focus:outline-none focus:ring-green-500 focus:border-green-500 focus:z-10 sm:text-sm">
    </div>
    <div>
      <label for="email-address">Email address</label>
      <input id="email-address" v-model="profile.email" type="email" autocomplete="email" required
        class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900
        rounded-t-md focus:outline-none focus:ring-green-500 focus:border-green-500 focus:z-10 sm:text-sm">
    </div>
    <div>
      <label for="jobTitle">Job Title</label>
      <input id="jobTitle" v-model="profile.jobTitle" type="text"
        class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900
        rounded-t-md focus:outline-none focus:ring-green-500 focus:border-green-500 focus:z-10 sm:text-sm">
    </div>
    <div>
      <label for="industry">Select an industry</label>
      <select id="industry" v-model="profile.industry" name="industry"
        class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900
        rounded-t-md focus:outline-none focus:ring-green-500 focus:border-green-500 focus:z-10 sm:text-sm">
        <option value="" selected disabled hidden>Pick One</option>
        <IndustryOptionsComponent />
      </select>
    </div>
  </div>
  <!-- <div>
    <label for="whoCanContact">Who should contact you?</label>
    <input id="whoCanContact" v-model="whoCanContact" type="text"
      class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900
      rounded-t-md focus:outline-none focus:ring-green-500 focus:border-green-500 focus:z-10 sm:text-sm">
  </div> -->
  <div>
    <label for="bio">Bio</label>
    <textarea
      id="bio" v-model="profile.bio" name="bio" rows="3"
      class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900
      rounded-t-md focus:outline-none focus:ring-green-500 focus:border-green-500 focus:z-10 sm:text-sm"
      type="text"
      :placeholder="'Tell us about yourself, ' + [[ profile.displayName ]]"
    />
  </div>
  <div name="socials">
    <div>Socials</div>
    <span class="flex">
      https://linkedin.com/in/
      <input id="linkedin" v-model="profile.linkedin" type="text" placeholder="linkedin-handle" class="text-gray-900 flex-1" />
    </span>
    <span class="flex">
      https://facebook.com/
      <input id="facebook" v-model="profile.facebook" type="text" placeholder="facebook-handle" class="text-gray-900 flex-1" />
    </span>
    <span class="flex">
      https://twitter.com/
      <input id="twitter" v-model="profile.twitter" type="text" placeholder="twitter-handle" class="text-gray-900 flex-1"/>
    </span>
    <span class="flex">
      https://instagram.com/
      <input id="instagram" v-model="profile.instagram" type="text" placeholder="instagram-handle" class="text-gray-900 flex-1"/>
    </span>
  </div>
  <button type="submit"
    class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium
    rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500">
    Update Profile
  </button>
</form>
</template>

<style scoped>
span {
  background-color: #FFF;
  color: #777;
  padding:3px;
  margin-bottom: 4px;
  border:1px #888 solid;
}

</style>
