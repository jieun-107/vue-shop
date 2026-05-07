import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import './style.css'

const app = createApp(App)

// Pinia: 전역 상태 관리 플러그인 등록
app.use(createPinia())

app.mount('#app')
