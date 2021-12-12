import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './main.css'
import VueResizeText from 'vue3-resize-text'

createApp(App)
.use(store)
.use(router)
.use(VueResizeText)
.mount('#app')