<script setup lang="ts">
import { computed, watch, ref } from 'vue';
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
         * 種類
         */
        type?: 'text' | 'email' | 'password';
        /**
         * 表示種類
         */
        variant?: 'primary' | 'secondary' | 'info' | 'success' | 'warning' | 'danger';
        /**
         * サイズ
         */
        size?: 'small' | 'medium' | 'large';
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
        type: 'text',
        variant: 'secondary',
        size: 'medium',
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

watch(value, (v) => {
    model.value = v;
});

// NOTE: 曖昧一致により、nullとundefinedを判定し、0は判定外とする
if (value.value == null && model.value != null) {
    value.value = model.value;
}

const isFocus = ref(false);
</script>

<template>
    <label class="component-input" :class="[variant, size]">
        <InputFrame
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
            <input
                v-model.trim="value"
                class="input"
                placeholder=" "
                :type="type"
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
.component-input {
    width: 100%;
    min-height: var(--height);
    :where(.input) {
        min-width: 100px;
        width: 100%;
        line-height: 1.5em;
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
