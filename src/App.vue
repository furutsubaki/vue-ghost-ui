<script setup lang="ts">
import { ref } from 'vue';
import Button from '@/components/organisms/common/Button.vue';
import Input from '@/components/organisms/controls/Input.vue';
import Number from '@/components/organisms/controls/Number.vue';
import Radio from '@/components/organisms/controls/Radio.vue';
import RadioGroup from '@/components/organisms/controls/RadioGroup.vue';
import Select from '@/components/organisms/controls/Select.vue';
import useFormData from '@/composables/useFormData';
import z from 'zod';

const initData = {
    input: 'w',
    number: 7,
    radio: false,
    radioGroup: 'dog',
    select: 'dog'
};
const model = ref(initData);
const TEST_SCHEMA = z.object({
    input: z.string(),
    number: z.coerce.number(),
    radio: z.literal(true),
    radioGroup: z.string().min(1),
    select: z.string().min(1)
});

const items = [
    {
        label: '犬',
        value: 'dog'
    },
    {
        label: '猫',
        value: 'cat'
    },
    {
        label: '兎',
        value: 'rabbit'
    }
];

const { canSubmit, resetForm, handleSubmit } = useFormData(TEST_SCHEMA, initData);

const onSubmit = handleSubmit((values) => {
    // eslint-disable-next-line no-console
    console.log(values);
});
</script>

<template>
    <main>
        <h1>テスト vee-validate</h1>
        <Button :disabled="!canSubmit" @click="onSubmit">ゴーストボタン</Button>
        <Button @click="resetForm">reset</Button>
        <Radio :value="true" name="radio" :schema="TEST_SCHEMA.shape.radio">規約に同意</Radio>
        <RadioGroup
            name="radioGroup"
            :schema="TEST_SCHEMA.shape.radioGroup"
            :items="items"
            label="らべる"
        />
        <Select name="select" :schema="TEST_SCHEMA.shape.select" :items="items" label="らべる" />
        <Input name="input" label="らべる" :schema="TEST_SCHEMA.shape.input" />
        <Number name="number" :schema="TEST_SCHEMA.shape.number" />
        <h1>テスト v-model</h1>
        <Radio :value="true" v-model="model.radio">規約に同意</Radio>
        <RadioGroup v-model="model.radioGroup" :items="items" label="らべる" />
        <Select v-model="model.select" :items="items" label="らべる" />
        <Number v-model="model.number" name="number" :schema="TEST_SCHEMA.shape.number" />
        {{ model }}
    </main>
</template>

<style scoped></style>
