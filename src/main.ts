import '@acab/reset.css';
import '@/assets/css/variables.css';
import '@/assets/css/style.css';
import '@/assets/css/override.css';

import { createApp } from 'vue';
import { createPinia } from 'pinia';
import App from './App.vue';
import useValidate from '@/plugins/init-validate';
import VueDatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css';
import vClickOutside from "click-outside-vue3";

const app = createApp(App);

app.use(createPinia());
app.use(vClickOutside);
app.component('VueDatePicker', VueDatePicker);

useValidate();

app.mount('#app');
