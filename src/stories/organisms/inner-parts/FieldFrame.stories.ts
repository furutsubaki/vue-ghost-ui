import FieldFrame from '@/components/organisms/inner-parts/FieldFrame.vue';
import type { Meta, StoryObj } from '@storybook/vue3';

const meta: Meta<typeof FieldFrame> = {
    component: FieldFrame,
    render: (args) => ({
        components: { FieldFrame },
        setup() {
            return { args };
        },
        template: '<FieldFrame v-bind="args" />'
    }),
    tags: ['autodocs'],
    args: {},
    argTypes: {}
};

export default meta;
type Story = StoryObj<typeof FieldFrame>;

export const Default: Story = {};

export const PropsVariant: Story = {
    render: (args) => ({
        components: { FieldFrame },
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
                        `<FieldFrame variant="${param.variant}" label="${param.variant}" v-bind="args" />`
                )
                .join('');
        })()
    }),
    args: { ...Default.args }
};

export const PropsSize: Story = {
    render: (args) => ({
        components: { FieldFrame },
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
                        `<FieldFrame size="${param.size}" label="${param.size}" v-bind="args" />`
                )
                .join('');
        })()
    }),
    args: { ...Default.args }
};

export const PropsShape: Story = {
    render: (args) => ({
        components: { FieldFrame },
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
                        `<FieldFrame shape="${param.shape}" label="${param.shape}" v-bind="args" />`
                )
                .join('');
        })()
    }),
    args: { ...Default.args }
};

export const PropsLabel: Story = {
    args: {
        label: '名前'
    }
};

export const PropsPlaceholder: Story = {
    args: {
        ...PropsLabel.args,
        placeholder: '山田 太郎'
    }
};

export const PropsRequired: Story = {
    args: {
        ...PropsLabel.args,
        required: true
    }
};

export const PropsDisabled: Story = {
    args: {
        ...PropsLabel.args,
        disabled: true
    }
};

export const TextCounter: Story = {
    args: {
        ...PropsLabel.args,
        value: 'test',
        maxLength: 100
    }
};

export const FocusAndInputed: Story = {
    args: {
        ...PropsLabel.args,
        isFocus: true
    }
};

export const Erorrs: Story = {
    args: {
        ...PropsLabel.args,
        errors: ['エラーテキスト', 'エラーテキスト2']
    }
};
