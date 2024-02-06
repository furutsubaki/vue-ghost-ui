<script setup lang="ts">
import { computed, watch, ref } from 'vue';
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

const isOpen = ref(false);
const selectedItem = computed(
    () => props.items.find((item) => item.value === value.value) ?? { label: '', value: null }
);
const onSelectItem = (item: Item) => {
    value.value = item.value;
    isOpen.value = false;
};
</script>

<template>
    <div class="component-select-group">
        <div class="label-placeholder" :class="{ required: isRequired }">
            {{ label }}
        </div>
        <div
            class="select"
            :class="[valiant, size, { 'is-focus': isOpen }]"
            :name="name"
            :disabled="disabled"
            @click="isOpen = !isOpen"
        >
            <span>{{ selectedItem.label }}</span>
            <span class="select-icon">▼</span>
        </div>
        <div class="select-list" :class="{ 'is-open': isOpen }">
            <div class="select-list-body">
                <div
                    class="select-list-item"
                    :class="{ 'is-selected': selectedItem.value === item.value }"
                    v-for="item in items"
                    :key="item.label"
                    :value="item.value"
                    :disabled="item.disabled"
                    @click="onSelectItem(item)"
                >
                    {{ item.label }}
                </div>
            </div>
        </div>
        <!-- <select
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
        </select> -->
        <template v-if="isErrorMessage">
            <div v-for="error in errors" :key="error" class="error">{{ error }}</div>
        </template>
    </div>
</template>

<style scoped>
.component-select-group {
    position: relative;
    text-align: left;
    padding: 1em 0;
    :where(.select) {
        display: flex;
        gap: 16px;
        align-items: center;
        justify-content: space-between;
        min-width: 100px;
        width: 100%;
        line-height: 1.5em;
        padding: 0 8px;
        border: 1px solid var(--color-theme-border);
        border-radius: 4px;
        color: var(--color-theme-text-primary);
        background-color: transparent;
        transition:
            color 0.2s,
            background-color 0.2s,
            border-color 0.2s,
            opacity 0.2s;
        &:disabled {
            pointer-events: none;
            opacity: 0.5;
        }
        .select-icon {
            color: var(--color-theme-text-secondary);
            font-size: var(--font-size-small);
            transition: transform 0.2s;
        }
        &.is-focus .select-icon {
            transform: rotateX(180deg);
        }
    }
    :where(.select-list) {
        position: absolute;
        min-width: 100px;
        width: 100%;
        line-height: 1.5em;
        border: 1px solid var(--color-theme-border);
        border-radius: 4px;
        color: var(--color-theme-text-primary);
        display: grid;
        grid-template-rows: 0fr;
        transition:
            color 0.2s,
            background-color 0.2s,
            border-color 0.2s,
            opacity 0.2s,
            grid-template-rows 0.2s ease;
        max-height: 50vh;
        overflow-y: auto;
        background-color: var(--color-theme-bg-primary);
        z-index: 1;
        &.is-open {
            grid-template-rows: 1fr;
        }
        .select-list-body {
            overflow: hidden;
            .select-list-item {
                padding: 0 8px;
                @media (hover: hover) {
                    &:hover {
                        background-color: var(--color-theme-bg-secondary);
                    }
                }

                @media (hover: none) {
                    &:active {
                        background-color: var(--color-theme-bg-secondary);
                    }
                }
                &.is-selected {
                    background-color: var(--color-theme-bg-secondary);
                }
            }
        }
    }
}

.label-placeholder {
    position: absolute;
    top: 0;
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
    border-color: var(--color-theme-active);

    &.is-focus,
    &:focus {
        border-color: var(--color-theme-active);
    }

    @media (hover: hover) {
        &:hover {
            border-color: var(--color-theme-active);
        }
    }

    @media (hover: none) {
        &:active {
            border-color: var(--color-theme-active);
        }
    }
}

.secondary {
    border-color: var(--color-theme-border);

    &.is-focus,
    &:focus {
        border-color: var(--color-theme-active);
    }

    @media (hover: hover) {
        &:hover {
            border-color: var(--color-theme-active);
        }
    }

    @media (hover: none) {
        &:active {
            border-color: var(--color-theme-active);
        }
    }
}

.info {
    border-color: var(--color-status-info);

    &.is-focus,
    &:focus {
        border-color: var(--color-status-info);
    }

    @media (hover: hover) {
        &:hover {
            border-color: var(--color-status-info);
        }
    }

    @media (hover: none) {
        &:active {
            border-color: var(--color-status-info);
        }
    }
}

.success {
    border-color: var(--color-status-success);

    &.is-focus,
    &:focus {
        border-color: var(--color-status-success);
    }

    @media (hover: hover) {
        &:hover {
            border-color: var(--color-status-success);
        }
    }

    @media (hover: none) {
        &:active {
            border-color: var(--color-status-success);
        }
    }
}

.warning {
    border-color: var(--color-status-warning);

    &.is-focus,
    &:focus {
        border-color: var(--color-status-warning);
    }

    @media (hover: hover) {
        &:hover {
            border-color: var(--color-status-warning);
        }
    }

    @media (hover: none) {
        &:active {
            border-color: var(--color-status-warning);
        }
    }
}

.danger {
    border-color: var(--color-status-danger);

    &.is-focus,
    &:focus {
        border-color: var(--color-status-danger);
    }

    @media (hover: hover) {
        &:hover {
            border-color: var(--color-status-danger);
        }
    }

    @media (hover: none) {
        &:active {
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
