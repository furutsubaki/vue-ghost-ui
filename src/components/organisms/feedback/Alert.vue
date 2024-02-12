<script setup lang="ts">
import { ref, type Component } from 'vue';
import OpacityTransition from '@/components/organisms/inner-parts/OpacityTransition.vue';
import {
    XCircle as IconXCircle,
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
            <div class="closeable-box" v-if="closeable">
                <IconXCircle @click.prevent="onClose" />
            </div></div
    ></OpacityTransition>
</template>

<style scoped>
.component-alert {
    min-height: var(--height);
    font-size: var(--font-size);

    display: flex;
    gap: 8px;
    justify-content: center;
    min-width: 100px;
    width: 100%;
    padding: 8px;
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

    .icon {
        flex-shrink: 0;
        width: calc(var(--font-size) * 1.8);
        height: calc(var(--font-size) * 1.8);
    }

    .box {
        flex-grow: 1;
        display: flex;
        flex-direction: column;
        gap: 8px;
        .title {
            font-weight: bold;
            font-size: calc(var(--font-size) * 1.2);
        }
    }

    .closeable-box {
        width: var(--font-size);
        flex-shrink: 0;
    }
}

.primary {
    --color: var(--color-base-white);
    --background-color: var(--color-theme-active-alpha);
    --border-color: var(--color-theme-active);
}

.secondary {
    --color: var(--color-theme-text-primary);
    --background-color: transparent;
    --border-color: var(--color-theme-border);
}

.info {
    --color: var(--color-theme-text-primary);
    --background-color: var(--color-status-info-alpha);
    --border-color: var(--color-status-info);
}

.success {
    --color: var(--color-base-white);
    --background-color: var(--color-status-success-alpha);
    --border-color: var(--color-status-success);
}

.warning {
    --color: var(--color-base-black);
    --background-color: var(--color-status-warning-alpha);
    --border-color: var(--color-status-warning);
}

.danger {
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
/* ▲ shape ▲ */
</style>
