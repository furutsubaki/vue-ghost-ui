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
    <div class="component-badge-wrap">
        <slot />
        <OpacityTransition>
            <span
                class="component-badge"
                :class="[variant, size, shape, { inline: inline }]"
                v-show="flg"
            >
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
}
.component-badge {
    font-size: var(--font-size);
    display: flex;
    align-items: center;
    justify-content: center;
    min-width: var(--height);
    height: var(--height);
    color: var(--color);
    padding: 4px;
    background-color: var(--background-color);
    border-radius: 2em;
    word-break: keep-all;
    pointer-events: none;

    &:not(.inline) {
        position: absolute;
        top: calc(var(--height) * -0.5);
        right: 0;
        transform: translateX(50%);
    }
}

.primary {
    --color: var(--color-base-white);
    --background-color: var(--color-theme-active);
}

.secondary {
    --color: var(--color-theme-text-primary);
    --background-color: var(--color-theme-border);
}

.info {
    --color: var(--color-theme-text-primary);
    --background-color: var(--color-status-info);
}

.success {
    --color: var(--color-base-white);
    --background-color: var(--color-status-success);
}

.warning {
    --color: var(--color-base-black);
    --background-color: var(--color-status-warning);
}

.danger {
    --color: var(--color-base-white);
    --background-color: var(--color-status-danger);
}

/* ▼ size ▼ */
.large {
    --height: 28px;
    --font-size: 1.2rem;
}

.medium {
    --height: 20px;
    --font-size: 1rem;
}

.small {
    --height: 12px;
    --font-size: 0.8rem;
}
/* ▲ size ▲ */

/* ▼ shape ▼ */
.dot {
    transform: scale(0.5);
}
/* ▲ shape ▲ */
</style>
