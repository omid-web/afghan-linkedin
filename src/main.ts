// Base Import
import { createApp } from 'vue'
import './assets/index.css'

// Router Imports
import { createRouter, createWebHistory } from 'vue-router';
import { setupLayouts } from 'virtual:generated-layouts';
import generatedRoutes from 'virtual:generated-pages';

// State Management
import store from './store/fire';

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
app.use(store);

// Add the router to app
app.use(router);

// Finally mount our app
app.mount('#app');
