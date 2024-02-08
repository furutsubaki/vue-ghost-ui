<script setup lang="ts">
import { computed, watch, ref, onMounted } from 'vue';
import { useField } from 'vee-validate';
import { ZodString } from 'zod';
import InputFrame from '@/components/organisms/inner-parts/InputFrame.vue';

const model = defineModel<string>();
const props = withDefaults(
    defineProps<{
        /**
         * フィールド名
         */
        name?: string;
        /**
         * zodスキーマ
         */
        schema?: ZodString;
        /**
         * 見出し
         */
        label?: string;
        /**
         * 見本
         */
        placeholder?: string;
        /**
         * 無効か
         */
        disabled?: boolean;
        /**
         * 表示種類
         */
        variant?: 'primary' | 'secondary' | 'info' | 'success' | 'warning' | 'danger';
        /**
         * サイズ
         */
        size?: 'small' | 'medium' | 'large';
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
        /**
         * エラーメッセージを表示するか
         */
        isErrorMessage?: boolean;
    }>(),
    {
        name: Math.random().toString(),
        schema: undefined,
        label: ' ',
        placeholder: '',
        disabled: false,
        variant: 'secondary',
        size: 'medium',
        line: 3,
        isErrorMessage: true
    }
);

const { value, errors } = useField<string>(props.name);
const schemaChunks = computed(() => props.schema?._def.checks || []);
const isRequired = computed(
    () => schemaChunks.value.some((check) => check.kind === 'min' && check.value === 1) || false
);
const max = computed(
    () =>
        (
            schemaChunks.value.find((check) => check.kind === 'max') as {
                kind: 'max';
                value: number;
                message?: string;
            }
        )?.value || null
);

const cssMinLine = computed(() => `calc(${props.minLine ?? props.line}lh + 0.5em)`);
const cssMaxLine = computed(() => (props.maxLine ? `calc(${props.maxLine}lh + 0.5em)` : null));
const inputFrameRef = ref();
const textareaRef = ref();

watch(value, (v) => {
    model.value = v;
});

// NOTE: 曖昧一致により、nullとundefinedを判定し、0は判定外とする
if (value.value == null && model.value != null) {
    value.value = model.value;
}

const setLines = (value: string) => {
    const lines = (value + '\n').match(/\n/g)?.length ?? 1;
    inputFrameRef.value.frameRef.style.height = `calc(${lines}lh + 0.5em)`;
    textareaRef.value.style.height = `calc(${lines}lh + 0.5em)`;
};

watch(value, (value) => {
    setLines(value);
});

const isFocus = ref(false);

onMounted(() => {
    setLines(value.value);
});
</script>

<template>
    <label class="component-textarea" :class="[variant, size]">
        <InputFrame
            ref="inputFrameRef"
            class="component-input-frame"
            :label="label"
            :placeholder="placeholder"
            :required="isRequired"
            :disabled="disabled"
            :variant="variant"
            :size="size"
            :is-focus="isFocus"
            :maxLength="max"
            :value="value"
            :isErrorMessage="isErrorMessage"
            :errors="errors"
        >
            <textarea
                ref="textareaRef"
                v-model="value"
                class="textarea"
                placeholder=" "
                :name="name"
                :required="isRequired"
                :disabled="disabled"
                @focus="isFocus = true"
                @blur="isFocus = false"
            />
        </InputFrame>
    </label>
</template>

<style scoped>
.component-textarea {
    width: 100%;
    min-height: var(--height);

    :deep(.component-input-frame) .frame-box {
        min-height: v-bind(cssMinLine);
        max-height: v-bind(cssMaxLine);
    }

    :where(.textarea) {
        vertical-align: text-top;
        min-width: 100px;
        width: 100%;
        line-height: 1.5em;
        /* field-sizing: content; 後に登場予定。まだ未実装 */
        resize: none;
        min-height: v-bind(cssMinLine);
        max-height: v-bind(cssMaxLine);
        background-color: transparent;
        color: var(--color-theme-text-primary);
        border: 0;
        padding: 0;
    }
}

.large {
    --height: 40px;
    font-size: var(--font-size-large);
}

.medium {
    --height: 32px;
    font-size: var(--font-size-common);
}

.small {
    --height: 24px;
    font-size: var(--font-size-small);
}
</style>
