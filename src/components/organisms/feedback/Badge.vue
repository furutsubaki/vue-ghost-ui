<script setup lang="ts">
import OpacityTransition from '@/components/organisms/inner-parts/OpacityTransition.vue';
import { computed } from 'vue';

const flg = defineModel<boolean>({ default: true });
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
        shape?: 'normal' | 'dot';
        /**
         * 内容
         */
        content: string | number;
        /**
         * フローティングさせないか
         */
        inline: boolean;
    }>(),
    {
        variant: 'secondary',
        size: 'medium',
        shape: 'normal',
        inline: false
    }
);

const formatedContent = computed(() => {
    if (typeof props.content === 'number' && props.content > 99) {
        return '99+';
    } else {
        return props.content;
    }
});
</script>

<template>
    <div class="component-badge-wrap" :class="[variant, size, shape, { inline: inline }]">
        <slot />
        <OpacityTransition>
            <span class="component-badge" v-show="flg">
                <template v-if="shape !== 'dot'">
                    {{ formatedContent }}
                </template>
            </span>
        </OpacityTransition>
    </div>
</template>

<style scoped>
.component-badge-wrap {
    position: relative;
    display: flex;
    align-items: center;
    font-size: var(--c-badge-font-size);
}
.component-badge {
    font-size: var(--c-badge-badge-font-size);
    display: flex;
    align-items: center;
    justify-content: center;
    min-width: var(--c-badge-height);
    height: var(--c-badge-height);
    color: var(--c-badge-color);
    padding: 4px;
    background-color: var(--c-badge-background-color);
    border-radius: 2em;
    word-break: keep-all;
    pointer-events: none;

    &:not(.inline) {
        position: absolute;
        top: calc(var(--c-badge-height) * -0.5);
        right: 0;
        transform: translateX(50%);
    }
}

.primary {
    --c-badge-color: var(--color-base-white);
    --c-badge-background-color: var(--color-theme-active);
}

.secondary {
    --c-badge-color: var(--color-theme-text-primary);
    --c-badge-background-color: var(--color-theme-border);
}

.info {
    --c-badge-color: var(--color-theme-text-primary);
    --c-badge-background-color: var(--color-status-info);
}

.success {
    --c-badge-color: var(--color-base-white);
    --c-badge-background-color: var(--color-status-success);
}

.warning {
    --c-badge-color: var(--color-base-black);
    --c-badge-background-color: var(--color-status-warning);
}

.danger {
    --c-badge-color: var(--color-base-white);
    --c-badge-background-color: var(--color-status-danger);
}

/* ▼ size ▼ */
.large {
    --c-badge-font-size: var(--font-size-large);
    --c-badge-height: 28px;
    --c-badge-badge-font-size: 1.2rem;
}

.medium {
    --c-badge-font-size: var(--font-size-medium);
    --c-badge-height: 20px;
    --c-badge-badge-font-size: 1rem;
}

.small {
    --c-badge-font-size: var(--font-size-small);
    --c-badge-height: 12px;
    --c-badge-badge-font-size: 0.8rem;
}
/* ▲ size ▲ */

/* ▼ shape ▼ */
.dot {
    .component-badge {
        transform: translateX(50%) scale(0.5);
    }
}
/* ▲ shape ▲ */
</style>
