import Button from '@/components/organisms/common/Button.vue';
import type { Meta, StoryObj } from '@storybook/vue3';

const meta: Meta<typeof Button> = {
    component: Button,
    render: (args) => ({
        components: { Button },
        setup() {
            return { args };
        },
        template: '<Button v-bind="args">{{args.default}}</Button>'
    }),
    tags: ['autodocs'],
    args: {
        default: 'ボタン'
    },
    argTypes: {
        // TODO: script setupに未対応のため二重定義
        variant: {
            options: ['primary', 'secondary', 'info', 'success', 'warning', 'danger']
        },
        size: {
            options: ['small', 'medium', 'large']
        },
        shape: {
            options: ['normal', 'rounded', 'circle', 'square']
        },
        onClick: { action: 'onClick' }
    }
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Default: Story = {};

export const Info: Story = {
    args: {
        variant: 'info'
    }
};

export const Success: Story = {
    args: {
        variant: 'success'
    }
};

export const Warning: Story = {
    args: {
        variant: 'warning'
    }
};

export const Danger: Story = {
    args: {
        variant: 'danger'
    }
};
