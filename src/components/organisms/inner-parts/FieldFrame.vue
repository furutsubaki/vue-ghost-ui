<script setup lang="ts">
import { ref } from 'vue';
import InputTextCounter from '@/components/organisms/controls/InputTextCounter.vue';
withDefaults(
    defineProps<{
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
         * 必須か
         */
        required?: boolean;
        /**
         * 表示種類
         */
        variant?: 'primary' | 'secondary' | 'info' | 'success' | 'warning' | 'danger';
        /**
         * サイズ
         */
        size?: 'small' | 'medium' | 'large';
        /**
         * フォーカス中か
         */
        isFocus?: boolean;
        /**
         * 最大文字数
         */
        maxLength?: number | null;
        /**
         * 値
         */
        value?: string | number | boolean;
        /**
         * エラーメッセージを表示するか
         */
        isErrorMessage?: boolean;
        /**
         * エラーメッセージ配列
         */
        errors?: string[];
        /**
         * タグ
         */
        bodyTag?: string;
    }>(),
    {
        label: ' ',
        placeholder: '',
        disabled: false,
        required: false,
        variant: 'secondary',
        size: 'medium',
        isFocus: false,
        line: 1,
        maxLength: null,
        value: '',
        isErrorMessage: true,
        errors: () => [],
        bodyTag: 'label'
    }
);

const frameRef = ref();

defineExpose({ frameRef });
</script>

<template>
    <div
        class="component-input-frame"
        :class="{
            'is-focus': isFocus,
            'is-required': required,
            'is-inputed': value != null && value !== '',
            'is-disabled': disabled
        }"
    >
        <div ref="frameRef" class="frame-box" :class="[variant, size]">
            <div class="frame-label">
                <div class="label-box">
                    <span v-if="label" class="label">{{ label }}</span
                    ><span v-if="placeholder" class="placeholder">（例：{{ placeholder }}）</span>
                </div>
            </div>
            <div class="frame-grow" />
            <div class="frame-counter">
                <InputTextCounter
                    v-if="maxLength"
                    class="counter"
                    :text="value as string"
                    :max="maxLength"
                />
            </div>
        </div>
        <component :is="bodyTag" class="frame-body">
            <slot />
        </component>
        <template v-if="isErrorMessage">
            <div v-for="error in errors" :key="error" class="error">{{ error }}</div>
        </template>
    </div>
</template>

<style scoped>
.component-input-frame {
    --start-end-padding: 8px;
    position: relative;
    display: flex;
    align-items: center;
    min-height: var(--height);
    font-size: var(--font-size);
    .frame-box {
        position: absolute;
        text-align: left;
        display: flex;
        justify-content: space-between;
        min-width: 100px;
        width: 100%;
        height: 100%;
        min-height: var(--height);
        line-height: 1.5em;
        transition: height 0.2s;

        &::before,
        &::after {
            content: '';
            width: var(--start-end-padding);
            border: 1px solid var(--color-theme-border);
        }
        &::before {
            border-right: 0;
            border-radius: 4px 0 0 4px;
        }
        &::after {
            border-left: 0;
            border-radius: 0 4px 4px 0;
        }

        .frame-label,
        .frame-grow,
        .frame-counter {
            border: 1px solid var(--color-theme-border);
            border-right: 0;
            border-left: 0;
        }

        .frame-label {
            position: relative;
            display: flex;
            align-items: center;
            transition: border-top 0.2s;
            .label-box {
                display: flex;
                align-items: center;
                height: 100%;
                transition: 0.2s;
                pointer-events: none;
                transform: translateY(calc(-50% + (var(--height) / 2) - 1px));
                .label {
                    transition: color 0.2s;
                    color: var(--color-theme-text-secondary);
                    height: 1em;
                    line-height: 1em;
                    vertical-align: baseline;
                }

                .placeholder {
                    font-size: var(--font-size-small);
                    color: var(--color-theme-text-secondary);
                    height: 1em;
                    line-height: 1em;
                    vertical-align: baseline;
                }
            }
        }

        .frame-grow {
            flex-grow: 1;
        }

        .frame-counter {
            border-top: 0;
            .counter {
                pointer-events: none;
                transform: translateY(-50%);
                display: flex;
                align-items: center;
            }
        }
    }
    .frame-body {
        position: relative;
        padding-left: var(--start-end-padding);
        padding-right: var(--start-end-padding);
        display: flex;
        align-items: center;
        gap: 8px;
        width: 100%;
        height: 100%;
    }

    /* required */
    &.is-required > .frame-box > .frame-label > .label-box > .label {
        &::after {
            left: -0.5em;
            color: var(--color-status-danger);
            content: '*';
        }
    }

    /* disabled */
    &.is-disabled {
        pointer-events: none;
        opacity: 0.5;
    }

    /* focus */
    &:is(.is-inputed, .is-focus) > .frame-box > .frame-label {
        border-top: 0;

        > .label-box {
            transform: translateY(-50%);
            font-size: var(--font-size-small);
            .label {
                color: var(--color-theme-text-primary);
            }
        }
    }
}

.primary {
    border-color: var(--color-theme-active);

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

.error {
    font-size: var(--font-size-small);
    color: var(--color-status-danger);
}
</style>
