import { createApp } from 'vue'
import App from './App.vue'

import router from './router'
import store from './store'
import locale from 'element-plus/lib/locale/lang/az'
import ElementPlus, { ElNotification } from 'element-plus'
import 'element-plus/dist/index.css'
import moment from 'moment'

const app = createApp(App)
app.config.devtools = true
app.config.globalProperties.$moment = moment
app.use(router)
app.use(store)
app.use(ElementPlus, { locale })

import Echo from 'laravel-echo'
import Pusher from 'pusher-js'

window.Pusher = Pusher

window.Echo = new Echo({
  broadcaster: 'pusher',
  key: 'local',
  wsHost: '127.0.0.1',
  wsPort: 6001,
  cluster: 'mt1',
  forceTLS: false,
  disableStats: true,
  authEndpoint :'http://blog.test/api/broadcasting/auth',
  auth:{
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    }
  },
})

window.Echo.private('chat-channel.' + store.getters['auth/GET_USER']?.id).listen('PrivateChat',(e)=>{
  ElNotification({ type: 'warning', title: e.message.sender, message: e.message.message })
})

app.mount('#app')
