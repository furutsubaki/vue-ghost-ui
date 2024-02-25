<script setup lang="ts">
withDefaults(
    defineProps<{
        tag?: string;
        layout?:
            | 'pf-default'
            | 'pf-width'
            | 'pf-height'
            | 'pf-top'
            | 'pf-right'
            | 'pf-bottom'
            | 'pf-left';
        isPading?: boolean;
    }>(),
    {
        tag: 'section',
        layout: 'pf-default',
        isPading: false
    }
);
</script>

<template>
    <component :is="tag" class="picture-frame" :class="[layout, { 'is-pading': isPading }]">
        <slot />
    </component>
</template>

<style scoped>
.picture-frame {
    --c-picture-frame-padding: 8px;
    position: relative;
    display: flex;
    flex-direction: column;
    padding: var(--c-picture-frame-padding);
    &::before {
        position: absolute;
        inset: 0;
        margin: auto;
        display: block;
        width: 100%;
        height: 100%;
        pointer-events: none;
        content: '';
        background: rgb(0 0 0 / 2%);
        box-shadow: 0 0 var(--c-picture-frame-padding) var(--color-theme-shadow);
    }
    &::after {
        position: absolute;
        inset: 0;
        display: block;
        width: calc(100% - var(--c-picture-frame-padding) * 2);
        height: calc(100% - var(--c-picture-frame-padding) * 2);
        margin: var(--c-picture-frame-padding);
        padding: 0px;
        border-width: 1px;
        pointer-events: none;
        content: '';
        flex: 1;
        border: solid var(--color-theme-border);
    }

    &.is-pading {
        padding: calc(var(--c-picture-frame-padding) * 3);
    }
}

/* ▼ layout ▼ */
.pf-width {
    padding: 0 var(--c-picture-frame-padding);
    overflow-y: clip;
    &::after {
        height: 100%;
        margin: 0 var(--c-picture-frame-padding);
        border-top-width: 0;
        border-bottom-width: 0;
    }
}
.pf-height {
    padding: var(--c-picture-frame-padding) 0;
    overflow-x: clip;
    &::after {
        width: 100%;
        margin: var(--c-picture-frame-padding) 0;
        border-right-width: 0;
        border-left-width: 0;
    }
}
.pf-top {
    padding: var(--c-picture-frame-padding) 0 0 0;
    overflow-x: clip;
    &::after {
        width: 100%;
        margin: auto;
        margin-top: var(--c-picture-frame-padding);
        border-right-width: 0;
        border-bottom-width: 0;
        border-left-width: 0;
    }
}
.pf-right {
    padding: 0 var(--c-picture-frame-padding) 0 0;
    overflow-y: clip;
    &::after {
        height: 100%;
        margin: auto;
        margin-right: var(--c-picture-frame-padding);
        border-top-width: 0;
        border-bottom-width: 0;
        border-left-width: 0;
    }
}
.pf-bottom {
    padding: 0 0 var(--c-picture-frame-padding) 0;
    overflow-x: clip;
    &::after {
        width: 100%;
        margin: auto;
        margin-bottom: var(--c-picture-frame-padding);
        border-top-width: 0;
        border-right-width: 0;
        border-left-width: 0;
    }
}
.pf-left {
    padding: 0 0 0 var(--c-picture-frame-padding);
    overflow-y: clip;
    &::after {
        height: 100%;
        margin: auto;
        margin-left: var(--c-picture-frame-padding);
        border-top-width: 0;
        border-right-width: 0;
        border-bottom-width: 0;
    }
}
/* ▲ layout ▲ */
</style>
