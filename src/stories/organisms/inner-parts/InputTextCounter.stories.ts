import InputTextCounter from '@/components/organisms/inner-parts/InputTextCounter.vue';
import type { Meta, StoryObj } from '@storybook/vue3';

const meta: Meta<typeof InputTextCounter> = {
    component: InputTextCounter,
    render: (args) => ({
        components: { InputTextCounter },
        setup() {
            return { args };
        },
        template: '<InputTextCounter v-bind="args" />'
    }),
    tags: ['autodocs']
};

export default meta;
type Story = StoryObj<typeof InputTextCounter>;

export const Default: Story = {
    args: {
        text: '入力文字',
        max: 50
    }
};
