import App from '@/App.vue';
import { createApp } from 'vue';
import '@/assets/css/tailwind.css';
import { createPinia } from 'pinia';
import 'vue3-toastify/dist/index.css';
import router from '@/router/index.js';
import 'vue-loading-overlay/dist/css/index.css';
import { LoadingPlugin } from 'vue-loading-overlay';
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate';

const app = createApp(App);

const pinia = createPinia();

pinia.use(piniaPluginPersistedstate);

app.use(LoadingPlugin);

app.use(pinia);

app.use(router);

app.mount('#app');
