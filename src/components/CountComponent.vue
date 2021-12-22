<script setup lang="ts">
import store from '@store/index';

const count = computed(() => store.state.count);

function increment() {
  store.commit('increment');
}

function decrement() {
  store.commit('decrement');
}
</script>

<template>
<p>
  <button @click="decrement">-</button>
  {{count}}
  <button @click="increment">+</button>
</p>
</template>
