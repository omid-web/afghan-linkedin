<script setup lang="ts">
const props = defineProps<{
  profile?: any,
}>();

const loggedprofile = {};
const linkedin = `https://linkedin.com/in/${props.profile.linkedin}`;
const facebook = `https://facebook.com/${props.profile.facebook}`;
const twitter = `https://twitter.com/${props.profile.twitter}`;
const instagram = `https://instagram.com/${props.profile.instagram}`;

const emailLink = `
mailto:${props.profile.email}?
bcc=afghan.tech.bro@gmail.com&
subject=afghan-linkedin.com%3A%20Let's%20connect%20&
body=Hi ${props.profile.displayName},%0D%0D
I am interested in collabrating with you. Can we talk?%0D%0D
Regards, ${loggedprofile}`;
</script>

<template>
  <div class="bg-white rounded-lg p-6 text-gray-700">
    <div class="flex">
      <img class="h-20 w-20 rounded mr-4"
      :src="profile?.profilePic">
      <div class="text-left">
        <h2 class="text-lg text-gray-900">{{ profile.displayName }}</h2>
        <div>{{ profile.jobTitle }}</div>
        <div>{{ profile.industry }}</div>
      </div>
    </div>
    <div class="py-2">
      {{ profile.bio }}
    </div>
    <div class="flex">
      <form :action=emailLink method="post">
        <button type="submit" class="email">Email</button>
      </form>
      <a :href=linkedin target="_blank" :class='["fa fa-linkedin", !props.profile.linkedin && "opacity-40 pointer-events-none"]' />
      <a :href=facebook target="_blank" :class='["fa fa-facebook", !props.profile.facebook && "opacity-40 pointer-events-none"]' />
      <a :href=twitter target="_blank" :class='["fa fa-twitter", !props.profile.twitter && "opacity-40 pointer-events-none"]' />
      <a :href=instagram target="_blank" :class='["fa fa-instagram", !props.profile.instagram && "opacity-40 pointer-events-none"]' />
    </div>
  </div>
</template>

<style scoped>
.email {
  padding: 10px;
  font-size: 20px;
  width: 100px;
  text-align: center;
  text-decoration: none;
  margin: 5px 2px;
  background: black;
  color: white;
}

.email:hover {
  opacity: 0.7;
  transform: scale(1.1);
}

.fa {
  padding: 10px;
  font-size: 20px;
  width: 50px;
  text-align: center;
  text-decoration: none;
  margin: 5px 2px;
}

.fa:hover {
  opacity: 0.7;
  transform: scale(1.1);
}

.fa-facebook {
  background: #3B5998;
  color: white;
}

.fa-twitter {
  background: #55ACEE;
  color: white;
}

.fa-linkedin {
  background: #007bb5;
  color: white;
}

.fa-youtube {
  background: #bb0000;
  color: white;
}

.fa-instagram {
  background: #125688;
  color: white;
}

.fa-snapchat-ghost {
  background: #fffc00;
  color: white;
  text-shadow: -1px 0 black, 0 1px black, 1px 0 black, 0 -1px black;
}

</style>
