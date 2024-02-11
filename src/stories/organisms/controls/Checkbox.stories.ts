import Checkbox from '@/components/organisms/controls/Checkbox.vue';
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

export const PropsVariant: Story = {
    render: (args) => ({
        components: { Checkbox },
        setup: () => ({ args }),
        template: (() => {
            return [
                {
                    variant: 'primary'
                },
                {
                    variant: 'secondary'
                },
                {
                    variant: 'info'
                },
                {
                    variant: 'success'
                },
                {
                    variant: 'warning'
                },
                {
                    variant: 'danger'
                }
            ]
                .map(
                    (param) =>
                        `<Checkbox variant="${param.variant}" v-bind="args">${param.variant}</Checkbox>`
                )
                .join('');
        })()
    }),
    args: { ...Default.args }
};

export const PropsSize: Story = {
    render: (args) => ({
        components: { Checkbox },
        setup: () => ({ args }),
        template: (() => {
            return [
                {
                    size: 'large'
                },
                {
                    size: 'medium'
                },
                {
                    size: 'small'
                }
            ]
                .map(
                    (param) =>
                        `<Checkbox size="${param.size}" v-bind="args">${param.size}</Checkbox>`
                )
                .join('');
        })()
    }),
    args: { ...Default.args }
};

export const PropsLabel: Story = {
    args: {
        ...Default.args,
        modelValue: true,
        label: 'Checkbox'
    }
};

export const PropsRequired: Story = {
    args: {
        ...PropsLabel.args,
        required: true
    }
};

export const PropsDisabled: Story = {
    args: {
        ...Default.args,
        disabled: true
    }
};

export const Schema: Story = {
    args: {
        ...PropsLabel.args,
        name: 'test',
        schema: TEST_SCHEMA.shape.test
    }
};
