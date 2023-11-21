import { createApp } from 'vue'
import App from './App.vue'
import router from "./router"
import store from "./store"
import * as MathLive from "./mathlive";
import VueMathfield from "./vue-mathlive";

createApp(App).use(store, VueMathfield, MathLive).use(router).mount('#app')
