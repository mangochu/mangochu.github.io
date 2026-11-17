import { createApp } from 'vue'
import App from './App.vue'
import '@fontsource-variable/hanken-grotesk'
import './assets/styles/main.css'
import './assets/styles/cyberpunk.css'
import { vReveal } from './directives/reveal'
import { vScramble } from './directives/scramble'
import { isEmbedded } from './utils/isEmbedded'

// 被嵌入成作品卡片的即時預覽時，加上 class 讓 CSS 隱藏捲軸等只在預覽裡不需要的東西
if (isEmbedded) document.documentElement.classList.add('is-embedded')

createApp(App).directive('reveal', vReveal).directive('scramble', vScramble).mount('#app')
