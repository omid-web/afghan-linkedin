<script setup lang="ts">
import { Timestamp } from 'firebase/firestore';
import businessStore from '@store/business';

const store = businessStore();
const {
  displayName,
  email,
  website,
  industry,
  location,
  description,
  linkedin,
  facebook,
  twitter,
  instagram,
} = toRefs(store.getBusiness);

const updateBusiness = () => {
  store.updateBusiness(
    {
      displayName: displayName.value,
      email: email.value,
      website: website.value,
      industry: industry.value,
      location: location.value,
      description: description.value,
      linkedin: linkedin.value,
      facebook: facebook.value,
      twitter: twitter.value,
      instagram: instagram.value,
      createdAt: Timestamp.now(),
    },
  );
};
</script>

<template>
<form class="pb-8 space-y-6" @submit.prevent=updateBusiness>
  <div class="rounded-md shadow-sm space-y-3">
    <div>
      <label for="business-name">Business name</label>
      <input id="business-name" v-model="displayName" type="text" required
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
      <label for="website">Website</label>
      <span>
        https://
        <input id="instagram" v-model="website" type="text" placeholder="example.com"
        class="flex-1 border border-gray-300 placeholder-gray-500 text-gray-900 focus:ring-green-500 focus:border-green-500"/>
      </span>
    </div>
    <div>
      <label for="location">Location</label>
      <input id="location" v-model="location" type="text"
        class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900
        rounded-t-md focus:outline-none focus:ring-green-500 focus:border-green-500 focus:z-10 sm:text-sm">
    </div>
    <div>
      <label for="industry">Select an industry</label>
      <select id="industry" v-model="industry" name="industry"
        class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900
        rounded-t-md focus:outline-none focus:ring-green-500 focus:border-green-500 focus:z-10 sm:text-sm">
        <option value="" selected disabled hidden>Pick One</option>
        <IndustryOptionsComponent />
      </select>
    </div>
  </div>
  <div>
    <label for="description">Description</label>
    <textarea
      id="description" v-model="description" name="description" rows="3"
      class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900
      rounded-t-md focus:outline-none focus:ring-green-500 focus:border-green-500 focus:z-10 sm:text-sm"
      type="text"
      :placeholder="'Tell us about yourself, ' + [[ displayName ]]"
    />
  </div>
  <div name="socials">
    <div>Socials</div>
    <span>
      https://linkedin.com/in/
      <input id="linkedin" v-model="linkedin" type="text" placeholder="linkedin-handle"
        class="flex-1 border border-gray-300 placeholder-gray-500 text-gray-900 focus:ring-green-500 focus:border-green-500"/>
    </span>
    <div>
      <span>
      https://facebook.com/
      <input id="facebook" v-model="facebook" type="text" placeholder="facebook-handle"
        class="flex-1 border border-gray-300 placeholder-gray-500 text-gray-900 focus:ring-green-500 focus:border-green-500"/>
    </span>
    </div>
    <span>
      https://twitter.com/
      <input id="twitter" v-model="twitter" type="text" placeholder="twitter-handle"
        class="flex-1 border border-gray-300 placeholder-gray-500 text-gray-900 focus:ring-green-500 focus:border-green-500"/>
    </span>
    <span>
      https://instagram.com/
      <input id="instagram" v-model="instagram" type="text" placeholder="instagram-handle"
        class="flex-1 border border-gray-300 placeholder-gray-500 text-gray-900 focus:ring-green-500 focus:border-green-500"/>
    </span>
  </div>
  <button type="submit"
    class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium
    rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500">
    Update Business listing
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
  display: flex;
}

</style>
