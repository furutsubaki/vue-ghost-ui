import Badge from '@/components/organisms/feedback/Badge.vue';
import type { Meta, StoryObj } from '@storybook/vue3';

const meta: Meta<typeof Badge> = {
    component: Badge,
    render: (args) => ({
        components: { Badge },
        setup() {
            return { args };
        },
        template: '<Badge v-bind="args">テキスト</Badge>'
    }),
    tags: ['autodocs'],
    args: {
        content: '10'
    }
};

export default meta;
type Story = StoryObj<typeof Badge>;

export const Default: Story = {};

export const PropsVariant: Story = {
    render: (args) => ({
        components: { Badge },
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
                        `<Badge variant="${param.variant}" v-bind="args">${param.variant}</Badge>`
                )
                .join('');
        })()
    })
};

export const PropsSize: Story = {
    render: (args) => ({
        components: { Badge },
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
                        `<Badge size="${param.size}" variant="info" v-bind="args">${param.size}</Badge>`
                )
                .join('');
        })()
    })
};

export const PropsShape: Story = {
    render: (args) => ({
        components: { Badge },
        setup: () => ({ args }),
        template: (() => {
            return [
                {
                    shape: 'normal'
                },
                {
                    shape: 'dot'
                }
            ]
                .map(
                    (param) => `<Badge shape="${param.shape}" v-bind="args">${param.shape}</Badge>`
                )
                .join('');
        })()
    })
};

export const PropsInline: Story = {
    args: {
        inline: true
    }
};

export const ContentOver99: Story = {
    args: {
        content: 1000
    }
};
