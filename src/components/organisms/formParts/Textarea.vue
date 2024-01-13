<script setup lang="ts">
import { computed, watch, ref } from 'vue';

const model = defineModel<string>();
const props = withDefaults(
    defineProps<{
        /**
         * 見出し
         */
        label?: string;
        /**
         * 見本
         */
        placeholder?: string;
        /**
         * 必須か
         */
        required?: boolean;
        /**
         * 無効か
         */
        disabled?: boolean;
        /**
         * デフォルト行数
         */
        line?: number;
        /**
         * 最小行数
         */
        minLine?: number | null;
        /**
         * 最大行数
         */
        maxLine?: number | null;
    }>(),
    {
        label: ' ',
        placeholder: '',
        required: false,
        disabled: false,
        line: 3
    }
);

const cssMinLine = computed(() => `${props.minLine ?? props.line}lh`);
const cssMaxLine = computed(() => (props.maxLine ? `${props.maxLine}lh` : null));
const textareaRef = ref();

watch(model, (value) => {
    let lines = (value + '\n').match(/\n/g)?.length ?? 1;
    textareaRef.value.style.height = lines + 'lh';
});
</script>

<template>
    <label class="custom-input-label">
        <textarea
            ref="textareaRef"
            v-model="model"
            class="textarea"
            placeholder=" "
            :required="required"
            :disabled="disabled"
            data-auto_height_textarea
        />
        <span class="custom-label"
            >{{ label
            }}<span v-if="placeholder" class="custom-placeholder"
                >（例：{{ placeholder }}）</span
            ></span
        >
    </label>
</template>

<style scoped>
.custom-input-label {
    position: relative;
    text-align: left;

    .textarea {
        display: flex;
        gap: 16px;
        align-items: center;
        justify-content: center;
        min-width: 100px;
        width: 100%;
        line-height: 1.5em;
        padding: 0 8px;
        border: 1px solid var(--color-theme-border);
        border-radius: 4px;
        /* field-sizing: content; 後に登場予定。まだ未実装 */
        resize: none;
        min-height: v-bind(cssMinLine);
        max-height: v-bind(cssMaxLine);
        background-color: var(--color-theme-bg-primary);
        transition:
            color 0.2s,
            background-color 0.2s,
            border-color 0.2s,
            opacity 0.2s;
        &:disabled {
            pointer-events: none;
            opacity: 0.5;
        }
    }
    .custom-label {
        position: absolute;
        top: 0.5em;
        left: 1em;
        color: var(--color-theme-border);
        background-color: var(--color-theme-bg-primary);
        height: 1em;
        line-height: 1em;
        pointer-events: none;
        transition: 0.2s;
        display: flex;
        align-items: baseline;

        .custom-placeholder {
            font-size: var(--font-size-small);
            color: var(--color-theme-border);
            height: 1em;
            line-height: 1em;
        }
    }

    [required] + .custom-label {
        &::before {
            position: absolute;
            left: -0.5em;
            color: var(--color-status-danger);
            content: '*';
        }
    }
    .textarea:not(:placeholder-shown) + .custom-label,
    .textarea:focus + .custom-label {
        top: -0.5em;
        left: 1.5em;
        font-size: var(--font-size-small);
        color: var(--color-theme-text-primary);
    }
}
</style>
