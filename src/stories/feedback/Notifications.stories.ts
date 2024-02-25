import Notifications from '@/components/feedback/Notifications.vue';
import Button from '@/components/common/Button.vue';
import type { Meta, StoryObj } from '@storybook/vue3';
import useNotification, { type NotificationOption } from '@/composables/useNotification';

const meta: Meta<typeof Notifications> = {
    component: Notifications,
    render: (args) => ({
        components: { Notifications, Button },
        setup() {
            const { addNotification } = useNotification();
            return {
                args,
                onSetNotification: () => {
                    addNotification({
                        title: '通知',
                        message: 'テスト通知'
                    });
                }
            };
        },
        template: `
<Button @click="onSetNotification">Open Notifications</Button>
<Notifications />`
    }),
    args: {},
    tags: ['autodocs']
};

export default meta;
type Story = StoryObj<typeof Notifications>;

export const Default: Story = {};

export const ParamsVariant: Story = {
    render: (args) => ({
        components: { Notifications, Button },
        setup: () => {
            const { addNotification } = useNotification();
            return {
                args,
                onSetNotification: (param: NotificationOption) => {
                    addNotification({
                        ...param,
                        title: '通知',
                        message: 'テスト通知'
                    });
                },
                params: [
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
            };
        },
        template: `
<div v-for="param in params" :key="param.variant">
    <Button :variant="param.variant" @click="onSetNotification(param)">Open Notifications({{param.variant}})</Button>
</div>
<Notifications />`
    })
};

export const ParamsSize: Story = {
    render: (args) => ({
        components: { Notifications, Button },
        setup: () => {
            const { addNotification } = useNotification();
            return {
                args,
                onSetNotification: (param: NotificationOption) => {
                    addNotification({
                        ...param,
                        title: '通知',
                        message: 'テスト通知'
                    });
                },
                params: [
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
            };
        },
        template: `
<div v-for="param in params" :key="param.size">
    <Button @click="onSetNotification(param)">Open Notifications({{param.size}})</Button>
</div>
<Notifications />`
    })
};

export const ParamsShape: Story = {
    render: (args) => ({
        components: { Notifications, Button },
        setup: () => {
            const { addNotification } = useNotification();
            return {
                args,
                onSetNotification: (param: NotificationOption) => {
                    addNotification({
                        ...param,
                        title: '通知',
                        message: 'テスト通知'
                    });
                },
                params: [
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
            };
        },
        template: `
<div v-for="param in params" :key="param.shape">
    <Button @click="onSetNotification(param)">Open Notifications({{param.shape}})</Button>
</div>
<Notifications />`
    })
};

export const ParamsPosition: Story = {
    render: (args) => ({
        components: { Notifications, Button },
        setup: () => {
            const { addNotification } = useNotification();
            return {
                args,
                onSetNotification: (param: NotificationOption) => {
                    addNotification({
                        ...param,
                        title: '通知',
                        message: 'テスト通知'
                    });
                },
                params: [
                    {
                        position: 'top-left'
                    },
                    {
                        position: 'top-right'
                    },
                    {
                        position: 'bottom-right'
                    },
                    {
                        position: 'bottom-left'
                    }
                ]
            };
        },
        template: `
<div v-for="param in params" :key="param.position">
    <Button @click="onSetNotification(param)">Open Notifications({{param.position}})</Button>
</div>
<Notifications />`
    })
};

export const ParamsCloseable: Story = {
    render: (args) => ({
        components: { Notifications, Button },
        setup: () => {
            const { addNotification } = useNotification();
            return {
                args,
                onSetNotification: () => {
                    addNotification({
                        title: '通知',
                        message: 'テスト通知',
                        closeable: true
                    });
                }
            };
        },
        template: `
<Button @click="onSetNotification">Open Notifications</Button>
<Notifications />`
    })
};

export const ParamsAutoRemove: Story = {
    render: (args) => ({
        components: { Notifications, Button },
        setup: () => {
            const { addNotification } = useNotification();
            return {
                args,
                onSetNotification: () => {
                    addNotification({
                        title: '通知',
                        message: 'テスト通知',
                        autoRemove: false
                    });
                }
            };
        },
        template: `
<Button @click="onSetNotification">Open Notifications</Button>
<Notifications />`
    })
};
