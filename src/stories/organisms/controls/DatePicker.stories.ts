import DatePicker from '@/components/organisms/controls/DatePicker.vue';
import useFormData from '@/composables/useFormData';
import type { Meta, StoryObj } from '@storybook/vue3';
import { string, object } from 'zod';

const TEST_SCHEMA = object({
    test: string().max(50).min(1)
}).required();

const meta: Meta<typeof DatePicker> = {
    component: DatePicker,
    render: (args) => ({
        components: { DatePicker },
        setup() {
            useFormData(TEST_SCHEMA, { test: '20240201' });
            return { args };
        },
        template: '<DatePicker v-bind="args" />'
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
type Story = StoryObj<typeof DatePicker>;

export const Default: Story = {};

export const Label: Story = {
    args: {
        modelValue: '20240201',
        label: 'DatePicker'
    }
};

export const Disabled: Story = {
    args: {
        ...Label.args,
        disabled: true
    }
};

export const Schema: Story = {
    args: {
        ...Label.args,
        name: 'test',
        schema: TEST_SCHEMA.shape.test
    }
};
