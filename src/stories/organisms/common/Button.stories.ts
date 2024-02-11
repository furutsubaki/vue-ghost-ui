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
        onClick: { action: 'click' }
    }
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Default: Story = {};

export const PropsVariant: Story = {
    render: () => ({
        components: { Button },
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
                        `<Button variant="${param.variant}" v-bind="args">${param.variant}</Button>`
                )
                .join('');
        })()
    })
};

export const PropsSize: Story = {
    render: () => ({
        components: { Button },
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
                .map((param) => `<Button size="${param.size}" v-bind="args">${param.size}</Button>`)
                .join('');
        })()
    })
};

export const PropsShape: Story = {
    render: () => ({
        components: { Button },
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
                        `<Button shape="${param.shape}" v-bind="args">${param.shape}</Button>`
                )
                .join('');
        })()
    })
};

export const LongText: Story = {
    args: {
        default: '長いテキストのケース'
    }
};
