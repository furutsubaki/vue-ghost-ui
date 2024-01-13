<script setup lang="ts">
import { ref } from 'vue';
import Button from '@/components/organisms/formParts/Button.vue';
import Textarea from '@/components/organisms/formParts/Textarea.vue';

const model = ref('');
</script>

<template>
    <main>
        <h1>テスト</h1>
        <Button>ゴーストボタン</Button>
        <Textarea v-model="model" />{{ model }}
    </main>
</template>

<style scoped></style>
