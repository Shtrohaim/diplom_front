import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from './plugins/axios'

const app = createApp(App)
app.use(store)
app.use(router)
app.use(axios, {
    baseUrl: 'http://localhost:3000/',
})
app.mount('#app')
