import Alert from '@/components/organisms/feedback/Alert.vue';
import type { Meta, StoryObj } from '@storybook/vue3';
import { Pen as IconPen } from 'lucide-vue-next';

const meta: Meta<typeof Alert> = {
    component: Alert,
    render: (args) => ({
        components: { Alert },
        setup() {
            return { args };
        },
        template: '<Alert v-bind="args" />'
    }),
    tags: ['autodocs'],
    args: {
        text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
    },
    argTypes: {
        // TODO: script setupに未対応のため二重定義
        onClosed: { action: 'closed' }
    }
};

export default meta;
type Story = StoryObj<typeof Alert>;

export const Default: Story = {};

export const PropsVariant: Story = {
    render: (args) => ({
        components: { Alert },
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
                        `<Alert variant="${param.variant}" title="${param.variant}" v-bind="args" />`
                )
                .join('');
        })()
    })
};

export const PropsSize: Story = {
    render: (args) => ({
        components: { Alert },
        setup: () => ({ args }),
        template: (() => {
            return [
                {
                    size: 'large',
                    variant: 'info'
                },
                {
                    size: 'medium',
                    variant: 'info'
                },
                {
                    size: 'small',
                    variant: 'info'
                }
            ]
                .map(
                    (param) =>
                        `<Alert size="${param.size}" variant="${param.variant}" title="${param.size}" v-bind="args" />`
                )
                .join('');
        })()
    })
};

export const PropsShape: Story = {
    render: (args) => ({
        components: { Alert },
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
                        `<Alert shape="${param.shape}" title="${param.shape}" v-bind="args" />`
                )
                .join('');
        })()
    })
};

export const PropsIcon: Story = {
    args: {
        icon: IconPen
    }
};
export const PropsTitle: Story = {
    args: {
        title: 'Sample Alert'
    }
};

export const PropsCloseable: Story = {
    args: {
        closeable: true
    }
};
