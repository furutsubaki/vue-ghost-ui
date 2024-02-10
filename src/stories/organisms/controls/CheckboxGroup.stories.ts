import CheckboxGroup from '@/components/organisms/controls/CheckboxGroup.vue';
import useFormData from '@/composables/useFormData';
import type { Meta, StoryObj } from '@storybook/vue3';
import { string, object } from 'zod';

const TEST_SCHEMA = object({
    test: string().array().min(1)
}).required();

const meta: Meta<typeof CheckboxGroup> = {
    component: CheckboxGroup,
    render: (args) => ({
        components: { CheckboxGroup },
        setup() {
            useFormData(TEST_SCHEMA, { test: ['dog'] });
            return { args };
        },
        template: '<CheckboxGroup v-bind="args" />'
    }),
    tags: ['autodocs'],
    args: {
        modelValue: []
    },
    argTypes: {
        // TODO: 現状lintエラーの回避策なし
        // @ts-ignore
        'onUpdate:modelValue': { action: 'onUpdate:modelValue' }
    }
};

export default meta;
type Story = StoryObj<typeof CheckboxGroup>;

export const Default: Story = {
    args: {
        items: [
            { label: '犬', value: 'dog' },
            { label: '猫', value: 'cat' },
            { label: '兎', value: 'rabbit' }
        ]
    }
};

export const PropsVariant: Story = {
    render: (args) => ({
        components: { CheckboxGroup },
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
                        `<CheckboxGroup variant="${param.variant}" label="${param.variant}" v-bind="args" />`
                )
                .join('');
        })()
    }),
    args: { ...Default.args }
};

export const PropsSize: Story = {
    render: (args) => ({
        components: { CheckboxGroup },
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
                        `<CheckboxGroup size="${param.size}" label="${param.size}" v-bind="args" />`
                )
                .join('');
        })()
    }),
    args: { ...Default.args }
};

export const PropsLabel: Story = {
    args: {
        ...Default.args,
        modelValue: ['dog'],
        label: 'CheckboxGroup'
    }
};

export const PropsDisabled: Story = {
    args: {
        ...Default.args,
        disabled: true
    }
};

export const ItemDisabled: Story = {
    args: {
        ...Default.args,
        items: [
            ...Default.args!.items!,
            {
                label: '烏',
                value: 'crow',
                disabled: true
            }
        ]
    }
};

export const ItemVariant: Story = {
    args: {
        ...Default.args,
        items: [
            {
                label: 'primary',
                value: 'primary',
                variant: 'primary'
            },
            {
                label: 'secondary',
                value: 'secondary',
                variant: 'secondary'
            },
            {
                label: 'info',
                value: 'info',
                variant: 'info'
            },
            {
                label: 'success',
                value: 'success',
                variant: 'success'
            },
            {
                label: 'warning',
                value: 'warning',
                variant: 'warning'
            },
            {
                label: 'danger',
                value: 'danger',
                variant: 'danger'
            }
        ]
    }
};

export const Schema: Story = {
    args: {
        ...PropsLabel.args,
        name: 'test',
        schema: TEST_SCHEMA.shape.test,
        items: [
            ...PropsLabel.args!.items!,
            {
                label: '未入力',
                value: ''
            }
        ]
    }
};
