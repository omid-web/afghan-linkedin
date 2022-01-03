<script setup lang="ts">
import fireStore from '@store/fire';
import authStore from '@store/auth';

fireStore.dispatch('getIdeas');

const idea = ref('');
const ideas = computed(() => fireStore.state.ideas);
const user = computed(() => authStore.getters.getUser);

const sendIdea = () => {
  fireStore.dispatch('sendIdea', idea.value);
  idea.value = '';
};
</script>

<template>
<div class="min-h-full flex items-center justify-center px-4 sm:px-6 lg:px-8">
  <div class="max-w-md w-full space-y-8">
    <div>
      <h2 class="text-center text-3xl font-extrabold">
        Hall of ideas
      </h2>
    </div>
    <div className="bg-white p-2 rounded-2xl shadow-md font-medium mt-6">
      <div className="flex space-x-4 p-4 items-center">
        <form className="flex flex-1" @submit.prevent="sendIdea">
          <textarea
            id="idea" name="idea" rows="4"
            class="bg-gray-100 text-black flex-grow px-5 focus:outline-none"
            type="text"
            :placeholder="'Share an idea, ' + [[ user.displayName ]]"
            v-model="idea"
          />
          <button type="submit"
            class="mt-12 px-2 rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500">
            Post idea
          </button>
        </form>
      </div>
    </div>

    <IdeaCardComponent v-for="i in ideas" :idea="i" />

  </div>
</div>
</template>

<script lang="ts">
export default {
  name: 'ideas-page',
};
</script>

<route lang="yaml">
name: 'ideas-page'
</route>
