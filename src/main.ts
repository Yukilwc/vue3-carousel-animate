import { createApp } from 'vue'
import App from './App.vue'
import router from './router/index'
import './style/common.scss'
// import * as R from './utils/ramda.min.js'
import * as R from 'ramda'
const app = createApp(App)
app.config.globalProperties.$R = R
app.use(router)
app.mount('#app')
