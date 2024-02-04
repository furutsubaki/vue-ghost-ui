import '@acab/reset.css';
import '@/assets/css/style.css';
import '@/assets/css/variables.css';

import { createApp } from 'vue';
import { createPinia } from 'pinia';
import App from './App.vue';
import useValidate from '@/plugins/init-validate';

const app = createApp(App);

app.use(createPinia());

useValidate(app);

app.mount('#app');
