import { createApp } from 'vue';
import App from './App.vue';
import router from './router/index';
import './styles/styles.scss';
import withUUID from "vue-uuid";

const app = withUUID(createApp(App));
app.use(router);
app.mount('#app');
