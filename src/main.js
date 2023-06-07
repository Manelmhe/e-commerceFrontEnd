import { createApp } from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import vueAxios from "vue-axios";
import axios from "axios";
import Notifications from '@kyvg/vue3-notification';

createApp(App).use(store).use(router).use(vueAxios, axios).use(Notifications).mount('#app')
