import { StorybookConfig } from '@storybook/vue3-vite'

const config: StorybookConfig = {
    framework: {
        name: '@storybook/vue3-vite',
        options: {
            docgen: "vue-component-meta"
        },
    },
    stories: ['../src/**/*.stories.@(js|ts)'],

    addons: [
        '@storybook/addon-controls',
        '@storybook/addon-actions',
        '@storybook/addon-viewport',
        '@storybook/addon-backgrounds',
        '@storybook/addon-measure',
        '@storybook/addon-outline',
        '@storybook/addon-docs'
    ],

    docs: {
        autodocs: true
    }
}

export default config
