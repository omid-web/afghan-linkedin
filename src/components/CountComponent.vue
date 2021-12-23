<script setup lang="ts">
import fireStore from '@store/fire';

const count = computed(() => fireStore.state.count);

function increment() {
  fireStore.commit('increment');
}

function decrement() {
  fireStore.commit('decrement');
}

function setCount() {
  fireStore.dispatch('setCount', count.value);
}
</script>

<template>
<p>
  <button @click="decrement">-</button>
  {{count}}
  <button @click="increment">+</button>
</p>
<button @click="setCount">Set count</button>
</template>
