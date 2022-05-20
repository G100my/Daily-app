import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

import '@master/normal.css'
import '@master/styles'

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.mount('#app')
