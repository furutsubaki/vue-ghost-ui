import Textarea from '@/components/organisms/controls/Textarea.vue';
import useFormData from '@/composables/useFormData';
import type { Meta, StoryObj } from '@storybook/vue3';
import { string, object } from 'zod';
import { formatLocaleString, parseLocaleString } from '@/assets/ts/formatter';

const TEST_SCHEMA = object({
    test: string().max(50).min(1)
}).required();

const meta: Meta<typeof Textarea> = {
    component: Textarea,
    render: (args) => ({
        components: { Textarea },
        setup() {
            useFormData(TEST_SCHEMA, { test: 'ヤマダ タロウ' });
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
        'onUpdate:modelValue': { action: 'onUpdate:modelValue' },
        onSearch: { action: 'search' }
    }
};

export default meta;
type Story = StoryObj<typeof Textarea>;

export const Default: Story = {};

export const PropsVariant: Story = {
    render: (args) => ({
        components: { Textarea },
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
                        `<Textarea variant="${param.variant}" label="${param.variant}" v-bind="args" />`
                )
                .join('');
        })()
    }),
    args: { ...Default.args }
};

export const PropsSize: Story = {
    render: (args) => ({
        components: { Textarea },
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
                        `<Textarea size="${param.size}" label="${param.size}" v-bind="args" />`
                )
                .join('');
        })()
    }),
    args: { ...Default.args }
};

export const PropsShape: Story = {
    render: (args) => ({
        components: { Textarea },
        setup: () => ({ args }),
        template: (() => {
            return [
                {
                    shape: 'normal'
                },
                {
                    shape: 'rounded'
                },
                {
                    shape: 'circle'
                },
                {
                    shape: 'square'
                }
            ]
                .map(
                    (param) =>
                        `<Textarea shape="${param.shape}" label="${param.shape}" v-bind="args" />`
                )
                .join('');
        })()
    }),
    args: { ...Default.args }
};

export const PropsLabel: Story = {
    args: {
        label: 'Textarea'
    }
};

export const PropsClearable: Story = {
    args: {
        clearable: true
    }
};

export const PropsPlaceholder: Story = {
    args: {
        placeholder: '山田 太郎'
    }
};

export const PropsDisabled: Story = {
    args: {
        disabled: true
    }
};

export const PropsLine: Story = {
    args: {
        line: 5
    }
};

export const PropsMinLine: Story = {
    args: {
        minLine: 1
    }
};

export const PropsMaxLine: Story = {
    args: {
        maxLine: 5
    }
};

export const Schema: Story = {
    args: {
        ...PropsLabel.args,
        name: 'test',
        schema: TEST_SCHEMA.shape.test,
        placeholder: '山田 太郎'
    }
};
