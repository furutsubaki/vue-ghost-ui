import { defineRule } from 'vee-validate';
import * as AllRules from '@vee-validate/rules';
import { init } from 'i18next';
import { z } from 'zod';
import { zodI18nMap } from 'zod-i18n-map';
import translation from 'zod-i18n-map/locales/ja/zod.json';

const customErrorMap: z.ZodErrorMap = (issue, ctx) => {
    switch (issue.code) {
        case z.ZodIssueCode.too_small:
            if (['string'].includes(issue.type) && issue.minimum === 1) {
                return { message: 'この項目は必須項目です。' };
            }
    }
    return zodI18nMap(issue, ctx);
};

export default () => {
    // vee-validate
    Object.entries(AllRules).forEach(([id, validator]) => {
        defineRule(id, validator);
    });

    // zod
    init({
        lng: 'ja',
        resources: {
            ja: { zod: translation }
        }
    });
    z.setErrorMap(customErrorMap);
};
