# vue-ghost-ui

vue/nuxt用のGHOST UIコンポーネントライブラリ

## リソース

reset cssとして[@acab/reset.css](https://github.com/mayank99/reset.css)を導入しています。
そのため、本ライブラリ読み込みにおいて、上記のreset cssが読み込まれます。

また、各種色やサイズはCSS変数にて管理されています。
詳細は[こちら](https://github.com/furutsubaki/vue-ghost-ui/blob/develop/src/assets/css/variables.css)を参照してください。

バリデーションに関してはzodのスキーマを用いてvee-validateにて行っています。

## use

```shell
pnpm i -D vue-ghost-ui
```

### Nuxt

`plugins/vue-ghost-ui.ts`

```ts
import VueGhostUi from 'vue-ghost-ui';
import 'vue-ghost-ui/dist/style.css';

export default defineNuxtPlugin((nuxtApp) => {
    nuxtApp.vueApp.use(VueGhostUi);
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
<Input v-model="model" />
```

### useFormを使用

バリデーションなどをzodスキーマにて設定が可能。
各種フォーム入力欄を設定する場合に用いる。

```jsx
// script
const TEST_SCHEMA = object({
    test: string().max(50).min(1)
}).required();
const { canSubmit, resetForm } = useFormData(TEST_SCHEMA, { test: '初期値' });

// template
<Input name="test" :schema="TEST_SCHEMA.shape.test" />
```

## コマンド

|コマンド|機能|
|---|---|
|pnpm dev|ホームページ起動|
|pnpm sb|storybookの起動|
