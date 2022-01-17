<script setup lang="ts">
const props = defineProps<{
  business?: any,
}>();

const loggedUser = {};
const website = `https://${props.business?.website}`;
const linkedin = `https://linkedin.com/in/${props.business?.linkedin}`;
const facebook = `https://facebook.com/${props.business?.facebook}`;
const twitter = `https://twitter.com/${props.business?.twitter}`;
const instagram = `https://instagram.com/${props.business?.instagram}`;

const emailLink = `
mailto:${props.business?.email}?
bcc=afghan.tech.bro@gmail.com&
subject=afghan-linkedin.com%3A%20Let's%20connect%20&
body=Hi ${props.business?.displayName},%0D%0D
I am interested in collabrating with you. Can we talk?%0D%0D
Regards, ${loggedUser}`;
</script>

<template>
  <div class="bg-white rounded-lg p-6 text-gray-700">
    <div class="flex">
      <div class="text-left">
        <h2 class="text-lg text-gray-900">{{ business?.displayName }}</h2>
        <form :action=emailLink method="post">
          <button type="submit" class="email">{{ business?.email }}</button>
        </form>
        <div>Industry: {{ business?.industry }}</div>
        <div>Location: {{ business?.location }}</div>
      </div>
    </div>
    <div class="py-2">
      {{ business?.description }}
    </div>
    <div class="flex">
      <a :href=website target="_blank" class="website">Website</a>
      <a :href=linkedin target="_blank" :class='["fa fa-linkedin", !props.business?.linkedin && "opacity-40 pointer-events-none"]' />
      <a :href=facebook target="_blank" :class='["fa fa-facebook", !props.business?.facebook && "opacity-40 pointer-events-none"]' />
      <a :href=twitter target="_blank" :class='["fa fa-twitter", !props.business?.twitter && "opacity-40 pointer-events-none"]' />
      <a :href=instagram target="_blank" :class='["fa fa-instagram", !props.business?.instagram && "opacity-40 pointer-events-none"]' />
    </div>
  </div>
</template>

<style scoped>
.website {
  padding: 10px;
  font-size: 20px;
  width: 100px;
  text-align: center;
  text-decoration: none;
  margin: 5px 2px;
  background: black;
  color: white;
}

.email:hover, .website:hover {
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
