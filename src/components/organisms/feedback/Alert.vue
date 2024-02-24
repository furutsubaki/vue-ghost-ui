<script setup lang="ts">
import { ref, type Component } from 'vue';
import OpacityTransition from '@/components/organisms/inner-parts/OpacityTransition.vue';
import Button from '@/components/organisms/common/Button.vue';
import {
    X as IconX,
    Info as IconInfo,
    CheckCircle2 as IconCheckCircle2,
    AlertTriangle as IconAlertTriangle,
    XOctagon as IconXOctagon
} from 'lucide-vue-next';
import { computed } from 'vue';
import { sleep } from '@/assets/ts';

const flg = defineModel<boolean>({ default: true });
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
        shape?: 'normal' | 'rounded' | 'no-radius';
        /**
         * アイコン（コンポーネント）
         */
        icon?: Component;
        /**
         * タイトル
         */
        title?: string;
        /**
         * 内容
         */
        text: string;
        /**
         * 閉じるボタン
         */
        closeable?: boolean;
    }>(),
    {
        variant: 'secondary',
        size: 'medium',
        shape: 'normal',
        closeable: false
    }
);
const emit = defineEmits<{
    /**
     * 閉じた
     */
    closed: [];
}>();

// transition状態
const transitioning = ref(false);
const isShowing = computed(() => {
    if (flg.value) {
        return true;
    } else {
        return transitioning.value;
    }
});

const onClose = async () => {
    flg.value = false;
    await onClosed();
};
const onClosed = async () => {
    if (isShowing.value) {
        await sleep(100);
        onClosed();
    } else {
        emit('closed');
    }
};
</script>

<template>
    <OpacityTransition
        @transition-start="transitioning = true"
        @transition-end="transitioning = false"
    >
        <div class="component-alert" :class="[variant, size, shape]" v-show="flg">
            <icon v-if="icon" class="icon" />
            <IconInfo v-else-if="variant === 'info'" class="icon" />
            <IconCheckCircle2 v-else-if="variant === 'success'" class="icon" />
            <IconAlertTriangle v-else-if="variant === 'warning'" class="icon" />
            <IconXOctagon v-else-if="variant === 'danger'" class="icon" />
            <div class="box">
                <div v-if="title" class="title">{{ title }}</div>
                <div>{{ text }}</div>
            </div>
            <Button v-if="closeable" shape="skeleton-square" class="closeable-box" @click="onClose">
                <IconX />
            </Button>
        </div>
    </OpacityTransition>
</template>

<style scoped>
.component-alert {
    min-height: var(--c-alert-height);
    font-size: var(--c-alert-font-size);

    display: flex;
    gap: 8px;
    align-items: flex-start;
    justify-content: center;
    min-width: 100px;
    width: 100%;
    padding: 8px;
    color: var(--c-alert-color);
    background-color: var(--c-alert-background-color);
    border: 1px solid;
    border-radius: 4px;
    border-color: var(--c-alert-border-color);
    word-break: keep-all;
    transition:
        color 0.2s,
        background-color 0.2s,
        border-color 0.2s,
        opacity 0.2s;

    .icon {
        flex-shrink: 0;
        width: calc(var(--c-alert-font-size) * 1.8);
        height: calc(var(--c-alert-font-size) * 1.8);
        color: var(--c-alert-color);
    }

    .box {
        flex-grow: 1;
        display: flex;
        flex-direction: column;
        gap: 8px;
        .title {
            font-weight: bold;
            font-size: calc(var(--c-alert-font-size) * 1.2);
        }
    }

    .closeable-box {
        flex-shrink: 0;
    }
}

.primary {
    --c-alert-color: var(--color-base-white);
    --c-alert-background-color: var(--color-theme-active);
    --c-alert-border-color: var(--color-theme-active);
}

.secondary {
    --c-alert-color: var(--color-theme-text-primary);
    --c-alert-background-color: transparent;
    --c-alert-border-color: var(--color-theme-border);
}

.info {
    --c-alert-color: var(--color-theme-text-primary);
    --c-alert-background-color: var(--color-status-info);
    --c-alert-border-color: var(--color-status-info);
}

.success {
    --c-alert-color: var(--color-base-white);
    --c-alert-background-color: var(--color-status-success);
    --c-alert-border-color: var(--color-status-success);
}

.warning {
    --c-alert-color: var(--color-base-black);
    --c-alert-background-color: var(--color-status-warning);
    --c-alert-border-color: var(--color-status-warning);
}

.danger {
    --c-alert-color: var(--color-base-white);
    --c-alert-background-color: var(--color-status-danger);
    --c-alert-border-color: var(--color-status-danger);
}

/* ▼ size ▼ */
.large {
    --c-alert-height: 40px;
    --c-alert-font-size: var(--font-size-large);
}

.medium {
    --c-alert-height: 32px;
    --c-alert-font-size: var(--font-size-medium);
}

.small {
    --c-alert-height: 24px;
    --c-alert-font-size: var(--font-size-small);
}
/* ▲ size ▲ */

/* ▼ shape ▼ */
.rounded {
    border-radius: 2em;
}
.no-radius {
    border-radius: 0;
}
/* ▲ shape ▲ */
</style>
