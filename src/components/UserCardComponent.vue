<script setup lang="ts">

const props = defineProps<{
  user?: any,
}>();

// const {
//   displayName,
//   email,
//   jobTitle,
//   industry,
//   whoCanContact,
//   bio,
//   profilePic,
//   linkedin,
//   facebook,
//   twitter,
//   instagram,
//   createdAt: Timestamp,
// } = toRefs(props.user);

const emailLink = 'mailto:' + props.user.email;
const linkedin = 'https://linkedin.com/in/' + props.user.linkedin;
const facebook = 'https://facebook.com/' + props.user.facebook;
const twitter = 'https://twitter.com/' + props.user.instagram;
const instagram = 'https://instagram.com/' + props.user.instagram;

</script>

<template>
  <div class="bg-white rounded-lg p-6 text-gray-700">
    <div class="flex">
      <img class="h-20 w-20 rounded mr-4"
      :src="user?.profilePic">
      <div class="text-left">
        <h2 class="text-lg text-gray-900">{{ user.displayName }}</h2>
        <div>{{ user.jobTitle }}</div>
        <div>{{ user.industry }}</div>
      </div>
    </div>
    <div class="py-2">
      {{ user.bio }}
    </div>
    <div class="flex">
      <a :href="emailLink" class="email">Email</a>
      <a :href="linkedin" :class='["fa fa-linkedin", !props.user.linkedin && "opacity-40 pointer-events-none"]' />
      <a :href="facebook" :class='["fa fa-facebook", !props.user.facebook && "opacity-40 pointer-events-none"]' />
      <a :href="twitter" :class='["fa fa-twitter", !props.user.twitter && "opacity-40 pointer-events-none"]' />
      <a :href="instagram" :class='["fa fa-instagram", !props.user.instagram && "opacity-40 pointer-events-none"]' />
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
