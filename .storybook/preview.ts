import { SetupContext, watch } from 'vue'
import { Preview } from '@storybook/vue3'
import { useArgs } from '@storybook/preview-api'
import '@acab/reset.css'
import '../src/assets/css/style.css'
import '../src/assets/css/variables.css'

import { configure, defineRule, Form, Field, ErrorMessage } from 'vee-validate';
import { localize, setLocale } from '@vee-validate/i18n'
import ja from '@vee-validate/i18n/dist/locale/ja.json'
import * as AllRules from '@vee-validate/rules'
import { init } from 'i18next';
import { z } from 'zod';
import { zodI18nMap } from 'zod-i18n-map';
import translation from 'zod-i18n-map/locales/ja/zod.json';

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

const preview: Preview = {
    parameters: {},
    decorators: [
        (story, context) => {
            // 背景色をcss変数と同期させる
            const currentBackground = context.globals.backgrounds?.value
            const backgrounds = context.parameters.backgrounds.values
            const currentBackgroundData = backgrounds.find(
                (background) => background.value === currentBackground
            )
            document.documentElement.dataset.theme = currentBackgroundData?.name || 'light'

            // v-model対応
            // TODO: https://github.com/storybookjs/storybook/issues/14259
            const [args, updateArgs] = useArgs();
            if ('modelValue' in args) {
                const update = args['onUpdate:model-value'] || args['onUpdate:modelValue'];
                args['onUpdate:model-value'] = undefined;
                args['onUpdate:modelValue'] = (...vals) => {
                    update?.(...vals);
                    /**
                     * Arg with `undefined` will be deleted by `deleteUndefined()`, then loss of reactive
                     * @see {@link https://github.com/storybookjs/storybook/blob/next/code/lib/preview-api/src/modules/store/ArgsStore.ts#L63}
                     */
                    const modelValue = vals[0] === undefined ? null : vals[0];
                    updateArgs({ modelValue });
                };
            }
            return story({
                ...context, updateArgs
                , Form, Field, ErrorMessage
            });
        }
    ]
}

export default preview
