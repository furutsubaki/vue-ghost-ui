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

export const Label: Story = {
    args: {
        label: 'Field'
    }
};

export const Clearable: Story = {
    args: {
        ...Label.args,
        clearable: true
    }
};

export const Placeholder: Story = {
    args: {
        ...Label.args,
        placeholder: '山田 太郎'
    }
};

export const Disabled: Story = {
    args: {
        ...Label.args,
        placeholder: '山田 太郎',
        disabled: true
    }
};

export const DisplayFormatterCurrency: Story = {
    args: {
        ...Clearable.args,
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
        ...Clearable.args,
        type: 'tel',
        label: '電話番号',
        placeholder: 'ハイフンを入れてください',
        formatter: (v) => v.replace(/[^0-9-]/g, '')
    }
};

export const TypeNumber: Story = {
    args: {
        ...Clearable.args,
        type: 'number'
    }
};

export const TypeTime: Story = {
    args: {
        ...Clearable.args,
        type: 'time'
    }
};

export const TypeDate: Story = {
    args: {
        ...Clearable.args,
        type: 'date'
    }
};

export const TypePassword: Story = {
    args: {
        ...Clearable.args,
        type: 'password'
    }
};

export const TypeSearch: Story = {
    args: {
        ...Clearable.args,
        type: 'search'
    }
};

export const Schema: Story = {
    args: {
        ...Label.args,
        name: 'test',
        schema: TEST_SCHEMA.shape.test,
        placeholder: '山田 太郎'
    }
};
