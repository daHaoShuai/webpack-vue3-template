import { createApp } from 'vue'
import App from './App.vue'
import { createStore } from './store'
import './index.css'

const app = createApp(App)
app.use(createStore())
app.mount('#root')