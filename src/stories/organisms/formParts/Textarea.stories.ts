import Textarea from '../../../components/organisms/formParts/Textarea.vue';
import type { Meta, StoryObj } from '@storybook/vue3';

const meta: Meta<typeof Textarea> = {
    component: Textarea,
    render: (args) => ({
        components: { Textarea },
        setup() {
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
        label: '名前'
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
        modelValue: '入力済み',
        placeholder: '山田 太郎',
        required: true,
        disabled: true
    }
};
