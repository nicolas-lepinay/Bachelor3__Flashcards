import { createApp } from 'vue';
import { createPinia } from 'pinia'
import piniaPersist from 'pinia-plugin-persist'
import App from './App.vue';
import router from './router/index';
import './styles/styles.scss';
import withUUID from "vue-uuid";

const pinia = createPinia()
pinia.use(piniaPersist)

const app = withUUID(createApp(App));

app.use(pinia)
app.use(router);
app.mount('#app');
