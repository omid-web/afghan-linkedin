<template>
<div class="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
  <div class="max-w-md w-full space-y-8">
    <div class="mt-6 text-center text-3xl font-extrabold text-gray-900">
      <h1>{{msg}}</h1>
      <p>
        <button @click="decrement">-</button>
        {{count}}
        <button @click="increment">+</button>
      </p>
    </div>
  </div>
</div>
</template>

<script lang="ts">
import store from '@store/index';

export default {
  name: 'home-page',
  data() {
    return {
      msg: store.state.msg,
    };
  },
  computed: {
    count() {
      return store.state.count;
    },
  },
  methods: {
    increment() {
      store.commit('increment');
    },
    decrement() {
      store.commit('decrement');
    },
  },
};
</script>


<route lang="yaml">
name: 'home-page'
</route>
