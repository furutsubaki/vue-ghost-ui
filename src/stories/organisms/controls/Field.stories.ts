import Field from '@/components/organisms/controls/Field.vue';
import useFormData from '@/composables/useFormData';
import type { Meta, StoryObj } from '@storybook/vue3';
import { string, object } from 'zod';
import { formatLocaleString, parseLocaleString } from '@/assets/ts/formatter';

const TEST_SCHEMA = object({
    test: string().max(50).min(1)
}).required();

const meta: Meta<typeof Field> = {
    component: Field,
    render: (args) => ({
        components: { Field },
        setup() {
            useFormData(TEST_SCHEMA, { test: 'ヤマダ タロウ' });
            return { args };
        },
        template: '<Field v-bind="args" />'
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
type Story = StoryObj<typeof Field>;

export const Default: Story = {};

export const PropsVariant: Story = {
    render: (args) => ({
        components: { Field },
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
                        `<Field variant="${param.variant}" label="${param.variant}" v-bind="args" />`
                )
                .join('');
        })()
    }),
    args: { ...Default.args }
};

export const PropsSize: Story = {
    render: (args) => ({
        components: { Field },
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
                    (param) => `<Field size="${param.size}" label="${param.size}" v-bind="args" />`
                )
                .join('');
        })()
    }),
    args: { ...Default.args }
};

export const PropsShape: Story = {
    render: (args) => ({
        components: { Field },
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
                        `<Field shape="${param.shape}" label="${param.shape}" v-bind="args" />`
                )
                .join('');
        })()
    }),
    args: { ...Default.args }
};

export const PropsLabel: Story = {
    args: {
        label: 'Field'
    }
};

export const PropsPrefixSuffix: Story = {
    render: (args) => ({
        components: { Field },
        setup: () => ({ args }),
        template: (() => {
            return [
                {
                    prefix: 'prefix',
                    suffix: ''
                },
                {
                    prefix: 'prefix',
                    suffix: 'suffix'
                },
                {
                    prefix: '',
                    suffix: 'suffix'
                }
            ]
                .map(
                    (param) =>
                        `<Field prefix="${param.prefix}" suffix="${param.suffix}" label="${[param.prefix, param.suffix].join('')}" v-bind="args" />`
                )
                .join('');
        })()
    }),
    args: {
        ...Default.args
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
export const PropsType: Story = {
    render: (args) => ({
        components: { Field },
        setup: () => ({ args }),
        template: (() => {
            return [
                {
                    type: 'text'
                },
                {
                    type: 'email'
                },
                {
                    type: 'password'
                },
                {
                    type: 'time'
                },
                {
                    type: 'date'
                },
                {
                    type: 'number'
                },
                {
                    type: 'tel'
                },
                {
                    type: 'search'
                }
            ]
                .map(
                    (param) => `<Field type="${param.type}" label="${param.type}" v-bind="args" />`
                )
                .join('');
        })()
    }),
    args: { ...Default.args }
};

export const DisplayFormatterCurrency: Story = {
    args: {
        ...PropsClearable.args,
        type: 'number',
        label: '金額',
        placeholder: 'データは数値になります',
        prefix: '￥',
        displayFormatter: (v) => formatLocaleString(v),
        displayParser: (v) => parseLocaleString(v)
    }
};

export const FormatterTel: Story = {
    args: {
        ...PropsClearable.args,
        type: 'tel',
        label: '電話番号',
        placeholder: 'ハイフンを入れてください',
        formatter: (v) => v.replace(/[^0-9-]/g, '')
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
