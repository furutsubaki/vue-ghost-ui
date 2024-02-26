<script setup lang="ts">
withDefaults(
    defineProps<{
        /**
         * タグ
         */
        tag?: string;
        /**
         * 枠の配置
         */
        layout?:
            | 'pf-default'
            | 'pf-width'
            | 'pf-height'
            | 'pf-top'
            | 'pf-right'
            | 'pf-bottom'
            | 'pf-left';
        /**
         * パディング
         */
        isPading?: boolean;
        /**
         * 影なしか
         */
        noShadow?: boolean;
    }>(),
    {
        tag: 'section',
        layout: 'pf-default',
        isPading: false,
        noShadow: false
    }
);
</script>

<template>
    <component
        :is="tag"
        class="frame"
        :class="[layout, { 'is-pading': isPading, 'no-shadow': noShadow }]"
    >
        <slot />
    </component>
</template>

<style scoped>
.frame {
    --c-frame-padding: 8px;
    position: relative;
    display: flex;
    flex-direction: column;
    padding: 0;
    &::before,
    &::after {
        position: absolute;
        inset: 0;
        margin: auto;
        display: block;
        width: 100%;
        height: 100%;
        pointer-events: none;
        content: '';
    }
    &::before {
        background: rgb(0 0 0 / 2%);
        box-shadow: 0 0 var(--c-frame-padding) var(--color-theme-shadow);
    }
    &::after {
        padding: 0px;
        border-width: 1px;
        border: solid var(--color-theme-border);
    }

    &.is-pading {
        padding: calc(var(--c-frame-padding) * 2);
    }
    &.no-shadow {
        &::before {
            display: none;
        }
    }
}

/* ▼ layout ▼ */
.pf-width {
    overflow-y: clip;
    &::after {
        border-top-width: 0;
        border-bottom-width: 0;
    }
}
.pf-height {
    overflow-x: clip;
    &::after {
        border-right-width: 0;
        border-left-width: 0;
    }
}
.pf-top {
    overflow-x: clip;
    &::after {
        border-right-width: 0;
        border-bottom-width: 0;
        border-left-width: 0;
    }
}
.pf-right {
    overflow-y: clip;
    &::after {
        border-top-width: 0;
        border-bottom-width: 0;
        border-left-width: 0;
    }
}
.pf-bottom {
    overflow-x: clip;
    &::after {
        border-top-width: 0;
        border-right-width: 0;
        border-left-width: 0;
    }
}
.pf-left {
    overflow-y: clip;
    &::after {
        border-top-width: 0;
        border-right-width: 0;
        border-bottom-width: 0;
    }
}
/* ▲ layout ▲ */
</style>
