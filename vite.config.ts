import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import { resolve } from 'path';
import vue from '@vitejs/plugin-vue'
import dts from 'vite-plugin-dts'

// https://vitejs.dev/config/
export default defineConfig({
    build: {
      lib: {
        entry: resolve(__dirname, './src/index.ts'),
        name: 'vue-ghost-ui',
        fileName: 'index',
        formats: ['es', 'umd']
      },
      rollupOptions: {
        external: ['vue'],
        output: {
          globals: {
            vue: 'Vue'
          }
        }
      }
    },
  plugins: [
    vue(),
    dts({ exclude: ['src/main.ts'] })
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})
