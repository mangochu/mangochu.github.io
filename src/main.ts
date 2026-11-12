import { createApp } from 'vue'
import App from './App.vue'
import './assets/styles/main.css'
import { vReveal } from './directives/reveal'

createApp(App).directive('reveal', vReveal).mount('#app')
