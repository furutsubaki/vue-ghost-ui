<script setup lang="ts">
withDefaults(
    defineProps<{
        /**
         * 表示色
         */
        variant?: 'primary' | 'secondary' | 'info' | 'success' | 'warning' | 'danger';
        /**
         * サイズ
         */
        size?: 'small' | 'medium' | 'large';
        /**
         * 形状
         */
        shape?: 'normal' | 'rounded' | 'circle' | 'square';
    }>(),
    {
        variant: 'secondary',
        size: 'medium',
        shape: 'normal'
    }
);
defineEmits<{
    /**
     * test
     */
    click: [];
}>();
</script>

<template>
    <button
        type="button"
        class="component-button"
        :class="[variant, size, shape]"
        @click="$emit('click')"
    >
        <slot></slot>
    </button>
</template>

<style scoped>
.component-button {
    min-height: var(--height);
    font-size: var(--font-size);

    display: flex;
    gap: 16px;
    align-items: center;
    justify-content: center;
    min-width: 100px;
    padding: 0 8px;
    color: var(--color);
    background-color: var(--background-color);
    border: 1px solid;
    border-radius: 4px;
    border-color: var(--border-color);
    word-break: keep-all;
    transition:
        color 0.2s,
        background-color 0.2s,
        border-color 0.2s,
        opacity 0.2s;
    &:disabled {
        pointer-events: none;
        opacity: 0.5;
    }

    @media (hover: hover) {
        &:hover {
            color: var(--hover-color);
            background-color: var(--hover-background-color);
            border-color: var(--hover-border-color);
        }
    }

    @media (hover: none) {
        &:active {
            color: var(--hover-color);
            background-color: var(--hover-background-color);
            border-color: var(--hover-border-color);
        }
    }
}

.primary {
    --hover-color: var(--color-theme-active);
    --hover-background-color: transparent;
    --hover-border-color: var(--color-theme-active);
    --color: var(--color-base-white);
    --background-color: var(--color-theme-active-alpha);
    --border-color: var(--color-theme-active);
}

.secondary {
    --hover-color: var(--color-base-white);
    --hover-background-color: var(--color-theme-active);
    --hover-border-color: var(--color-theme-active);
    --color: var(--color-theme-text-primary);
    --background-color: transparent;
    --border-color: var(--color-theme-border);
}

.info {
    --hover-color: var(--color-status-info);
    --hover-background-color: transparent;
    --hover-border-color: var(--color-status-info);
    --color: var(--color-theme-text-primary);
    --background-color: var(--color-status-info-alpha);
    --border-color: var(--color-status-info);
}

.success {
    --hover-color: var(--color-status-success);
    --hover-background-color: transparent;
    --hover-border-color: var(--color-status-success);
    --color: var(--color-base-white);
    --background-color: var(--color-status-success-alpha);
    --border-color: var(--color-status-success);
}

.warning {
    --hover-color: var(--color-status-warning);
    --hover-background-color: transparent;
    --hover-border-color: var(--color-status-warning);
    --color: var(--color-base-black);
    --background-color: var(--color-status-warning-alpha);
    --border-color: var(--color-status-warning);
}

.danger {
    --hover-color: var(--color-status-danger);
    --hover-background-color: transparent;
    --hover-border-color: var(--color-status-danger);
    --color: var(--color-base-white);
    --background-color: var(--color-status-danger-alpha);
    --border-color: var(--color-status-danger);
}

/* ▼ size ▼ */
.large {
    --height: 40px;
    --font-size: var(--font-size-large);
}
.medium {
    --height: 32px;
    --font-size: var(--font-size-medium);
}
.small {
    --height: 24px;
    --font-size: var(--font-size-small);
}
/* ▲ size ▲ */

/* ▼ shape ▼ */
.rounded {
    border-radius: 2em;
}
.no-radius {
    border-radius: 0;
}
.circle {
    display: flex;
    justify-content: center;
    min-width: auto;
    width: var(--height);
    word-break: keep-all;
    border-radius: 50%;
}
.square {
    display: flex;
    justify-content: center;
    min-width: auto;
    width: var(--height);
    word-break: keep-all;
}
/* ▲ shape ▲ */
</style>
