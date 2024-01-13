import { SetupContext, watch } from 'vue'
import { Preview } from '@storybook/vue3'
import { useArgs } from '@storybook/preview-api'
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

      // v-model対応
      // TODO: https://github.com/storybookjs/storybook/issues/14259
      const [args, updateArgs] = useArgs();
      if ('modelValue' in args) {
        const update = args['onUpdate:model-value'] || args['onUpdate:modelValue'];
        args['onUpdate:model-value'] = undefined;
        args['onUpdate:modelValue'] = (...vals) => {
          update?.(...vals);
          /**
           * Arg with `undefined` will be deleted by `deleteUndefined()`, then loss of reactive
           * @see {@link https://github.com/storybookjs/storybook/blob/next/code/lib/preview-api/src/modules/store/ArgsStore.ts#L63}
           */
          const modelValue = vals[0] === undefined ? null : vals[0];
          updateArgs({ modelValue });
        };
      }
      return story({ ...context, updateArgs });
    }
  ]
}

export default preview
