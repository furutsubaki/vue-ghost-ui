import '@acab/reset.css';
import '@/assets/css/variables.css';
import '@/assets/css/style.css';
import '@/assets/css/override.css';

import type { Component, App } from 'vue';
import useFormData from '@/composables/useFormData';
import useNotification from '@/composables/useNotification';
import VueDatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css';
import vClickOutside from 'click-outside-vue3';
const files: Record<string, { default: Component }> = import.meta.glob('./components/**/*.vue', {
    eager: true
});
const Components: { [key: string]: Component } = {};
for (const key in files) {
    Components[key.replace(/.*\/(.*)\..*/, '$1')] = files[key].default;
}

export { useFormData, useNotification };

export default {
    install(app: App) {
        Object.keys(Components).forEach((component) => {
            app.component(`Mi${component}`, Components[component]);
        });

        app.config.globalProperties.$useFormData = useFormData;
        app.provide('useFormData', useFormData);
        app.config.globalProperties.$useNotification = useNotification;
        app.provide('useNotification', useNotification);
        app.use(vClickOutside);
        app.component('VueDatePicker', VueDatePicker);
    }
};
