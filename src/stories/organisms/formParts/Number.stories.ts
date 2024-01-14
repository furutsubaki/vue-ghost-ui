import Number from '@/components/organisms/formParts/Number.vue';
import useFormData from '@/composables/useFormData';
import type { Meta, StoryObj } from '@storybook/vue3';
import { number, object } from 'zod';

const TEST_SCHEMA = object({
    test: number().max(50).min(1)
}).required();

const meta: Meta<typeof Number> = {
    component: Number,
    render: (args) => ({
        components: { Number },
        setup() {
            useFormData(TEST_SCHEMA, { test: 10 });
            return { args };
        },
        template: '<Number v-bind="args" />'
    }),
    tags: ['autodocs'],
    args: {
        modelValue: undefined
    },
    argTypes: {
        modelValue: {
            control: { type: 'number' }
        },
        // TODO: 現状lintエラーの回避策なし
        // @ts-ignore
        'onUpdate:modelValue': { action: 'onUpdate:modelValue' }
    }
};

export default meta;
type Story = StoryObj<typeof Number>;

export const Default: Story = {};

export const Label: Story = {
    args: {
        modelValue: '0',
        label: '数字'
    }
};

export const Placeholder: Story = {
    args: {
        ...Label.args,
        placeholder: '0'
    }
};

export const Disabled: Story = {
    args: {
        ...Label.args,
        placeholder: '0',
        disabled: true
    }
};

export const Schema: Story = {
    args: {
        ...Label.args,
        name: 'test',
        schema: TEST_SCHEMA.shape.test,
        placeholder: '0'
    }
};
