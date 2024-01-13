import { Preview } from '@storybook/vue3'
import '@acab/reset.css'
import '../src/assets/css/style.css'
import '../src/assets/css/variables.css'

const preview: Preview = {
  parameters: {},
  decorators: [
    (story, context) => {
      // 背景色をcss変数と同期させる
      const currentBackground = context.globals.backgrounds?.value
      const backgrounds = context.parameters.backgrounds.values
      const currentBackgroundData = backgrounds.find(
        (background) => background.value === currentBackground
      )
      document.documentElement.dataset.theme = currentBackgroundData?.name || 'light'

      return {
        components: { story },
        template: '<story />',
      }
    }
  ]
}

export default preview
