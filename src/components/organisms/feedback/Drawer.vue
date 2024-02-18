<script setup lang="ts">
import { ref, useSlots } from 'vue';
import OpacityTransition from '@/components/organisms/inner-parts/OpacityTransition.vue';
import TranslateTransition from '@/components/organisms/inner-parts/TranslateTransition.vue';
import Button from '@/components/organisms/common/Button.vue';
import { computed } from 'vue';
import { sleep } from '@/assets/ts';
import { XCircle as IconXCircle } from 'lucide-vue-next';

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
        shape?: 'normal' | 'rounded' | 'no-radius';
        /**
         * 位置
         */
        position: 'top' | 'right' | 'bottom' | 'left';
        /**
         * slotをスクロールさせるか
         */
        scroll?: boolean;
        /**
         * センタリング
         */
        center?: boolean;
        /**
         * 閉じるボタン
         */
        closeable?: boolean;
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
        shape: 'no-radius',
        scroll: true,
        center: false,
        closeable: false,
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
        <div v-show="flg" class="component-drawer" :class="{ 'is-seamless': seamless }">
            <TranslateTransition
                :from="position"
                @transition-start="transitioning = true"
                @transition-end="transitioning = false"
            >
                <div
                    v-show="flg"
                    class="drawer"
                    :class="[variant, size, shape, position, { 'is-center': center }]"
                    v-click-outside="onOutside"
                >
                    <Button
                        v-if="closeable"
                        size="large"
                        shape="skeleton-square"
                        class="closeable-box"
                        @click="onClose"
                    >
                        <IconXCircle />
                    </Button>
                    <div
                        v-if="hasSlot('header')"
                        class="header"
                        :class="{ 'is-closeable': closeable }"
                    >
                        <slot name="header" />
                    </div>
                    <div class="box" :class="{ 'is-scroll': scroll }">
                        <slot />
                    </div>
                    <div v-if="hasSlot('footer')" class="footer">
                        <slot name="footer" />
                    </div>
                </div>
            </TranslateTransition>
        </div>
    </OpacityTransition>
</template>

<style scoped>
.component-drawer {
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

.drawer {
    pointer-events: initial;
    position: fixed;
    margin: auto;
    display: flex;
    flex-direction: column;
    gap: 8px;
    width: var(--c-drawer-width);
    padding: 8px;
    border: 1px solid;
    border-radius: var(--c-drawer-border-radius);
    border-color: var(--c-drawer-border-color);
    background-color: var(--color-theme-bg-secondary);
    transition:
        border-color 0.2s,
        opacity 0.2s;

    .closeable-box {
        position: absolute;
        top: 0px;
        right: 0px;
        z-index: 1;
    }

    .header {
        display: flex;
        gap: 8px;
        justify-content: flex-end;
        &.is-closeable {
            margin-right: 32px;
        }
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
        .header,
        .footer {
            justify-content: center;
            text-align: center;
        }
    }
}

/* ▼ variant ▼ */
.primary {
    --c-drawer-border-color: var(--color-theme-active);
}
.secondary {
    --c-drawer-border-color: var(--color-theme-border);
}
.info {
    --c-drawer-border-color: var(--color-status-info);
}
.success {
    --c-drawer-border-color: var(--color-status-success);
}
.warning {
    --c-drawer-border-color: var(--color-status-warning);
}
.danger {
    --c-drawer-border-color: var(--color-status-danger);
}
/* ▲ variant ▲ */

/* ▼ size ▼ */
.large {
    --c-drawer-min-width: 320px;
    --c-drawer-min-height: 320px;
    --c-drawer-width: 40vw;
    --c-drawer-height: 40vh;
}
.medium {
    --c-drawer-min-width: 240px;
    --c-drawer-min-height: 240px;
    --c-drawer-width: 32vw;
    --c-drawer-height: 32vh;
}
.small {
    --c-drawer-min-width: 200px;
    --c-drawer-min-height: 200px;
    --c-drawer-width: 24vw;
    --c-drawer-height: 24vh;
}
/* ▲ size ▲ */

/* ▼ shape ▼ */
.normal {
    --c-drawer-border-radius: 4px;
}
.rounded {
    --c-drawer-border-radius: 2em;
}
.no-radius {
    --c-drawer-border-radius: 0;
}
/* ▲ shape ▲ */

/* ▼ position ▼ */
.top {
    inset: 0;
    bottom: auto;
    border-top: 0;
    border-right: 0;
    border-left: 0;
    border-radius: 0 0 var(--c-drawer-border-radius) var(--c-drawer-border-radius);
    width: 100vw;
    min-height: min(var(--c-drawer-min-height), 80vh);
    height: var(--c-drawer-height);
    max-height: 80vh;
}
.right {
    inset: 0;
    left: auto;
    border-top: 0;
    border-right: 0;
    border-bottom: 0;
    border-radius: var(--c-drawer-border-radius) 0 0 var(--c-drawer-border-radius);
    min-width: min(var(--c-drawer-min-width), 80vw);
    width: var(--c-drawer-width);
    max-width: 80vw;
    height: 100vh;
}
.bottom {
    inset: 0;
    top: auto;
    border-right: 0;
    border-bottom: 0;
    border-left: 0;
    border-radius: var(--c-drawer-border-radius) var(--c-drawer-border-radius) 0 0;
    width: 100vw;
    min-height: min(var(--c-drawer-min-height), 80vh);
    height: var(--c-drawer-height);
    max-height: 80vh;
}
.left {
    inset: 0;
    right: auto;
    border-top: 0;
    border-bottom: 0;
    border-left: 0;
    border-radius: 0 var(--c-drawer-border-radius) var(--c-drawer-border-radius) 0;
    min-width: min(var(--c-drawer-min-width), 80vw);
    width: var(--c-drawer-width);
    max-width: 80vw;
    height: 100vh;
}
/* ▲ position ▲ */
</style>
