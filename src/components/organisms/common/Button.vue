<script setup lang="ts">
const props = withDefaults(
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
        shape?: 'normal' | 'rounded' | 'circle' | 'square' | 'skeleton' | 'link';
        /**
         * 読み取り専用
         */
        readonly?: boolean;
        /**
         * 無効か
         */
        disabled?: boolean;
    }>(),
    {
        variant: 'secondary',
        size: 'medium',
        shape: 'normal',
        readonly: false,
        disabled: false
    }
);
const emit = defineEmits<{
    /**
     * test
     */
    click: [];
}>();

const onClick = () => {
    if (props.readonly) {
        return false;
    }
    emit('click');
};
</script>

<template>
    <button
        type="button"
        class="component-button"
        :disabled="disabled"
        :class="[variant, size, shape, { 'is-readonly': readonly }]"
        @click="onClick"
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
    &.is-readonly {
        pointer-events: none;
    }
    &:disabled {
        pointer-events: none;
        opacity: 0.5;
    }

    /* hover */
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
.skeleton {
    border: 0;
    min-width: initial;
    @media (hover: hover) {
        &:hover {
            &.secondary {
                color: var(--color-theme-link);
            }
            color: var(--color);
            background-color: transparent;
            border-color: transparent;
        }
    }
    @media (hover: none) {
        &:active {
            &.secondary {
                color: var(--color-theme-link);
            }
            color: var(--color);
            background-color: transparent;
            border-color: transparent;
        }
    }
}
.link {
    display: inline-block;
    border: 0;
    min-width: initial;
    min-height: initial;
    padding: 0;
    @media (hover: hover) {
        &:hover {
            color: var(--color-theme-link);
            background-color: transparent;
            border-color: transparent;
        }
    }
    @media (hover: none) {
        &:active {
            color: var(--color-theme-link);
            background-color: transparent;
            border-color: transparent;
        }
    }
}
/* ▲ shape ▲ */
</style>
