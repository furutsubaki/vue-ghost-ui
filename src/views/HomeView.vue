<script setup lang="ts">
import { ref } from 'vue';
import Button from '@/components/organisms/formParts/Button.vue';
import Input from '@/components/organisms/formParts/Input.vue';
import useFormData from '@/composables/useFormData';
import { string, object } from 'zod';

const model = ref('もでる');
const TEST_SCHEMA = object({
    test: string().max(50).min(1)
}).required();
const { canSubmit, resetForm } = useFormData(TEST_SCHEMA, { test: 'ヤマダタロウ' });
</script>

<template>
    <main>
        <h1>テスト</h1>
        <Button :disabled="!canSubmit">ゴーストボタン</Button>
        <Button @click="resetForm">reset</Button>
        <Input name="test" :schema="TEST_SCHEMA.shape.test" />
        <Input v-model="model" name="test2" />{{ model }}
    </main>
</template>

<style scoped></style>
