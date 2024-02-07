# vue-ghost-ui

vue/nuxt用のGHOST UIコンポーネントライブラリ

※nuxt ^3

## リソース

reset cssとして[@acab/reset.css](https://github.com/mayank99/reset.css)を導入しています。
そのため、本ライブラリ読み込みにおいて、上記のreset cssが読み込まれます。

また、各種色やサイズはCSS変数にて管理されています。
詳細は[こちら](https://github.com/furutsubaki/vue-ghost-ui/blob/develop/src/assets/css/variables.css)を参照してください。

バリデーションに関しては[zod](https://zod.dev/)のスキーマを用いて[vee-validate(v4)](https://vee-validate.logaretm.com/v4/)にて行っています。

## use

```shell
pnpm i -D vue-ghost-ui zod
```

### Nuxt

`plugins/vue-ghost-ui.ts`

```ts
import VueGhostUi, { useFormData } from 'vue-ghost-ui';
import 'vue-ghost-ui/dist/style.css';

export default defineNuxtPlugin((nuxtApp) => {
    nuxtApp.vueApp.use(VueGhostUi);
    return {
        provide: {
            useFormData
        }
    };
});
```

## 基本入力モデル

### v-modelを使用

細かいバリデーション設定などは不可。
手軽に使いたい場合に用いることができる。

```jsx
// script
const model = ref<string>('初期値');

// template
<VguInput v-model="model" />
```

### useFormを使用

バリデーションなどをzodスキーマにて設定が可能。
各種フォーム入力欄を設定する場合に用いる。

```jsx
// script
import { string, object } from 'zod';

const { $useFormData } = useNuxtApp();
const TEST_SCHEMA = object({
    test: string().max(50).min(1)
}).required();
const { canSubmit, resetForm } = useFormData(TEST_SCHEMA, { test: '初期値' });

// template
<VguInput name="test" :schema="TEST_SCHEMA.shape.test" />
```

## バリデーションの日本語化

必要に応じて各プロジェクトで実施してください

```shell
pnpm i -D zod-i18n-map i18next vee-validate
```

`plugins/zod-validate.ts`

```ts
import { init } from 'i18next';
import { z } from 'zod';
import { zodI18nMap } from 'zod-i18n-map';
import translation from 'zod-i18n-map/locales/ja/zod.json';

const customErrorMap: z.ZodErrorMap = (issue, ctx) => {
    switch (issue.code) {
        case z.ZodIssueCode.invalid_literal:
            if (issue.expected && !issue.received) {
                return { message: 'チェックしてください。' };
            }
            break;
        case z.ZodIssueCode.too_small:
            if (issue.minimum === 1) {
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

export default defineNuxtPlugin(() => {
    // zod
    init({
        lng: 'ja',
        resources: {
            ja: { zod: translation }
        }
    });
    z.setErrorMap(customErrorMap);
});
```

## コマンド

|コマンド|機能|
|---|---|
|pnpm dev|ホームページ起動|
|pnpm sb|storybookの起動|
