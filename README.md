# vue-ghost-ui

vue/nuxt用のGHOST UIコンポーネントライブラリ

## 外部リソース

reset cssとして[@acab/reset.css](https://github.com/mayank99/reset.css)を導入しています。
そのため、本ライブラリ読み込みにおいて、上記のreset cssが読み込まれます。

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

## コマンド

|コマンド|機能|
|---|---|
|pnpm dev|ホームページ起動|
|pnpm sb|storybookの起動|
