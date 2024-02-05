<script setup lang="ts">
import { computed, watch, ref } from 'vue';
import { useField } from 'vee-validate';
import { ZodString } from 'zod';
import InputTextCounter from '@/components/organisms/formParts/InputTextCounter.vue';

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
        valiant?: 'primary' | 'secondary' | 'info' | 'success' | 'warning' | 'danger';
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
        valiant: 'secondary',
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

const cssMinLine = computed(() => `${props.minLine ?? props.line}lh`);
const cssMaxLine = computed(() => (props.maxLine ? `${props.maxLine}lh` : null));
const textareaRef = ref();

watch(value, (v) => {
    model.value = v as string;
});

if (!value.value && model.value) {
    value.value = model.value;
}

watch(value, (value) => {
    let lines = (value + '\n').match(/\n/g)?.length ?? 1;
    textareaRef.value.style.height = lines + 'lh';
});
</script>

<template>
    <label class="component-textarea">
        <InputTextCounter v-if="max" class="counter" :text="value" :max="max" />
        <textarea
            ref="textareaRef"
            v-model="value"
            class="textarea"
            :class="[valiant, size]"
            placeholder=" "
            :name="name"
            :required="isRequired"
            :disabled="disabled"
        />
        <div class="label-placeholder">
            <span class="label">{{ label }}</span
            ><span v-if="placeholder" class="placeholder">（例：{{ placeholder }}）</span>
        </div>
        <template v-if="isErrorMessage">
            <div v-for="error in errors" :key="error" class="error">{{ error }}</div>
        </template>
    </label>
</template>

<style scoped>
.component-textarea {
    position: relative;
    text-align: left;
    display: block;
    margin: 1em 0;

    .counter {
        position: absolute;
        top: -1.5em;
        right: 0;
    }

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
    .label-placeholder {
        position: absolute;
        top: calc(50% - 0.5em);
        left: 1em;
        height: 1em;
        line-height: 1em;
        pointer-events: none;
        transition: 0.2s;
        display: flex;
        align-items: baseline;

        .label {
            transition: color 0.2s;
            color: var(--color-theme-border);
            height: 1em;
            line-height: 1em;
        }

        .placeholder {
            font-size: var(--font-size-small);
            color: var(--color-theme-border);
            height: 1em;
            line-height: 1em;
        }
    }

    [required] + .label-placeholder > .label {
        &::after {
            left: -0.5em;
            color: var(--color-status-danger);
            content: '*';
        }
    }
    .textarea:not(:placeholder-shown) + .label-placeholder,
    .textarea:focus + .label-placeholder {
        top: -1em;
        left: 0em;
        font-size: var(--font-size-small);
        .label {
            color: var(--color-theme-text-primary);
        }
    }
}

.primary {
    color: var(--color-base-white);
    background-color: var(--color-theme-active);
    border-color: var(--color-theme-active);

    &:focus {
        border-color: var(--color-theme-active);
    }

    @media (hover: hover) {
        &:hover {
            color: var(--color-theme-active);
            background-color: transparent;
            border-color: var(--color-theme-active);
        }
    }

    @media (hover: none) {
        &:active {
            color: var(--color-theme-active);
            background-color: transparent;
            border-color: var(--color-theme-active);
        }
    }
}

.secondary {
    color: var(--color-theme-text-primary);
    background-color: transparent;
    border-color: var(--color-theme-border);

    &:focus {
        border-color: var(--color-theme-active);
    }

    @media (hover: hover) {
        &:hover {
            background-color: transparent;
            border-color: var(--color-theme-active);
        }
    }

    @media (hover: none) {
        &:active {
            background-color: transparent;
            border-color: var(--color-theme-active);
        }
    }
}

.info {
    color: var(--color-theme-text-primary);
    background-color: var(--color-status-info);
    border-color: var(--color-status-info);

    &:focus {
        border-color: var(--color-theme-info);
    }

    @media (hover: hover) {
        &:hover {
            background-color: transparent;
            border-color: var(--color-status-info);
        }
    }

    @media (hover: none) {
        &:active {
            background-color: transparent;
            border-color: var(--color-status-info);
        }
    }
}

.success {
    color: var(--color-base-white);
    background-color: var(--color-status-success);
    border-color: var(--color-status-success);

    &:focus {
        border-color: var(--color-theme-success);
    }

    @media (hover: hover) {
        &:hover {
            background-color: transparent;
            border-color: var(--color-status-success);
        }
    }

    @media (hover: none) {
        &:active {
            background-color: transparent;
            border-color: var(--color-status-success);
        }
    }
}

.warning {
    color: var(--color-base-black);
    background-color: var(--color-status-warning);
    border-color: var(--color-status-warning);

    &:focus {
        border-color: var(--color-theme-warning);
    }

    @media (hover: hover) {
        &:hover {
            background-color: transparent;
            border-color: var(--color-status-warning);
        }
    }

    @media (hover: none) {
        &:active {
            background-color: transparent;
            border-color: var(--color-status-warning);
        }
    }
}

.danger {
    color: var(--color-base-white);
    background-color: var(--color-status-danger);
    border-color: var(--color-status-danger);

    &:focus {
        border-color: var(--color-theme-danger);
    }

    @media (hover: hover) {
        &:hover {
            background-color: transparent;
            border-color: var(--color-status-danger);
        }
    }

    @media (hover: none) {
        &:active {
            background-color: transparent;
            border-color: var(--color-status-danger);
        }
    }
}

.large {
    height: 40px;
    font-size: var(--font-size-large);
}

.medium {
    height: 32px;
    font-size: var(--font-size-common);
}

.small {
    height: 24px;
    font-size: var(--font-size-small);
}

.error {
    font-size: var(--font-size-small);
    color: var(--color-status-danger);
}
</style>
