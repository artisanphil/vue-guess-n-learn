import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './main.css'
import VueResizeText from 'vue3-resize-text'
import { createI18n } from 'vue-i18n'
import en from './locales/en.json'
import de from './locales/de.json'

export const i18n = createI18n({
    locale: navigator.language.substring(0, 2),
    fallbackLocale: 'en', 
    messages: {
        'de': de,
        'en': en,
      }
  })

createApp(App)
.use(store)
.use(router)
.use(VueResizeText)
.use(i18n)
.mount('#app')