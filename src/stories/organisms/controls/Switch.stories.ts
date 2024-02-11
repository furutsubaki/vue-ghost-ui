import Switch from '@/components/organisms/controls/Switch.vue';
import useFormData from '@/composables/useFormData';
import type { Meta, StoryObj } from '@storybook/vue3';
import { literal, object } from 'zod';
import { X as IconX, Check as IconCheck } from 'lucide-vue-next';

const TEST_SCHEMA = object({
    test: literal(true)
}).required();

const meta: Meta<typeof Switch> = {
    component: Switch,
    render: (args) => ({
        components: { Switch },
        setup() {
            useFormData(TEST_SCHEMA, { test: false });
            return { args };
        },
        template: '<Switch v-bind="args">{{ args.default }}</Switch>'
    }),
    tags: ['autodocs'],
    args: {
        modelValue: false,
        default: '規約に同意'
    },
    argTypes: {
        // TODO: 現状lintエラーの回避策なし
        // @ts-ignore
        'onUpdate:modelValue': { action: 'onUpdate:modelValue' }
    }
};

export default meta;
type Story = StoryObj<typeof Switch>;

export const Default: Story = {
    args: {
        value: true
    }
};

export const PropsVariant: Story = {
    render: (args) => ({
        components: { Switch },
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
                        `<Switch variant="${param.variant}" v-bind="args">${param.variant}</Switch>`
                )
                .join('');
        })()
    }),
    args: { ...Default.args }
};

export const PropsSize: Story = {
    render: (args) => ({
        components: { Switch },
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
                .map((param) => `<Switch size="${param.size}" v-bind="args">${param.size}</Switch>`)
                .join('');
        })()
    }),
    args: { ...Default.args }
};

export const PropsLabel: Story = {
    args: {
        ...Default.args,
        modelValue: true,
        label: 'Switch'
    }
};

export const PropsDisabled: Story = {
    args: {
        ...Default.args,
        disabled: true
    }
};

export const PropsSlot: Story = {
    args: {
        ...Default.args
    },
    render: (args) => ({
        components: { Switch, IconX, IconCheck },
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
                        `<Switch variant="${param.variant}" v-bind="args">${param.variant}<template #switchIconTrue><IconCheck /></template><template #switchIconFalse><IconX /></template></Switch>`
                )
                .join('');
        })()
    })
};

export const Schema: Story = {
    args: {
        ...PropsLabel.args,
        name: 'test',
        schema: TEST_SCHEMA.shape.test
    }
};
