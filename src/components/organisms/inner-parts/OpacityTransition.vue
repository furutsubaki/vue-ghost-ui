<script setup lang="ts">
withDefaults(
    defineProps<{
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
        duration: '0.2s',
        delay: '0s',
        easeFunction: 'ease'
    }
);
</script>

<template>
    <Transition>
        <slot></slot>
    </Transition>
</template>

<style scoped>
.v-enter-active,
.v-leave-active {
    /* 親側のopacityと競合する場合があるため、こちらを優先とする */
    transition: opacity v-bind(duration) v-bind(delay) v-bind(easeFunction) !important;
}
.v-enter-from,
.v-leave-to {
    /* 親側のopacityと競合する場合があるため、こちらを優先とする */
    opacity: 0 !important;
}
</style>
