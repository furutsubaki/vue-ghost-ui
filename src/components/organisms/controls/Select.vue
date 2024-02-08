<script setup lang="ts">
import { computed, watch, ref } from 'vue';
import { useField } from 'vee-validate';
import { ZodNumber, ZodString, ZodBoolean } from 'zod';
import InputFrame from '@/components/organisms/inner-parts/InputFrame.vue';
import InputAccordionList from '@/components/organisms/inner-parts/InputAccordionList.vue';
import { ChevronDown as IconChevronDown } from 'lucide-vue-next';

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
        variant?: 'primary' | 'secondary' | 'info' | 'success' | 'warning' | 'danger';
        /**
         * サイズ
         */
        size?: 'small' | 'medium' | 'large';
        /**
         * ポジション
         */
        position?: 'top' | 'bottom';
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
        variant: 'secondary',
        size: 'medium',
        position: 'bottom',
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

const onChange = (event: string | number | boolean) => {
    value.value = event;
};

const selectRef = ref();
</script>

<template>
    <div ref="selectRef" class="component-select-group" :class="[variant, size, position]">
        <InputFrame
            :label="label"
            :required="isRequired"
            :disabled="disabled"
            :variant="variant"
            :size="size"
            :is-focus="isOpen"
            :value="value"
            :isErrorMessage="isErrorMessage"
            :errors="errors"
        >
            <div
                class="select"
                :class="{ 'is-focus': isOpen }"
                :name="name"
                :disabled="disabled"
                @click="isOpen = !isOpen"
            >
                <span>{{ selectedItem.label }}</span>
                <IconChevronDown class="select-icon" />
            </div>
            <InputAccordionList
                v-model="isOpen"
                :items="items"
                :value="value"
                :parentRef="selectRef"
                :variant="variant"
                :size="size"
                :position="position"
                @change="onChange"
            />
        </InputFrame>
    </div>
</template>

<style scoped>
.component-select-group {
    width: 100%;
    min-height: var(--height);
    :where(.select) {
        cursor: pointer;
        display: flex;
        gap: 16px;
        align-items: center;
        justify-content: space-between;
        min-width: 100px;
        width: 100%;
        line-height: 1.5em;
        color: var(--color-theme-text-primary);
        background-color: transparent;
        border: 0;
        padding: 0;
        .select-icon {
            color: var(--color-theme-text-secondary);
            font-size: var(--font-size-small);
            transition: transform 0.2s;
        }
        &.is-focus .select-icon {
            transform: rotateZ(180deg);
        }
    }
    :where(.select-list) {
        cursor: pointer;
        position: absolute;
        left: -8px;
        right: -8px;
        min-width: 100px;
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
            grid-template-rows 0.2s ease,
            opacity 0s 0.2s;
        max-height: 50vh;
        background-color: var(--color-theme-bg-primary);
        z-index: 1;
        opacity: 0;
        &.is-open {
            grid-template-rows: 1fr;
            opacity: 1;
            transition:
                color 0.2s,
                background-color 0.2s,
                border-color 0.2s,
                opacity 0.2s,
                grid-template-rows 0.2s ease;
        }
        .select-list-body {
            overflow-x: hidden;
            overflow-y: auto;
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
                &.is-disabled {
                    pointer-events: none;

                    opacity: 0.5;
                }
            }
        }
    }
}

.primary {
    border-color: var(--color-theme-active);

    &.is-focus {
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

    &.is-focus {
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

    &.is-focus {
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

    &.is-focus {
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

    &.is-focus {
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

    &.is-focus {
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

/* size */
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
