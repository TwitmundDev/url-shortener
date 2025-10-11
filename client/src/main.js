import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import VueParticles from "vue3-particles"
import './assets/main.css'
import Vue3Toastify from 'vue3-toastify'
import 'vue3-toastify/dist/index.css'

export const API_URL = "http://localhost:4000";

const app = createApp(App)

// app.use(Vue3Toastify, {
//   position: "top-right",
//   autoClose: 3000,
//   theme: "dark",
//   toastClassName: "custom-toast"
// })

app.use(router)
app.use(VueParticles)

app.mount('#app')
