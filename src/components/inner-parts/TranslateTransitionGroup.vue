<script setup lang="ts">
withDefaults(
    defineProps<{
        /**
         * 所要時間
         */
        from?: 'top' | 'right' | 'bottom' | 'left';
        /**
         * 所要時間
         */
        duration?: string;
        /**
         * 待ち時間
         */
        delay?: string;
        /**
         * イージング関数
         */
        easeFunction?: string;
    }>(),
    {
        from: 'top',
        duration: '0.2s',
        delay: '0s',
        easeFunction: 'ease-in-out'
    }
);

const emit = defineEmits<{
    /**
     * トランジション開始
     */
    transitionStart: [];
    /**
     * トランジション終了
     */
    transitionEnd: [];
}>();

const onTransitionStart = () => {
    emit('transitionStart');
};
const onTransitionEnd = () => {
    emit('transitionEnd');
};
</script>

<template>
    <TransitionGroup @before-enter="onTransitionStart" @after-leave="onTransitionEnd" :name="from">
        <slot />
    </TransitionGroup>
</template>

<style scoped>
/* 共通 */
.top-enter-active,
.top-leave-active,
.right-enter-active,
.right-leave-active,
.bottom-enter-active,
.bottom-leave-active,
.left-enter-active,
.left-leave-active {
    /* 親側のopacityと競合する場合があるため、こちらを優先とする */
    transform: translate(0px, 0px);
    transition:
        transform v-bind(duration) v-bind(easeFunction) v-bind(delay),
        opacity v-bind(duration) v-bind(easeFunction) v-bind(delay) !important;
}

/* from top */
.top-enter-from,
.top-leave-to {
    /* 親側のopacityと競合する場合があるため、こちらを優先とする */
    transform: translateY(-100%);
    opacity: 0 !important;
}

/* from right */
.right-enter-from,
.right-leave-to {
    /* 親側のopacityと競合する場合があるため、こちらを優先とする */
    transform: translateX(100%);
    opacity: 0 !important;
}

/* from bottom */
.bottom-enter-from,
.bottom-leave-to {
    /* 親側のopacityと競合する場合があるため、こちらを優先とする */
    transform: translateY(100%);
    opacity: 0 !important;
}

/* from left */
.left-enter-from,
.left-leave-to {
    /* 親側のopacityと競合する場合があるため、こちらを優先とする */
    transform: translateX(-100vw);
    opacity: 0 !important;
}
</style>
