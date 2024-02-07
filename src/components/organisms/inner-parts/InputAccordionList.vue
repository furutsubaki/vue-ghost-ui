<script setup lang="ts">
import { computed, ref, onMounted, onBeforeUnmount } from 'vue';

interface Item {
    label: string;
    value: string | number | boolean;
    disabled?: boolean;
}

const model = defineModel<boolean>();

const props = withDefaults(
    defineProps<{
        /**
         * 項目
         */
        items: Item[];
        /**
         * 項目値
         */
        value: string | number | boolean | undefined;
        /**
         * 親Node
         */
        parentRef: Element;
        /**
         * 表示種類
         */
        valiant?: 'primary' | 'secondary' | 'info' | 'success' | 'warning' | 'danger';
        /**
         * サイズ
         */
        size?: 'small' | 'medium' | 'large';
        /**
         * ポジション
         */
        position?: 'top' | 'bottom';
    }>(),
    {
        valiant: 'secondary',
        size: 'medium',
        position: 'bottom'
    }
);

const emit = defineEmits<{
    change: [value: string | number | boolean];
}>();

const selectedItem = computed(
    () => props.items.find((item) => item.value === props.value) ?? { label: '', value: null }
);
const onSelectItem = (item: Item) => {
    emit('change', item.value);
    model.value = false;
};

// Accordion枠外制御
const onCloseAccordion = (event: Event) => {
    if (!model.value || props.parentRef.contains(event.target as Node)) {
        return;
    }

    model.value = false;
};

onMounted(() => {
    window.addEventListener('click', onCloseAccordion);
});

onBeforeUnmount(() => {
    window.removeEventListener('click', onCloseAccordion);
});
</script>

<template>
    <div class="component-input-accordion-list" :class="{ 'is-open': model }">
        <div class="list-body">
            <div
                class="list-item"
                :class="{
                    'is-selected': selectedItem.value === item.value,
                    'is-disabled': item.disabled
                }"
                v-for="item in items"
                :key="item.label"
                :value="item.value"
                @click="onSelectItem(item)"
            >
                {{ item.label }}
            </div>
        </div>
    </div>
</template>

<style scoped>
.component-input-accordion-list {
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
    .list-body {
        overflow-x: hidden;
        overflow-y: auto;
        .list-item {
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

.large {
    min-height: 40px;
    font-size: var(--font-size-large);
}

.medium {
    min-height: 32px;
    font-size: var(--font-size-common);
}

.small {
    min-height: 24px;
    font-size: var(--font-size-small);
}
</style>
