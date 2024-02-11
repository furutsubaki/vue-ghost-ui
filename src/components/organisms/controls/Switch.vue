<script setup lang="ts">
import { type Ref, computed, watch } from 'vue';
import { useField } from 'vee-validate';
import { ZodNullable, ZodBoolean, ZodLiteral } from 'zod';

const model = defineModel<boolean>();
const props = withDefaults(
    defineProps<{
        /**
         * 項目値
         */
        value?: boolean;
        /**
         * フィールド名
         */
        name?: string;
        /**
         * zodスキーマ
         */
        schema?: ZodLiteral<boolean> | ZodBoolean | ZodNullable<ZodBoolean>;
        /**
         * 見出し
         */
        label?: string;
        /**
         * 必須か
         */
        required?: boolean;
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
        value: true,
        name: Math.random().toString(),
        schema: undefined,
        label: '',
        required: false,
        disabled: false,
        variant: 'secondary',
        size: 'medium',
        isErrorMessage: true
    }
);

const {
    value: fieldVal,
    checked,
    errors,
    handleChange
} = useField<boolean>(props.name, undefined, {
    type: 'checkbox',
    checkedValue: props.value,
    uncheckedValue: false
});

const isRequired = computed(() =>
    props.schema ? props.schema?._def.typeName === 'ZodLiteral' : props.required
);

const onChange = (event: Event) => {
    let val = JSON.parse((event.target as HTMLInputElement).value.toLowerCase());

    if (!(event.target as HTMLInputElement).checked) {
        val = false;
    }
    handleChange(val);
};

watch(checked as Ref<boolean>, (flg) => {
    model.value = flg ? props.value : false;
});

if (fieldVal.value == null && model.value != null) {
    fieldVal.value = model.value;
}
</script>

<template>
    <div
        class="component-switch"
        :class="[variant, size, { 'is-disabled': disabled, 'is-checked': checked }]"
    >
        <div v-if="label || isRequired" class="label-placeholder" :class="{ required: isRequired }">
            {{ label }}
        </div>
        <div class="item-label">
            <label class="input">
                <input
                    class="checkbox"
                    type="checkbox"
                    :value="value"
                    :disabled="disabled"
                    :checked="checked"
                    @change="onChange"
                />
                <div class="switch">
                    <div class="switch-icon">
                        <span v-if="$slots.switchIconTrue && checked" class="switch-icon-true">
                            <slot name="switchIconTrue" />
                        </span>
                        <span v-if="$slots.switchIconFalse && !checked" class="switch-icon-false">
                            <slot name="switchIconFalse" />
                        </span>
                    </div>
                </div>
                <div class="text" :class="{ required: !label && isRequired }">
                    <slot />
                </div>
            </label>
        </div>
        <template v-if="isErrorMessage">
            <div v-for="error in errors" :key="error" class="error">{{ error }}</div>
        </template>
    </div>
</template>

<style scoped>
.component-switch {
    position: relative;
    text-align: left;
    display: block;
    min-height: var(--height);
    font-size: var(--font-size);
    :where(.checkbox) {
        display: none;
    }
    :where(.switch) {
        position: relative;
        width: calc(var(--font-size) * 2);
        height: var(--font-size);
        border-radius: 1em;
        background-color: var(--color-theme-border);
        .switch-icon {
            position: absolute;
            left: 0;
            width: var(--font-size);
            height: var(--font-size);
            border-radius: 1em;
            background-color: var(--color-theme-text-secondary);
            transform: scale(1.5);
            transition: 0.2s;
            display: flex;
            align-items: center;
            justify-content: center;

            .switch-icon-true,
            .switch-icon-false {
                transform: scale(0.75);
                filter: invert(100%) grayscale(100%) contrast(100);
            }
            .switch-icon-true {
                color: var(--switch-icon-true-color);
            }
            .switch-icon-false {
                color: var(--color-theme-text-secondary);
            }
        }
    }
    &.is-checked {
        .switch {
            background-color: var(--switch-background-color);
            .switch-icon {
                background-color: var(--switch-icon-background-color);
                transform: translateX(100%) scale(1.5);
            }
        }
    }
    &.is-disabled {
        pointer-events: none;
        opacity: 0.5;
    }

    /* required(not label) */
    .text.required::after {
        left: -0.5em;
        color: var(--color-status-danger);
        content: '*';
    }

    /* hover */
    @media (hover: hover) {
        &:hover {
            color: var(--hover-color);
        }
    }
    @media (hover: none) {
        &:active {
            color: var(--hover-color);
        }
    }
}

.label-placeholder {
    position: absolute;
    top: -0.5em;
    left: 8px;
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

    :where(.input) {
        display: flex;
        gap: 8px;
        align-items: center;
        justify-content: flex-start;
        line-height: 1.5em;
        min-height: var(--height);
        transition:
            color 0.2s,
            background-color 0.2s,
            border-color 0.2s,
            opacity 0.2s;
    }
}

.error {
    font-size: var(--font-size-small);
    color: var(--color-status-danger);
}

/* ▼ variant ▼ */
.primary {
    --hover-color: var(--color-theme-active);
    --switch-icon-true-color: var(--color-theme-active);
    --switch-background-color: var(--color-theme-active-alpha);
    --switch-icon-background-color: var(--color-theme-active);
}
.secondary {
    --hover-color: var(--color-theme-text-primary);
    --switch-icon-true-color: var(--color-theme-text-primary);
    --switch-background-color: var(--color-theme-border);
    --switch-icon-background-color: var(--color-theme-text-primary);
}
.info {
    --hover-color: var(--color-status-info);
    --switch-icon-true-color: var(--color-status-info);
    --switch-background-color: var(--color-status-info-alpha);
    --switch-icon-background-color: var(--color-status-info);
}
.success {
    --hover-color: var(--color-status-success);
    --switch-icon-true-color: var(--color-status-success);
    --switch-background-color: var(--color-status-success-alpha);
    --switch-icon-background-color: var(--color-status-success);
}
.warning {
    --hover-color: var(--color-status-warning);
    --switch-icon-true-color: var(--color-status-warning);
    --switch-background-color: var(--color-status-warning-alpha);
    --switch-icon-background-color: var(--color-status-warning);
}
.danger {
    --hover-color: var(--color-status-danger);
    --switch-icon-true-color: var(--color-status-danger);
    --switch-background-color: var(--color-status-danger-alpha);
    --switch-icon-background-color: var(--color-status-danger);
}
/* ▲ variant ▲ */

/* ▼ size ▼ */
.large {
    --height: 40px;
    --font-size: var(--font-size-large);
}
.medium {
    --height: 32px;
    --font-size: var(--font-size-medium);
}
.small {
    --height: 24px;
    --font-size: var(--font-size-small);
}
/* ▲ size ▲ */
</style>
