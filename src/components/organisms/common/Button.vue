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
        shape?:
            | 'normal'
            | 'rounded'
            | 'circle'
            | 'square'
            | 'skeleton'
            | 'skeleton-square'
            | 'link';
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
    min-height: var(--c-button-height);
    font-size: var(--c-button-font-size);

    display: flex;
    gap: 16px;
    align-items: center;
    justify-content: center;
    min-width: 100px;
    padding: 0 8px;
    color: var(--c-button-color);
    background-color: var(--c-button-background-color);
    border: 1px solid;
    border-radius: 4px;
    border-color: var(--c-button-border-color);
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
            color: var(--c-button-hover-color);
            background-color: var(--c-button-hover-background-color);
            border-color: var(--c-button-hover-border-color);
        }
    }
    @media (hover: none) {
        &:active {
            color: var(--c-button-hover-color);
            background-color: var(--c-button-hover-background-color);
            border-color: var(--c-button-hover-border-color);
        }
    }
}

/* ▼ variable ▼ */
.primary {
    --c-button-hover-color: var(--color-theme-active);
    --c-button-hover-background-color: transparent;
    --c-button-hover-border-color: var(--color-theme-active);
    --c-button-color: var(--color-base-white);
    --c-button-background-color: var(--color-theme-active-alpha);
    --c-button-border-color: var(--color-theme-active);
}
.secondary {
    --c-button-hover-color: var(--color-base-white);
    --c-button-hover-background-color: var(--color-theme-active);
    --c-button-hover-border-color: var(--color-theme-active);
    --c-button-color: var(--color-theme-text-primary);
    --c-button-background-color: transparent;
    --c-button-border-color: var(--color-theme-border);
}
.info {
    --c-button-hover-color: var(--color-status-info);
    --c-button-hover-background-color: transparent;
    --c-button-hover-border-color: var(--color-status-info);
    --c-button-color: var(--color-theme-text-primary);
    --c-button-background-color: var(--color-status-info-alpha);
    --c-button-border-color: var(--color-status-info);
}
.success {
    --c-button-hover-color: var(--color-status-success);
    --c-button-hover-background-color: transparent;
    --c-button-hover-border-color: var(--color-status-success);
    --c-button-color: var(--color-base-white);
    --c-button-background-color: var(--color-status-success-alpha);
    --c-button-border-color: var(--color-status-success);
}
.warning {
    --c-button-hover-color: var(--color-status-warning);
    --c-button-hover-background-color: transparent;
    --c-button-hover-border-color: var(--color-status-warning);
    --c-button-color: var(--color-base-black);
    --c-button-background-color: var(--color-status-warning-alpha);
    --c-button-border-color: var(--color-status-warning);
}
.danger {
    --c-button-hover-color: var(--color-status-danger);
    --c-button-hover-background-color: transparent;
    --c-button-hover-border-color: var(--color-status-danger);
    --c-button-color: var(--color-base-white);
    --c-button-background-color: var(--color-status-danger-alpha);
    --c-button-border-color: var(--color-status-danger);
}
/* ▲ variable ▲ */

/* ▼ size ▼ */
.large {
    --c-button-height: 40px;
    --c-button-font-size: var(--font-size-large);
}
.medium {
    --c-button-height: 32px;
    --c-button-font-size: var(--font-size-medium);
}
.small {
    --c-button-height: 24px;
    --c-button-font-size: var(--font-size-small);
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
    width: var(--c-button-height);
    word-break: keep-all;
    border-radius: 50%;
    > :deep(.lucide) {
        width: 100%;
        height: 100%;
    }
}
.square {
    display: flex;
    justify-content: center;
    min-width: auto;
    width: var(--c-button-height);
    word-break: keep-all;
    > :deep(.lucide) {
        width: 100%;
        height: 100%;
    }
}
.skeleton {
    border: 0;
    min-width: initial;
    @media (hover: hover) {
        &:hover {
            &.secondary {
                color: var(--color-theme-link);
            }
            color: var(--c-button-color);
            background-color: transparent;
            border-color: transparent;
        }
    }
    @media (hover: none) {
        &:active {
            &.secondary {
                color: var(--color-theme-link);
            }
            color: var(--c-button-color);
            background-color: transparent;
            border-color: transparent;
        }
    }
}
.skeleton-square {
    border: 0;
    min-width: initial;
    width: var(--c-button-height);
    > :deep(.lucide) {
        width: 100%;
        height: 100%;
    }
    @media (hover: hover) {
        &:hover {
            &.secondary {
                color: var(--color-theme-link);
            }
            color: var(--c-button-color);
            background-color: transparent;
            border-color: transparent;
        }
    }
    @media (hover: none) {
        &:active {
            &.secondary {
                color: var(--color-theme-link);
            }
            color: var(--c-button-color);
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
