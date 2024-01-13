import '@acab/reset.css';
import '@/assets/css/style.css';
import '@/assets/css/variables.css';

import { createApp } from 'vue';
import { createPinia } from 'pinia';
import App from './App.vue';
import router from './router';
import { configure, defineRule, Form, Field, ErrorMessage } from 'vee-validate';
import { localize, setLocale } from '@vee-validate/i18n'
import ja from '@vee-validate/i18n/dist/locale/ja.json'
import * as AllRules from '@vee-validate/rules'
import { init } from 'i18next';
import { z } from 'zod';
import { zodI18nMap } from 'zod-i18n-map';
import translation from 'zod-i18n-map/locales/ja/zod.json';

const app = createApp(App);

app.use(createPinia());
app.use(router);

const customErrorMap: z.ZodErrorMap = (issue, ctx) => {
    switch (issue.code) {
        case z.ZodIssueCode.too_small:
            if (['string', 'number'].includes(issue.type) && issue.minimum === 1) {
                return { message: 'この項目は必須項目です。' };
            }
    }
    return zodI18nMap(issue, ctx);
};

Object.entries(AllRules).forEach(([id, validator]) => {
    defineRule(id, validator);
});

app.component('ValidationForm', Form);
app.component('ValidationField', Field);
app.component('ValidationErrorMessage', ErrorMessage);
configure({
    generateMessage: localize({ ja })
});
setLocale('ja');

// zod
init({
    lng: 'ja',
    resources: {
        ja: { zod: translation }
    }
});
z.setErrorMap(customErrorMap);

app.mount('#app');
