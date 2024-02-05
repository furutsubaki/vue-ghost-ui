import Textarea from '@/components/organisms/controls/Textarea.vue';
import useFormData from '@/composables/useFormData';
import type { Meta, StoryObj } from '@storybook/vue3';
import { string, object } from 'zod';

const TEST_SCHEMA = object({
    test: string().max(50).min(1)
}).required();
const meta: Meta<typeof Textarea> = {
    component: Textarea,
    render: (args) => ({
        components: { Textarea },
        setup() {
            useFormData(TEST_SCHEMA, { test: '入力済み' });
            return { args };
        },
        template: '<Textarea v-bind="args" />'
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
type Story = StoryObj<typeof Textarea>;

export const Default: Story = {};

export const Label: Story = {
    args: {
        modelValue: '入力',
        label: '備考'
    }
};

export const Placeholder: Story = {
    args: {
        ...Label.args,
        placeholder: 'なにか入力してください'
    }
};

export const Disabled: Story = {
    args: {
        ...Label.args,
        placeholder: 'なにか入力してください',
        disabled: true
    }
};

export const Schema: Story = {
    args: {
        ...Label.args,
        name: 'test',
        schema: TEST_SCHEMA.shape.test,
        placeholder: 'なにか入力してください'
    }
};
