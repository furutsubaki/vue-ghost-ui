<script setup lang="ts">
import useNotification from '@/composables/useNotification';
import NotificationItem from '@/components/organisms/feedback/NotificationItem.vue';

const { notifications } = useNotification();
</script>

<template>
    <NotificationItem
        v-for="notification in notifications"
        :key="notification.key"
        :notification="notification"
    />
</template>
