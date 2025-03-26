import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import postcssPxToRem from 'postcss-pxtorem'

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      '@': '/src'
    }
  },
  plugins: [
    vue(),
    AutoImport({
      resolvers: [ElementPlusResolver()],
    }),
    Components({
      resolvers: [ElementPlusResolver()],
    }),
  ],
  css: {
    postcss: {
      plugins: [
        postcssPxToRem({
          rootValue: 192, // 1920/10
          propList: ['*'],
          selectorBlackList: ['body', '#app'],
          exclude: /node_modules/i,
        }),
      ],
    },
  },
})
