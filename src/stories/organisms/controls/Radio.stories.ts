import Radio from '@/components/organisms/controls/Radio.vue';
import useFormData from '@/composables/useFormData';
import type { Meta, StoryObj } from '@storybook/vue3';
import { literal, object } from 'zod';

const TEST_SCHEMA = object({
    test: literal(true)
}).required();

const meta: Meta<typeof Radio> = {
    component: Radio,
    render: (args) => ({
        components: { Radio },
        setup() {
            useFormData(TEST_SCHEMA, { test: false });
            return { args };
        },
        template: '<Radio v-bind="args">規約に同意</Radio>'
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
type Story = StoryObj<typeof Radio>;

export const Default: Story = {
    args: {
        value: true
    }
};

export const PropsVariant: Story = {
    render: (args) => ({
        components: { Radio },
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
                        `<Radio variant="${param.variant}" v-bind="args">${param.variant}</Radio>`
                )
                .join('');
        })()
    }),
    args: { ...Default.args }
};

export const PropsSize: Story = {
    render: (args) => ({
        components: { Radio },
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
                .map((param) => `<Radio size="${param.size}" v-bind="args">${param.size}</Radio>`)
                .join('');
        })()
    }),
    args: { ...Default.args }
};

export const PropsLabel: Story = {
    args: {
        ...Default.args,
        modelValue: true,
        label: 'Radio'
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
