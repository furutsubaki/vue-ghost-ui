import { ref } from 'vue';
import Frame from '@/components/frame/Frame.vue';
import type { Meta, StoryObj } from '@storybook/vue3';

const meta: Meta<typeof Frame> = {
    component: Frame,
    render: (args) => ({
        components: { Frame },
        setup() {
            return { args };
        },
        template:
            '<Frame v-bind="args" style="width:250px; height: 250px;"><div style="width:100%; height: 100%;background-color: var(--color-theme-bg-secondary); display: flex;align-items: center; justify-content: center;">Contents</div></Frame>'
    }),
    tags: ['autodocs'],
    args: {},
    argTypes: {}
};

export default meta;
type Story = StoryObj<typeof Frame>;

export const Default: Story = {};

export const PropsLayout: Story = {
    render: (args) => ({
        components: { Frame },
        setup: () => ({
            args,
            params: ref([
                {
                    layout: 'pf-default'
                },
                {
                    layout: 'pf-width'
                },
                {
                    layout: 'pf-height'
                },
                {
                    layout: 'pf-top'
                },
                {
                    layout: 'pf-right'
                },
                {
                    layout: 'pf-bottom'
                },
                {
                    layout: 'pf-left'
                }
            ])
        }),
        template:
            '<Frame v-for="param in params" :key="param.layout" v-bind="{...args, ...param}" style="width:250px; height: 250px;"><div style="width:100%; height: 100%;background-color: var(--color-theme-bg-secondary); display: flex;align-items: center; justify-content: center;">{{param.layout}}</div></Frame>'
    }),
    args: { ...Default.args }
};

export const PropsTag: Story = {
    args: {
        tag: 'div'
    }
};

export const PropsIsPading: Story = {
    args: {
        isPading: true
    }
};
