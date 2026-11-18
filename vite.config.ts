import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'
import tailwindcss from '@tailwindcss/vite'
import Icons from 'unplugin-icons/vite'

// https://vite.dev/config/
export default defineConfig({
  // Icons：以 `~icons/logos/vue` 的方式匯入 Iconify 圖示，打包時只會放進用到的圖示
  plugins: [vue(), vueDevTools(), tailwindcss(), Icons({ compiler: 'vue3' })],
  // vue-i18n 的編譯旗標：只用 Composition API，打包時拿掉舊版 Legacy API 的程式碼，也不會在 console 出現警告
  define: {
    __VUE_I18N_FULL_INSTALL__: true,
    __VUE_I18N_LEGACY_API__: false,
    __INTLIFY_PROD_DEVTOOLS__: false,
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
})
