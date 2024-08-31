import './assets/tailwind.css'
import PrimeVueUnstyled from 'primevue/config'
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import ButtonComponent from 'primevue/button'
import MenubarComponent from 'primevue/menubar'
import MenuComponent from 'primevue/menu'

const app = createApp(App)

app.use(router)
app.use(PrimeVueUnstyled)
app.component('ButtonComponent', ButtonComponent)
app.component('MenubarComponent', MenubarComponent)
app.component('MenuComponent', MenuComponent)

app.mount('#app')
