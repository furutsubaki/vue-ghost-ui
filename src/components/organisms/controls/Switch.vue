<script setup lang="ts">
import { type Ref, computed, watch } from 'vue';
import { useField } from 'vee-validate';
import { ZodNumber, ZodString, ZodNullable, ZodBoolean, ZodLiteral } from 'zod';

const model = defineModel<string | number | boolean>();
const props = withDefaults(
    defineProps<{
        /**
         * 項目値
         */
        value?: string | number | boolean;
        /**
         * フィールド名
         */
        name?: string;
        /**
         * zodスキーマ
         */
        schema?:
            | ZodLiteral<string | number | boolean>
            | ZodBoolean
            | ZodNullable<ZodBoolean>
            | ZodString
            | ZodNullable<ZodString>
            | ZodNumber
            | ZodNullable<ZodNumber>;
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
         * エラーメッセージを表示するか
         */
        isErrorMessage?: boolean;
    }>(),
    {
        value: true,
        name: Math.random().toString(),
        schema: undefined,
        label: '',
        disabled: false,
        variant: 'secondary',
        size: 'medium',
        isErrorMessage: true
    }
);
const unCheckValue = computed(() => (typeof props.value === 'boolean' ? false : ''));

const {
    value: fieldVal,
    checked,
    errors,
    handleChange
} = useField<string | number | boolean>(props.name, undefined, {
    type: 'checkbox',
    checkedValue: props.value,
    uncheckedValue: unCheckValue.value
});

const schemaChunks = computed(() => (props.schema as ZodString)?._def.checks || []);
const isRequired = computed(
    () => schemaChunks.value.some((check) => check.kind === 'min' && check.value === 1) || false
);

const onChange = (event: Event) => {
    let val = (event.target as HTMLInputElement).value as string | number | boolean;

    if (!(event.target as HTMLInputElement).checked) {
        val = unCheckValue.value;
    }
    handleChange(val);
};

watch(checked as Ref<boolean>, (flg) => {
    model.value = flg ? props.value : unCheckValue.value;
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
        <div v-if="label" class="label-placeholder" :class="{ required: isRequired }">
            {{ label }}
        </div>
        <div class="item-label">
            <label class="input">
                <input
                    class="checkbox"
                    type="checkbox"
                    :value="value"
                    :name="name"
                    :disabled="disabled"
                    :checked="checked"
                    @change="onChange"
                />
                <div class="switch"></div>
                <div class="text">
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
        &::after {
            position: absolute;
            left: 0;
            content: '';
            width: var(--font-size);
            height: var(--font-size);
            border-radius: 1em;
            background-color: var(--color-theme-text-secondary);
            transform: scale(1.5);
            transition: 0.2s;
        }
    }
    &.is-checked {
        .switch {
            &::after {
                transform: translateX(100%) scale(1.5);
            }
        }
    }
    &.is-disabled {
        pointer-events: none;
        opacity: 0.5;
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
    &.is-checked {
        .switch {
            background-color: var(--color-theme-active-alpha);
            &::after {
                background-color: var(--color-theme-active);
            }
        }
    }

    @media (hover: hover) {
        &:hover {
            color: var(--color-theme-active);
        }
    }

    @media (hover: none) {
        &:active {
            color: var(--color-theme-active);
        }
    }
}
/* .secondary {
    &.is-checked {
        .switch{
            background-color: var(--color-theme-active-alpha);
            &::after {
            background-color: var(--color-theme-active);
            }
        }
    }

    @media (hover: hover) {
        &:hover {
            color: var(--color-theme-active);
        }
    }

    @media (hover: none) {
        &:active {
            color: var(--color-theme-active);
        }
    }
} */
.info {
    &.is-checked {
        .switch {
            background-color: var(--color-status-info-alpha);
            &::after {
                background-color: var(--color-status-info);
            }
        }
    }

    @media (hover: hover) {
        &:hover {
            color: var(--color-status-info);
        }
    }

    @media (hover: none) {
        &:active {
            color: var(--color-status-info);
        }
    }
}
.success {
    &.is-checked {
        .switch {
            background-color: var(--color-status-success-alpha);
            &::after {
                background-color: var(--color-status-success);
            }
        }
    }

    @media (hover: hover) {
        &:hover {
            color: var(--color-status-success);
        }
    }

    @media (hover: none) {
        &:active {
            color: var(--color-status-success);
        }
    }
}
.warning {
    &.is-checked {
        .switch {
            background-color: var(--color-status-warning-alpha);
            &::after {
                background-color: var(--color-status-warning);
            }
        }
    }

    @media (hover: hover) {
        &:hover {
            color: var(--color-status-warning);
        }
    }

    @media (hover: none) {
        &:active {
            color: var(--color-status-warning);
        }
    }
}
.danger {
    &.is-checked {
        .switch {
            background-color: var(--color-status-danger-alpha);

            &::after {
                background-color: var(--color-status-danger);
            }
        }
    }

    @media (hover: hover) {
        &:hover {
            color: var(--color-status-danger);
        }
    }

    @media (hover: none) {
        &:active {
            color: var(--color-status-danger);
        }
    }
}
/* ▲ variant ▲ */

/* ▼ size ▼ */
.large {
    --height: 40px;
    --font-size: var(--font-size-large);
}
.medium {
    --height: 32px;
    --font-size: var(--font-size-common);
}
.small {
    --height: 24px;
    --font-size: var(--font-size-small);
}
/* ▲ size ▲ */
</style>
