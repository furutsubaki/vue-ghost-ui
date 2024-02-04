import Input from '@/components/organisms/formParts/Input.vue';
import useFormData from '@/composables/useFormData';
import type { Meta, StoryObj } from '@storybook/vue3';
import { string, object } from 'zod';

const TEST_SCHEMA = object({
    test: string().max(50).min(1)
}).required();

const meta: Meta<typeof Input> = {
    component: Input,
    render: (args) => ({
        components: { Input },
        setup() {
            useFormData(TEST_SCHEMA, { test: 'ヤマダ タロウ' });
            return { args };
        },
        template: '<Input v-bind="args" />'
    }),
    tags: ['autodocs'],
    args: {
        modelValue: ''
    },
    argTypes: {
        // TODO: 現状lintエラーの回避策なし
        // @ts-ignore
        'onUpdate:modelValue': { action: 'onUpdate:modelValue' }
    }
};

export default meta;
type Story = StoryObj<typeof Input>;

export const Default: Story = {};

export const Label: Story = {
    args: {
        modelValue: '太郎',
        label: '名前'
    }
};

export const Placeholder: Story = {
    args: {
        ...Label.args,
        placeholder: '山田 太郎'
    }
};

export const Disabled: Story = {
    args: {
        ...Label.args,
        placeholder: '山田 太郎',
        disabled: true
    }
};

export const Schema: Story = {
    args: {
        ...Label.args,
        name: 'test',
        schema: TEST_SCHEMA.shape.test,
        placeholder: '山田 太郎'
    }
};
