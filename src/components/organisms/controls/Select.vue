<script setup lang="ts">
import { computed, watch } from 'vue';
import { useField } from 'vee-validate';
import { ZodNumber, ZodString, ZodBoolean } from 'zod';

interface Item {
    label: string;
    value: string | number | boolean;
    disabled?: boolean;
}

const model = defineModel<string | number | boolean>();
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
        schema?: ZodBoolean | ZodString | ZodNumber;
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

const { value, errors } = useField<string | number | boolean>(props.name);
const schemaChunks = computed(() => (props.schema as ZodString)?._def.checks || []);
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
</script>

<template>
    <div class="component-select-group">
        <div class="label-placeholder" :class="{ required: isRequired }">
            {{ label }}
        </div>
        <select
            class="select"
            :class="[valiant, size]"
            v-model="value"
            :name="name"
            :disabled="disabled"
        >
            <option
                v-for="item in items"
                :key="item.label"
                :value="item.value"
                :disabled="item.disabled"
            >
                {{ item.label }}
            </option>
        </select>
        <template v-if="isErrorMessage">
            <div v-for="error in errors" :key="error" class="error">{{ error }}</div>
        </template>
    </div>
</template>

<style scoped>
.component-select-group {
    position: relative;
    text-align: left;
    padding: 8px 0;
    .select {
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
}

.label-placeholder {
    position: absolute;
    top: -0.5em;
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
