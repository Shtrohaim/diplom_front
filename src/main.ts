import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import VueCookies from 'vue3-cookies'

import '../src/assets/scss/style.scss'

const app = createApp(App)
app.use(router)
app.use(VueCookies)

app.use(VueCookies, {
  expireTimes: '3d',
  path: '/',
  domain: '',
  secure: true,
  sameSite: 'None'
})

app.mount('#app')
