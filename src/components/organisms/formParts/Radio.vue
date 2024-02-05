<script setup lang="ts">
import { computed, watch } from 'vue';
import { useField } from 'vee-validate';
import { ZodNumber, ZodString, ZodNullable } from 'zod';

interface Item {
    label: string;
    value: string | number | null;
    disabled?: boolean;
}

const model = defineModel<string | number>();
const props = withDefaults(
    defineProps<{
        /**
         * 項目
         */
        items: Item[];
        /**
         * フィールド名
         */
        name?: string;
        /**
         * zodスキーマ
         */
        schema?: ZodString | ZodNullable<ZodString> | ZodNumber | ZodNullable<ZodNumber>;
        /**
         * 見出し
         */
        label?: string;
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
         * エラーメッセージを表示するか
         */
        isErrorMessage?: boolean;
    }>(),
    {
        name: Math.random().toString(),
        schema: undefined,
        label: ' ',
        disabled: false,
        valiant: 'secondary',
        size: 'medium',
        isErrorMessage: true
    }
);

const { value, errors } = useField<string | number>(props.name);
const schemaChunks = computed(() => (props.schema as ZodString)?._def.checks || []);
const isRequired = computed(
    () => schemaChunks.value.some((check) => check.kind === 'min' && check.value === 1) || false
);

watch(value, (v) => {
    model.value = v;
});

if (!value.value && model.value) {
    value.value = model.value;
}
</script>

<template>
    <label class="component-radio">
        <div class="label-placeholder" :class="{ required: isRequired }">
            {{ label }}
        </div>
        <div class="item-label">
            <label
                class="input"
                :class="[valiant, size, { disabled: disabled || item.disabled }]"
                v-for="item in items"
                :key="item.label"
            >
                <input
                    v-model="value"
                    class="checkbox"
                    type="radio"
                    :value="item.value"
                    :name="name"
                    :disabled="disabled || item.disabled"
                />
                {{ item.label }}
            </label>
        </div>
        <template v-if="isErrorMessage">
            <div v-for="error in errors" :key="error" class="error">{{ error }}</div>
        </template>
    </label>
</template>

<style scoped>
.component-radio {
    position: relative;
    text-align: left;
    display: block;
    margin: 1em 0;
}

.label-placeholder {
    position: absolute;
    top: -1em;
    left: 0em;
    height: 1em;
    line-height: 1em;
    pointer-events: none;
    transition: 0.2s;
    display: flex;
    align-items: baseline;
    font-size: var(--font-size-small);
    color: var(--color-theme-text-primary);
    &.required {
        &::after {
            left: -0.5em;
            color: var(--color-status-danger);
            content: '*';
        }
    }
}

.item-label {
    position: relative;
    text-align: left;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    white-space: nowrap;

    .input {
        display: flex;
        gap: 16px;
        align-items: center;
        justify-content: flex-start;
        min-width: 100px;
        line-height: 1.5em;
        padding: 0 8px;
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
