// Base Import
import { createApp } from 'vue'
import { Quasar, LoadingBar } from 'quasar'

// Import icon libraries
import '@quasar/extras/material-icons/material-icons.css'

// Import Quasar css
import 'quasar/src/css/index.sass'

import './assets/index.css'

// Router Imports
import { createRouter, createWebHistory } from 'vue-router';
import { setupLayouts } from 'virtual:generated-layouts';
import generatedRoutes from 'virtual:generated-pages';

// State Management
import { createPinia } from 'pinia';
import piniaPersist from 'pinia-plugin-persist';

// Base Component
import App from './App.vue';

// App setup
const app = createApp(App);

app.use(Quasar, {
  plugins: {
    LoadingBar
  }, // import Quasar plugins and add here
  config: {
    loadingBar: { /* look at QuasarConfOptions from the API card */ }
  }
})

// Route & layouts setup
const routes = setupLayouts(generatedRoutes);

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// Add state management
const pinia = createPinia();
pinia.use(piniaPersist);
app.use(pinia);

// Add the router to app
app.use(router);

// Finally mount our app
app.mount('#app');
