import '@acab/reset.css';
import '@/assets/css/style.css';
import '@/assets/css/variables.css';

import type { Component, App } from 'vue';
import Button from '@/components/organisms/common/Button.vue';
import Textarea from '@/components/organisms/controls/Textarea.vue';
import Input from '@/components/organisms/controls/Input.vue';
import Radio from '@/components/organisms/controls/Radio.vue';
import Number from '@/components/organisms/controls/Number.vue';
import InputTextCounter from '@/components/organisms/controls/InputTextCounter.vue';
import useFormData from '@/composables/useFormData';

const Components: { [key: string]: Component } = {
    Button,
    Textarea,
    Input,
    Number,
    InputTextCounter,
    Radio
};

export { useFormData };

export default {
    install(app: App) {
        Object.keys(Components).forEach((component) => {
            app.component(`Vgu${component}`, Components[component]);
        });

        app.config.globalProperties.$useFormData = useFormData;
        app.provide('useFormData', useFormData);
    }
};
