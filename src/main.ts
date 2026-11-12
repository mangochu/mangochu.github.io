import { createApp } from 'vue'
import App from './App.vue'
import '@fontsource-variable/hanken-grotesk'
import './assets/styles/main.css'
import { vReveal } from './directives/reveal'

createApp(App).directive('reveal', vReveal).mount('#app')
