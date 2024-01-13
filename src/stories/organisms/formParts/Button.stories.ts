import Button from '../../../components/organisms/formParts/Button.vue'
import type { Meta, StoryObj } from '@storybook/vue3'

const meta: Meta<typeof Button> = {
    component: Button,
  render: (args) => ({
    components: { Button },
    setup() {
      return { args }
    },
    template: '<Button v-bind="args">ボタン</Button>'
  }),
}

export default meta
type Story = StoryObj<typeof Button>

export const Default: Story = {
  args: {
    // valiant: 'secondary',
    // size: 'medium',
    // shape: 'normal'
  }
}

export const Primary: Story = {
  args: {
    valiant: 'primary'
  }
}

export const Secondary: Story = {
  args: {
    valiant: 'secondary'
  }
}
