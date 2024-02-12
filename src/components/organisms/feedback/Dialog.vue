<script setup lang="ts">
import { ref, useSlots } from 'vue';
import OpacityTransition from '@/components/organisms/inner-parts/OpacityTransition.vue';
import { computed } from 'vue';
import { sleep } from '@/assets/ts';

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
        size?: 'small' | 'medium' | 'large' | 'full';
        /**
         * 形状
         */
        shape?: 'normal' | 'rounded' | 'no-radius';
        /**
         * 形状
         */
        position?: 'center' | 'top' | 'right' | 'bottom' | 'left';
        /**
         * タイトル
         */
        title?: string;
        /**
         * slotをスクロールさせるか
         */
        scroll?: boolean;
        /**
         * センタリング
         */
        center?: boolean;
        /**
         * 暗黙Cancel禁止
         */
        persistent?: boolean;
        /**
         * シームレス
         */
        seamless?: boolean;
    }>(),
    {
        variant: 'secondary',
        size: 'medium',
        shape: 'normal',
        position: 'center',
        title: '',
        scroll: false,
        center: false,
        persistent: false,
        seamless: false
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
const onOutside = computed(() => ({
    handler: onClose,
    isActive: flg.value && !props.persistent && !props.seamless
}));

const slots = useSlots();
const hasSlot = (name: string) => {
    return slots[name] ? !!(slots[name] as () => [])()?.length : false;
};
</script>

<template>
    <OpacityTransition
        @transition-start="transitioning = true"
        @transition-end="transitioning = false"
    >
        <div v-show="flg" class="component-dialog" :class="{ 'is-seamless': seamless }">
            <dialog
                class="dialog"
                :class="[variant, size, shape, position, { 'is-center': center }]"
                v-click-outside="onOutside"
            >
                <div v-if="title" class="title">{{ title }}</div>
                <div class="box" :class="{ 'is-scroll': scroll }">
                    <slot />
                </div>
                <div v-if="hasSlot('footer')" class="footer">
                    <slot name="footer" />
                </div>
            </dialog>
        </div>
    </OpacityTransition>
</template>

<style scoped>
.component-dialog {
    position: fixed;
    inset: 0;

    pointer-events: none;
    &:not(.is-seamless) {
        &::before {
            content: '';
            position: fixed;
            inset: 0;
            background-color: var(--color-theme-shadow);
            z-index: -1;
            pointer-events: initial;
        }
    }
}

.dialog {
    min-height: var(--height);

    pointer-events: initial;
    position: fixed;
    margin: auto;
    display: flex;
    flex-direction: column;
    gap: 8px;
    width: var(--width);
    max-width: 80vw;
    max-height: 80vh;
    padding: 8px;
    border: 1px solid;
    border-radius: var(--border-radius);
    border-color: var(--border-color);
    transition:
        border-color 0.2s,
        opacity 0.2s;

    .title {
        font-weight: bold;
        font-size: calc(var(--font-size) * 1.2);
    }

    .box {
        position: relative;
        flex-grow: 1;
        &.is-scroll {
            overflow-y: auto;
        }
    }

    .footer {
        display: flex;
        gap: 8px;
        justify-content: flex-end;
    }

    &.is-center {
        .title,
        .footer {
            justify-content: center;
            text-align: center;
        }
    }
}

/* ▼ variant ▼ */
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
/* ▲ variant ▲ */

/* ▼ size ▼ */
.full {
    max-width: initial;
    max-height: initial;
    --width: 100vw;
    --height: 100vh;
}
.large {
    --width: 1024px;
    --height: 40px;
}
.medium {
    --width: 720px;
    --height: 32px;
}
.small {
    --width: 320px;
    --height: 24px;
}
/* ▲ size ▲ */

/* ▼ shape ▼ */
.normal {
    --border-radius: 4px;
}
.rounded {
    --border-radius: 2em;
}
.no-radius {
    --border-radius: 0;
}
/* ▲ shape ▲ */

/* ▼ position ▼ */
.center {
    inset: 0;
}
.top {
    top: 0;
    border-top: 0;
    border-radius: 0 0 var(--border-radius) var(--border-radius);
}
.right {
    right: 0;
    border-right: 0;
    border-radius: var(--border-radius) 0 0 var(--border-radius);
}
.bottom {
    bottom: 0;
    border-bottom: 0;
    border-radius: var(--border-radius) var(--border-radius) 0 0;
}
.left {
    left: 0;
    border-left: 0;
    border-radius: 0 var(--border-radius) var(--border-radius) 0;
}
/* ▲ position ▲ */
</style>
