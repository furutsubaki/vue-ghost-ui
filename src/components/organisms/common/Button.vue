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
        shape?: 'normal' | 'square';
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
    --size-large: 40px;
    --size-medium: 32px;
    --size-small: 24px;

    min-height: var(--height);
    font-size: var(--font-size);

    display: flex;
    gap: 16px;
    align-items: center;
    justify-content: center;
    min-width: 100px;
    padding: 0 8px;
    border: 1px solid;
    border-radius: 4px;
    transition:
        color 0.2s,
        background-color 0.2s,
        border-color 0.2s,
        opacity 0.2s;
    &:disabled {
        pointer-events: none;
        opacity: 0.5;
    }
}

.primary {
    color: var(--color-base-white);
    background-color: var(--color-theme-active);
    border-color: var(--color-theme-active);

    @media (hover: hover) {
        &:hover {
            color: var(--color-theme-active);
            background-color: transparent;
            border-color: var(--color-theme-active);
        }
    }

    @media (hover: none) {
        &:active {
            color: var(--color-theme-active);
            background-color: transparent;
            border-color: var(--color-theme-active);
        }
    }
}

.secondary {
    color: var(--color-theme-text-primary);
    background-color: transparent;
    border-color: var(--color-theme-border);

    @media (hover: hover) {
        &:hover {
            color: var(--color-base-white);
            background-color: var(--color-theme-active);
            border-color: var(--color-theme-active);
        }
    }

    @media (hover: none) {
        &:active {
            color: var(--color-base-white);
            background-color: var(--color-theme-active);
            border-color: var(--color-theme-active);
        }
    }
}

.info {
    color: var(--color-theme-text-primary);
    background-color: var(--color-status-info);
    border-color: var(--color-status-info);

    @media (hover: hover) {
        &:hover {
            color: var(--color-status-info);
            background-color: transparent;
            border-color: var(--color-status-info);
        }
    }

    @media (hover: none) {
        &:active {
            color: var(--color-status-info);
            background-color: transparent;
            border-color: var(--color-status-info);
        }
    }
}

.success {
    color: var(--color-base-white);
    background-color: var(--color-status-success);
    border-color: var(--color-status-success);

    @media (hover: hover) {
        &:hover {
            color: var(--color-status-success);
            background-color: transparent;
            border-color: var(--color-status-success);
        }
    }

    @media (hover: none) {
        &:active {
            color: var(--color-status-success);
            background-color: transparent;
            border-color: var(--color-status-success);
        }
    }
}

.warning {
    color: var(--color-base-black);
    background-color: var(--color-status-warning);
    border-color: var(--color-status-warning);

    @media (hover: hover) {
        &:hover {
            color: var(--color-status-warning);
            background-color: transparent;
            border-color: var(--color-status-warning);
        }
    }

    @media (hover: none) {
        &:active {
            color: var(--color-status-warning);
            background-color: transparent;
            border-color: var(--color-status-warning);
        }
    }
}

.danger {
    color: var(--color-base-white);
    background-color: var(--color-status-danger);
    border-color: var(--color-status-danger);

    @media (hover: hover) {
        &:hover {
            color: var(--color-status-danger);
            background-color: transparent;
            border-color: var(--color-status-danger);
        }
    }

    @media (hover: none) {
        &:active {
            color: var(--color-status-danger);
            background-color: transparent;
            border-color: var(--color-status-danger);
        }
    }
}

.large {
    --height: var(--size-large);
    --font-size: var(--font-size-large);
}

.medium {
    --height: var(--size-medium);
    --font-size: var(--font-size-common);
}

.small {
    --height: var(--size-small);
    --font-size: var(--font-size-small);
}

.square {
    min-width: auto;
    &.large {
        width: var(--size-large);
    }
    &.medium {
        width: var(--size-medium);
    }
    &.small {
        width: var(--size-small);
    }
}
</style>
