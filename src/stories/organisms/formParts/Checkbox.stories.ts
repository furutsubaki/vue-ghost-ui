import Checkbox from '@/components/organisms/formParts/Checkbox.vue';
import useFormData from '@/composables/useFormData';
import type { Meta, StoryObj } from '@storybook/vue3';
import { literal, object } from 'zod';

const TEST_SCHEMA = object({
    test: literal(true)
}).required();

const meta: Meta<typeof Checkbox> = {
    component: Checkbox,
    render: (args) => ({
        components: { Checkbox },
        setup() {
            useFormData(TEST_SCHEMA, { test: false });
            return { args };
        },
        template: '<Checkbox v-bind="args">規約に同意</Checkbox>'
    }),
    tags: ['autodocs'],
    args: {
        modelValue: false
    },
    argTypes: {
        // TODO: 現状lintエラーの回避策なし
        // @ts-ignore
        'onUpdate:modelValue': { action: 'onUpdate:modelValue' }
    }
};

export default meta;
type Story = StoryObj<typeof Checkbox>;

export const Default: Story = {
    args: {
        value: true
    }
};

export const Label: Story = {
    args: {
        ...Default.args,
        modelValue: true,
        label: '同意'
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
