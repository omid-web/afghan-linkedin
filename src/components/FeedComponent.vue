<script setup lang="ts">
import { format } from 'timeago.js';
import homeStore from '@/store/home';

const props = defineProps<{
  user?: any,
}>();
const store = homeStore();
store.setPosts();
const { getPosts } = storeToRefs(store);
const postInput = ref('');
const sendPost = () => {
  store.setPost(postInput.value);
  postInput.value = '';
};
</script>

<template>
<div class="space-y-6 pb-24 max-w-lg">
  <div className="bg-white dark:bg-[#1D2226] rounded-lg p-3 space-y-3 border border-gray-300 dark:border-none">
    <div className="flex items-center space-x-2">
      <img
        :src=user.photoURL
        className="!h-10 !w-10 cursor-pointer"
      />
      <div className="flex space-x-4 p-2 items-center">
        <form className="flex flex-1" @submit.prevent="sendPost">
          <textarea
            id="postInput" name="postInput" rows="4" required
            class="bg-gray-100 p-2 text-black flex-grow focus:outline-none"
            type="text"
            :placeholder="'Share your thought, ' + [[ user?.displayName ]]"
            v-model="postInput"
          />
          <button type="submit"
            class="text-sm mt-20 ml-4 px-2 h-12 rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500">
            Post Update
          </button>
        </form>
      </div>
    </div>
    <div className="flex items-center flex-wrap gap-4 justify-center md:gap-x-10">
      <button className="inputButton group">
        <i class="fas fa-image fa-lg "></i>
        <h4 className="opacity-80 group-hover:opacity-100">Photo</h4>
      </button>
      <button className="inputButton group">
        <i class="fas fa-briefcase fa-lg "></i>
        <h4 className="opacity-80 group-hover:opacity-100">Job</h4>
      </button>
      <button className="inputButton group">
        <i class="far fa-newspaper fa-lg "></i>
        <h4 className="opacity-80 group-hover:opacity-100 whitespace-nowrap">
          Write Article
        </h4>
      </button>
    </div>
  </div>

  <div v-for="post in getPosts" class="bg-white dark:bg-[#1D2226] rounded-lg border border-gray-300 dark:border-none">
    <div class="flex items-center px-2.5 cursor-pointer">
      <img :src="post?.userPhotoURL" class="!h-10 !w-10 cursor-pointer" />
      <div class="mr-auto ml-2">
        <h6 class="pt-2 font-medium hover:text-blue-500 hover:underline">
          {{ post.displayName }}
        </h6>
        <p class="text-sm dark:text-white/75 opacity-80">{{ post.email }}</p>
        <div class="text-xs dark:text-white/75 opacity-80">{{ post.createdAt }}</div>
      </div>
    </div>

    <div class="text-lg pt-2 mx-4">
      {{ post.text }}
    </div>

    <div class="flex justify-evenly items-center dark:border-t border-gray-600/80 mx-2.5 pt-2 text-black/60 dark:text-white/75">
      <button class="postButton ">
        <i class="far fa-thumbs-up"></i>
        <h6>Like</h6>
      </button>
      <button class="postButton ">
        <i class="fas fa-share"></i>
        <h6>Share</h6>
      </button>
    </div>
  </div>
</div>

</template>
