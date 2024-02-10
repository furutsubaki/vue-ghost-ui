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
    storyName: 'Props/Variant',
    render: () => ({
        components: { Button },
        template: `
            <Button variant="primary">primary</Button>
            <Button variant="secondary">secondary</Button>
            <Button variant="info">info</Button>
            <Button variant="success">success</Button>
            <Button variant="warning">warning</Button>
            <Button variant="danger">danger</Button>
        `
    })
};

export const PropsSize: Story = {
    storyName: 'Props/Variant',
    render: () => ({
        components: { Button },
        template: `
            <Button size="large">large</Button>
            <Button size="medium">medium</Button>
            <Button size="small">small</Button>
        `
    })
};

export const PropsShape: Story = {
    storyName: 'Props/Variant',
    render: () => ({
        components: { Button },
        template: `
            <Button shape="normal">normal</Button>
            <Button shape="rounded">rounded</Button>
            <Button shape="circle">circle</Button>
            <Button shape="square">square</Button>
        `
    })
};

export const LongText: Story = {
    args: {
        default: '長いテキストのケース'
    }
};
