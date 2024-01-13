import '@acab/reset.css';
import '@/assets/css/style.css';
import '@/assets/css/variables.css';

import type { Component } from 'vue'
import Button from '@/components/organisms/formParts/Button.vue';
import Textarea from '@/components/organisms/formParts/Textarea.vue';

const Components: { [key: string]: Component } = {
    Button,
    Textarea
};

export default {
    install(app: any) {
        Object.keys(Components).forEach((component) => {
            app.component(`Vgu${component}`, Components[component]);
        });
    }
};
