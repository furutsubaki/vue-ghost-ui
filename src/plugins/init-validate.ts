import { init } from 'i18next';
import { z } from 'zod';
import { zodI18nMap } from 'zod-i18n-map';
import translation from 'zod-i18n-map/locales/ja/zod.json';

const customErrorMap: z.ZodErrorMap = (issue, ctx) => {
    switch (issue.code) {
        case z.ZodIssueCode.too_small:
            if ( issue.minimum === 1) {
                return { message: 'この項目は必須項目です。' };
            }
            break;
        case z.ZodIssueCode.invalid_type:
            if ([null, undefined, ''].includes(ctx.data)) {
                return { message: 'この項目は必須項目です。' };
            }
            break;
    }
    return zodI18nMap(issue, ctx);
};

export default () => {
    // zod
    init({
        lng: 'ja',
        resources: {
            ja: { zod: translation }
        }
    });
    z.setErrorMap(customErrorMap);
};
