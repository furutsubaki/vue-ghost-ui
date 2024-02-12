<script setup lang="ts">
import { ref, useSlots } from 'vue';
import OpacityTransition from '@/components/organisms/inner-parts/OpacityTransition.vue';
import TranslateTransition from '@/components/organisms/inner-parts/TranslateTransition.vue';
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
         * 位置
         */
        position?: 'center' | 'top' | 'right' | 'bottom' | 'left';
        /**
         * 表示元
         */
        transitionFrom?: 'opacity' | 'top' | 'right' | 'bottom' | 'left';
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
        transitionFrom: 'opacity',
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
const TransitionComponent =
    props.transitionFrom === 'opacity' ? OpacityTransition : TranslateTransition;
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
            <component
                :is="TransitionComponent"
                :from="transitionFrom"
                @transition-start="transitioning = true"
                @transition-end="transitioning = false"
            >
                <dialog
                    v-show="flg"
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
            </component>
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
    min-height: var(--c-dialog-height);

    pointer-events: initial;
    position: fixed;
    margin: auto;
    display: flex;
    flex-direction: column;
    gap: 8px;
    width: var(--c-dialog-width);
    max-width: 80vw;
    max-height: 80vh;
    padding: 8px;
    border: 1px solid;
    border-radius: var(--c-dialog-border-radius);
    border-color: var(--c-dialog-border-color);
    transition:
        border-color 0.2s,
        opacity 0.2s;

    .title {
        font-weight: bold;
        font-size: calc(var(--font-size-medium) * 1.2);
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
    --c-dialog-background-color: var(--color-theme-active-alpha);
    --c-dialog-border-color: var(--color-theme-active);
}
.secondary {
    --c-dialog-background-color: transparent;
    --c-dialog-border-color: var(--color-theme-border);
}
.info {
    --c-dialog-background-color: var(--color-status-info-alpha);
    --c-dialog-border-color: var(--color-status-info);
}
.success {
    --c-dialog-background-color: var(--color-status-success-alpha);
    --c-dialog-border-color: var(--color-status-success);
}
.warning {
    --c-dialog-background-color: var(--color-status-warning-alpha);
    --c-dialog-border-color: var(--color-status-warning);
}
.danger {
    --c-dialog-background-color: var(--color-status-danger-alpha);
    --c-dialog-border-color: var(--color-status-danger);
}
/* ▲ variant ▲ */

/* ▼ size ▼ */
.full {
    max-width: initial;
    max-height: initial;
    --c-dialog-width: 100vw;
    --c-dialog-height: 100vh;
}
.large {
    --c-dialog-width: 1024px;
    --c-dialog-height: 40px;
}
.medium {
    --c-dialog-width: 720px;
    --c-dialog-height: 32px;
}
.small {
    --c-dialog-width: 320px;
    --c-dialog-height: 24px;
}
/* ▲ size ▲ */

/* ▼ shape ▼ */
.normal {
    --c-dialog-border-radius: 4px;
}
.rounded {
    --c-dialog-border-radius: 2em;
}
.no-radius {
    --c-dialog-border-radius: 0;
}
/* ▲ shape ▲ */

/* ▼ position ▼ */
.center {
    inset: 0;
    margin: auto;
}
.top {
    inset: 0;
    bottom: auto;
    border-top: 0;
    border-radius: 0 0 var(--c-dialog-border-radius) var(--c-dialog-border-radius);
}
.right {
    inset: 0;
    left: auto;
    border-right: 0;
    border-radius: var(--c-dialog-border-radius) 0 0 var(--c-dialog-border-radius);
}
.bottom {
    inset: 0;
    top: auto;
    border-bottom: 0;
    border-radius: var(--c-dialog-border-radius) var(--c-dialog-border-radius) 0 0;
}
.left {
    inset: 0;
    right: auto;
    border-left: 0;
    border-radius: 0 var(--c-dialog-border-radius) var(--c-dialog-border-radius) 0;
}
/* ▲ position ▲ */
</style>
