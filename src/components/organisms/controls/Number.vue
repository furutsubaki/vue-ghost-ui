<script setup lang="ts">
import { computed, watch, ref } from 'vue';
import { useField } from 'vee-validate';
import { ZodNumber } from 'zod';
import InputFrame from '@/components/organisms/inner-parts/InputFrame.vue';
import { XCircle as IconXCircle } from 'lucide-vue-next';

const model = defineModel<number>();
const props = withDefaults(
    defineProps<{
        /**
         * フィールド名
         */
        name?: string;
        /**
         * zodスキーマ
         */
        schema?: ZodNumber;
        /**
         * 見出し
         */
        label?: string;
        /**
         * 削除ボタン
         */
        clearable?: boolean;
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
         * エラーメッセージを表示するか
         */
        isErrorMessage?: boolean;
    }>(),
    {
        name: Math.random().toString(),
        schema: undefined,
        label: ' ',
        clearable: false,
        placeholder: '',
        disabled: false,
        type: 'text',
        variant: 'secondary',
        size: 'medium',
        isErrorMessage: true
    }
);

const { value, errors } = useField<number>(props.name);
const schemaChunks = computed(() => props.schema?._def.checks || []);
const isRequired = computed(
    () => schemaChunks.value.some((check) => check.kind === 'min' && check.value === 1) || false
);

watch(value, (v) => {
    model.value = v;
});

// NOTE: 曖昧一致により、nullとundefinedを判定し、0は判定外とする
if (value.value == null && model.value != null) {
    value.value = model.value;
}

const isFocus = ref(false);
const onDelete = () => {
    value.value = '' as unknown as number;
};
</script>

<template>
    <label class="component-number" :class="[variant, size]">
        <InputFrame
            :label="label"
            :placeholder="placeholder"
            :required="isRequired"
            :disabled="disabled"
            :variant="variant"
            :size="size"
            :is-focus="isFocus"
            :value="value"
            :isErrorMessage="isErrorMessage"
            :errors="errors"
        >
            <input
                v-model.number.trim="value"
                class="number"
                placeholder=" "
                type="number"
                :name="name"
                :required="isRequired"
                :disabled="disabled"
                @focus="isFocus = true"
                @blur="isFocus = false"
            />
            <div class="clearable-box" v-if="clearable">
                <IconXCircle
                    v-show="value != null && (value as unknown as string) !== ''"
                    @click="onDelete"
                />
            </div>
        </InputFrame>
    </label>
</template>

<style scoped>
.component-number {
    width: 100%;
    min-height: var(--height);

    :where(.number) {
        min-width: 100px;
        width: 100%;
        line-height: 1.5em;
        background-color: transparent;
        color: var(--color-theme-text-primary);
        border: 0;
        padding: 0;
    }

    @media (hover: hover) {
        /* PC */
        &.is-focus,
        &:hover {
            .clearable-box {
                .lucide {
                    opacity: 1;
                }
            }
        }
    }

    @media (hover: none) {
        /* mobile */
        &.is-focus,
        &:active {
            .clearable-box {
                .lucide {
                    opacity: 1;
                }
            }
        }
    }
    .clearable-box {
        width: var(--font-size);
        .lucide {
            opacity: 0;
            transition: opacity 0.2s;
        }
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
