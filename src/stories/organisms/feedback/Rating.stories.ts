import Rating from '@/components/organisms/feedback/Rating.vue';
import type { Meta, StoryObj } from '@storybook/vue3';

const meta: Meta<typeof Rating> = {
    component: Rating,
    render: (args) => ({
        components: { Rating },
        setup() {
            return { args };
        },
        template: '<Rating v-bind="args" />'
    }),
    tags: ['autodocs'],
    args: {
        modelValue: 3
    }
    // argTypes: {
    //     // TODO: 現状lintエラーの回避策なし
    //     // @ts-ignore
    //     'onUpdate:modelValue': { action: 'onUpdate:modelValue' }
    // }
};

export default meta;
type Story = StoryObj<typeof Rating>;

export const Default: Story = {};

export const PropsVariant: Story = {
    render: (args) => ({
        components: { Rating },
        setup: () => ({ args }),
        template: (() => {
            return [
                {
                    variant: 'dynamic'
                },
                {
                    variant: 'flat'
                }
            ]
                .map((param) => `<Rating variant="${param.variant}" v-bind="args" />`)
                .join('');
        })()
    })
};

export const PropsSize: Story = {
    render: (args) => ({
        components: { Rating },
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
                .map((param) => `<Rating size="${param.size}" v-bind="args" />`)
                .join('');
        })()
    })
};

export const PropsLength: Story = {
    args: {
        length: 3
    }
};
export const PropsHalf: Story = {
    args: {
        half: true
    }
};

export const PropsClearable: Story = {
    args: {
        clearable: true
    }
};

export const PropsReadonly: Story = {
    args: {
        readonly: true
    }
};
