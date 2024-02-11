import Autocomplete from '@/components/organisms/controls/Autocomplete.vue';
import useFormData from '@/composables/useFormData';
import type { Meta, StoryObj } from '@storybook/vue3';
import { string, object } from 'zod';

const TEST_SCHEMA = object({
    test: string().max(50).min(1)
}).required();

const meta: Meta<typeof Autocomplete> = {
    component: Autocomplete,
    render: (args) => ({
        components: { Autocomplete },
        setup() {
            useFormData(TEST_SCHEMA, { test: 'ヤマダ タロウ' });
            return { args };
        },
        template: '<Autocomplete v-bind="args" />'
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
type Story = StoryObj<typeof Autocomplete>;

export const Default: Story = {
    args: {
        items: [
            { label: '犬', value: 'dog', ruby: 'いぬ' },
            { label: '猫', value: 'cat', ruby: 'ねこ' },
            { label: '兎', value: 'rabbit', ruby: 'うさぎ' }
        ]
    }
};

export const PropsVariant: Story = {
    render: (args) => ({
        components: { Autocomplete },
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
                        `<Autocomplete variant="${param.variant}" label="${param.variant}" v-bind="args" />`
                )
                .join('');
        })()
    }),
    args: { ...Default.args }
};

export const PropsSize: Story = {
    render: (args) => ({
        components: { Autocomplete },
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
                        `<Autocomplete size="${param.size}" label="${param.size}" v-bind="args" />`
                )
                .join('');
        })()
    }),
    args: { ...Default.args }
};

export const PropsShape: Story = {
    render: (args) => ({
        components: { Autocomplete },
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
                    shape: 'no-radius'
                }
            ]
                .map(
                    (param) =>
                        `<Autocomplete shape="${param.shape}" label="${param.shape}" v-bind="args" />`
                )
                .join('');
        })()
    }),
    args: { ...Default.args }
};

export const PropsLabel: Story = {
    args: {
        ...Default.args,
        label: 'Autocomplete'
    }
};

export const PropsPrefixSuffix: Story = {
    render: (args) => ({
        components: { Autocomplete },
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
                        `<Autocomplete prefix="${param.prefix}" suffix="${param.suffix}" label="${[param.prefix, param.suffix].join('')}" v-bind="args" />`
                )
                .join('');
        })()
    }),
    args: {
        ...Default.args
    }
};

export const PropsPosition: Story = {
    render: (args) => ({
        components: { Autocomplete },
        setup: () => ({ args }),
        template: (() => {
            return [
                {
                    position: 'button'
                },
                {
                    position: 'top'
                }
            ]
                .map(
                    (param) =>
                        `<Autocomplete position="${param.position}" label="${param.position}" v-bind="args" />`
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
        ...PropsLabel.args,
        clearable: true
    }
};

export const PropsPlaceholder: Story = {
    args: {
        ...PropsLabel.args,
        placeholder: 'イッヌもネッコもいい',
        prefix: 'Uo･ｪ･oU'
    }
};

export const PropsDisabled: Story = {
    args: {
        ...PropsLabel.args,
        placeholder: 'イッヌもネッコもいい',
        disabled: true
    }
};

export const PropsSchema: Story = {
    args: {
        ...PropsLabel.args,
        name: 'test',
        schema: TEST_SCHEMA.shape.test,
        placeholder: '山田 太郎'
    }
};
