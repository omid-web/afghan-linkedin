<script setup lang="ts">
import fireStore from '@/store/fire';

const url = window.location.href;
// @ts-ignore
const code = url.indexOf('code') > 1 ? url.match(/(?:\?code)\=(\S*)/)[1] : '';
if (code !== '') {
  fireStore.dispatch('setLinkedin', code);
} else {
  fireStore.dispatch('getLinkedin');
}

const {
  displayName,
  email,
  jobTitle,
  industry,
  whoCanContact,
  bio,
  profilePic,
  linkedin,
  facebook,
  twitter,
  instagram,
} = toRefs(fireStore.getters.getLinkedinUser);

const updateProfile = async () => {
  fireStore.dispatch(
    'updateLinkedin',
    {
      displayName: displayName.value,
      email: email.value,
      jobTitle: jobTitle.value,
      industry: industry.value,
      whoCanContact: whoCanContact.value,
      bio: bio.value,
      profilePic: profilePic.value,
      linkedin: linkedin.value,
      facebook: facebook.value,
      twitter: twitter.value,
      instagram: instagram.value,
    },
  );
};
</script>

<template>
  <div class="max-w-md w-full space-y-8">
    <div>
      <h2 class="text-center text-2xl font-extrabold">
        Edit your contact card
      </h2>
    </div>

    <form class="pb-8 space-y-6" @submit.prevent="updateProfile">
      <div class="rounded-md shadow-sm space-y-3">
        <div>
          <label for="full-name">Full name</label>
          <input id="full-name" v-model="displayName" type="text" required
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
          <input id="jobTitle" v-model="jobTitle" type="text"
            class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900
            rounded-t-md focus:outline-none focus:ring-green-500 focus:border-green-500 focus:z-10 sm:text-sm">
        </div>
        <div>
          <label for="industry">Select an industry</label>
          <!-- <input id="industry" v-model="industry" type="text"
            class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900
            rounded-t-md focus:outline-none focus:ring-green-500 focus:border-green-500 focus:z-10 sm:text-sm"> -->
          <select id="industry" v-model="industry" name="industry"
            class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900
            rounded-t-md focus:outline-none focus:ring-green-500 focus:border-green-500 focus:z-10 sm:text-sm">
            <option value="" selected disabled hidden>Pick One</option>
            <IndustryOptionsComponent />
          </select>
        </div>
      </div>
      <div>
        <label for="whoCanContact">Who should contact you?</label>
        <input id="whoCanContact" v-model="whoCanContact" type="text"
          class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900
          rounded-t-md focus:outline-none focus:ring-green-500 focus:border-green-500 focus:z-10 sm:text-sm">
      </div>

      <div>
        <label for="bio">Bio</label>
        <textarea
          id="bio" v-model="bio" name="bio" rows="3"
          class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900
          rounded-t-md focus:outline-none focus:ring-green-500 focus:border-green-500 focus:z-10 sm:text-sm"
          type="text"
          :placeholder="'Tell us about yourself, ' + [[ displayName ]]"
        />
      </div>

      <div name="socials">
        <div>Socials</div>
        <span class="textbox">
          https://linkedin.com/in/
          <input id="linkedin" v-model="linkedin" type="text" placeholder="linkedin-handle"
            class="text-gray-900"/>
        </span>
        <span class="textbox">
          https://facebook.com/
          <input id="facebook" v-model="facebook" type="text" placeholder="facebook-handle"
            class="text-gray-900" />
        </span>
        <span class="textbox">
          https://twitter.com/
          <input id="twitter" v-model="twitter" type="text" placeholder="twitter-handle"
            class="text-gray-900"/>
        </span>
        <span class="textbox">
          https://instagram.com/
          <input id="instagram" v-model="instagram" type="text" placeholder="instagram-handle"
            class="text-gray-900"/>
        </span>
      </div>

      <div>
        <button type="submit"
          class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium
          rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500">
          Update Profile
        </button>
      </div>
    </form>

    <UserCardComponent :user="fireStore.getters.getLinkedinUser"/>

  </div>
</template>

<style scoped>
span.textbox {
  background-color: #FFF;
  color: #888;
  padding:3px;
  border:1px #888 solid;
}

</style>
