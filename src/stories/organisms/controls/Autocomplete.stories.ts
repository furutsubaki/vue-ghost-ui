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

export const Label: Story = {
    args: {
        ...Default.args,
        label: 'Autocomplete'
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
        placeholder: 'イッヌもネッコもいい',
        prefix: 'Uo･ｪ･oU'
    }
};

export const Disabled: Story = {
    args: {
        ...Label.args,
        placeholder: 'イッヌもネッコもいい',
        disabled: true
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
