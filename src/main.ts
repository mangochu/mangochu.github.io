import { createApp } from 'vue'
import App from './App.vue'
import '@fontsource-variable/hanken-grotesk'
import './assets/styles/main.css'
import { vReveal } from './directives/reveal'
import { vScramble } from './directives/scramble'

createApp(App).directive('reveal', vReveal).directive('scramble', vScramble).mount('#app')
