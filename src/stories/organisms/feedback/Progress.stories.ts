import Progress from '@/components/organisms/feedback/Progress.vue';
import type { Meta, StoryObj } from '@storybook/vue3';
import { Pen as IconPen } from 'lucide-vue-next';

const meta: Meta<typeof Progress> = {
    component: Progress,
    render: (args) => ({
        components: { Progress, IconPen },
        setup() {
            return { args };
        },
        template: '<Progress v-bind="args" />'
    }),
    tags: ['autodocs'],
    args: {
        modelValue: 10
    }
};

export default meta;
type Story = StoryObj<typeof Progress>;

export const Default: Story = {};

export const PropsVariant: Story = {
    render: (args) => ({
        components: { Progress },
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
                .map((param) => `<Progress variant="${param.variant}" v-bind="args" />`)
                .join('');
        })()
    })
};

export const PropsSizeAndShape: Story = {
    render: (args) => ({
        components: { Progress },
        setup: () => ({ args }),
        template: (() => {
            return [
                {
                    size: 'large',
                    shape: 'line'
                },
                {
                    size: 'medium',
                    shape: 'line'
                },
                {
                    size: 'small',
                    shape: 'line'
                },
                {
                    size: 'large',
                    shape: 'circle'
                },
                {
                    size: 'medium',
                    shape: 'circle'
                },
                {
                    size: 'small',
                    shape: 'circle'
                }
            ]
                .map(
                    (param) =>
                        `<Progress size="${param.size}" shape="${param.shape}" variant="info" v-bind="args" />`
                )
                .join('');
        })()
    })
};

export const PropsMax: Story = {
    args: {
        max: 1000
    }
};

export const PropsNoText: Story = {
    args: {
        noText: true
    }
};

export const CustomSlot: Story = {
    render: (args) => ({
        components: { Progress, IconPen },
        setup() {
            return { args };
        },
        template: '<Progress v-bind="args"><IconPen /></Progress>'
    })
};
