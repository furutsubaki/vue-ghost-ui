import InputFrame from '@/components/organisms/inner-parts/InputFrame.vue';
import type { Meta, StoryObj } from '@storybook/vue3';

const meta: Meta<typeof InputFrame> = {
    component: InputFrame,
    render: (args) => ({
        components: { InputFrame },
        setup() {
            return { args };
        },
        template: '<InputFrame v-bind="args" />'
    }),
    tags: ['autodocs'],
    args: {},
    argTypes: {}
};

export default meta;
type Story = StoryObj<typeof InputFrame>;

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

export const TextCounter: Story = {
    args: {
        ...Label.args,
        value: 'test',
        maxLength: 100
    }
};

export const Required: Story = {
    args: {
        ...Label.args,
        required: true
    }
};

export const Disabled: Story = {
    args: {
        ...Label.args,
        disabled: true
    }
};

export const FocusAndInputed: Story = {
    args: {
        ...Label.args,
        isFocus: true
    }
};

export const Erorrs: Story = {
    args: {
        ...Label.args,
        errors: ['エラーテキスト', 'エラーテキスト2']
    }
};
