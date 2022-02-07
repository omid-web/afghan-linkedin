// Base Import
import { createApp } from 'vue'

import './assets/index.css'
import 'mdb-vue-ui-kit/css/mdb.min.css';

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
