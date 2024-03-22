import '@acab/reset.css';
import '@/assets/css/variables.css';
import '@/assets/css/style.css';
import '@/assets/css/override.css';

import type { App } from 'vue';
import useFormData from '@/composables/useFormData';
import useNotification from '@/composables/useNotification';
import useTheme from '@/composables/useTheme';
import VueDatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css';
import vClickOutside from 'click-outside-vue3';
import * as components from '@/components';
export * from './composables/useFormData';
export * from './composables/useNotification';
export * from './composables/useTheme';
export * from '@/components';

export { useFormData, useNotification, useTheme };

export default {
    install(app: App) {
        Object.values(components).forEach((component) => {
            app.component(`Mi${component.__name!}`, component);
        });

        app.config.globalProperties.$useFormData = useFormData;
        app.provide('useFormData', useFormData);
        app.config.globalProperties.$useNotification = useNotification;
        app.provide('useNotification', useNotification);
        app.config.globalProperties.$useTheme = useTheme;
        app.provide('useTheme', useTheme);
        app.use(vClickOutside);
        app.component('VueDatePicker', VueDatePicker);
    }
};
