import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite';
import Components from 'unplugin-vue-components/vite';
import Pages from 'vite-plugin-pages';
import Layouts from 'vite-plugin-vue-layouts';
import { ViteAliases } from 'vite-aliases';

// https://vitejs.dev/config/
export default defineConfig({
  envPrefix: [
    'FIREBASE_',
  ],
  plugins: [
    vue(),
    Pages({
      nuxtStyle: true
    }),
    Layouts(),
    ViteAliases({
      useConfig: true,
      useRelativePaths: true,
      useTypescript: true,
    }),
    Components({
      dts: true
    }),
    AutoImport({
      imports: [
        'vue',
        'vue-router',
      ],
    }),
  ]
})
